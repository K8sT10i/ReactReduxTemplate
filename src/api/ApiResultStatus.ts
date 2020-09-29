/**
 * API
 */
type ApiResultStatus = {
  resultCode: ResultCode
  errorMessage?: string
}
export default ApiResultStatus

export type ResultCode = 'C200' | 'C410' | 'C413' | 'C613'
