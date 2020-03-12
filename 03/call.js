Function.prototype.feakCall = function(context) {
  if (typeof this !== 'function') throw new TypeError('this is not a function')
  const context = context || window
  context.fn = this

  const args = []
  for (let i = 0; i < arguments.length; i++) {
    args.push(`arguments[${i}]`)
  }

  const res = eval(`context.fn(${args})`)
  return res
}

function add() {
  return this.x + this.y
}
const obj = {
  x: 1,
  y: 2
}
add.call(obj)
