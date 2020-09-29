/**
 * ZZGT0001
 */
import ApiResultStatus from '../ApiResultStatus'

export type Mapping = {
  '/portal/api/v1/Common/GoogleTranslation': [ApiParameter, ApiResultData]
}

export type ApiParameter = {
  translationType: string
  translationValueList: string[]
}
export type ApiResultData = ApiResultStatus & {
  translationalResult: { in: string; out: string }[]
}
