Function.prototype.feakApply = function(context = window, args) {
  if (typeof this !== "function") throw new TypeError("this is not a function");
  if (typeof context !== "object") throw new TypeError("this is not a Object");
  const fn = Symbol();
  context[fn] = this;
  const res = args ? context[fn](...args) : context[fn]();
  delete context[fn];
  return res;
};

Function.prototype.myBind = function(context) {
  if (typeof this != "function") {
    throw new TypeError("this is not a function");
  }
  var self = this;
  var args = Array.prototype.slice.call(arguments, 1);

  var F = function() {};
  F.prototype = this.prototype;
  var bound = function() {
    var bindArgs = Array.prototype.slice.call(arguments);
    console.log("out", this);
    return self.feakApply(
      this instanceof F ? this : context,
      args.concat(bindArgs)
    );
  };
  bound.prototype = new F();
  return bound;
};

Function.prototype.feakBind = function(context = window) {
  if (typeof this !== "function") throw new TypeError("this is not a function");
  if (typeof context !== "object") throw new TypeError("this is not a Object");
  const bound = () => {
    return this.feakApply(context);
  };
  return bound;
};
