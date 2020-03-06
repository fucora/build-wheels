const debounceBtn = document.getElementById("debounce");

debounceBtn.addEventListener("click", debounce(debounceBtnClick, 1000));

function debounceBtnClick() {
  console.log("debounce");
}

/**
 * @description: 防抖函数
 * @param {function}
 * @param {Number}
 * @return: 函数执行结果
 */
function debounce(fn, delay) {
  let timer;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this);
    }, delay);
  };
}
