import { UI } from '../../src/modules/ui'

export const ui: UI = {
  appStatus: 'INITIAL',
  loggedIn: true,
  userId: '',
  userName: '',
  userBizGroupInfo: {
    bizGroupCode: '',
    bizGroupNameJp: '',
    bizGroupNameEn: '',
    airportCode: '',
    CarrierCode: '',
    taskNoticeFlg: '',
  },
  navIsOpen: false,
  navGroups: [],
  lang: 'ja',
  newNotificationShowModal: false,
  newNotification: {
    itemShowLimit: 5,
    isPush: false,
    newNotificationCnt: 0,
    newNotificationItemList: [],
    APTT1002Status: 'INITIAL',
    APCR1015Status: 'INITIAL',
  },
  messages: [],
  blockingMessages: [],
  bizGroupList: [],
  roleList: [],
  searchTab: 'ceRecord',
  domIntAirportInfoList: [],
  APAP1003Status: 'INITIAL',
  ZZAU1001Status: 'INITIAL',
}

export default ui
