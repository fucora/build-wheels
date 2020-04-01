const getType = obj => {
  const typeStr = Object.prototype.toString.call(obj)
  switch (typeStr) {
    case '[object Array]':
      return 'Array'
    case '[object Date]':
      return 'Date'
    case '[object RegExp]':
      return 'RegExp'
    case '[object Function]':
      return 'Function'
    case '[object Object]':
      return 'Object'
    default:
      return
  }
}

const getRegExp = re => {
  let flags = ''
  if (re.global) flags += 'g'
  if (re.ignoreCase) flags += 'i'
  if (re.multiline) flags += 'm'
  return flags
}

const deepClone = parent => {
  const parentList = []
  const childList = []

  const _deepClone = parent => {
    let type, child, proto, index, copy

    if (parent === null) return null
    if (typeof parent !== 'object') return parent

    type = getType(parent)
    switch (type) {
      case 'Array':
        child = []
        break
      case 'Date':
        child = new Date(parent.getTime())
        break
      case 'RegExp':
        child = new RegExp(parent.source, getRegExp(parent))
        if (parent.lastIndex) child.lastIndex = parent.lastIndex
        break
      default:
        proto = Object.getPrototypeOf(parent)
        child = Object.create(proto)
        break
    }

    index = parentList.indexOf(parent)
    // 父数组存在本对象，说明被引用过，直接返回该对象
    if (index !== -1) return childList[index]
    parentList.push(parent)
    childList.push(child)

    Object.keys(parent).forEach(name => {
      copy = parent[name]
      child[name] = _deepClone(copy)
    })

    return child
  }

  return _deepClone(parent)
}
