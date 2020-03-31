function getType(obj) {
  if (typeof obj !== 'object') return
  const typeStr = Object.prototype.toString.call(obj)
  switch (typeStr) {
    case '[object Array]':
      return 'Array'
    case '[object Date]':
      return 'Date'
    case '[object RegExp]':
      return 'RegExp'
    default:
      return 'Object'
  }
}
function deepClone(obj) {
  if (obj === null) return null
  if (typeof obj !== 'object') return obj
  const res = {}
  Object.keys(obj).forEach(name => {
    let type = getType(obj[name])
    console.log(type)

    // res[name] = typeof obj[name] === 'object' ? deepClone(obj[name]) : obj[name]
  })
  return res
}
const kun = {
  name: 'Kun',
  age: 18,
  skill: {
    sing: 'good',
    jump: 'good',
    rap: 'good'
  },
  hobby: ['sing', 'jump', 'rap', 'basketball'], // 转 obj
  key: new RegExp('rap', 'g'), // 转空 obj
  sing: function() {
    return 'sing'
  }, // 丢失 constructor 指针
  birthday: new Date() // 丢失
}
const kunkun = deepClone(kun)

// kunkun.skill.basketball = 'outstanding'
// console.log(kun)
// console.log(kunkun)
