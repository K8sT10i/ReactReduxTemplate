// Allow let to make it easier to copy and paste test cases
/* eslint-disable prefer-const */
import { renderHook, act } from '@testing-library/react-hooks'
import useDraft from '../useDraft'

const initialValue: {
  foo?: string
  bar?: {
    baz?: string
    qux?: number
  }[]
  corge?: string
} = {
  foo: '',
  bar: [{ baz: '0', qux: 0 }, { baz: '1', qux: 1 }, { baz: '2' }, { qux: 3 }],
  corge: '',
}

it('should reflect a given value', () => {
  const { result } = renderHook(() => useDraft(initialValue))
  let [value] = result.current

  expect(value).toEqual(initialValue)
})

it('should change a value', () => {
  const { result } = renderHook(() => useDraft(initialValue))
  let [value, setValue] = result.current

  act(() => setValue({ foo: 'new value' }))
  ;[value] = result.current
  expect(value).toEqual({ foo: 'new value' })
})

it('should clear a draft', () => {
  const { result } = renderHook(() => useDraft(initialValue))
  let [value, setValue] = result.current

  act(() => setValue({ foo: 'new value' }))
  act(() => setValue(null))
  ;[value] = result.current
  expect(value).toEqual(initialValue)
})

it('should pass a non-null value to a setStateAction', () => {
  const { result } = renderHook(() => useDraft(initialValue))
  let [value, setValue] = result.current

  const setStateAction = jest.fn()
  act(() => setValue(setStateAction))

  expect(setStateAction).toBeCalledWith(value)
})

it('should memoize the setter for a better performance', () => {
  const { result } = renderHook(() => useDraft(initialValue))
  let [, setValue] = result.current

  act(() => setValue({}))

  let [, newSetValue] = result.current
  expect(newSetValue).toBe(setValue)
})
