const fnCache = new Map()
const symCache = new Map()
const argCache = new Map()

function memoize (fn, timeout) {
  const symKey = fn.toString()
  const key = symCache.get(symKey) || Symbol(symKey)
  symCache.set(symKey, key)
  return (...args) => {
    const cached = argCache.get(key)
    if (cached && args.every((prop, index) => prop === cached[index])) {
      return fnCache.get(key)
    }
    argCache.set(key, args)
    fnCache.set(key, fn(...args))
    return fnCache.get(key)
  }
}

memoize.flush = () => {
  fnCache.clear()
  symCache.clear()
  argCache.clear()
}

export default memoize
