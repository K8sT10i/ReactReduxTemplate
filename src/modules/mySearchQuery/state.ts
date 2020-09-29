import { Status } from '..'

export type MySearch = {
  userId: string
  APMS1002Status: Status
  searchPtrnInfo: SearchPtrnInfo[]
}
export type SearchPtrnInfo = {
  searchPtrnSeq: string
  screenId: string
  searchPtrnName: string
  searchPtrn: string
}
