Function.prototype.feakCall = function(context = window, ...args) {
  if (typeof this !== "function") throw new TypeError("this is not a function");
  if (typeof context !== "object") throw new TypeError("this is not a Object");
  const fn = Symbol();
  context[fn] = this;
  const res = context[fn](...args);
  delete context[fn];
  return res;
};

// function add(i, j, k) {
//   return this.x + this.y + i + j + k;
// }

// const obj = {
//   x: 1,
//   y: 2
// };

// const res = add.feakApply(obj, [3, 4, 5]);
// console.log("res", res);
