import { INavLinkGroup } from 'office-ui-fabric-react/lib/Nav'
import { MessageBarType } from 'office-ui-fabric-react/lib/MessageBar'
import { Status } from '..'
import { Category } from '../../api/v1/CeRecordExtServiceQuery'
import { ItemAuthData, CategoryData } from '../../api/v1/InitData'

export type Language = 'ja' | 'en'
export type Direction = 'ltr' | 'auto' | 'rtl'
export type PathParams = {
  [key: string]: string | undefined
}

export type UI = {
  appStatus: Status
  loggedIn: boolean
  userId: string
  userName: string
  userBizGroupInfo: BizGroupData
  navIsOpen: boolean
  bizGroupInfo?: BizGroupData
  modalSearchCondition?: boolean
  lang: Language
  dir?: Direction
  title?: string
  navGroups: INavLinkGroup[]
  newNotificationShowModal: boolean
  newNotification: NewNotification
  messages: {
    key: string
    type: keyof typeof MessageBarType
    message: string
  }[]
  blockingMessages: {
    key: string
    title: string
    subText: string
    type?: string
    url?: string
  }[]
  searchTab: SearchTab
  codeDataMap?: CodeDataMap
  categoryDataList?: CategoryData[]
  categoryNameList?: CategoryNameList
  bizGroupList: BizGroupData[]
  roleList: RoleData[]
  itemAuthList?: ItemAuthData[]
  domIntAirportInfoList: string[]
  categoryId?: string
  screenId?: string
  listAuthCategory?: string[]
  APAP1003Status: Status
  ZZAU1001Status?: Status
}

export type CategoryNameList = { [screenId: string]: CategoryName[] }

export type CategoryName = {
  categoryId: string
  subCategoryId: string
  nameJp?: string
  nameEn?: string
}

export type NewNotification = {
  pushUrl?: string
  eventSource?: EventSource
  pushTimer?: number
  itemShowLimit: number
  isPush: boolean
  newNotificationCnt: number
  newNotificationItemList: NewNotificationItem[]
  APTT1002Status: Status
  APCR1015Status: Status
}

export type NewNotificationItem = {
  taskTodoId?: string
  ceRecordId?: string
  depDate?: string
  carrierCode?: string
  flightNum?: string
  depAirCode?: string
  arrAirCode?: string

  pnrRecordLocator?: string
  pnrCrtDate?: string
  firstEotDate?: string
  ptNum?: string
  gtNum?: string
  stNum?: string
  dmsInt: 'D' | 'I'

  taskTodoBrunchNum?: string
  crBizGroupName?: string
  crBizGroupCode?: string
  crUserName?: string
  crDatetime?: string

  resBizGroupSeq?: string
  resBizGroupCode?: string
  resBizGroupName?: string
  resStatusCode?: string
  expDatetime?: string

  categoryList?: Category[]
}

export type SearchTab = 'ceRecord' | 'vip' | 'notice'

export type CodeDataMap = { [id: string]: CodeData[] }

export type CodeData = {
  value: string
  nameJp: string
  nameEn: string
  tagKbn: string
  sortOrder: number
}

export type BizGroupData = {
  bizGroupCode: string
  bizGroupNameJp: string
  bizGroupNameEn?: string
  airportCode: string
  CarrierCode: string
  taskNoticeFlg: string
}

export type RoleData = {
  roleId: string
  roleNameJp: string
  roleNameEn?: string
  bizGroupCodeList?: {
    bizGroupCode: string
  }[]
}
