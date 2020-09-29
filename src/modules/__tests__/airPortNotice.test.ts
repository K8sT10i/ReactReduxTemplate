import produce from 'immer'
import airportNotice, {
  AirportNoticeInfo,
  AirportNoticeAction,
} from '../airportNotice'

const initialState: AirportNoticeInfo = {
  updateType: 'M',
  airportCode: '',
  noticeSeqInfoList: [],
  APAN1001Status: 'INITIAL',
  APAN1002Status: 'INITIAL',
  noticeSeqInfoListUpdate: [],
  noticeSeqInfoListDelete: [],
  showModal: 'HIDDEN',
  noticeMessage: {
    messageFlag: false,
    messageType: 1,
    messageContent: '',
  },
}

describe('AirportNotice.ClearNoticeList', () => {
  test('AirportNotice.ClearNoticeList', () => {
    const action: ValueOf<AirportNoticeAction> = {
      type: 'AirportNotice.ClearNoticeList',
    }

    const currentState = produce(initialState, draft => {
      draft.noticeSeqInfoList = [
        {
          airportNoticeSeq: '12345671',
          noticeContent: 'TEST01',
          dispStartDatetime: '2019/10/10 13:23',
          dispEndDatetime: '2020/11/10 13:23',
          updateSystemDateTime: '2020/2/10 13:23',
        },
        {
          airportNoticeSeq: '12345672',
          noticeContent: 'TEST02',
          dispStartDatetime: '2019/10/10 13:23',
          dispEndDatetime: '2020/11/10 13:23',
          updateSystemDateTime: '2020/2/10 13:23',
        },
      ]
      draft.noticeSeqInfoListDelete = [
        {
          airportNoticeSeq: '12345672',
          updateSystemDateTime: '2020/2/10 13:23',
        },
      ]
    })
    const expected = produce(currentState, draft => {
      draft.noticeSeqInfoList = []
      draft.noticeSeqInfoListDelete = []
    })

    expect(airportNotice(currentState, action)).toEqual(expected)
  })
})

describe('AirportNotice.ShowNoticeModal', () => {
  test('キAirportNotice.ShowNoticeModal', () => {
    const action: ValueOf<AirportNoticeAction> = {
      type: 'AirportNotice.ShowNoticeModal',
      payload: 'UPDATE',
    }

    const currentState = produce(initialState, draft => {
      draft.showModal = 'HIDDEN'
    })
    const expected = produce(currentState, draft => {
      draft.showModal = 'UPDATE'
    })

    expect(airportNotice(currentState, action)).toEqual(expected)
  })
})

describe('AirportNotice.SetAirportCode', () => {
  test('キAirportNotice.SetAirportCode', () => {
    const action: ValueOf<AirportNoticeAction> = {
      type: 'AirportNotice.SetAirportCode',
      payload: {
        APAN1001Status: 'NEED_TO_REFRESH',
        airportCode: 'HND',
      },
    }

    const currentState = produce(initialState, draft => {
      draft.APAN1001Status = 'COMPLETE'
      draft.airportCode = 'AGP'
    })
    const expected = produce(currentState, draft => {
      draft.APAN1001Status = 'NEED_TO_REFRESH'
      draft.airportCode = 'HND'
    })

    expect(airportNotice(currentState, action)).toEqual(expected)
  })
})

describe('AirportNotice.SetListNoticeDelete', () => {
  test('キAirportNotice.SetListNoticeDelete', () => {
    const action: ValueOf<AirportNoticeAction> = {
      type: 'AirportNotice.SetListNoticeDelete',
      payload: {
        noticeSeqInfoListDelete: [
          {
            airportNoticeSeq: '12345672',
            updateSystemDateTime: '2020/2/10 13:23',
          },
          {
            airportNoticeSeq: '12345673',
            updateSystemDateTime: '2020/2/10 13:23',
          },
        ],
      },
    }

    const currentState = produce(initialState, draft => {
      draft.noticeSeqInfoListDelete = [
        {
          airportNoticeSeq: '12345671',
          updateSystemDateTime: '2020/2/10 13:23',
        },
      ]
    })
    const expected = produce(currentState, draft => {
      draft.noticeSeqInfoListDelete = [
        {
          airportNoticeSeq: '12345672',
          updateSystemDateTime: '2020/2/10 13:23',
        },
        {
          airportNoticeSeq: '12345673',
          updateSystemDateTime: '2020/2/10 13:23',
        },
      ]
    })

    expect(airportNotice(currentState, action)).toEqual(expected)
  })
})

describe('AirportNotice.SetAirportNoticeInfoDelete', () => {
  test('キAirportNotice.SetAirportNoticeInfoDelete', () => {
    const action: ValueOf<AirportNoticeAction> = {
      type: 'AirportNotice.SetAirportNoticeInfoDelete',
      payload: {
        airportCode: 'HND',
        APAN1002Status: 'NEED_TO_REFRESH',
        noticeSeqInfoListDelete: [
          {
            airportNoticeSeq: '12345671',
            updateSystemDateTime: '2020/2/10 13:23',
          },
          {
            airportNoticeSeq: '12345672',
            updateSystemDateTime: '2020/2/10 13:23',
          },
        ],
        updateType: 'D',
      },
    }

    const currentState = produce(initialState, draft => {
      draft.airportCode = 'HND'
      draft.APAN1002Status = 'NEED_TO_REFRESH'
      draft.noticeSeqInfoListDelete = [
        {
          airportNoticeSeq: '12345671',
          updateSystemDateTime: '2020/2/10 13:23',
        },
      ]
      draft.updateType = 'D'
    })
    const expected = produce(currentState, draft => {
      draft.airportCode = 'HND'
      draft.APAN1002Status = 'NEED_TO_REFRESH'
      draft.noticeSeqInfoListDelete = [
        {
          airportNoticeSeq: '12345671',
          updateSystemDateTime: '2020/2/10 13:23',
        },
        {
          airportNoticeSeq: '12345672',
          updateSystemDateTime: '2020/2/10 13:23',
        },
      ]
      draft.updateType = 'D'
    })

    expect(airportNotice(currentState, action)).toEqual(expected)
  })
})

describe('AirportNotice.SetAirportNoticeInfoUpdate', () => {
  test('キAirportNotice.SetAirportNoticeInfoUpdate', () => {
    const action: ValueOf<AirportNoticeAction> = {
      type: 'AirportNotice.SetAirportNoticeInfoUpdate',
      payload: {
        airportCode: 'HND',
        APAN1002Status: 'NEED_TO_REFRESH',
        noticeSeqInfoListUpdate: [
          {
            airportNoticeSeq: '12345671',
            noticeContent: 'TEST03',
            dispStartDatetime: '2019/10/10 13:23',
            dispEndDatetime: '2020/11/10 13:23',
            updateSystemDateTime: '2020/2/10 13:23',
          },
          {
            airportNoticeSeq: '12345672',
            noticeContent: 'TEST04',
            dispStartDatetime: '2019/10/10 13:23',
            dispEndDatetime: '2020/11/10 13:23',
            updateSystemDateTime: '2020/2/10 13:23',
          },
        ],
        updateType: 'U',
      },
    }

    const currentState = produce(initialState, draft => {
      draft.airportCode = 'HND'
      draft.APAN1002Status = 'NEED_TO_REFRESH'
      draft.noticeSeqInfoListUpdate = [
        {
          airportNoticeSeq: '12345671',
          noticeContent: 'TEST05',
          dispStartDatetime: '2019/10/10 13:23',
          dispEndDatetime: '2020/11/10 13:23',
          updateSystemDateTime: '2020/2/10 13:23',
        },
      ]
      draft.updateType = 'M'
    })
    const expected = produce(currentState, draft => {
      draft.airportCode = 'HND'
      draft.APAN1002Status = 'NEED_TO_REFRESH'
      draft.noticeSeqInfoListUpdate = [
        {
          airportNoticeSeq: '12345671',
          noticeContent: 'TEST06',
          dispStartDatetime: '2019/10/10 13:23',
          dispEndDatetime: '2020/11/10 13:23',
          updateSystemDateTime: '2020/2/10 13:23',
        },
        {
          airportNoticeSeq: '12345672',
          noticeContent: 'TEST07',
          dispStartDatetime: '2019/10/10 13:23',
          dispEndDatetime: '2020/11/10 13:23',
          updateSystemDateTime: '2020/2/10 13:23',
        },
      ]
      draft.updateType = 'U'
    })

    expect(airportNotice(currentState, action)).toEqual(expected)
  })
})
