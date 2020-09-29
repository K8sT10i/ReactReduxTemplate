import produce from 'immer'
import { Action, reducer } from '../APAN1001_API'
import state from '../../../../stub/data'

test('airportNotice.APAN1001.Loading', () => {
  const action: ValueOf<Action> = {
    type: 'airportNotice.APAN1001.Loading',
  }

  const currentState = produce(state, draft => {
    draft.airportNoticeInfo.APAN1001Status = 'NEED_TO_REFRESH'
  })
  const expected = produce(currentState, draft => {
    draft.airportNoticeInfo.APAN1001Status = 'LOADING'
  })

  expect(reducer(currentState, action)).toEqual(expected)
})

test('airportNotice.APAN1001.Complete', () => {
  const action: ValueOf<Action> = {
    type: 'airportNotice.APAN1001.Complete',
    payload: {
      resultCode: 'C200',
      errorMessage: 'API return message',
      airportCode: 'HND',
      noticeSeqInfoList: [
        {
          airportNoticeSeq: '12345671',
          noticeContent: 'TEST',
          dispStartDatetime: '2019/10/10 13:23',
          dispEndDatetime: '2020/11/10 13:23',
          updateSystemDateTime: '2020/11/10 13:23',
        },
        {
          airportNoticeSeq: '12345672',
          noticeContent: 'TEST',
          dispStartDatetime: '2019/10/10 13:23',
          dispEndDatetime: '2020/11/10 13:23',
          updateSystemDateTime: '2020/11/10 13:23',
        },
        {
          airportNoticeSeq: '12345673',
          noticeContent: 'TEST',
          dispStartDatetime: '2019/10/10 13:23',
          dispEndDatetime: '2020/11/10 13:23',
          updateSystemDateTime: '2020/11/10 13:23',
        },
      ],
    },
  }

  const currentState = produce(state, draft => {
    draft.airportNoticeInfo.APAN1001Status = 'LOADING'
    draft.airportNoticeInfo.noticeSeqInfoList = []
  })
  const expected = produce(currentState, draft => {
    draft.airportNoticeInfo.APAN1001Status = 'COMPLETE'
    draft.airportNoticeInfo.noticeSeqInfoList = [
      {
        airportNoticeSeq: '12345671',
        noticeContent: 'TEST',
        dispStartDatetime: '2019/10/10 13:23',
        dispEndDatetime: '2020/11/10 13:23',
        updateSystemDateTime: '2020/11/10 13:23',
      },
      {
        airportNoticeSeq: '12345672',
        noticeContent: 'TEST',
        dispStartDatetime: '2019/10/10 13:23',
        dispEndDatetime: '2020/11/10 13:23',
        updateSystemDateTime: '2020/11/10 13:23',
      },
      {
        airportNoticeSeq: '12345673',
        noticeContent: 'TEST',
        dispStartDatetime: '2019/10/10 13:23',
        dispEndDatetime: '2020/11/10 13:23',
        updateSystemDateTime: '2020/11/10 13:23',
      },
    ]
  })
  expect(reducer(currentState, action)).toEqual(expected)
})

test('airportNotice.APAN1001.Error', () => {
  const action: ValueOf<Action> = {
    type: 'airportNotice.APAN1001.Error',
    payload: {
      message: 'API return message',
      name: 'Error name',
    },
    error: true,
  }

  const currentState = produce(state, draft => {
    draft.airportNoticeInfo.APAN1001Status = 'LOADING'
  })

  const expected = produce(currentState, draft => {
    draft.airportNoticeInfo.APAN1001Status = 'ERROR'
    draft.airportNoticeInfo.noticeMessage = {
      messageContent: expect.anything(),
      messageType: 1,
      messageFlag: true,
    }
  })

  expect(reducer(currentState, action)).toEqual(expected)
})

// test.todo('search.APAN1001.Error')
