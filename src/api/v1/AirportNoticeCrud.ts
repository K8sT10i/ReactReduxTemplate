import ApiResultStatus from '../ApiResultStatus'

export type Mapping = {
  '/portal/api/v1/AirportNoticeCrud': [ApiParameter, ApiResultData]
}

export type ApiParameter = {
  airportCode: string
  updateType: string
  noticeSeqInfoList: NoticeSeqInfoList[]
}
export type NoticeSeqInfoList = {
  airportNoticeSeq: string
  noticeContent: string
  dispStartDatetime: string
  dispEndDatetime: string
  updateSystemDateTime: string
}
export type ApiResultData = ApiResultStatus
