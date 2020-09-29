import { Status } from '..'

export type CePortalUnLock = {
  ZZEC1001Status: Status
  key: string
  keyList?: string[]
  user: string
  resultLockData?: ResultLockData
}
export type ResultLockData = {
  result?: boolean
  userLocked?: string
}
