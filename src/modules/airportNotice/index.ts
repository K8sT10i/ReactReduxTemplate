import { Reducer, Status, ModalStatus } from '..'
import {
  AirportNoticeInfo,
  NoticeSeqInfoList,
  NoticeSeqInfoDeleteList,
} from './state'

export * from './state'

export type AirportNoticeAction = {
  SetStatusAPAN1001: {
    type: 'AirportNotice.SetStatusAPAN1001'
    payload: {
      APAN1001Status?: Status
    }
  }
  ClearNoticeList: {
    type: 'AirportNotice.ClearNoticeList'
  }
  SetListNoticeDelete: {
    type: 'AirportNotice.SetListNoticeDelete'
    payload: {
      noticeSeqInfoListDelete: NoticeSeqInfoDeleteList[]
    }
  }
  ShowNoticeModal: {
    type: 'AirportNotice.ShowNoticeModal'
    payload: ModalStatus
  }
  SetAirportCode: {
    type: 'AirportNotice.SetAirportCode'
    payload: {
      airportCode: string
      APAN1001Status: Status
      clearList?: NoticeSeqInfoList[]
    }
  }
  SetAirportNoticeInfoUpdate: {
    type: 'AirportNotice.SetAirportNoticeInfoUpdate'
    payload: {
      APAN1002Status: Status
      updateType: 'M' | 'U' | 'D'
      airportCode: string
      noticeSeqInfoListUpdate: NoticeSeqInfoList[]
    }
  }
  SetAirportNoticeInfoDelete: {
    type: 'AirportNotice.SetAirportNoticeInfoDelete'
    payload: {
      APAN1002Status: Status
      updateType: 'M' | 'U' | 'D'
      airportCode: string
      noticeSeqInfoListDelete: NoticeSeqInfoDeleteList[]
    }
  }
}

const reducer: Reducer<
  AirportNoticeInfo,
  ValueOf<AirportNoticeAction>
> = function(
  notice = {
    airportCode: '',
    updateType: 'M',
    noticeSeqInfoList: [],
    APAN1001Status: 'INITIAL',
    APAN1002Status: 'INITIAL',
    noticeSeqInfoListUpdate: [],
    noticeSeqInfoListDelete: [],
    showModal: 'HIDDEN',
    noticeMessage: {
      messageContent: '',
      messageFlag: false,
      messageType: 1,
    },
  },
  action,
  state,
) {
  switch (action.type) {
    case 'AirportNotice.SetStatusAPAN1001': {
      const { payload: status } = action
      return {
        ...notice,
        ...status,
      }
    }
    case 'AirportNotice.ClearNoticeList': {
      return {
        ...notice,
        noticeSeqInfoList: [],
        noticeSeqInfoListDelete: [],
      }
    }
    case 'AirportNotice.ShowNoticeModal': {
      const { payload: showModal } = action
      return {
        ...notice,
        showModal,
      }
    }
    case 'AirportNotice.SetListNoticeDelete': {
      const { payload: data } = action
      return {
        ...notice,
        noticeSeqInfoListDelete: data.noticeSeqInfoListDelete,
      }
    }
    case 'AirportNotice.SetAirportCode': {
      const {
        payload: { airportCode, APAN1001Status, clearList },
      } = action
      return {
        ...notice,
        airportCode,
        noticeSeqInfoList: clearList || notice.noticeSeqInfoList,
        APAN1001Status,
      }
    }
    case 'AirportNotice.SetAirportNoticeInfoDelete': {
      const {
        payload: {
          APAN1002Status,
          updateType,
          airportCode,
          noticeSeqInfoListDelete,
        },
      } = action
      return {
        ...notice,
        APAN1002Status,
        updateType,
        airportCode,
        noticeSeqInfoListDelete,
      }
    }
    case 'AirportNotice.SetAirportNoticeInfoUpdate': {
      const {
        payload: {
          APAN1002Status,
          updateType,
          airportCode,
          noticeSeqInfoListUpdate,
        },
      } = action
      const newDataList: NoticeSeqInfoList[] = []
      noticeSeqInfoListUpdate.forEach(v => {
        const newData: NoticeSeqInfoList = {
          airportNoticeSeq: '',
          noticeContent: '',
          dispStartDatetime: '',
          dispEndDatetime: '',
          updateSystemDateTime: '',
        }
        newData.airportNoticeSeq = v.airportNoticeSeq
        newData.dispEndDatetime = v.dispEndDatetime
        newData.dispStartDatetime = v.dispStartDatetime
        newData.noticeContent = v.noticeContent
        newData.updateSystemDateTime = v.updateSystemDateTime
        newDataList.push(newData)
      })
      return {
        ...notice,
        APAN1002Status,
        updateType,
        airportCode,
        noticeSeqInfoListUpdate: newDataList,
      }
    }
    default: {
      // const _: never = action
      return notice
    }
  }
}
export default reducer
