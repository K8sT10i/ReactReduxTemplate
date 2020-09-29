/**
 * APMH1001
 */
import ApiResultStatus from '../ApiResultStatus'

export type Mapping = {
  '/portal/api/v1/ModifyHistoryQuery': [ApiParameter, ApiResultData]
}

export type ApiParameter = {
  ceRecordIdList?: {
    ceRecordId?: string
  }[]
  ceCarrierCode?: string
  ceMemberNum?: string
}

export type ApiResultData = ApiResultStatus & {
  modifyHistoryList: ModifyHistory[]
}

export type ModifyHistory = {
  chgHstId?: string
  categoryId?: string
  chgType?: string
  modifyUserId?: string
  modifyUserName?: string
  ceRecordId?: string
  ceInsertSystemDatetime?: string
}
