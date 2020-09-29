/**
 * SVZP0002
 */
import ApiResultStatus from '../ApiResultStatus'

export type Mapping = {
  '/portal/api/v1/InitData': [ApiParameter, ApiResultData]
}

export type ApiParameter = {}

export type ApiResultData = ApiResultStatus & {
  userName?: string
  lastLogin: string
  userId: string
  currentBizGroupCode?: string
  currentBizGroupDataList?: BizGroupData[]
  codeDataList?: {
    id: string
    value: string
    nameJp: string
    nameEn?: string
    tagKbn?: string
    sortOrder: number
  }[]
  roleDataList?: RoleData[]
  bizGroupDataList?: BizGroupData[]
  itemAuthDataList?: ItemAuthData[]
  propertyDataList?: {
    key: string
    value?: string
  }[]
  categoryDataList?: CategoryData[]
}

export type CategoryData = {
  screenId: string
  categoryId: string
  subCategoryId: string
  nameJp: string
  nameEn: string
}

export type BizGroupData = {
  bizGroupCode: string
  bizGroupNameJp: string
  bizGroupNameEn?: string
  airportCode: string
  CarrierCode: string
  taskNoticeFlg: string
}

export type RoleData = {
  roleId: string
  roleNameJp: string
  roleNameEn?: string
  bizGroupCodeList?: {
    bizGroupCode: string
  }[]
}

export type ItemAuthData = {
  screenId: string
  categoryId: string
  subCategoryId: string
  itemId: string
  itemNameJp: string
  itemNameEn: string
  scopeOfDisclosure: string
  authType?: string
  vipCode?: string
  dmsInt?: string
}
