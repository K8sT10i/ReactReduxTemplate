import produce from 'immer'
import { reducer, Action } from '../APRS1002_予約検索（国内予約情報検索）_API'
import state from '../../../../stub/data'

const initialState = produce(state, draft => {})

describe('search.APRS1002.Loading', () => {
  test('検索結果をリセットして LOADING 状態にできる', () => {
    const action: ValueOf<Action> = {
      type: 'search.APRS1002.Loading',
    }
    const currentState = produce(initialState, draft => {})
    const expected = produce(currentState, draft => {
      draft.searchForCeRecord.APRS1002Status = 'LOADING'
      draft.searchForCeRecord.searchFlag = true
    })
    expect(reducer(currentState, action)).toEqual(expected)
  })
})

describe('search.APRS1002.Complete', () => {
  test('国内予約情報をセットして COMPLETE 状態にできる', () => {
    const action: ValueOf<Action> = {
      type: 'search.APRS1002.Complete',
      payload: [
        {
          pnrRecordLocator: '',
          confirmationNum: '',
        },
        {
          resultCode: 'C200',
          errorMessage: 'string',
          pnrInfo: {
            pnrRecordLocator: 'AB23C1',
            paxElementId: '3',
            processCategory: '0',
            intlPnrRecordLocator: 'PNR01X',
            paxFamilyName: 'ｿﾗﾉ',
            paxFirstName: ' ﾀﾛｳ',
            groupName: 'GROUP NAME',
            flightDate: '20191212',
            carrierCode: 'NH',
            flightNumber: '12',
          },
        },
      ],
    }

    const currentState = produce(initialState, draft => {
      draft.searchForCeRecord.pnrRecordLocator = 'AB23C1'
      draft.searchForCeRecord.confirmationNum = ''
    })

    const expected = produce(currentState, draft => {
      draft.searchForCeRecord.APRS1002Status = 'COMPLETE'
      draft.searchForCeRecord.pnrInfo = [
        {
          pnrRecordLocator: 'AB23C1',
          paxElementId: '3',
          processCategory: '0',
          intlPnrRecordLocator: 'PNR01X',
          paxFamilyName: 'ｿﾗﾉ',
          paxFirstName: ' ﾀﾛｳ',
          groupName: 'GROUP NAME',
          flightDate: '20191212',
          carrierCode: 'NH',
          flightNumber: '12',
        },
      ]
    })

    expect(reducer(currentState, action)).toEqual(expected)
  })
})

describe('search.APRS1002.Status', () => {
  test('COMPLETE を INITIAL に変えられる', () => {
    const action: ValueOf<Action> = {
      type: 'search.APRS1002.Status',
    }

    const currentState = produce(initialState, draft => {})

    const expected = produce(currentState, draft => {
      draft.searchForCeRecord.APRS1002Status = 'INITIAL'
    })

    expect(reducer(currentState, action)).toEqual(expected)
  })
})

describe('search.APRS1002.Error', () => {
  test('国内予約情報はキープしたまま ERROR 状態にできる', () => {
    const action: ValueOf<Action> = {
      type: 'search.APRS1002.Error',
      payload: [
        {
          pnrRecordLocator: '',
          flightTicketNum: '',
        },
        new Error('booo'),
      ],
      error: true,
    }

    const currentState = produce(initialState, draft => {})

    const expected = produce(currentState, draft => {
      draft.searchForCeRecord.APRS1002Status = 'ERROR'
      draft.ui.blockingMessages = [
        {
          key: expect.anything(),
          title: 'エラーが発生しました',
          subText: '不明なエラーです。',
          type: 'error',
        },
      ]
    })

    expect(reducer(currentState, action)).toEqual(expected)
  })
})
