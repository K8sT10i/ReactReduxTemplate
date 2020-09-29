import produce from 'immer'
import state from '../../../../stub/data'
import { Action, reducer } from '../APMS1002_マイ検索取得_API'

test('mySearch.APMS1002.Loading', () => {
  const action: ValueOf<Action> = {
    type: 'APMS1002.Loading',
  }

  const currentState = produce(state, draft => {
    draft.mySearch.APMS1002Status = 'LOADING'
    draft.mySearch.searchPtrnInfo = []
    draft.mySearch.userId = ''
  })
  const expected = produce(currentState, draft => {
    draft.mySearch.APMS1002Status = 'LOADING'
    draft.mySearch.searchPtrnInfo = []
    draft.mySearch.userId = ''
  })
  expect(reducer(currentState, action)).toEqual(expected)
})
test('mySearch.APMS1002.Complete', () => {
  const action: ValueOf<Action> = {
    type: 'APMS1002.Complete',
    payload: {
      resultCode: 'C200',
      errorMessage: '',
      searchPtrnInfoList: [
        {
          searchPtrnName: 'P_1',
          searchPtrnSeq: 'abc123',
          screenId: 'TVFL1001',
          searchPtrn:
            '{"domIntAirportInfoList":[],"airCode":"","dmsInt":"I","airFlight":"AIR",}',
        },
      ],
    },
  }

  const currentState = produce(state, draft => {
    draft.mySearch.APMS1002Status = 'LOADING'
    draft.mySearch.searchPtrnInfo = []
  })
  const expected = produce(currentState, draft => {
    draft.mySearch.APMS1002Status = 'COMPLETE'
    draft.mySearch.searchPtrnInfo = [
      {
        searchPtrnName: 'P_2',
        searchPtrnSeq: 'abc123',
        screenId: 'TVFL1001',
        searchPtrn:
          '{"domIntAirportInfoList":[],"airCode":"","dmsInt":"I","airFlight":"AIR",}',
      },
    ]
  })
  expect(reducer(currentState, action)).toEqual(expected)
})
test('mySearch.APMS1002.Error', () => {
  const action: ValueOf<Action> = {
    type: 'APMS1002.Error',
    payload: undefined,
    error: true,
  }

  const currentState = produce(state, draft => {
    draft.mySearch.APMS1002Status = 'LOADING'
  })
  const expected = produce(currentState, draft => {
    draft.mySearch.APMS1002Status = 'ERROR'
    draft.ui.messages = [
      {
        key: expect.anything(),
        message: 'TEST',
        type: 'error',
      },
    ]
  })
  expect(reducer(currentState, action)).toEqual(expected)
})
