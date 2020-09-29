/**
 * APMS1001
 */
import ApiResultStatus from '../ApiResultStatus'

export type Mapping = {
  '/portal/api/v1/MySearchUpdate': [ApiParameter, ApiResultData]
}

export type ApiParameter = {
  updateType: string
  userId?: string
  screenId?: string
  searchPtrnSeq?: string
  searchPtrnName?: string
  searchPtrn?: string
}

export type ApiResultData = ApiResultStatus
