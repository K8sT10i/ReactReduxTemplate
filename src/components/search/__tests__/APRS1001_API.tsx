import produce from 'immer'
import { reducer, Action } from '../APRS1001_API'
import state from '../../../../stub/data'

const initialState = produce(state, draft => {})

describe('search.APRS1001.Loading', () => {
  test('You can reset the search results to the LOADING state', () => {
    const action: ValueOf<Action> = {
      type: 'search.APRS1001.Loading',
    }

    const currentState = produce(initialState, draft => {})

    const expected = produce(currentState, draft => {
      draft.searchForCeRecord.APRS1001Status = 'LOADING'
      draft.searchForCeRecord.searchFlag = true
    })

    expect(reducer(currentState, action)).toEqual(expected)
  })
})

describe('search.APRS1001.Complete', () => {
  test('You can set international reservation information and put it in COMPLETE state', () => {
    window.open = jest.fn()
    const action: ValueOf<Action> = {
      type: 'search.APRS1001.Complete',
      payload: [
        {
          pnrRecordLocator: '',
          flightTicketNum: '',
        },
        {
          resultCode: 'C200',
          errorMessage: 'string',
          pnrInfo: {
            pnrRecordLocator: 'AB23C1',
            pnrCreationDate: '080119',
            paxElementId: '3',
          },
        },
      ],
    }

    const currentState = produce(initialState, draft => {
      draft.searchForCeRecord.pnrRecordLocator = 'AB23C1'
      draft.searchForCeRecord.confirmationNum = ''
      draft.searchForCeRecord.pnrCreationDate = '080119'
      draft.searchForCeRecord.paxElementId = '3'
    })

    const expected = produce(currentState, draft => {
      draft.searchForCeRecord.APRS1001Status = 'COMPLETE'
      draft.searchForCeRecord.pnrRecordLocator = 'AB23C1'
      draft.searchForCeRecord.confirmationNum = ''
      draft.searchForCeRecord.pnrCreationDate = '080119'
      draft.searchForCeRecord.paxElementId = '3'
    })

    expect(reducer(currentState, action)).toEqual(expected)
    expect(window.open).toBeCalledTimes(1)
    expect(window.open).nthCalledWith(
      1,
      '/ce-record?pnr=AB23C1&pcd=080119&pt=3&lang=J&di=I',
    )
  })
})

describe('search.APRS1001.Status', () => {
  test('COMPLETE can be changed to INITIAL', () => {
    const action: ValueOf<Action> = {
      type: 'search.APRS1001.Status',
    }

    const currentState = produce(initialState, draft => {})

    const expected = produce(currentState, draft => {
      draft.searchForCeRecord.APRS1001Status = 'INITIAL'
    })

    expect(reducer(currentState, action)).toEqual(expected)
  })
})

describe('search.APRS1001.Error', () => {
  test('International reservation information can be kept in ERROR state', () => {
    const action: ValueOf<Action> = {
      type: 'search.APRS1001.Error',
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
      draft.searchForCeRecord.APRS1001Status = 'ERROR'
      draft.ui.blockingMessages = [
        {
          key: expect.anything(),
          title: 'TEST',
          subText: 'TEST',
          type: 'error',
        },
      ]
    })

    expect(reducer(currentState, action)).toEqual(expected)
  })
})
