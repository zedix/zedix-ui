export default debounce(callback, wait = 0) {
  let timeout;
  return function (...rest) {
    clearTimeout(timeout);
    timeout = window.setTimeout(() => {
      clearTimeout(timeout);
      // eslint-disable-next-line standard/no-callback-literal
      callback(...rest);
    }, wait);
  };
}
