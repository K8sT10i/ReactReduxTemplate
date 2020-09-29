/**
 * APMS1002
 */
import ApiResultStatus from '../ApiResultStatus'

export type Mapping = {
  '/portal/api/v1/MySearchQuery': [ApiParameter, ApiResultData]
}

export type ApiParameter = {
  userId: string
  screenId?: string
}

export type ApiResultData = ApiResultStatus & {
  searchPtrnInfoList?: SearchPtrnInfo[]
}
export type SearchPtrnInfo = {
  searchPtrnSeq?: string
  screenId?: string
  searchPtrnName?: string
  searchPtrn?: string
}
