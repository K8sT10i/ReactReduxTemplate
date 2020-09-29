import produce from 'immer'
import { Action, reducer } from '../APMS1001_マイ検索更新_API'
import state from '../../../../stub/data'

test('APMS1001.Loading', () => {
  const action: ValueOf<Action> = {
    type: 'APMS1001.Loading',
  }

  const currentState = produce(state, draft => {
    draft.modifySearch.APMS1001Status = 'NEED_TO_REFRESH'
  })
  const expected = produce(currentState, draft => {
    draft.modifySearch.APMS1001Status = 'LOADING'
  })

  expect(reducer(currentState, action)).toEqual(expected)
})

test('APMS1001.Complete Create Case', () => {
  const action: ValueOf<Action> = {
    type: 'APMS1001.Complete',
    payload: {
      resultCode: 'C200',
      errorMessage: 'API return message',
    },
  }

  const currentState = produce(state, draft => {
    draft.modifySearch.updateType = 'M'
    draft.modifySearch.APMS1001Status = 'LOADING'
  })
  const expected = produce(currentState, draft => {
    draft.modifySearch.updateType = 'M'
    draft.modifySearch.APMS1001Status = 'COMPLETE'

    draft.ui.messages.push({
      key: expect.anything(),
      type: 'success',
      message: 'TEST',
    })
  })

  expect(reducer(currentState, action)).toEqual(expected)
})

test('APMS1001.Complete Delete Case', () => {
  const action: ValueOf<Action> = {
    type: 'APMS1001.Complete',
    payload: {
      resultCode: 'C200',
      errorMessage: 'API return message',
    },
  }

  const currentState = produce(state, draft => {
    draft.modifySearch.updateType = 'D'
    draft.modifySearch.APMS1001Status = 'LOADING'
  })
  const expected = produce(currentState, draft => {
    draft.modifySearch.updateType = 'D'
    draft.modifySearch.APMS1001Status = 'COMPLETE'

    draft.ui.messages.push({
      key: expect.anything(),
      type: 'success',
      message: 'TEST',
    })
  })

  expect(reducer(currentState, action)).toEqual(expected)
})

test('APMS1001.Error', () => {
  const action: ValueOf<Action> = {
    type: 'APMS1001.Error',
    payload: {
      message: 'API return message',
      name: 'Error name',
    },
    error: true,
  }

  const currentState = produce(state, draft => {
    draft.modifySearch.APMS1001Status = 'LOADING'
  })

  const expected = produce(currentState, draft => {
    draft.modifySearch.APMS1001Status = 'ERROR'

    draft.ui.blockingMessages = [
      {
        key: expect.anything(),
        title: 'TEST',
        subText: action.payload.message,
      },
    ]
  })

  expect(reducer(currentState, action)).toEqual(expected)
})
