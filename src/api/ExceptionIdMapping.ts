import PathMapping from './PathMapping'
import ApiResultStatus, { ResultCode } from './ApiResultStatus'
import * as ExceptionIdConstants from './ExceptionIdConstants'
import messageMapping from './MessageMapping'

export default function getMessage(
  url: keyof PathMapping,
  data: ApiResultStatus,
) {
  const exceptionIdMapping = exceptionIdMappingList.find(
    v => v.url === url && v.resultCode === data.resultCode,
  )
  const exceptionId = exceptionIdMapping?.exceptionId
  if (!exceptionId) return data.errorMessage

  return messageMapping[exceptionId]
}

type ExceptionIdMapping = {
  url: keyof PathMapping
  resultCode: ResultCode
  exceptionId: keyof typeof messageMapping
}

const exceptionIdMappingList: ExceptionIdMapping[] = [
  {
    url: '/portal/api/v1/CeRecordTopInfoQuery',
    resultCode: 'C410',
    exceptionId: ExceptionIdConstants.EAPCR1001C001,
  },
  {
    url: '/portal/api/v1/CeRecordTopInfoQuery',
    resultCode: 'C413',
    exceptionId: ExceptionIdConstants.EAPCR1001C002,
  },
  {
    url: '/portal/api/v1/TaskTodoQuery',
    resultCode: 'C613',
    exceptionId: ExceptionIdConstants.EAPCR1001C003,
  },
]
