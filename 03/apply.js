Function.prototype.feakApply = function(context = window, args) {
  if (typeof this !== "function") throw new TypeError("this is not a function");
  if (typeof context !== "object") throw new TypeError("this is not a Object");
  const fn = Symbol();
  context[fn] = this;
  const res = context[fn](...args);
  delete context[fn];
  return res;
};
