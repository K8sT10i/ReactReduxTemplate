import produce from 'immer'
import { reducer, Action } from '../APAP1003_API'
import stub from '../../../../stub/data'

const initialState = produce(stub, draft => {
  draft.ui = {
    appStatus: 'COMPLETE',
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
    loggedIn: true,
    lang: 'ja',
    navIsOpen: false,
    navGroups: [],
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
})

describe('app.APAP1003.Loading', () => {
  test('Can change NEED_TO_REFRESH to LOADING', () => {
    const action: ValueOf<Action> = {
      type: 'app.APAP1003.Loading',
    }

    const currentState = produce(initialState, draft => {
      draft.ui = {
        appStatus: 'COMPLETE',
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
        loggedIn: true,
        lang: 'ja',
        navIsOpen: false,
        navGroups: [],
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
    })

    const expected = produce(currentState, draft => {
      draft.ui.APAP1003Status = 'LOADING'
    })

    expect(reducer(currentState, action)).toEqual(expected)
  })
})

describe('app.APAP1003.Loading', () => {
  test('ResultData can be set to state to COMPLETE', () => {
    const action: ValueOf<Action> = {
      type: 'app.APAP1003.Complete',
      payload: {
        resultCode: 'C200',
        domIntAirportInfoList: ['ABZ', 'ADB', 'ADD', 'AGP', 'AGU'],
      },
    }

    const currentState = produce(initialState, draft => {
      draft.ui = {
        appStatus: 'COMPLETE',
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
        loggedIn: true,
        lang: 'ja',
        navIsOpen: false,
        navGroups: [],
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
        APAP1003Status: 'LOADING',
      }
    })

    const expected = produce(currentState, draft => {
      draft.ui.APAP1003Status = 'COMPLETE'
      draft.ui.domIntAirportInfoList = [
        'ABZ',
        'ADB',
        'ADD',
        'AGP',
        'AGU',
        'AKJ',
      ]
    })

    expect(reducer(currentState, action)).toEqual(expected)
  })

  describe('app.APAP1003.Error', () => {
    test('Data cannot be obtained and an error occurs', () => {
      const action: ValueOf<Action> = {
        type: 'app.APAP1003.Error',
        payload: {
          resultCode: 'C500',
          errorMessage: 'string',
        },
        error: true,
      }

      const currentState = produce(initialState, draft => {
        draft.ui = {
          appStatus: 'COMPLETE',
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
          loggedIn: true,
          lang: 'ja',
          navIsOpen: false,
          navGroups: [],
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
          APAP1003Status: 'LOADING',
        }
      })

      const expected = produce(currentState, draft => {
        draft.ui.APAP1003Status = 'ERROR'
        draft.ui.messages = [
          {
            key: expect.anything(),
            message: 'TEST',
            type: 'error',
          },
        ]
      })

      expect(reducer(currentState, action)).toEqual(expected)
    })
  })
})
