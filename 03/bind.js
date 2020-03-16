Function.prototype.feakBind = function(context = window, ...args) {
  if (typeof this !== "function") throw new TypeError("this is not a function");
  if (typeof context !== "object") throw new TypeError("this is not a Object");
  const bound = (...bindArgs) => {
    console.log([...args, ...bindArgs]);
    return this.feakApply(context, [...args, ...bindArgs]);
  };
  return bound;
};
