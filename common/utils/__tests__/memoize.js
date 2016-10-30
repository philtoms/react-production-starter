import memoize from '../memoize'

describe('memoize', () => {
  let memoized, cached = 0

  beforeEach(() => {
    cached = 0
    memoize.flush()
    memoized = memoize((...args) => {
      return ++cached
    })
  })

  it('should call on new arguments', () => {
    expect(memoized(1)).toBe(1)
  })

  it('should return memoized result', () => {
    memoized(1)
    memoized(1)
    expect(memoized(1)).toBe(1)
  })

  it('should break cache on arg change', () => {
    memoized(1)
    memoized(1)
    expect(memoized(2)).toBe(2)
  })

  it('should handle multiple arguments', () => {
    memoized(1, 2)
    memoized(1, 2)
    expect(memoized(1, 2)).toBe(1)
  })

  it('should break cache on any arg change', () => {
    memoized(1, 2)
    memoized(1, 2)
    expect(memoized(1, 3)).toBe(2)
  })

})
