export const scrollHideShowControl = (
  dom: Element | (Window & typeof globalThis)
) => {
  let timer;
  const listenerFunc = () => {
    if (dom === window) {
      document.body.toggleAttribute("scroll", true);
      timer && clearTimeout(timer);
      timer = setTimeout(() => {
        document.body.toggleAttribute("scroll");
      }, 500);
      return;
    }
    dom.toggleAttribute("scroll", true);
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      dom.toggleAttribute("scroll");
    }, 500);
  };
  const unListener = () => {
    dom.removeEventListener("scroll", listenerFunc);
  };
  dom.addEventListener("scroll", listenerFunc, {
    capture:false,
    passive:true
  });

  return unListener;
};
