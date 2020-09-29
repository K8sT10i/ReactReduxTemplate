import produce from 'immer'
import { Action, reducer } from '../APAN1002_API'
import state from '../../../../stub/data'
import { random } from '../../../util'

describe('airportNotice.APAN1002.Loading', () => {
  test('airportNotice.APAN1002.Loading', () => {
    const action: ValueOf<Action> = {
      type: 'airportNotice.APAN1002.Loading',
    }

    const currentState = produce(state, draft => {
      draft.airportNoticeInfo.APAN1002Status = 'NEED_TO_REFRESH'
    })
    const expected = produce(currentState, draft => {
      draft.airportNoticeInfo.APAN1002Status = 'LOADING'
    })

    expect(reducer(currentState, action)).toEqual(expected)
  })
})

describe('Created airport notice', () => {
  test('airportNotice.APAN1002.Complete', () => {
    const action: ValueOf<Action> = {
      type: 'airportNotice.APAN1002.Complete',
      payload: {
        resultCode: 'C200',
        errorMessage: '',
      },
    }

    const currentState = produce(state, draft => {
      draft.airportNoticeInfo.updateType = 'M'
      draft.airportNoticeInfo.APAN1002Status = 'COMPLETE'
      draft.airportNoticeInfo.APAN1001Status = 'NEED_TO_REFRESH'
      draft.airportNoticeInfo.noticeSeqInfoListDelete = []
      draft.airportNoticeInfo.showModal = 'HIDDEN'
    })
    const expected = produce(currentState, draft => {
      draft.airportNoticeInfo.updateType = 'M'
      draft.airportNoticeInfo.APAN1002Status = 'COMPLETE'
      draft.airportNoticeInfo.APAN1001Status = 'NEED_TO_REFRESH'
      draft.airportNoticeInfo.noticeSeqInfoListDelete = []
      draft.airportNoticeInfo.showModal = 'HIDDEN'

      draft.ui.messages.push({
        key: expect.anything(),
        type: 'success',
        message: 'TEST',
      })
    })

    expect(reducer(currentState, action)).toEqual(expected)
  })
})

describe('Updated airport notice', () => {
  test('airportNotice.APAN1002.Complete', () => {
    const action: ValueOf<Action> = {
      type: 'airportNotice.APAN1002.Complete',
      payload: {
        resultCode: 'C200',
        errorMessage: '',
      },
    }

    const currentState = produce(state, draft => {
      draft.airportNoticeInfo.updateType = 'U'
      draft.airportNoticeInfo.APAN1002Status = 'COMPLETE'
      draft.airportNoticeInfo.APAN1001Status = 'NEED_TO_REFRESH'
      draft.airportNoticeInfo.noticeSeqInfoListDelete = []
      draft.airportNoticeInfo.showModal = 'HIDDEN'
    })
    const expected = produce(currentState, draft => {
      draft.airportNoticeInfo.updateType = 'U'
      draft.airportNoticeInfo.APAN1002Status = 'COMPLETE'
      draft.airportNoticeInfo.APAN1001Status = 'NEED_TO_REFRESH'
      draft.airportNoticeInfo.noticeSeqInfoListDelete = []
      draft.airportNoticeInfo.showModal = 'HIDDEN'

      draft.ui.messages.push({
        key: expect.anything(),
        type: 'success',
        message: 'TEST',
      })
    })

    expect(reducer(currentState, action)).toEqual(expected)
  })
})

describe('Delete airport notice', () => {
  test('airportNotice.APAN1002.Complete', () => {
    const action: ValueOf<Action> = {
      type: 'airportNotice.APAN1002.Complete',
      payload: {
        resultCode: 'C200',
        errorMessage: '',
      },
    }

    const currentState = produce(state, draft => {
      draft.airportNoticeInfo.updateType = 'D'
      draft.airportNoticeInfo.APAN1002Status = 'COMPLETE'
      draft.airportNoticeInfo.APAN1001Status = 'NEED_TO_REFRESH'
      draft.airportNoticeInfo.noticeSeqInfoListDelete = []
      draft.airportNoticeInfo.showModal = 'HIDDEN'
    })
    const expected = produce(currentState, draft => {
      draft.airportNoticeInfo.updateType = 'D'
      draft.airportNoticeInfo.APAN1002Status = 'COMPLETE'
      draft.airportNoticeInfo.APAN1001Status = 'NEED_TO_REFRESH'
      draft.airportNoticeInfo.noticeSeqInfoListDelete = []
      draft.airportNoticeInfo.showModal = 'HIDDEN'

      draft.ui.messages.push({
        key: expect.anything(),
        type: 'success',
        message: 'TEST',
      })
    })

    expect(reducer(currentState, action)).toEqual(expected)
  })
})

test('airportNotice.APAN1002.Error', () => {
  const action: ValueOf<Action> = {
    type: 'airportNotice.APAN1002.Error',
    payload: {
      message: 'API return message',
      name: 'Error name',
    },
    error: true,
  }

  const currentState = produce(state, draft => {
    draft.airportNoticeInfo.APAN1002Status = 'LOADING'
  })

  const expected = produce(currentState, draft => {
    draft.airportNoticeInfo.APAN1002Status = 'ERROR'
    draft.ui.messages = [
      {
        key: expect.anything(),
        message: expect.anything(),
        type: 'error',
      },
    ]
  })

  expect(reducer(currentState, action)).toEqual(expected)
})

test.todo('airportNotice.APAN1002.Error')
