/*
*  这个文件夹是存放 封装好的工具
*/

// 封装防抖动并且导出
export function debounce (func, delay) {
  let timer = null;
  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}