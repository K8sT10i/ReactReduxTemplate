import * as MockDate from 'mockdate'
import initStoryshots from '@storybook/addon-storyshots'

describe('', () => {
  beforeAll(() => {
    MockDate.set('2020-09-13T21:26:40+0900')
  })
  afterAll(() => {
    MockDate.reset()
  })

  initStoryshots({
    /* configuration options */
  })
})
