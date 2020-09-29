import { memoize } from './memoize'

export function insert<V>(array: V[], index: number, value: V) {
  const next = [...array]
  next.splice(index, 0, value)
  return next
}

export function modify<V>(array: V[], index: number, diff: Partial<V>): V[] {
  const next = [...array]
  next.splice(index, 1, { ...array[index], ...diff })
  return next
}

export const modifyAt = memoize(_modifyAt) as typeof _modifyAt
function _modifyAt<V extends {}>(index: number, key: keyof V) {
  return (prev: V[], value: V[keyof V]) =>
    // It's a general-purpose part, so it can't be helped
    // eslint-disable-next-line @typescript-eslint/no-object-literal-type-assertion
    modify<V>(prev, index, { [key]: value } as Partial<V>)
}
