import { Status } from '..'

export type ModifySearch = {
  updateType: string
  screenId: string
  searchPtrnSeq: string
  searchPtrnName: string
  searchPtrn: string
  APMS1001Status?: Status
}
