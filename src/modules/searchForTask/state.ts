import { Status } from '..'

export type SearchForTask = SearchCondition &
  SearchStatus & {
    resultList: ResultInfo[]
  }

export type SearchCondition = {
  crBizGroupCode?: string
  crUserName?: string
  resBizGroupCode?: string
  resStatusName?: string[]
  airCode?: string
  dateType?: 'STDSTA' | 'HANDLING'
  tgtTimeFrom?: string
  tgtTimeTo?: string
  handling?: number
  airFlight?: 'AIR' | 'FLIGHT'

  flightInfoList?: {
    flightCarrierCode: string
    flightNumber: string
  }[]

  scrType?: '1' | '2' | '3'
  crDate?: string
  resStatusList?: string[]
  crDatetime?: string
  depDateFrom?: string
  depDateTo?: string
  ceRecordIdList?: string[]
  searchList: SearchInfo[]
  updType: '0' | '1' | '2' | '3' | undefined
  bizGroupCode: string
  userId: string
  userName: string
  taskTodoInfo: TaskTodoInfo
  updateTaskStatusParam?: UpdateTaskStatusParam
  controlFlgRefreshPage?: boolean
}

export type SearchStatus = {
  APTT1002Status: Status
  APCR1015Status: Status
  APTT1001Status: Status
}

export type SegmentInfo = {
  stNum: string
  ceRecordId?: string
  categoryList?: extServiceCategory[]
}

// タスク・ToDo情報
export type TaskTodoInfo = {
  taskTodoId?: string
  ceRecordId?: string
  pnrRecordLocator?: string
  pnrCrtDate?: string
  firstEotDate?: string
  ptNum?: string
  gtNum?: string
  stNum?: string
  opCarrierCode?: string
  opFlightNum?: string
  mkCarrierCode?: string
  mkFlightNum?: string
  depDate?: string
  depAirCode?: string
  arrAirCode?: string
  std?: string
  sta?: string

  taskTodoDetailInfoList?: TaskTodoDetailInfo[]
}

export type TaskTodoDetailInfo = {
  taskTodoBranchNum?: string
  crBizGroupCode?: string
  crBizGroupName?: string
  crUserName?: string
  crDatetime?: string
  responsibleInfoList?: ResponsibleInfo[]
}

export type ResponsibleInfo = {
  resSeq?: string
  resBizGroupCode?: string
  resBizGroupName?: string
  resStatusCode?: '0' | '1' | '2' | '3' | '4'
  resStatusName?: string
  expDatetime?: string
  commentInfoList?: CommentInfo[]
  relationBranchList?: string[]
}

export type CommentInfo = {
  commentSeq?: string
  comBizGroupCode?: string
  comBizGroupName?: string
  comUserName?: string
  comDetail?: string
  comDateTime?: string
}

export type SearchInfo = {
  pnrRecordLocator?: string
  pnrCreateDate?: string
  firstEOTDate?: string
  ptNum?: string
  gtNum?: string
  searchSegmentList?: SearchSegmentInfo[]
}

export type SearchSegmentInfo = {
  stNum?: string
  ceRecordId?: string
}

export type ExtService = {
  pnrRecordLocator: string
  pnrCreateDate: string
  firstEOTDate: string
  ptNum: string
  gtNum: string
  extServiceInfoList?: SegmentInfo[]
}

export type extServiceCategory = {
  extServiceNo: string
  extServiceNameJp: string
  extServiceNameEn: string
  serviceSection: '0' | '1' | '2' | '3'
}

export type ResBizGroup = {
  resBizGroupCode?: string
  resStatus?: '0' | '1' | '2' | '3' | '4'
  expDateTime?: string
}

export type ResStatusCode = '0' | '1' | '2' | '3' | '4' | undefined
export type UpdateTaskStatusParam = {
  taskTodoId: string
  taskTodoBranchNum: string
  resSeq: string
  resBizGroupCode: string
  resStatusCode: ResStatusCode
}

export type ResultInfo = {
  depDate?: string
  mkCarrierCode?: string
  mkFlightNum?: string
  opCarrierCode?: string
  opFlightNum?: string
  depAirCode?: string
  arrAirCode?: string
  std?: string
  sta?: string
  resultDetailInfoList: ResultDetailInfo[]
}

export type ResultDetailInfo = {
  stNum?: string
  ceRecordId?: string
  taskTodoBranchNum?: string
  crBizGroupCode?: string
  crUserName?: string
  crDatetime?: string
  resBizGroupCode?: string
  resSeq?: string
  expDatetime?: string
  resStatusCode?: '0' | '1' | '2' | '3' | '4'
  commentInfoList?: CommentInfo[]
  categoryList?: Category[]
  taskTodoId?: string
  pnrRecordLocator?: string
  firstEotDate?: string
  pnrCrtDate?: string
  ptNum?: string
  gtNum?: string
}

export type Category = {
  extServiceNo?: string
  extServiceNameJp?: string
  extServiceNameEn?: string
  serviceSection?: '0' | '1' | '2' | '3'
}
