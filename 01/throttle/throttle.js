const throttleBtn = document.getElementById("throttle");

throttleBtn.addEventListener("click", throttle(throttleClick, 1000));

function throttleClick() {
  console.log("throttle");
}

function throttle(fn, delay) {
  let flag = true;
  return () => {
    if (!flag) return;
    flag = false;
    setTimeout(() => {
      fn.apply(this);
      flag = true;
    }, delay);
  };
}
