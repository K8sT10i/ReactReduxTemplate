import { Status, ModalStatus } from '..'

export type AirportNoticeInfo = {
  updateType: 'M' | 'U' | 'D'
  airportCode: string
  noticeSeqInfoList: NoticeSeqInfoList[]
  APAN1001Status: Status
  APAN1002Status: Status
  noticeSeqInfoListUpdate: NoticeSeqInfoList[]
  noticeSeqInfoListDelete: NoticeSeqInfoDeleteList[]
  showModal: ModalStatus
  noticeMessage: NoticeMessage
}

export type NoticeSeqInfoList = {
  airportNoticeSeq: string
  noticeContent: string
  dispStartDatetime?: string
  dispEndDatetime: string
  updateSystemDateTime: string
}

export type NoticeSeqInfoDeleteList = {
  airportNoticeSeq: string
  updateSystemDateTime: string
}

export type NoticeMessage = {
  // message
  messageFlag: boolean
  messageType: number
  messageContent: string
}
