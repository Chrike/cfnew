import{connect as Ae}from"cloudflare:sockets";
const ht="2026.10.17.2",se=new WeakMap,K=new Map,re=new Map,fallbackCache=new Map,deadProxies=new Map,dnsCache=new Map,TD=new TextDecoder,TE=new TextEncoder;
let de=0,rrIdx=0;
const FALLBACK_TTL=6e5,PROXY_CB_TTL=6e4,DNS_TTL=6e4;
const He={"Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods":"GET, POST, DELETE, OPTIONS","Access-Control-Allow-Headers":"Content-Type","Access-Control-Expose-Headers":"X-ECH-Status, X-ECH-Config-Length","Access-Control-Max-Age":"86400"};
function C(e){const n=atob(e),t=new Uint8Array(n.length);for(let r=0;r<n.length;r++)t[r]=n.charCodeAt(r);return TD.decode(t)}
const DEFAULT_SCU=C("aHR0cHM6Ly91cmwudjEubWsvc3Vi");
const F={freeCpu:"no",wk:"",ev:"yes",et:"no",ex:"no",ech:"no",tp:"",customDNS:"https://223.5.5.5/dns-query",customECHDomain:"cloudflare-ech.com",alpn:"",d:"",p:"",yx:"",yxURL:"",s:"",homepage:"",scu:DEFAULT_SCU,ena:"no",epd:"yes",epi:"yes",egi:"yes",ae:"",rm:"",qj:"",dkby:"no",yxby:"",ipv4:"yes",ipv6:"yes",ispMobile:"yes",ispUnicom:"yes",ispTelecom:"yes",jk:"no"};
const Nt_MAP={freeCpu:["freeCpu","FREE_CPU"],wk:["wk","WK"],ev:["ev","EV"],et:["et","ET"],ex:["ex","EX"],ech:["ech","ECH"],tp:["tp","TP"],customDNS:["customDNS","CUSTOMDNS","CUSTOM_DNS"],customECHDomain:["customECHDomain","CUSTOMECHDOMAIN","CUSTOM_ECH_DOMAIN"],alpn:["alpn","ALPN"],d:["d","D"],p:["p","P"],yx:["yx","YX"],yxURL:["yxURL","YXURL","YX_URL"],s:["s","S"],homepage:["homepage","HOMEPAGE"],scu:["scu","SCU"],ena:["ena","ENA"],epd:["epd","EPD"],epi:["epi","EPI"],egi:["egi","EGI"],ae:["ae","AE"],rm:["rm","RM"],qj:["qj","QJ"],dkby:["dkby","DKBY"],yxby:["yxby","YXBY"],ipv4:["ipv4","IPV4"],ipv6:["ipv6","IPV6"],ispMobile:["ispMobile","ISPMOBILE","ISP_MOBILE"],ispUnicom:["ispUnicom","ISPUNICOM","ISP_UNICOM"],ispTelecom:["ispTelecom","ISPTELECOM","ISP_TELECOM"],jk:["jk","JK"]};
const BOOL_KEYS=["freeCpu","ev","et","ex","ech","ena","epd","epi","egi","ipv4","ipv6","ispMobile","ispUnicom","ispTelecom","jk"];
const Me=["pp.xy.kg"];
const Ve=[
  {domain:C("UHJveHlJUC5ISy5DTUxpdXNzc3MubmV0"),region:"HK",regionCode:"HK",port:443},
  {domain:C("UHJveHlJUC5VUy5DTUxpdXNzc3MubmV0"),region:"US",regionCode:"US",port:443},
  {domain:C("UHJveHlJUC5TRy5DTUxpdXNzc3MubmV0"),region:"SG",regionCode:"SG",port:443},
  {domain:C("UHJveHlJUC5KUC5DTUxpdXNzc3MubmV0"),region:"JP",regionCode:"JP",port:443},
  {domain:C("UHJveHlJUC5LUi5DTUxpdXNzc3MubmV0"),region:"KR",regionCode:"KR",port:443},
  {domain:C("UHJveHlJUC5ERS5DTUxpdXNzc3MubmV0"),region:"DE",regionCode:"DE",port:443},
  {domain:C("UHJveHlJUC5TRS5DTUxpdXNzc3MubmV0"),region:"SE",regionCode:"SE",port:443},
  {domain:C("UHJveHlJUC5OTC5DTUxpdXNzc3MubmV0"),region:"NL",regionCode:"NL",port:443},
  {domain:C("UHJveHlJUC5GSS5DTUxpdXNzc3MubmV0"),region:"FI",regionCode:"FI",port:443},
  {domain:C("UHJveHlJUC5HQi5DTUxpdXNzc3MubmV0"),region:"GB",regionCode:"GB",port:443},
  {domain:C("UHJveHlJUC5PcmFjbGUuY21saXVzc3NzLm5ldA=="),region:"Oracle",regionCode:"Oracle",port:443},
  {domain:C("UHJveHlJUC5EaWdpdGFsT2NlYW4uQ01MaXVzc3NzLm5ldA=="),region:"DigitalOcean",regionCode:"DigitalOcean",port:443},
  {domain:C("UHJveHlJUC5WdWx0ci5DTUxpdXNzc3MubmV0"),region:"Vultr",regionCode:"Vultr",port:443},
  {domain:C("UHJveHlJUC5NdWx0YWNvbS5DTUxpdXNzc3MubmV0"),region:"Multacom",regionCode:"Multacom",port:443}
];
const REGION_ADJ={US:["SG","JP","KR"],SG:["JP","KR","US"],JP:["SG","KR","US"],KR:["JP","SG","US"],DE:["NL","GB","SE","FI"],SE:["DE","NL","FI","GB"],NL:["DE","GB","SE","FI"],FI:["SE","DE","NL","GB"],GB:["DE","NL","SE","FI"]};
const REGION_ALL=["US","SG","JP","KR","DE","SE","NL","FI","GB"];
const ALPN_LIST=["","h3","h2","http/1.1","h3,h2","h2,http/1.1","h3,h2,http/1.1"];
const X=atob("aW52YWxpZCBkYXRh"),It=atob("aW52YWxpZCB1c2Vy"),Pt=atob("Y29tbWFuZCBpcyBub3Qgc3VwcG9ydGVk"),Dt=atob("VURQIHByb3h5IG9ubHkgZW5hYmxlIGZvciBETlMgd2hpY2ggaXMgcG9ydCA1Mw=="),Mt=atob("aW52YWxpZCBhZGRyZXNzVHlwZQ=="),Ot=atob("YWRkcmVzc1ZhbHVlIGlzIGVtcHR5"),Vt=atob("d2ViU29ja2V0LmVhZHlTdGF0ZSBpcyBub3Qgb3Blbg=="),te=atob("SW52YWxpZCBTT0NLUyBhZGRyZXNzIGZvcm1hdA=="),Jt=atob("bm8gYWNjZXB0YWJsZSBtZXRob2Rz"),jt=atob("c29ja3Mgc2VydmVyIG5lZWRzIGF1dGg="),Bt=atob("ZmFpbCB0byBhdXRoIHNvY2tzIHNlcnZlcg=="),Je=atob("ZmFpbCB0byBvcGVuIHNvY2tzIGNvbm5lY3Rpb24="),je=atob("ZmFpbCB0byBvcGVuIHByb3h5IHR1bm5lbA=="),me=atob("aW52YWxpZCBwcm94eSByZXNwb25zZQ=="),Be=atob("c29ja3M1Oi8v"),$e=atob("c29ja3M6Ly8="),Ge=atob("aHR0cDovLw=="),We=atob("aHR0cHM6Ly8="),$t=atob("Q09OTkVDVA=="),Gt=atob("IEhUVFAvMS4x"),Wt=atob("SG9zdDog"),_t=atob("UHJveHktQXV0aG9yaXphdGlvbjogQmFzaWMg"),Ft=atob("UHJveHktQ29ubmVjdGlvbjogS2VlcC1BbGl2ZQ=="),Xt=atob("VXNlci1BZ2VudDogTW96aWxsYS81LjA="),Z=atob("DQo="),Zt=atob("SFRUUC8="),WS_HDR=atob("c2VjLXdlYnNvY2tldC1wcm90b2NvbA=="),WS_UPG=atob("d2Vic29ja2V0"),PROTO_VLESS=C("dmxlc3M="),PROTO_TROJAN=atob("dHJvamFu"),ERR_SOCKS5_REQ=atob("aW52YWxpZCBTT0NLUzUgcmVxdWVzdCBkYXRh");
const _e="p5",Fe="pt",le="pts",xe=1,ue=2,Ee=3,z=32*1024,zt=32*1024,Yt=512,Kt=0,Qt=20*1024,Xe=4*1024*1024,Ze=2,qt=3500,at=128*1024,st=45e3,gn=32;
const SHA224_K=[1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298];
const bn=[13,23,28,28,28,28,28,28,28,24,30,28,28,30,28,28,28,28,28,28,28,28,30,28,28,28,28,28,28,28,28,28,6,10,10,12,13,6,8,11,10,10,8,11,8,6,6,6,5,5,5,6,6,6,6,6,6,6,7,8,15,6,12,10,13,6,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,8,7,8,13,19,13,14,6,15,5,6,5,6,5,6,6,6,5,7,7,6,6,6,5,6,7,6,5,5,6,7,7,7,7,7,15,11,14,13,28,20,22,20,20,22,22,22,23,22,23,23,23,23,23,24,23,24,24,22,23,24,23,23,23,23,21,22,23,22,23,23,24,22,21,20,22,22,23,23,21,23,22,22,24,21,22,23,23,21,21,22,21,23,22,23,23,20,22,22,22,23,22,22,23,26,26,20,19,22,23,22,25,26,26,26,27,27,26,24,25,19,21,26,27,27,26,27,24,21,21,26,26,28,27,27,27,20,24,20,21,22,21,21,23,22,22,25,25,24,24,26,23,26,27,26,26,27,27,27,27,27,28,27,27,27,27,27,26,30];
const ct="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const STATIC_PAD=(()=>{let s="";for(let i=0;i<1000;i++)s+=ct[(i*37+13)%ct.length];return s})();

function P(A,R=200){return new Response(JSON.stringify(A),{status:R,headers:{...He,"Content-Type":"application/json; charset=utf-8","Cache-Control":"no-store"}})}
function jn(A){const R=new Headers(A.headers);for(const[C,k]of Object.entries(He))R.set(C,k);return R.set("Cache-Control","no-store"),new Response(A.body,{status:A.status,headers:R})}
async function Bn(A,R=!1){if(!A)return{};const C=se.get(A);if(!R&&C&&Date.now()-C.time<3e4)return{...await C.value};const k=A.get("c","json").then(N=>N||{});se.set(A,{time:Date.now(),value:k});try{return{...await k}}catch(N){throw se.delete(A),N}}
function setKvCache(D,M){if(D)se.set(D,{time:Date.now(),value:Promise.resolve({...M})})}
function pt(A){let R=0,C=0,k=!1;const N=new Set,$=new Error("FREE_CPU_BUDGET");return $.code="FREE_CPU_BUDGET",{enabled:A,get exhausted(){return k},onExhausted(I){N.add(I),k&&I()},consume(I){if(A){if(k)throw $;if(!Number.isSafeInteger(I)||I<0||R+I>2*1024*1024||C>=512){k=!0;for(const _ of N)try{_()}catch{}throw N.clear(),$}R+=I,C++}}}}

function De(e,n=!1){if(e==null||e==="")return n;if(e===!0||e===!1)return e;const t=String(e).trim().toLowerCase();return t==="yes"||t==="true"||t==="1"||t==="on"?!0:t==="no"||t==="false"||t==="0"||t==="off"?!1:n}
function At(e,n=!1){return De(e,n)?"yes":"no"}
function Ht(e){const n={...F,...e};return BOOL_KEYS.forEach(t=>{n[t]=At(n[t],De(F[t]))}),n.ev==="no"&&n.et==="no"&&n.ex==="no"&&(n.ev="yes"),n.ech==="yes"&&(n.dkby="yes"),n}
function Rt(e,...n){if(e){for(const t of n)if(e[t]!==void 0&&e[t]!==null&&e[t]!=="")return e[t]}}
function Nt(e={}){const t={};for(const[r,o]of Object.entries(Nt_MAP)){const a=Rt(e,...o);a!==void 0&&(t[r]=a)}return t}
function Oe(){return{domain:Me[Math.floor(Math.random()*Me.length)],region:"CF",regionCode:"CF",port:443}}
function en(e){return/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(e)}
function ze(e){return!!(/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(e)||/^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/.test(e)||/^::1$|^::$|^(?:[0-9a-fA-F]{1,4}:)*::(?:[0-9a-fA-F]{1,4}:)*[0-9a-fA-F]{1,4}$/.test(e))}

function isBlockedIPv4Int(u32){
  const a=(u32>>>24)&255,b=(u32>>>16)&255,c=(u32>>>8)&255;
  return a===0||a===10||a===127||(a===100&&b>=64&&b<=127)||(a===169&&b===254)||(a===172&&b>=16&&b<=31)||(a===192&&b===0&&(c===0||c===2))||(a===192&&b===168)||(a===198&&(b===18||b===19))||a>=224;
}
function parseIPv4NonStd(h){
  const parts=h.split(".");
  if(parts.length<1||parts.length>4)return null;
  const nums=[];
  for(const p of parts){
    if(!p)return null;
    let val=NaN;
    if(/^0x[0-9a-f]+$/i.test(p))val=Number.parseInt(p,16);
    else if(/^0[0-7]+$/.test(p))val=Number.parseInt(p,8);
    else if(/^\d+$/.test(p))val=Number.parseInt(p,10);
    else return null;
    if(!Number.isFinite(val)||val<0)return null;
    nums.push(val);
  }
  const n=nums.length;
  for(let i=0;i<n-1;i++)if(nums[i]>255)return null;
  const maxLast=n===1?4294967295:n===2?16777215:n===3?65535:255;
  if(nums[n-1]>maxLast)return null;
  if(n===1)return nums[0]>>>0;
  if(n===2)return((nums[0]<<24)|nums[1])>>>0;
  if(n===3)return((nums[0]<<24)|(nums[1]<<16)|nums[2])>>>0;
  return((nums[0]<<24)|(nums[1]<<16)|(nums[2]<<8)|nums[3])>>>0;
}
function parseIPv6Words(h){
  let s=h;
  const pct=s.indexOf("%");
  if(pct>=0)s=s.slice(0,pct);
  const lastColon=s.lastIndexOf(":");
  if(lastColon>=0&&s.slice(lastColon+1).includes(".")){
    const v4Int=parseIPv4NonStd(s.slice(lastColon+1));
    if(v4Int===null)return null;
    s=`${s.slice(0,lastColon)}:${((v4Int>>>16)&65535).toString(16)}:${(v4Int&65535).toString(16)}`;
  }
  const dbl=s.indexOf("::");
  let head=[],tail=[];
  if(dbl>=0){
    if(s.indexOf("::",dbl+1)>=0)return null;
    const left=s.slice(0,dbl),right=s.slice(dbl+2);
    if(left)head=left.split(":");
    if(right)tail=right.split(":");
    if(head.length+tail.length>7)return null;
  }else{
    head=s.split(":");
    if(head.length!==8)return null;
  }
  const words=new Uint16Array(8);
  let idx=0;
  for(const part of head){
    if(!/^[0-9a-f]{1,4}$/i.test(part))return null;
    words[idx++]=Number.parseInt(part,16);
  }
  if(dbl>=0)idx=8-tail.length;
  for(const part of tail){
    if(!/^[0-9a-f]{1,4}$/i.test(part))return null;
    words[idx++]=Number.parseInt(part,16);
  }
  return words;
}
function isBlockedHost(e,selfHost=""){
  if(!e)return!0;
  let h=String(e).trim().toLowerCase();
  if(h.startsWith("[")&&h.endsWith("]"))h=h.slice(1,-1);
  if(h.endsWith("."))h=h.slice(0,-1);
  if(!h||h==="localhost"||h.endsWith(".localhost")||h.endsWith(".local")||h.endsWith(".internal")||h.endsWith(".arpa")||h==="metadata.google.internal")return!0;
  if(selfHost&&h===selfHost.toLowerCase())return!0;
  const v4Int=parseIPv4NonStd(h);
  if(v4Int!==null)return isBlockedIPv4Int(v4Int);
  if(h.includes(":")){
    const w=parseIPv6Words(h);
    if(!w)return!0;
    const allZero6=w[0]===0&&w[1]===0&&w[2]===0&&w[3]===0&&w[4]===0;
    if(allZero6&&w[5]===0&&w[6]===0&&(w[7]===0||w[7]===1))return!0;
    if(allZero6&&(w[5]===0||w[5]===65535))return isBlockedIPv4Int(((w[6]<<16)|w[7])>>>0);
    if(w[0]===100&&w[1]===65435&&w[2]===0&&w[3]===0&&w[4]===0&&w[5]===0)return isBlockedIPv4Int(((w[6]<<16)|w[7])>>>0);
    if(w[0]===8194)return isBlockedIPv4Int(((w[1]<<16)|w[2])>>>0);
    if(w[0]===8193&&w[1]===3512)return!0;
    if((w[0]&65024)===64512||(w[0]&65472)===65152||(w[0]&65280)===65280)return!0;
  }
  return!1;
}

function isFallbackHost(h){if(!h)return!1;const t=fallbackCache.get(h);if(!t)return!1;if(Date.now()-t<FALLBACK_TTL)return!0;fallbackCache.delete(h);return!1}
function markFallbackHost(h){if(!h)return;fallbackCache.size>=1024&&fallbackCache.delete(fallbackCache.keys().next().value);fallbackCache.set(h,Date.now())}
function isDeadProxy(d,p=443){const k=`${d}:${p}`,t=deadProxies.get(k);if(!t)return!1;if(Date.now()-t<PROXY_CB_TTL)return!0;deadProxies.delete(k);return!1}
function markDeadProxy(d,p=443){if(!d)return;const k=`${d}:${p}`;deadProxies.size>=256&&deadProxies.delete(deadProxies.keys().next().value);deadProxies.set(k,Date.now())}

function tn(e){const t=String(e||"").trim();return ALPN_LIST.includes(t)?t:""}
function nn(e){return REGION_ADJ[e]||[]}
function rn(e){const n=nn(e);return[e,...n,...REGION_ALL.filter(r=>r!==e&&!n.includes(r))]}
function on(e,n,t=!0){if(!t||!e)return n;const r=rn(e),o=[];for(const a of r){const s=n.filter(u=>u.regionCode===a);if(s.length>1){const idx=(rrIdx++)%s.length;o.push(...s.slice(idx),...s.slice(0,idx))}else o.push(...s)}return o}
async function Ce(e="",n=!0){
  if(!e||e==="CF"||Ve.length===0)return Oe();
  let healthy=Ve.filter(o=>!isDeadProxy(o.domain,o.port));
  if(healthy.length===0)healthy=Ve;
  const t=healthy.map(o=>({...o,available:!0}));
  if(n&&e){const o=on(e,t,n);if(o.length>0)return o[0]}
  return t[(rrIdx++)%t.length];
}
function oe(e){if(e.includes("[")&&e.includes("]")){const t=e.match(/^\[([^\]]+)\](?::(\d+))?$/);if(t)return{address:t[1],port:t[2]?parseInt(t[2],10):null}}const n=e.lastIndexOf(":");if(n>0){const t=e.substring(0,n),r=e.substring(n+1),o=parseInt(r,10);if(!t.includes(":")&&!isNaN(o)&&o>0&&o<=65535)return{address:t,port:o}}return{address:e,port:null}}
function O(e){return e instanceof Uint8Array?e:e instanceof ArrayBuffer?new Uint8Array(e):ArrayBuffer.isView(e)?new Uint8Array(e.buffer,e.byteOffset,e.byteLength):new Uint8Array(e)}
function Se(e,n){const t=O(e),r=O(n),o=new Uint8Array(t.byteLength+r.byteLength);return o.set(t),o.set(r,t.byteLength),o}

function sn(e,n=e,t=Math.max(1,n>>8)){
  const maxB=e+2048;
  let r=[],o=0,a=0,s=null,curLim=e-1024+((Math.random()*2048)|0);
  function u(){o>32&&o*2>=r.length&&(r=r.slice(o),o=0)}
  function f(){if(o>=r.length)return null;const i=r[o];return r[o++]=void 0,a-=i.byteLength,u(),i}
  return{
    get empty(){return o>=r.length},
    clear(){r=[],o=0,a=0},
    sow(i){const h=i?.byteLength||0;return h?a+h>n||r.length-o>=t?!1:(r.push(i),a+=h,!0):!0},
    bundle(i=null){
      if(i||=f(),!i||o>=r.length||i.byteLength>=curLim)return[i,!1];
      let h=i.byteLength,l=o;
      for(;l<r.length;){const p=r[l],g=h+p.byteLength;if(g>curLim)break;h=g,l++}
      if(l===o)return[i,!1];
      const c=s||=new Uint8Array(maxB);
      c.set(i);
      let d=i.byteLength;
      for(;o<l;){const p=r[o];r[o++]=void 0,a-=p.byteLength,c.set(p,d),d+=p.byteLength}
      return curLim=e-1024+((Math.random()*2048)|0),u(),[c.subarray(0,h),!0];
    }
  };
}

function cn(e){
  const maxCap=zt+2048,t=Yt,r=Math.max(4096,t<<3);
  let n=30720+((Math.random()*4096)|0),o=new Uint8Array(maxCap),a=0,s=0,u=!1,f=0,i=0,h=0;
  function l(){
    s&&clearTimeout(s),s=0,u=!1;
    if(a){
      e.readyState===1&&e.send(o.subarray(0,a).slice());
      a=0,h=0,n=30720+((Math.random()*4096)|0);
    }
  }
  function c(){
    s||u||(u=!0,i=f,queueMicrotask(()=>{
      if(u=!1,!(!a||s)){
        if(n-a<t)return l();
        s=setTimeout(()=>{
          if(s=0,!!a){
            if(n-a<t)return l();
            if(h<2&&(f!==i||a<r))return h++,i=f,c();
            l();
          }
        },Math.max(Kt,1));
      }
    }));
  }
  return{
    send(d){
      const p=O(d);let g=0;const w=p.byteLength;
      if(w)for(;g<w;){
        if(!a&&w-g>=n){
          const x=Math.min(n,w-g);
          e.readyState===1&&e.send(g||x!==w?p.subarray(g,g+x):p);
          g+=x,n=30720+((Math.random()*4096)|0);
          continue;
        }
        const U=Math.min(n-a,w-g);
        o.set(p.subarray(g,g+U),a),a+=U,g+=U,f++,a===n||n-a<t?l():c();
      }
    },
    flush:l
  };
}

function Qe(e,n,t=null,h=void 0){
  const r={hostname:e,port:n};
  const sock=t&&typeof t.connect=="function"?h===void 0?t.connect(r):t.connect(r,h):h===void 0?Ae(r):Ae(r,h);
  return sock?.closed?.catch(()=>{}),sock;
}
async function qe(e,n,t=null,s=null){
  try{
    const r=Qe(e,n,t);
    if(r?.opened)await r.opened;
    if(s?.closed){try{r.close()}catch{}throw new Error("closed")}
    return r;
  }catch(r){
    if(!t||s?.closed)throw r;
    const o=Qe(e,n,null);
    if(o?.opened)await o.opened;
    if(s?.closed){try{o.close()}catch{}throw new Error("closed")}
    return o;
  }
}
async function Le(e,n,t=null,r=1,s=null){
  const o=Math.max(1,r|0);
  if(o<=1)return qe(e,n,t,s);
  let timer=null,settled=!1,p2=null;
  const p1=qe(e,n,t,s).then(sock=>{settled=!0;timer&&clearTimeout(timer);return sock},err=>{timer&&clearTimeout(timer);throw err});
  const winner=await new Promise((resolve,reject)=>{
    let errCount=0,total=1;
    function onErr(err){errCount++;if(errCount>=total)reject(err)}
    p1.then(resolve,err=>{
      if(!p2&&!s?.closed){
        total=2;
        p2=qe(e,n,t,s);
        p2.then(resolve,onErr);
      }
      onErr(err);
    });
    timer=setTimeout(()=>{
      timer=null;
      if(!settled&&!p2&&!s?.closed){
        total=2;
        p2=qe(e,n,t,s);
        p2.then(resolve,onErr);
      }
    },250);
  });
  [p1,p2].forEach(u=>{u&&u.then(f=>{if(f!==winner||s?.closed)try{f.close()}catch{}},()=>{})});
  if(s?.closed){try{winner.close()}catch{}throw new Error("closed")}
  return winner;
}

function ln(e){
  if(re.has(e))return re.get(e);
  const n=String(e||"").replace(/-/g,"");
  if(n.length!==32)return null;
  const t=new Uint8Array(16);
  for(let r=0;r<16;r++){const o=Number.parseInt(n.slice(r*2,r*2+2),16);if(Number.isNaN(o))return null;t[r]=o}
  return re.size>64&&re.clear(),re.set(e,t),t;
}
function un(e,n,t){
  const r=ln(t);
  return!!r&&e[n]===r[0]&&e[n+1]===r[1]&&e[n+2]===r[2]&&e[n+3]===r[3]&&e[n+4]===r[4]&&e[n+5]===r[5]&&e[n+6]===r[6]&&e[n+7]===r[7]&&e[n+8]===r[8]&&e[n+9]===r[9]&&e[n+10]===r[10]&&e[n+11]===r[11]&&e[n+12]===r[12]&&e[n+13]===r[13]&&e[n+14]===r[14]&&e[n+15]===r[15];
}
function fn(e,n){
  const t=O(e);
  if(t.byteLength<24)return{hasError:!0,message:X};
  const r=t.subarray(0,1);
  if(!un(t,1,n))return{hasError:!0,message:It};
  const o=t[17],a=18+o;
  if(t.byteLength<a+5)return{hasError:!0,message:X};
  const s=t[a];let u=!1;
  if(s!==1)if(s===2)u=!0;else return{hasError:!0,message:Pt};
  const f=19+o,i=t[f]<<8|t[f+1];let h=f+2,l=0,c=h+1,d="";
  const p=t[h];
  switch(p){
    case xe:if(l=4,t.byteLength<c+l)return{hasError:!0,message:X};d=`${t[c]}.${t[c+1]}.${t[c+2]}.${t[c+3]}`;break;
    case ue:if(t.byteLength<c+1)return{hasError:!0,message:X};if(l=t[c++],t.byteLength<c+l)return{hasError:!0,message:X};d=TD.decode(t.subarray(c,c+l));break;
    case Ee:if(l=16,t.byteLength<c+l)return{hasError:!0,message:X};const g=[],w=new DataView(t.buffer,t.byteOffset+c,l);for(let U=0;U<8;U++)g.push(w.getUint16(U*2).toString(16));d=g.join(":");break;
    default:return{hasError:!0,message:`${Mt}: ${p}`}
  }
  return d?{hasError:!1,addressType:p,port:i,hostname:d,isUDP:u,rawIndex:c+l,version:r}:{hasError:!0,message:`${Ot}: ${p}`};
}

function V(e,n){return e>>>n|e<<32-n}
function wn(e){
  if(K.has(e))return K.get(e);
  const t=TE.encode(e),r=SHA224_K;
  let o=[3238371032,914150663,812702999,4144912697,4290775857,1750603025,1694076839,3204075428];
  const a=t.length,s=a*8,u=Math.ceil((a+9)/64)*64,f=new Uint8Array(u);
  f.set(t),f[a]=128;
  const i=new DataView(f.buffer);
  i.setUint32(u-4,s,!1);
  const d=new Uint32Array(64);
  for(let c=0;c<u;c+=64){
    for(let y=0;y<16;y++)d[y]=i.getUint32(c+y*4,!1);
    for(let y=16;y<64;y++){
      const b=V(d[y-15],7)^V(d[y-15],18)^d[y-15]>>>3,m=V(d[y-2],17)^V(d[y-2],19)^d[y-2]>>>10;
      d[y]=d[y-16]+b+d[y-7]+m>>>0;
    }
    let[p,g,w,U,x,S,L,H]=o;
    for(let y=0;y<64;y++){
      const b=V(x,6)^V(x,11)^V(x,25),m=x&S^~x&L,E=H+b+m+r[y]+d[y]>>>0,T=V(p,2)^V(p,13)^V(p,22),W=p&g^p&w^g&w,ae=T+W>>>0;
      H=L,L=S,S=x,x=U+E>>>0,U=w,w=g,g=p,p=E+ae>>>0;
    }
    o[0]=o[0]+p>>>0,o[1]=o[1]+g>>>0,o[2]=o[2]+w>>>0,o[3]=o[3]+U>>>0,o[4]=o[4]+x>>>0,o[5]=o[5]+S>>>0,o[6]=o[6]+L>>>0,o[7]=o[7]+H>>>0;
  }
  const h=[];
  for(let c=0;c<7;c++)h.push((o[c]>>>24&255).toString(16).padStart(2,"0"),(o[c]>>>16&255).toString(16).padStart(2,"0"),(o[c]>>>8&255).toString(16).padStart(2,"0"),(o[c]&255).toString(16).padStart(2,"0"));
  const l=TE.encode(h.join(""));
  return K.size>=32&&K.delete(K.keys().next().value),K.set(e,l),l;
}
function yn(e,n,ce=""){
  const t=O(e),o=wn(ce||n);
  if(t.byteLength<58)return{hasError:!0,message:"invalid "+PROTO_TROJAN+" data - too short"};
  if(t[56]!==13||t[57]!==10)return{hasError:!0,message:"invalid "+PROTO_TROJAN+" header format (missing CR LF)"};
  for(let idx=0;idx<56;idx++)if(t[idx]!==o[idx])return{hasError:!0,message:"invalid "+PROTO_TROJAN+" password"};
  const u=t.subarray(58);
  if(u.byteLength<6)return{hasError:!0,message:ERR_SOCKS5_REQ};
  const f=new DataView(u.buffer,u.byteOffset,u.byteLength);
  if(f.getUint8(0)!==1)return{hasError:!0,message:"unsupported command, only TCP (CONNECT) is allowed"};
  const h=f.getUint8(1);let l=0,c=2,d="";
  switch(h){
    case 1:l=4;if(u.byteLength<c+l+4)return{hasError:!0,message:ERR_SOCKS5_REQ};d=u.subarray(c,c+l).join(".");break;
    case 3:l=u[c],c+=1;if(u.byteLength<c+l+4)return{hasError:!0,message:ERR_SOCKS5_REQ};d=TD.decode(u.subarray(c,c+l));break;
    case 4:{l=16;if(u.byteLength<c+l+4)return{hasError:!0,message:ERR_SOCKS5_REQ};const w=new DataView(u.buffer,u.byteOffset+c,l),U=[];for(let x=0;x<8;x++)U.push(w.getUint16(x*2).toString(16));d=U.join(":");break}
    default:return{hasError:!0,message:`invalid addressType is ${h}`}
  }
  if(!d)return{hasError:!0,message:`address is empty, addressType is ${h}`};
  const p=c+l,g=new DataView(u.buffer,u.byteOffset+p,2).getUint16(0);
  return{hasError:!1,addressRemote:d,addressType:h,port:g,hostname:d,rawClientData:u.subarray(p+4)};
}

function hn(e){const n=String(e||"");return/^\[.*\]$/.test(n)?n.slice(1,-1):n}
async function pn(e,n,t,r=null,o=null,sState=null){
  const{username:a,password:s,hostname:u,socksPort:f,kind:i}=t,h=i===le?{secureTransport:"on",allowHalfOpen:!1}:void 0;
  const c=Qe(u,f,r,h);
  if(c?.opened)await c.opened;
  if(sState?.closed){try{c.close()}catch{}throw new Error("closed")}
  const p=`${e.includes(":")&&!/^\[.*\]$/.test(e)?`[${e}]`:e}:${n}`;
  let g=`${$t} ${p}${Gt}${Z}${Wt}${p}${Z}${Xt}${Z}${Ft}${Z}`;
  a&&(g+=`${_t}${btoa(`${a}:${s||""}`)}${Z}`),g+=Z;
  const w=c.writable.getWriter(),U=c.readable.getReader();
  try{
    await w.write(TE.encode(g));
    const x=[13,10,13,10];let S=new Uint8Array(0),L=-1;
    for(;L<0;){
      const{value:m,done:E}=await U.read();
      if(E||!m||sState?.closed)throw new Error(je);
      S=Se(S,m);
      for(let T=0;T+3<S.length;T++)if(S[T]===x[0]&&S[T+1]===x[1]&&S[T+2]===x[2]&&S[T+3]===x[3]){L=T+4;break}
      if(L<0&&S.length>8192)throw new Error(me);
    }
    const H=TD.decode(S.subarray(0,Math.min(L,128)));
    if(!H.startsWith(Zt))throw new Error(me);
    const y=Number(H.split(" ")[1]);
    if(!(y>=200&&y<300))throw new Error(je);
    const b=S.subarray(L);
    if(o&&o.byteLength)await w.write(o);
    w.releaseLock(),U.releaseLock();
    if(sState?.closed){try{c.close()}catch{}throw new Error("closed")}
    if(b.byteLength)c._head=b;
    return c;
  }catch(x){
    try{w.releaseLock()}catch{}try{U.releaseLock()}catch{}try{c.close()}catch{}throw x;
  }
}

async function nt(e,n,t,r,o=null,a=null,sState=null){
  if(r&&(r.kind===Fe||r.kind===le))return pn(n,t,r,o,a,sState);
  const{username:s,password:u,hostname:f,socksPort:i}=r,h=Qe(f,i,o);
  if(h?.opened)await h.opened;
  if(sState?.closed){try{h.close()}catch{}throw new Error("closed")}
  const l=h.writable.getWriter(),c=h.readable.getReader();
  let d=new Uint8Array(0);
  async function p(b){
    for(;d.length<b;){
      const{value:m,done:E}=await c.read();
      if(E||!m||sState?.closed)throw new Error(Je);
      d=Se(d,m);
    }
    return d;
  }
  function g(b){const m=d.subarray(0,b);return d=d.subarray(b),m}
  try{
    const S=TE.encode(hn(n)),connPkt=new Uint8Array([5,1,0,3,S.length,...S,t>>8,t&255]);
    if(!s){
      await l.write(Se(new Uint8Array([5,1,0]),connPkt));
      let w=await p(2);
      if(w[0]!==5||w[1]===255)throw new Error(Jt);
      if(w[1]!==0)throw new Error(jt);
      g(2);
    }else{
      await l.write(new Uint8Array([5,2,0,2]));
      let w=await p(2);
      if(w[0]!==5||w[1]===255)throw new Error(Jt);
      const U=w[1];
      g(2);
      if(U===2){
        if(!u)throw new Error(jt);
        const uBytes=TE.encode(s),pBytes=TE.encode(u),authPkt=new Uint8Array([1,uBytes.length,...uBytes,pBytes.length,...pBytes]);
        await l.write(Se(authPkt,connPkt));
        w=await p(2);
        if(w[0]!==1||w[1]!==0)throw new Error(Bt);
        g(2);
      }else if(U===0){
        await l.write(connPkt);
      }else{
        throw new Error(Jt);
      }
    }
    let w=await p(4);
    if(w[1]!==0)throw new Error(Je);
    const H=w[3];let y;
    if(H===1)y=10;else if(H===4)y=22;else if(H===3)y=7+(await p(5))[4];else throw new Error(me);
    await p(y),g(y);
    if(a&&a.byteLength)await l.write(a);
    l.releaseLock(),c.releaseLock();
    if(sState?.closed){try{h.close()}catch{}throw new Error("closed")}
    if(d.byteLength)h._head=d;
    return h;
  }catch(err){
    try{l.releaseLock()}catch{}try{c.releaseLock()}catch{}try{h.close()}catch{}throw err;
  }
}

function ot(e){
  let n=String(e||"").trim(),t=_e;
  const r=n.toLowerCase();
  r.startsWith(We)?(t=le,n=n.slice(We.length)):r.startsWith(Ge)?(t=Fe,n=n.slice(Ge.length)):r.startsWith(Be)?n=n.slice(Be.length):r.startsWith($e)&&(n=n.slice($e.length));
  const o=n.indexOf("/");
  if(o>=0&&(n=n.slice(0,o)),!n)throw new Error(te);
  let[a,s]=n.split("@").reverse(),u,f,i,h;
  if(s){const d=s.split(":");if(d.length!==2)throw new Error(te);[u,f]=d}
  const l=a.split(":"),c=l.pop();
  if(h=Number(c),isNaN(h)){if(t===_e)throw new Error(te);l.push(c),h=t===le?443:80}
  if(i=l.join(":"),!i)throw new Error(te);
  if(i.includes(":")&&!/^\[.*\]$/.test(i))throw new Error(te);
  return{username:u,password:f,hostname:i,socksPort:h,kind:t};
}

function In(e){if(!e)return{error:null};try{return e=e.replace(/-/g,"+").replace(/_/g,"/"),{earlyData:Uint8Array.from(atob(e),n=>n.charCodeAt(0)).buffer,error:null}}catch(n){return{error:n}}}
function G(e){try{(e.readyState===1||e.readyState===2)&&e.close(1e3)}catch{}}
function he(e){return new Promise(n=>setTimeout(n,e))}
function mn(e){return{头:e.slice(1,7),键:"_"+e.slice(25,31)}}
function xn(e){const n=TE.encode(e);let t=0;for(let r=0;r<n.length;r++)t+=bn[n[r]];return Math.ceil(t/8)}
function En(e,n,t){const r=e.headers.get(n);if(r){try{const a=new URL(r,"https://x.invalid").searchParams.get(t);if(a)return a}catch{}return r}try{return new URL(e.url).searchParams.get(t)||""}catch{return""}}
function Un(e,n,t){const r=En(e,n,t);if(!r)return!0;const o=xn(r);return o>=98&&o<=1002}
function Cn(e){return STATIC_PAD.slice(0,e)}
function lt(e,...n){let t=e.length;for(let o of n)t+=o.length;const r=new e.constructor(t);r.set(e,0),t=e.length;for(let o of n)r.set(o,t),t+=o.length;return r}
function pe(e){return new Uint8Array(new ArrayBuffer(e||z))}

async function et(e,n,t,r,v,sState=null,myGen=0,onFirstByte=null,onZeroByteFail=null){
  let o=t,a=!1,s=!1,u=null;
  r&&(u=setTimeout(()=>{
    if(!a&&!s&&(!sState||sState.gen===myGen)&&(!sState||sState.canFallback)){
      s=!0;try{r()}catch{}try{e.close&&e.close()}catch{}
    }
  },qt));
  const f=cn(n);
  let i=null,h=!0,l=new ArrayBuffer(z);
  try{
    if(e._head&&e._head.byteLength){
      const hd=O(e._head);
      e._head=null;
      v.consume(hd.byteLength);
      a=!0,u&&(clearTimeout(u),u=null);
      if(sState)sState.confirmed=!0,sState.canFallback=!1,sState.initBuf=null;
      onFirstByte&&onFirstByte();
      if(n.readyState!==1)throw new Error(Vt);
      const firstOut=o?Se(o,hd):hd;
      o=null;
      firstOut.byteLength>=zt?(f.flush(),n.send(firstOut)):f.send(firstOut);
    }
    try{i=e.readable.getReader({mode:"byob"})}catch{h=!1,i=e.readable.getReader()}
    for(;;){
      if(sState&&(sState.closed||sState.gen!==myGen))break;
      const c=h?await i.read(new Uint8Array(l,0,z)):await i.read();
      if(c.done)break;
      if(sState&&(sState.closed||sState.gen!==myGen))break;
      const d=c.value;
      v.consume(d.byteLength);
      let p=O(d);
      const g=h&&d?.buffer instanceof ArrayBuffer&&d.buffer.byteLength>=z?d.buffer:new ArrayBuffer(z);
      if(h)l=g;
      if(p.byteLength){
        if(!a){
          a=!0,u&&(clearTimeout(u),u=null);
          if(sState)sState.confirmed=!0,sState.canFallback=!1,sState.initBuf=null;
          onFirstByte&&onFirstByte();
        }
        if(n.readyState!==1)throw new Error(Vt);
        o&&(p=Se(o,p),o=null);
        p.byteLength>=zt?(f.flush(),n.send(p),h&&(l=new ArrayBuffer(z))):f.send(p);
      }
    }
    f.flush();
  }catch{
    if(!a&&!s&&r&&!v.exhausted&&(!sState||(!sState.closed&&sState.gen===myGen&&sState.canFallback))){
      s=!0;
      u&&(clearTimeout(u),u=null);
      try{f.flush()}catch{}
      try{i?.releaseLock()}catch{}
      try{r()}catch{}
      try{e.close&&e.close()}catch{}
      return;
    }
    if(!a&&onZeroByteFail)onZeroByteFail();
    if(!s&&(!sState||sState.gen===myGen))G(n);
    return;
  }finally{
    try{f.flush()}catch{}
    try{i?.releaseLock()}catch{}
  }
  u&&(clearTimeout(u),u=null);
  if(!a&&!s&&r&&!v.exhausted&&(!sState||(!sState.closed&&sState.gen===myGen&&sState.canFallback))){
    s=!0;try{r()}catch{}try{e.close&&e.close()}catch{}
  }else if(!s&&(!sState||sState.gen===myGen)){
    if(!a&&onZeroByteFail)onZeroByteFail();
    G(n);
  }
}

async function tt(e,n,udpState,r=null,v){
  try{
    const pkt=O(e);
    if(!pkt.byteLength)return;
    function sendDns(payload){
      if(n.readyState!==1)return;
      let out=payload;
      if(udpState?.header){out=Se(udpState.header,payload);udpState.header=null}
      n.send(out);
    }
    const frames=[];
    let offset=0,validFrames=!0;
    while(offset<pkt.byteLength){
      if(offset+2>pkt.byteLength){validFrames=!1;break}
      const qLen=(pkt[offset]<<8)|pkt[offset+1];
      if(qLen<12||offset+2+qLen>pkt.byteLength){validFrames=!1;break}
      frames.push(pkt.subarray(offset,offset+2+qLen));
      offset+=2+qLen;
    }
    if(validFrames&&frames.length>0){
      const misses=[];
      for(const fr of frames){
        const key=Array.from(fr.subarray(4),b=>b.toString(16).padStart(2,"0")).join("");
        const hit=dnsCache.get(key);
        if(hit&&Date.now()-hit.time<DNS_TTL){
          v.consume(hit.data.byteLength);
          const copy=hit.data.slice();
          copy[2]=fr[2],copy[3]=fr[3];
          sendDns(copy);
        }else{
          misses.push({fr,key});
        }
      }
      if(misses.length===0)return;
      const o=await Le("8.8.4.4",53,r,1);
      v.onExhausted(()=>{try{o.close()}catch{}});
      const s=o.writable.getWriter();
      let combined=misses[0].fr;
      for(let i=1;i<misses.length;i++)combined=Se(combined,misses[i].fr);
      await s.write(combined),s.releaseLock();
      const reader=o.readable.getReader();
      let buf=new Uint8Array(0),replied=0;
      try{
        for(;replied<misses.length;){
          const{value:chunk,done}=await reader.read();
          if(done)break;
          v.consume(chunk.byteLength);
          buf=Se(buf,chunk);
          while(buf.byteLength>=2){
            const rLen=(buf[0]<<8)|buf[1];
            if(buf.byteLength<2+rLen)break;
            const respFrame=buf.slice(0,2+rLen);
            buf=buf.subarray(2+rLen);
            if(respFrame.byteLength>=14&&(respFrame[4]&128)!==0&&(respFrame[5]&15)===0){
              const txHi=respFrame[2],txLo=respFrame[3];
              const matched=misses.find(m=>m.fr[2]===txHi&&m.fr[3]===txLo)||misses[replied];
              if(matched){
                dnsCache.size>=512&&dnsCache.delete(dnsCache.keys().next().value);
                dnsCache.set(matched.key,{time:Date.now(),data:respFrame});
              }
            }
            sendDns(respFrame);
            replied++;
          }
        }
      }finally{
        try{reader.releaseLock()}catch{}
        try{o.close()}catch{}
      }
      return;
    }
    const o=await Le("8.8.4.4",53,r,1);
    v.onExhausted(()=>{try{o.close()}catch{}});
    const s=o.writable.getWriter();
    await s.write(pkt),s.releaseLock();
    const reader=o.readable.getReader();
    try{
      for(;;){
        const{value:chunk,done}=await reader.read();
        if(done)break;
        v.consume(chunk.byteLength);
        if(chunk?.byteLength)sendDns(O(chunk));
      }
    }finally{
      try{reader.releaseLock()}catch{}
      try{o.close()}catch{}
    }
  }catch{}
}

async function Ke(ctx,e,n,t,r,o,a,s,u="",f="",i=null,h=null,l=null){
  if(isBlockedHost(n,ctx.selfHost)){G(o);return}
  const v=ctx.v,c=u||ctx.N,d=f||ctx.J,p=i!==null?i:ctx.ee,g=h||ctx.ne,w=h?!0:ctx.j;
  s.initBuf=O(r),s.initOverflow=!1,s.confirmed=!1,s.canFallback=!0;
  const raceCount=v.enabled?1:Ze;
  async function x(y,b,m=!1){
    if(v.exhausted||s.closed)throw new Error("closed");
    const payload=s.initBuf||O(r);
    const E=m?await nt(e,y,b,g,l,payload,s):await Le(y,b,l,raceCount,s);
    if(s.closed){try{E.close()}catch{}throw new Error("closed")}
    const T=E.writable.getWriter();
    return!m&&payload.byteLength&&await T.write(payload),{remoteSock:E,writer:T};
  }
  function S(y,b){
    s.canFallback=!1;
    if(s.socket===y){
      try{b?.releaseLock()}catch{}
      s.socket=null,s.writer=null;
    }
  }
  function L(y,b,m,onFirstByte=null,onZeroByteFail=null){
    if(v.exhausted||s.closed||o.readyState!==1){
      try{b.releaseLock()}catch{}
      try{y.close()}catch{}
      return;
    }
    const myGen=++s.gen;
    if(!m)s.canFallback=!1;
    try{s.writer&&s.writer!==b&&s.writer.releaseLock()}catch{}
    s.socket=y,s.writer=b,s.drainUpload?.();
    y.closed.catch(()=>{}).finally(()=>{
      if(s.gen===myGen&&s.socket===y&&!m)G(o);
    });
    et(y,o,a,m,v,s,myGen,onFirstByte,onZeroByteFail).finally(()=>{
      if(s.gen===myGen&&s.socket===y){
        try{b.releaseLock()}catch{}
        s.writer=null;
      }
    });
  }
  async function H(fromDirectFailure=!1){
    s.canFallback=!1;
    if(!v.exhausted&&!s.closed){
      if(ctx.q&&w){G(o);return}
      const onFbSuccess=fromDirectFailure?()=>markFallbackHost(n):null;
      const onFbZero=()=>fallbackCache.delete(n);
      if(ctx.Q&&w){
        try{
          const{remoteSock:y,writer:b}=await x(n,t,!0);
          s.initBuf=null;
          L(y,b,null,onFbSuccess,onFbZero);
          return;
        }catch{
          let b,m,usedPool=!1;
          if(c&&c.trim()){const E=oe(c);b=E.address,m=E.port||t}
          else{const E=await Ce(d,p);b=E?E.domain:n,m=E?E.port:t,usedPool=!!E}
          try{
            const{remoteSock:E,writer:T}=await x(b,m,!1);
            s.initBuf=null;
            L(E,T,null,onFbSuccess,onFbZero);
          }catch{
            if(usedPool)markDeadProxy(b,m);
            fallbackCache.delete(n);
            G(o);
          }
        }
      }else{
        let y,b,usedPool=!1;
        if(c&&c.trim()){const m=oe(c);y=m.address,b=m.port||t}
        else{const m=await Ce(d,p);y=m?m.domain:n,b=m?m.port:t,usedPool=!!m}
        try{
          const{remoteSock:m,writer:E}=await x(y,b,w);
          s.initBuf=null;
          L(m,E,null,onFbSuccess,onFbZero);
        }catch{
          if(usedPool)markDeadProxy(y,b);
          fallbackCache.delete(n);
          G(o);
        }
      }
    }
  }
  const y=ctx.q&&w?!0:ctx.Q?!1:w;
  if(!y&&isFallbackHost(n)){
    await H(!1);
    return;
  }
  try{
    const{remoteSock:b,writer:m}=await x(n,t,y);
    L(b,m,()=>{S(b,m),H(!0)},null,null);
  }catch{
    await H(!0);
  }
}

async function an(ctx,e){
  const v=ctx.v,n=new URL(e.url),t=n.searchParams.get("p")||"",r=(n.searchParams.get("wk")||"").toUpperCase(),o=n.searchParams.get("rm")||"",a=o?o.toLowerCase()!=="no":null,s=n.searchParams.get("s")||"";
  let u=null;
  if(s)try{u=ot(s)}catch{}
  let f=ctx.J;
  !f||f===""?r?f=r:ctx.B&&ctx.B.trim()?f=ctx.B.trim().toUpperCase():f="CF":r&&(f=r);
  const i=new WebSocketPair,[h,l]=Object.values(i);
  l.accept(),l.binaryType="arraybuffer";
  let d=!1,p=null,g=!1,w=!1,handshaking=!1,udpState={header:null};
  let c={socket:null,writer:null,drainUpload:null,gen:0,initBuf:null,initOverflow:!1,confirmed:!1,canFallback:!1,get closed(){return w||l.readyState!==1}};
  const U=sn(Qt,v.enabled?1024*1024:Xe,v.enabled?256:Xe>>8),x=e.fetcher;
  function S(){try{c.writer?.releaseLock()}catch{}c.writer=null}
  function L(){
    if(!w){
      w=!0,U.clear(),S(),c.initBuf=null;
      try{c.socket?.close()}catch{}
      try{l.close(1e3)}catch{}
    }
  }
  v.onExhausted(L),l.addEventListener("close",L),l.addEventListener("error",L);
  function H(E){
    const T=O(E);
    return T.byteLength?U.sow(T)?(c.drainUpload(),!0):(L(),!1):!0;
  }
  async function y(){
    if(!(g||w||!c.writer)){
      g=!0;
      try{
        for(;!(w||!c.writer);){
          const[E]=U.bundle();
          if(!E)break;
          if(!c.confirmed&&!c.initOverflow){
            if(c.initBuf&&c.initBuf.byteLength+E.byteLength<=65536){
              c.initBuf=Se(c.initBuf,E);
            }else{
              c.initOverflow=!0,c.initBuf=null,c.canFallback=!1;
            }
          }
          await c.writer.write(E);
        }
      }catch{
        if(!c.writer||(c.canFallback&&!c.confirmed&&!c.initOverflow)){
          S();
          return;
        }
        L();
      }finally{
        g=!1,!U.empty&&!w&&c.writer&&queueMicrotask(y);
      }
    }
  }
  c.drainUpload=()=>{!g&&!U.empty&&c.writer&&queueMicrotask(y)};

  async function onChunk(raw){
    if(w)return;
    let T;
    try{
      T=O(raw);
      v.consume(T.byteLength);
    }catch{
      L();return;
    }
    if(d){await tt(T,l,udpState,x,v);return}
    if((c.socket&&c.writer)||p||handshaking){
      if(!H(T))L();
      return;
    }
    handshaking=!0;
    try{
      if(ctx.Re&&T.byteLength>=24){
        const W=fn(T,ctx.k);
        if(!W.hasError){
          p=PROTO_VLESS;
          const{addressType:ae,port:ge,hostname:ve,rawIndex:ke,version:Vn,isUDP:Jn}=W;
          if(Jn){
            if(ge===53)d=!0;
            else{L();return}
          }
          const ft=new Uint8Array([Vn[0],0]),dt=T.subarray(ke);
          if(d){
            udpState.header=ft;
            if(dt.byteLength)await tt(dt,l,udpState,x,v);
            return;
          }
          await Ke(ctx,ae,ve,ge,dt,l,ft,c,t,f,a,u,x);
          return;
        }
      }
      if(ctx.Ne&&T.byteLength>=58){
        const W=yn(T,ctx.k,ctx.ce);
        if(!W.hasError){
          p=PROTO_TROJAN;
          const{addressType:ae,port:ge,hostname:ve,rawClientData:ke}=W;
          await Ke(ctx,ae,ve,ge,ke,l,null,c,t,f,a,u,x);
          return;
        }
      }
      await he(200+((Math.random()*600)|0));
      L();
    }catch{
      L();
    }finally{
      handshaking=!1;
    }
  }

  const b=e.headers.get(WS_HDR)||"";
  const{earlyData:ed,error:edErr}=In(b);
  if(edErr){L()}
  else{
    l.addEventListener("message",ev=>{onChunk(ev.data)});
    if(ed)onChunk(ed);
  }
  return new Response(null,{status:101,webSocket:h});
}

async function Tn(e,n,v){
  const t=e.getReader({mode:"byob"});
  function fail(msg){try{t.releaseLock()}catch{}return msg}
  try{
    let r=await t.readAtLeast(18,pe());
    v.consume(r.value?.byteLength||0);
    let o=0,a=0,s=r.value;
    o+=r.value.length;
    const u=s[0];
    if(!un(s,1,n))return fail("invalid UUID");
    const h=s[17],l=18+h+1+2+1;
    if(l+1>o){
      if(r.done)return fail("header too short");
      a=l+1-o,r=await t.readAtLeast(a,pe()),v.consume(r.value?.byteLength||0),o+=r.value.length,s=lt(s,r.value);
    }
    const c=s[18+h];
    if(c!==1)return fail(`unsupported command: ${c}`);
    const d=(s[l-1-2]<<8)+s[l-1-1],p=s[l-1];
    let g=-1;
    if(p===xe?g=l+4:p===Ee?g=l+16:p===ue&&(g=l+1+s[l]),g<0)return fail("read address type failed");
    if(a=g-o,a>0){
      if(r.done)return fail("read address failed");
      r=await t.readAtLeast(a,pe()),v.consume(r.value?.byteLength||0),o+=r.value.length,s=lt(s,r.value);
    }
    let w="";
    switch(a=l,p){
      case xe:w=s.slice(a,a+4).join(".");break;
      case ue:w=TD.decode(s.slice(a+1,a+1+s[a]));break;
      case Ee:w=s.slice(a,a+16).reduce((x,S,L,H)=>L%2?x.concat(((H[L-1]<<8)+S).toString(16)):x,[]).join(":");break;
    }
    if(w.length<1)return fail("failed to parse hostname");
    const U=s.slice(g);
    return{hostname:w,port:d,data:U,resp:new Uint8Array([u,0]),reader:t,done:r.done};
  }catch(r){
    try{t.releaseLock()}catch{}
    throw r;
  }
}

async function vn(n,t,v){
  if(t.data&&t.data.byteLength)await n.write(t.data);
  let buf=new ArrayBuffer(z);
  for(;!t.done;){
    const a=await t.reader.read(new Uint8Array(buf,0,z));
    if(a.done)break;
    const val=a.value;
    v.consume(val?.byteLength||0);
    if(val&&val.byteLength)await n.write(val);
    buf=val?.buffer instanceof ArrayBuffer&&val.buffer.byteLength>=z?val.buffer:new ArrayBuffer(z);
    t.done=a.done;
  }
}

function kn(e,n,v){
  const r=n.getWriter();
  const o=(async()=>{
    try{await vn(r,e,v)}catch(a){if(!v.exhausted)throw a}finally{try{await r.close()}catch{}try{e.reader?.releaseLock()}catch{}}
  })();
  return{done:o,abort:()=>{try{r.abort().catch(()=>{})}catch{}}};
}

function An(e,n,v,onFirstByte=null){
  let o=null,a=null,gotFirst=!1;
  const r=new TransformStream(
    {
      start(d){
        d.enqueue(e);
        if(n._head&&n._head.byteLength){
          const hd=O(n._head);
          n._head=null;
          v.consume(hd.byteLength);
          gotFirst=!0;
          onFirstByte&&onFirstByte();
          d.enqueue(hd);
        }
      }
    },
    null,
    new ByteLengthQueuingStrategy({highWaterMark:at})
  );
  const s=(async()=>{
    if(!v.enabled&&(gotFirst||!onFirstByte)&&typeof n.readable?.pipeTo==="function"){
      try{
        await n.readable.pipeTo(r.writable);
        return;
      }catch(err){
        if(!v.exhausted)throw err;
        return;
      }
    }
    let l=o=n.readable.getReader(),c=a=r.writable.getWriter();
    try{
      for(;;){
        const p=await l.read();
        if(p.done)break;
        v.consume(p.value?.byteLength||0);
        if(p.value?.byteLength&&!gotFirst){
          gotFirst=!0;
          onFirstByte&&onFirstByte();
        }
        await c.write(p.value);
        if(gotFirst&&!v.enabled&&typeof n.readable?.pipeTo==="function"){
          l.releaseLock(),o=null,l=null;
          c.releaseLock(),a=null,c=null;
          await n.readable.pipeTo(r.writable);
          return;
        }
      }
      await c?.close();
    }catch(d){
      if(v.exhausted){try{await c?.close()}catch{}}else throw d;
    }finally{
      try{l?.releaseLock()}catch{}
      try{c?.releaseLock()}catch{}
    }
  })();
  return{
    readable:r.readable,
    done:s,
    finish:()=>{try{o?.cancel().catch(()=>{})}catch{}try{a?.close().catch(()=>{})}catch{}},
    abort:()=>{try{o?.cancel().catch(()=>{})}catch{}try{a?.abort().catch(()=>{})}catch{}}
  };
}

function ye(e,n,v,onFirstByte=null){
  let t,r;
  return v.onExhausted(()=>{try{n.close()}catch{}t?.abort(),r?.finish()}),t=kn(e,n.writable,v),r=An(e.resp,n,v,onFirstByte),{downloader:r,uploader:t,close:()=>{try{n.close()}catch{}}};
}

async function Hn(ctx,e,n=null){
  const t=e.hostname,r=e.port,v=ctx.v;
  if(isBlockedHost(t,ctx.selfHost))return null;
  const raceCount=v.enabled?1:Ze;
  const o=async(f,i)=>Le(f,i,n,raceCount),a=async(f,i)=>nt(ue,f,i,ctx.ne,n,null);
  const s=async()=>{
    if(ctx.N&&ctx.N.trim()){const i=oe(ctx.N);return{address:i.address,port:i.port||r,usedPool:!1}}
    const f=await Ce(ctx.J,ctx.ee);
    return f?{address:f.domain,port:f.port,usedPool:!0}:{address:t,port:r,usedPool:!1};
  };
  const u=ctx.q&&ctx.j?!0:ctx.Q?!1:ctx.j;
  if(!u&&isFallbackHost(t)){
    const i=await s();
    try{
      const h=ctx.j?await a(i.address,i.port):await o(i.address,i.port);
      return ye(e,h,v,null);
    }catch{
      if(i.usedPool)markDeadProxy(i.address,i.port);
      fallbackCache.delete(t);
    }
  }
  try{
    const f=u?await a(t,r):await o(t,r);
    return ye(e,f,v,null);
  }catch{
    if(ctx.q&&ctx.j)return null;
    const onFb=()=>markFallbackHost(t);
    try{
      if(ctx.Q&&ctx.j){
        try{
          const l=await a(t,r);
          return ye(e,l,v,onFb);
        }catch{
          const c=await s();
          try{
            const d=await o(c.address,c.port);
            return ye(e,d,v,onFb);
          }catch(err){
            if(c.usedPool)markDeadProxy(c.address,c.port);
            fallbackCache.delete(t);
            throw err;
          }
        }
      }
      const i=await s();
      try{
        const h=ctx.j?await a(i.address,i.port):await o(i.address,i.port);
        return ye(e,h,v,onFb);
      }catch(err){
        if(i.usedPool)markDeadProxy(i.address,i.port);
        fallbackCache.delete(t);
        throw err;
      }
    }catch{return null}
  }
}

async function Rn(ctx,e,n,t=null){
  if(de>=gn)return new Response("Too many connections",{status:429});
  de++;
  let r=!1,stTimer=null;
  const o=()=>{r||(de=Math.max(0,de-1),r=!0)},v=ctx.v;
  try{
    const a=await Tn(e,n,v);
    if(typeof a!="object"||!a){
      await he(200+((Math.random()*600)|0));
      o();
      return null;
    }
    const s=await Hn(ctx,a,t);
    if(s===null){try{a.reader?.releaseLock()}catch{}o();return null}
    const u=Promise.race([
      (async()=>{try{await s.downloader.done}catch{}})(),
      (async()=>{try{await s.uploader.done}catch{}})(),
      new Promise(res=>{stTimer=setTimeout(res,st)})
    ]).finally(()=>{
      stTimer&&(clearTimeout(stTimer),stTimer=null);
      try{s.close()}catch{}
      try{v.exhausted?s.downloader.finish():s.downloader.abort()}catch{}
      try{s.uploader.abort()}catch{}
      o();
    });
    return{readable:s.downloader.readable,closed:u};
  }catch{
    return o(),null;
  }
}

async function Nn(ctx,e){try{return await Rn(ctx,e.body,ctx.k,e.fetcher)}catch{return null}}

function we(e){
  if(!e||!e.trim())return[];
  const n=e.split(/[,\r\n]+/).map(r=>r.trim()).filter(r=>r),t=[];
  for(const r of n){
    let o="",a=r;
    if(r.includes("#")){const f=r.split("#");a=f[0].trim(),o=f[1].trim()}
    const{address:s,port:u}=oe(a);
    o||(o=s+(u?":"+u:"")),t.push({ip:s,port:u||443,name:o,addedAt:new Date().toISOString()});
  }
  return t;
}
function ut(e){return!e||e.length===0?"":e.map(n=>{const t=n.port||443;return`${n.ip}:${t}#${n.name}`}).join(",")}
function Mn(e){return/^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/.test(e)}

async function Ye(ctx){
  if(ctx.D){
    const e=JSON.stringify(ctx.M);
    await ctx.D.put("c",e);
    const n=String(Date.now());
    try{await ctx.D.put("c_ver",n)}catch{}
    setKvCache(ctx.D,ctx.M);
  }
}
function Y(ctx,e,n=""){return ctx.M[e]!==void 0?ctx.M[e]:n}
async function Ue(ctx,e,n){ctx.M[e]=n,await Ye(ctx)}
function Te(ctx){
  const e=Y(ctx,"yx","");
  if(e)try{
    const n=e.split(/[,\r\n]+/).map(t=>t.trim()).filter(t=>t);
    ctx.I=[],ctx._=[];
    n.forEach(t=>{
      let r="",o=t;
      if(t.includes("#")){const u=t.split("#");o=u[0].trim(),r=u[1].trim()}
      const{address:a,port:s}=oe(o);
      r||(r="自定义优选-"+a+(s?":"+s:"")),ze(a)?ctx.I.push({ip:a,port:s,isp:r}):ctx._.push({domain:a,port:s,name:r});
    });
  }catch{ctx.I=[],ctx._=[]}
  else ctx.I=[],ctx._=[];
}

async function Pn(ctx,e){
  if(!ctx.D)return new Response(JSON.stringify({success:!1,error:"KV存储未配置",message:"需要配置KV存储才能使用此功能"}),{status:503,headers:{"Content-Type":"application/json"}});
  if(!(Y(ctx,"ae","")==="yes"))return new Response(JSON.stringify({success:!1,error:"API功能未启用",message:'出于安全考虑，优选IP API功能默认关闭。请在配置管理页面开启"允许API管理"选项后使用。'}),{status:403,headers:{"Content-Type":"application/json"}});
  try{
    if(e.method==="GET"){
      const t=Y(ctx,"yx",""),r=we(t);
      return new Response(JSON.stringify({success:!0,count:r.length,data:r}),{headers:{"Content-Type":"application/json"}});
    }else if(e.method==="POST"){
      const t=await e.json(),r=Array.isArray(t)?t:[t];
      if(r.length===0)return new Response(JSON.stringify({success:!1,error:"请求数据为空",message:"请提供IP数据"}),{status:400,headers:{"Content-Type":"application/json"}});
      const o=Y(ctx,"yx","");let a=we(o);
      const s=[],u=[],f=[];
      for(const i of r){
        if(!i.ip){f.push({ip:"未知",reason:"IP地址是必需的"});continue}
        const h=i.port||443,l=i.name||`API优选-${i.ip}:${h}`;
        if(!ze(i.ip)&&!Mn(i.ip)){f.push({ip:i.ip,reason:"无效的IP或域名格式"});continue}
        if(a.some(p=>p.ip===i.ip&&p.port===h)){u.push({ip:i.ip,port:h,reason:"已存在"});continue}
        const d={ip:i.ip,port:h,name:l,addedAt:new Date().toISOString()};
        a.push(d),s.push(d);
      }
      if(s.length>0){const i=ut(a);await Ue(ctx,"yx",i),Te(ctx)}
      return new Response(JSON.stringify({success:s.length>0,message:`成功添加 ${s.length} 个IP`,added:s.length,skipped:u.length,errors:f.length,data:{addedIPs:s,skippedIPs:u.length>0?u:void 0,errors:f.length>0?f:void 0}}),{headers:{"Content-Type":"application/json"}});
    }else if(e.method==="DELETE"){
      const t=await e.json();
      if(t.all===!0){
        const i=Y(ctx,"yx",""),l=we(i).length;
        return await Ue(ctx,"yx",""),Te(ctx),new Response(JSON.stringify({success:!0,message:`已清空所有优选IP，共删除 ${l} 个`,deletedCount:l}),{headers:{"Content-Type":"application/json"}});
      }
      if(!t.ip)return new Response(JSON.stringify({success:!1,error:"IP地址是必需的",message:'请提供要删除的ip字段，或使用 {"all": true} 清空所有'}),{status:400,headers:{"Content-Type":"application/json"}});
      const r=t.port||443,o=Y(ctx,"yx","");let a=we(o);
      const s=a.length,u=a.filter(i=>!(i.ip===t.ip&&i.port===r));
      if(u.length===s)return new Response(JSON.stringify({success:!1,error:"优选IP不存在",message:`${t.ip}:${r} 未找到`}),{status:404,headers:{"Content-Type":"application/json"}});
      const f=ut(u);
      return await Ue(ctx,"yx",f),Te(ctx),new Response(JSON.stringify({success:!0,message:"优选IP已删除",deleted:{ip:t.ip,port:r}}),{headers:{"Content-Type":"application/json"}});
    }else return new Response(JSON.stringify({success:!1,error:"不支持的请求方法",message:"支持的方法: GET, POST, DELETE"}),{status:405,headers:{"Content-Type":"application/json"}});
  }catch(t){
    return new Response(JSON.stringify({success:!1,error:"处理请求失败",message:t.message}),{status:500,headers:{"Content-Type":"application/json"}});
  }
}

function ie(ctx,e=ctx.env){return Ht({...Nt(e),...ctx.M})}
function Dn(ctx,merged){
  const e=merged||ie(ctx);
  ctx.v=pt(e.freeCpu==="yes");
  const n=e.wk;
  if(n&&n.trim())ctx.B=n.trim().toUpperCase(),ctx.J=ctx.B;
  else{const r=e.p;r&&r.trim()?ctx.J="CUSTOM":(ctx.B="",ctx.J="")}
  ctx.ee=!(e.rm&&e.rm.toLowerCase()==="no"),ctx.Re=e.ev==="yes",ctx.Ne=e.et==="yes",ctx.Ie=e.ex==="yes",ctx.ce=e.tp||"",ctx.Et=e.scu||F.scu,ctx.Ut=e.epd==="yes",ctx.Ct=e.epi==="yes",ctx.St=e.egi==="yes",ctx.Lt=e.ena==="yes",ctx.Tt=e.jk==="yes",ctx.Pe=e.ech==="yes",ctx.bt=e.customDNS||F.customDNS,ctx.mt=e.customECHDomain||F.customECHDomain,ctx.xt=tn(e.alpn||""),ctx.yt=e.dkby==="yes"||ctx.Pe;
  const t=(e.qj||"").toLowerCase();
  if(ctx.Q=t==="no",ctx.q=t==="only",ctx.be=e.d||"",ctx.gt=e.yxURL||"",ctx.N=e.p?e.p.trim():"",ctx.$=e.s||"",ctx.$)try{ctx.ne=ot(ctx.$),ctx.j=!0}catch{ctx.ne={},ctx.j=!1}
  else ctx.ne={},ctx.j=!1;
  ctx.wt=!!(e.yxby&&e.yxby.toLowerCase()==="yes");
}

async function On(e,n={},t={waitUntil(){}}){
  if(e.method==="OPTIONS")return new Response(null,{status:204,headers:He});
  const r=new URL(e.url);
  if(r.pathname==="/"&&e.method==="GET"&&!e.headers.get("Upgrade"))return new Response("hello",{headers:{"Content-Type":"text/plain; charset=utf-8"}});
  const k=String(n.u||n.U||"351c9981-04b6-4103-aa4b-864aa9c91469").trim().toLowerCase();
  if(!en(k))return P({error:"UUID 格式无效"},503);
  const D=n.C||n.c||null,M=await Bn(D,!1);
  const ctx={env:n,k,D,M,selfHost:r.hostname,N:"",$:"",I:[],_:[],Q:!1,q:!1,yt:!1,wt:!1,ee:!0,J:"CF",B:"",gt:"",be:"",Re:!0,Ne:!1,Ie:!1,ce:"",Pe:!1,bt:F.customDNS,mt:F.customECHDomain,xt:"",Et:DEFAULT_SCU,Ut:!0,Ct:!0,St:!0,Lt:!1,Tt:!1,v:null,ne:{},j:!1};
  const mergedCfg=ie(ctx,n);
  Dn(ctx,mergedCfg),ctx.J||="CF";
  const a="/"+k,s=ctx.be?new URL("/"+ctx.be.replace(/^\/+|\/+$/g,""),"https://path.invalid").pathname:"",u=i=>r.pathname===a+i||s&&r.pathname===s+i;
  if(u("/api/config")){
    if(e.method==="GET")return P({...ie(ctx,n),uuid:k,coreVersion:ht,kvEnabled:!!D});
    if(e.method!=="POST")return P({error:"只支持 GET 和 POST"},405);
    if(!D)return P({success:!1,message:"KV 未绑定，无法保存配置"},503);
    let i;
    try{
      const h=await e.text();
      if(TE.encode(h).length>1048576)return P({success:!1,message:"配置过大，请减少优选条目或改用列表 URL（请求上限 1 MiB）"},413);
      if(i=JSON.parse(h),!i||Array.isArray(i)||typeof i!="object")throw new Error;
      Object.hasOwn(i,"customIP")&&(Object.hasOwn(i,"p")||(i.p=i.customIP),delete i.customIP);
      for(const[l,c]of Object.entries(i)){
        if(!Object.hasOwn(F,l)||c!==null&&!["string","boolean","number"].includes(typeof c))throw new Error;
        if(typeof c=="string"&&c.length>(l==="yx"?262144:16384))return P({success:!1,message:l==="yx"?"优选列表过长，请减少条目或改用列表 URL（上限 262144 字符）":"配置字段过长："+l},413);
        c===""||c===null?delete ctx.M[l]:ctx.M[l]=c;
      }
    }catch{return P({success:!1,message:"配置格式无效"},400)}
    return await Ye(ctx),P({success:!0,message:"配置已保存",config:{...ie(ctx,n),coreVersion:ht}});
  }
  if(u("/api/preferred-ips")){
    const i=await Pn(ctx,e);
    return e.method!=="GET"&&i.ok&&D&&setKvCache(D,ctx.M),jn(i);
  }
  if(u("/region")&&e.method==="GET")return P({region:ctx.J,detectionMethod:ctx.B?"手动指定地区":ctx.N?"自定义 ProxyIP 模式":"官方直连",manualRegion:ctx.B,ci:ctx.N,timestamp:new Date().toISOString()});
  if(u("/test-api")&&e.method==="GET")return P({detectedRegion:ctx.J,message:"API 正常运行"});
  const f=r.pathname.replace(/\/+$/,"");
  if(e.headers.get("Upgrade")?.toLowerCase()===WS_UPG){
    if(s&&f!==s&&!r.pathname.startsWith(s+"/")&&f!==a&&!r.pathname.startsWith(a+"/"))return P({error:"Not Found"},404);
    return an(ctx,e);
  }
  if(e.method==="POST"&&ctx.Ie&&((!s&&f==="")||(s&&f===s)||u("")||f===a||f==="/"+k.substring(0,8)||ctx.ce&&f==="/"+ctx.ce.replace(/^\/+|\/+$/g,""))){
    const{头:i,键:h}=mn(k);
    if(!Un(e,i,h))return new Response("Bad Request",{status:400});
    const l=await Nn(ctx,e);
    if(!l)return new Response("Internal Server Error",{status:502});
    t.waitUntil(l.closed.catch(()=>{}));
    const padStr=Cn(100+((Math.random()*901)|0));
    return new Response(l.readable,{headers:{"X-Accel-Buffering":"no","Cache-Control":"no-store","Content-Type":"application/grpc",[i]:`https://x.invalid/?${h}=${padStr}`}});
  }
  return P({error:"Not Found"},404);
}
function $n(A){return(e,n=A,t)=>On(e,n,t)}
var Wn={async fetch(A,R={},C){try{return await On(A,R,C)}catch{return P({error:"请求处理失败"},502)}}};
export{Wn as default};