import dayjs from 'dayjs'
import { within24 } from '../RMKSField'

describe('within24', () => {
  test('False if not a valid time', () => {
    expect(within24('adsljfdsa')).toBeFalsy()
  })

  test('True at a reasonable time', () => {
    const time = dayjs().format('YYYYMMDD')
    expect(within24(time)).toBeTruthy()
  })
})
