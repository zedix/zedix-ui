export default function debounce(callback: () => void, wait = 0) {
  let timeout: number;
  return function (...rest: any) {
    clearTimeout(timeout);
    timeout = window.setTimeout(() => {
      clearTimeout(timeout);
      // @ts-ignore
      callback(...rest);
    }, wait);
  };
}
