import md5 from "md5"

export const getPictureUrl = computed(() => {
  return (url: string) => {
    if (!url) return;
    if (url.startsWith("http://") || url.startsWith("https://")) return url;
    return import.meta.env.VITE_BASE_IMG_ADDRESS + url;
  };
});

const browsers = {
  firefox: "icon-firefox",
  chrome: "icon-chrome-fill",
  edge: "icon-edge",
};

const envirconments = {
  ios: "icon-ios",
  windows: "icon-windows",
  linux: "icon-linux",
};

export const getBrowserIcon = (name: string) => {
  const brower = Object.keys(browsers);
  const key = brower.find((item) => name.includes(item));
  return browsers[key] || "icon-browser";
};

export const getEnvirconmentIcon = (name: string) => {
  const envir = Object.keys(envirconments);
  const key = envir.find((item) => name.includes(item));
  return envirconments[key] || "icon-caozuoxitong_mianxing";
};

export function getBrowser() {
  //获取浏览器版本
  var agent = navigator.userAgent.toLowerCase();

  var regStr_ie = /msie [\d.]+;/gi;
  var regStr_ff = /firefox\/[\d.]+/gi;
  var regStr_chrome = /chrome\/[\d.]+/gi;
  var regStr_saf = /safari\/[\d.]+/gi;
  //IE
  if (agent.indexOf("msie") > 0) {
    return agent.match(regStr_ie);
  }

  //firefox
  if (agent.indexOf("firefox") > 0) {
    return agent.match(regStr_ff);
  }

  //Chrome
  if (agent.indexOf("chrome") > 0) {
    return agent.match(regStr_chrome);
  }

  //Safari
  if (agent.indexOf("safari") > 0 && agent.indexOf("chrome") < 0) {
    return agent.match(regStr_saf);
  }
}

export function browserRedirect(){
  //获取操作系统
  var sUserAgent = navigator.userAgent;
  var isWin = (navigator.platform == "Win32") || (navigator.platform == "Windows");
  var isMac = (navigator.platform == "Mac68K") || (navigator.platform == "MacPPC") || (navigator.platform == "Macintosh") || (navigator.platform == "MacIntel");
  if (isMac) return "Mac";
  var isUnix = (navigator.platform == "X11") && !isWin && !isMac;
  if (isUnix) return "Unix";
  var isLinux = (String(navigator.platform).indexOf("Linux") > -1);
  if (isLinux) return "Linux";
  if (isWin) {
      var isWin2K = sUserAgent.indexOf("Windows NT 5.0") > -1 || sUserAgent.indexOf("Windows 2000") > -1;
      if (isWin2K) return "Windows 2000";
      var isWinXP = sUserAgent.indexOf("Windows NT 5.1") > -1 || sUserAgent.indexOf("Windows XP") > -1;
      if (isWinXP) return "Windows XP";
      var isWin2003 = sUserAgent.indexOf("Windows NT 5.2") > -1 || sUserAgent.indexOf("Windows 2003") > -1;
      if (isWin2003) return "Windows 2003";
      var isWinVista= sUserAgent.indexOf("Windows NT 6.0") > -1 || sUserAgent.indexOf("Windows Vista") > -1;
      if (isWinVista) return "Windows Vista";
      var isWin7 = sUserAgent.indexOf("Windows NT 6.1") > -1 || sUserAgent.indexOf("Windows 7") > -1;
      if (isWin7) return "Windows 7";
      var isWin10 = sUserAgent.indexOf("Windows NT 10") > -1 || sUserAgent.indexOf("Windows 10") > -1;
      if (isWin10) return "Windows 10";
  }
  return "other";
}

export const getAvatar =  (() => {
  const defaultImage =
  "https://upload-bbs.mihoyo.com/upload/2021/08/22/274927479/a95c5e1a2a1e63c3726f5baff45f349b_4982851866622051149.jpg?x-oss-process=image//resize,s_600/quality,q_80/auto-orient,0/interlace,1/format,jpg";
  let defaultImg = escape(defaultImage);
  return (email:string) => {
    const em = md5(email);
    return  `https://cravatar.cn/avatar/${em}?d=${defaultImg}`;
  }
})()