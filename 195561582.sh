# 1. 核心参数设置与宿主机硬限制精确读取（纯 SOCKS5 模式，默认端口 25880）
PROXY_PORT="${PROXY_PORT:-25880}"
PROXY_USER="w_$(head -c 6 /dev/urandom | od -An -tx1 | tr -d ' \n')"
PROXY_PASS="$(head -c 16 /dev/urandom | od -An -tx1 | tr -d ' \n')"
FD_HARD="$(ulimit -Hn 2>/dev/null || echo 65535)"

# 2. 开启 community 源、净化 DNS 并安装 sing-box 与 curl
sed -i '/community/s/^#//' /etc/apk/repositories
printf "nameserver 1.1.1.1\nnameserver 8.8.8.8\n" > /etc/resolv.conf
apk update && apk add --no-cache sing-box sing-box-openrc curl

# 3. 探测宿主机公网 IP 并构造防回环 CIDR（带 IPv4 正则校验，防 JSON 语法损坏）
PUB_IP="$(curl -4 -fsSL --connect-timeout 4 --max-time 6 http://api.ipify.org 2>/dev/null || true)"
if printf "%s" "${PUB_IP}" | grep -Eq '^([0-9]{1,3}\.){3}[0-9]{1,3}$'; then
  LOOPBACK_RULE="{\"ip_cidr\": [\"${PUB_IP}/32\"], \"action\": \"reject\"},"
else
  PUB_IP="你的NAT公网IP"
  LOOPBACK_RULE=""
fi

# 4. 一次性生成兼容 sing-box 1.12.x / 1.13.x / 1.14.x 的纯 SOCKS5 零日志配置
mkdir -p /etc/sing-box
cat <<EOF > /etc/sing-box/config.json
{
  "log": {
    "disabled": true
  },
  "dns": {
    "servers": [
      {
        "type": "udp",
        "tag": "dns-cf",
        "server": "1.1.1.1",
        "server_port": 53
      }
    ],
    "final": "dns-cf",
    "strategy": "ipv4_only",
    "cache_capacity": 4096
  },
  "inbounds": [
    {
      "type": "socks",
      "tag": "socks-in",
      "listen": "0.0.0.0",
      "listen_port": ${PROXY_PORT},
      "tcp_fast_open": false,
      "users": [
        {
          "username": "${PROXY_USER}",
          "password": "${PROXY_PASS}"
        }
      ]
    }
  ],
  "outbounds": [
    {
      "type": "direct",
      "tag": "direct-out",
      "tcp_fast_open": true,
      "connect_timeout": "5s"
    }
  ],
  "route": {
    "default_domain_resolver": {
      "server": "dns-cf",
      "strategy": "ipv4_only"
    },
    "rules": [
      ${LOOPBACK_RULE}
      {
        "ip_is_private": true,
        "action": "reject"
      }
    ],
    "final": "direct-out"
  }
}
EOF

# 5. 配置 OpenRC 守护参数（顶层 rc_ulimit 传递 fd 上限，start_pre 保障启动前环境就绪）
cat <<EOF > /etc/conf.d/sing-box
export GOMEMLIMIT="24MiB"
export GOGC="50"
rc_ulimit="-n ${FD_HARD}"
respawn_max=0
respawn_delay=3
supervise_daemon_args="\${supervise_daemon_args} -e GOMEMLIMIT=24MiB -e GOGC=50"

start_pre() {
  mkdir -p /run/openrc
  touch /run/openrc/softlevel
  printf "nameserver 1.1.1.1\nnameserver 8.8.8.8\n" > /etc/resolv.conf
  chown -R root:sing-box /etc/sing-box
  chmod 750 /etc/sing-box
  chmod 640 /etc/sing-box/config.json
}
EOF

# 6. 写入 /etc/local.d 开机自启兜底钩子
mkdir -p /etc/local.d
cat <<'EOF' > /etc/local.d/sing-box-guard.start
#!/bin/sh
mkdir -p /run/openrc && touch /run/openrc/softlevel
printf "nameserver 1.1.1.1\nnameserver 8.8.8.8\n" > /etc/resolv.conf
rc-service sing-box status >/dev/null 2>&1 || rc-service sing-box restart
EOF
chmod +x /etc/local.d/sing-box-guard.start
rc-update add local default >/dev/null 2>&1 || true

# 7. 权限初始化、配置语法校验并单次启动服务
chown -R root:sing-box /etc/sing-box && chmod 750 /etc/sing-box && chmod 640 /etc/sing-box/config.json
mkdir -p /run/openrc && touch /run/openrc/softlevel
sing-box check -c /etc/sing-box/config.json && \
rc-update add sing-box default && \
rc-service sing-box restart && \
sleep 1

# 8. 端到端全链路实测与内核精确参数读取
SOCKS_CODE="$(curl -4 -s -o /dev/null -w "%{http_code}" --connect-timeout 5 --max-time 8 \
  -x "socks5h://${PROXY_USER}:${PROXY_PASS}@127.0.0.1:${PROXY_PORT}" \
  http://cp.cloudflare.com/generate_204 || echo "000")"

SB_PID="$(pidof sing-box)"
LISTEN_INFO="$( (ss -tulnp 2>/dev/null || netstat -tulnp 2>/dev/null) | grep ":${PROXY_PORT} " )"
echo ""
echo "================ 部署与端到端闭环实测报告 ================"
echo "1. 核心版本 : $(sing-box version 2>/dev/null | head -n 1)"
echo "2. 进程状态 : PID=${SB_PID:-未运行} | 物理内存(RSS)=$(awk '/VmRSS/{print $2, $3}' /proc/${SB_PID:-1}/status 2>/dev/null)"
echo "3. 环境变量 : $(tr '\0' '\n' < /proc/${SB_PID:-1}/environ 2>/dev/null | grep -E '^(GOMEMLIMIT|GOGC)=' | tr '\n' ' ')"
echo "4. 进程句柄 : $(grep 'Max open files' /proc/${SB_PID:-1}/limits 2>/dev/null | awk '{print "Soft=" $4 ", Hard=" $5}')"
echo "5. 内核保活 : tcp_keepalive_time=$(cat /proc/sys/net/ipv4/tcp_keepalive_time 2>/dev/null)s"
echo "6. 监听端口 : ${LISTEN_INFO}"
echo "7. 闭环自检 : SOCKS5h 链路返回码=[${SOCKS_CODE}] (204 为鉴权+IPv4解析+出站全链路通过)"
echo "----------------------------------------------------------"
echo "★ 填入 Worker 的 s 变量 (纯 SOCKS5 模式):"
echo "  socks5://${PROXY_USER}:${PROXY_PASS}@${PUB_IP}:${PROXY_PORT}"
echo "★ Worker 配套设置: qj = no"
echo "=========================================================="