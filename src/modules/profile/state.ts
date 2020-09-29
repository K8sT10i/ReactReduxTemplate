import { Status } from '..'

export type Profile = {
  flightDate: string
  ceCarrierCode?: string
  ceMemberNum?: string
  pnrRecordLocator?: string
  segmentCarrierCode?: string
  flightNum?: string
  paxFamilyName?: string
  paxFirstName?: string
  domInt: 'D' | 'I'
  custSttsCod?: string

  APVP1004Status: Status
  basicInfo?: BasicInfo

  APAP1001Status: Status
  APAP1002Status: Status
  airportCode: string
  airportInfoMap: { [key: string]: AirportInfo | undefined }
  errorInfo?: ErrorInfo
  editingAirportInfo?: boolean
}

export type BasicInfo = {
  memberNo?: string

  ableDNam?: string
  ableINam?: string
  knjNam?: string
  birtYmd?: string
  sexCod?: 'F' | 'M'

  kanaRmks?: string
  kanaVipCmnt?: string

  psptNo?: string
  issuCtry?: string
  psptRgstCtry?: string
  psptValdYmd?: string

  vipCod?: '*' | 'V1' | 'C1' | 'V2' | 'C2' | 'V3' | 'C3'

  offcNam?: string
  offcSectNam?: string
  offcDeptNam?: string

  crmOffcNam?: string
  crmOffcSectNam?: string
  crmOffcDeptNam?: string

  homeTelNo?: string
  offcTelNo?: string
  mbilTelNo?: string

  homeEmailAddr?: string
  offcEmailAddr?: string
  mbilEmailAddr?: string

  crcdKindCod?: string

  prmrSttsCod?: string

  thisPlutSttsCod?: string

  nextPlutSttsCod?: string

  ancdKindCod?: string

  hcKindCod1?: string

  hcKindCod2?: string

  hcKindCod3?: string

  hcKindCod4?: string

  hcKindCod5?: string

  convGiveType?: string

  memInfUpdateTime?: string
}

export type AirportInfo = {
  carrCode: string
  memberNum: string
  airportCode: string
  airportVipInfoItemList: string[]
  airportVipMemberInfoNameList: string[]
  updateSystemDateTime: string
}

export type ErrorInfo = {
  reason: 'NOT_FOUND' | 'DUPLICATE' | 'STALE_INPUT' | 'UNKNOWN_UPDATE_TYPE'
  data: {
    updateType: 'CREATE' | 'UPDATE' | 'DELETE'
    carrCode: string
    memberNum: string
    airportCode: string
    updateSystemDateTime?: string
    airportVipInfoItemList?: string[]
  }
}

type LocalDateTime = string
