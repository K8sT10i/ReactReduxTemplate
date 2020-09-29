import _memoize, { MemoizeFunc } from 'fast-memoize'

// eslint-disable-next-line import/prefer-default-export
export const memoize: MemoizeFunc = fn =>
  _memoize(fn, {
    serializer: args =>
      JSON.stringify(
        args.map(a => (a instanceof Function ? memoizedId(a) : a)),
      ),
  })

let id = 0
function memoizedId(fn: Function & { __memoizedId?: number }) {
  if (!('__memoizedId' in fn)) {
    // I am intentionally doing it to have meta information
    // eslint-disable-next-line no-param-reassign
    fn.__memoizedId = id
    id += 1
  }

  return { __memoizedId: fn.__memoizedId }
}
