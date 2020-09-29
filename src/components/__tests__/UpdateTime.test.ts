import * as MockDate from 'mockdate'
import dayjs from 'dayjs'
import { fromNowDiff } from '../UpdateTime'

describe('fromNowDiff', () => {
  beforeAll(() => {
    MockDate.set('2019-08-27T20:00:00+0900')
  })
  afterAll(() => {
    MockDate.reset()
  })

  test.each`
    label             | input                    | expected
    ${'undefined'}    | ${undefined}             | ${'-'}
    ${'future'}       | ${'2019/08/27 20:00:01'} | ${'-'}
    ${'now'}          | ${'2019/08/27 20:00:00'} | ${'1 second ago'}
    ${'1 second ago'} | ${'2019/08/27 19:59:59'} | ${'1 second ago'}
  `('$label ($input) -> "$expected"', ({ input, expected }) => {
    const time = input ? dayjs(input) : input
    expect(fromNowDiff(time)).toEqual(expected)
  })
})
