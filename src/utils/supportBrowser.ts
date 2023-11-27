/** 是否支持 where 选择器 */
function isSupportedBrowser() {
  if (!window.CSS) {
    return false;
  }
  return CSS.supports('inset:0px') && CSS.supports('selector(:where(body))');
}

/**
 * 校验浏览器是否支持项目正常运行：浏览器类型 ，where选择器支持？
 * @returns boolean true 为支持
 */
const supportBrowser = () => {
  const uA = navigator.userAgent;
  return (
    isSupportedBrowser() ||
    /chrome/i.test(uA) ||
    /safari/i.test(uA) ||
    /firefox/i.test(uA) ||
    /edge/i.test(uA) ||
    /opera/i.test(uA)
  );
};

export default supportBrowser;
