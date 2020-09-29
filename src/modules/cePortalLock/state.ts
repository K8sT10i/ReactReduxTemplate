import { Status } from '..'

export type CePortalLock = {
  ZZEC1001Status: Status
  key: string
  info: string
  infoList?: string[]
  keyList?: string[]
  user: string
  resultLockData?: ResultLockData
}
export type ResultLockData = {
  result?: boolean
  userLocked?: string
}
