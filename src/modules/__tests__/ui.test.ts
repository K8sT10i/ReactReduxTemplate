import ui, { UI } from '../ui'

const initialState: UI = {
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
  bizGroupList: [],
  roleList: [],
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
  searchTab: 'ceRecord',
  domIntAirportInfoList: [],
  APAP1003Status: 'INITIAL',
}

describe('UI.SetLang', () => {
  test.each([
    ['ja'], //
    ['en'],
  ])('%p', lang => {
    const nextState = ui(
      {
        ...initialState,
      },
      {
        type: 'UI.SetLang',
        payload: lang as 'ja' | 'en',
      },
    )

    const expected: UI = {
      ...initialState,
      lang: lang as 'ja' | 'en',
    }

    expect(nextState).toEqual(expected)
  })
})
