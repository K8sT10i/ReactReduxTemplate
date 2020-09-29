import { Status } from '..'
import { BizGroupData } from '../../api/v1/InitData'

export type Login = {
  noticeList: Notice[]

  userName?: string
  bizGroupCode?: string

  userBizGroupList?: BizGroupData[]

  APSN1001Status: Status
  TVLG1002Status: Status
  TVLG1003Status: Status
}

export type Notice = {
  displayDateTime?: string
  noticeSectionName?: string
  noticeContent?: string
}
