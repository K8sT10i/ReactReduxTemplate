import ApiResultStatus from '../ApiResultStatus'

export type Mapping = {
  '/portal/api/v1/AirportNoticeInfoQuery': [ApiParameter, ApiResultData]
}

export type ApiParameter = {
  airportCode: string
}

export type ApiResultData = ApiResultStatus & {
  airportCode: string
  noticeSeqInfoList: NoticeSeqInfoList[]
}

export type NoticeSeqInfoList = {
  airportNoticeSeq: string
  noticeContent: string
  dispStartDatetime: string
  dispEndDatetime: string
  updateSystemDateTime: string
}

