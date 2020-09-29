import { HTTPError } from 'ky'
import { INavLinkGroup } from 'office-ui-fabric-react/lib/Nav'
import { MessageBarType } from 'office-ui-fabric-react/lib/MessageBar'
import produce from 'immer'
import { Reducer, Status } from '..'
import { random } from '../../util'
import { Language, UI, SearchTab, NewNotification } from './state'
import { BizGroupData, RoleData } from '../../api/v1/InitData'
import { MZPZZMG00C052 } from '../../util/MessageIdConstants'

export * from './state'

export type UIAction = {
  SetAppStatus: {
    type: 'UI.SetAppStatus'
    payload: Status
  }

  SetLogin: {
    type: 'UI.SetLogin'
    payload: boolean
  }

  SetModalSearchConditionShow: {
    type: 'UI.SetModalSearchConditionShow'
    payload: boolean
  }

  SetNavIsOpen: {
    type: 'UI.SetNavIsOpen'
    payload: boolean
  }

  SetUserId: {
    type: 'UI.SetUserId'
    payload: string
  }

  SetUserNamen: {
    type: 'UI.SetUserName'
    payload: string
  }

  SetBizGroupInfo: {
    type: 'UI.SetBizGroupInfo'
    payload: BizGroupData | undefined
  }

  SetRoleInfo: {
    type: 'UI.SetRoleInfo'
    payload: RoleData | undefined
  }

  SetTitle: {
    type: 'UI.SetTitle'
    payload: string
  }

  SetLang: {
    type: 'UI.SetLang'
    payload: Language
  }

  SetNavGroups: {
    type: 'UI.SetNavGroups'
    payload: INavLinkGroup[]
  }

  SetNewNotificationAPTT1002Status: {
    type: 'UI.SetNewNotificationAPTT1002Status'
    payload: Status
  }

  SetNewNotificationShowModal: {
    type: 'UI.SetNewNotificationShowModal'
    payload: boolean
  }

  SetNewNotificationPushUrl: {
    type: 'UI.SetNewNotificationPushUrl'
    payload: string
  }

  SetNewNotificationPush: {
    type: 'UI.SetNewNotificationPush'
    payload: EventSource | undefined
  }

  SetNewNotificationPushTimer: {
    type: 'UI.SetNewNotificationPushTimer'
    payload: number | undefined
  }

  SetNewNotificationCount: {
    type: 'UI.SetNewNotificationCount'
    payload: number
  }

  SetNewNotification: {
    type: 'UI.SetNewNotification'
    payload: NewNotification
  }

  AddMessage: {
    type: 'UI.AddMessage'
    payload: {
      type: keyof typeof MessageBarType
      message: string
    }
  }

  RemoveMessage: {
    type: 'UI.RemoveMessage'
    payload: string
  }

  AddBlockingMessage: {
    type: 'UI.AddBlockingMessage'
    payload: {
      title: string
      subText: string
      type?: string
    }
  }

  RemoveBlockingMessage: {
    type: 'UI.RemoveBlockingMessage'
    payload: string
  }

  SetSearchTab: {
    type: 'UI.SetSearchTab'
    payload: SearchTab
  }
  SetScreenId: {
    type: 'UI.SetScreenId'
    payload: string
  }
  SetItemAuthority: {
    type: 'UI.SetItemAuthority'
    payload: Status
  }
  SetListAuthCategory: {
    type: 'UI.SetListAuthCategory'
    payload: string[]
  }
}

const reducer: Reducer<UI, ValueOf<UIAction>> = function(
  ui = {
    appStatus: 'INITIAL',
    loggedIn: false,
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
    modalSearchCondition: false,
    navIsOpen: false,
    lang: 'ja',
    dir: 'ltr',
    navGroups: [],
    roleList: [],
    messages: [],
    blockingMessages: [],
    newNotificationShowModal: false,
    newNotification: {
      itemShowLimit: 5,
      isPush: false,
      newNotificationCnt: 0,
      newNotificationItemList: [],
      APTT1002Status: 'INITIAL',
      APCR1015Status: 'INITIAL',
    },
    bizGroupList: [],
    searchTab: 'ceRecord',
    domIntAirportInfoList: [],
    itemAuthList: [],
    APAP1003Status: 'INITIAL',
  },
  action,
  state,
) {
  if (isErrorAction(action)) {
    // TODO err オブジェクトの取得方法を考える必要あり
    // const [, err] = anyAction.payload
    const err = action.payload

    if (err instanceof Array) {
      // ToDo　findで記述できるように記述にする
      let e
      err.forEach(v => {
        if (v instanceof HTTPError) {
          e = v
        }
      })

      if (e instanceof HTTPError) {
        const unauthorized = e.response.status === 401
        // システム例外発生時はセッションが破棄されて未認証状態に戻ってしまう
        const internalServerError = e.response.status >= 500
        if (unauthorized || internalServerError) {
          if (
            ui.messages.find(v => v.message === MZPZZMG00C052) === undefined
          ) {
            return {
              ...ui,
              loggedIn: false,
              messages: [
                ...ui.messages,
                {
                  key: random(),
                  type: 'error',
                  message: MZPZZMG00C052,
                },
              ],
            }
          }
          return {
            ...ui,
            loggedIn: false,
            messages: [...ui.messages],
          }
        }
      }
    }

    if (err instanceof HTTPError) {
      const unauthorized = err.response.status === 401
      // システム例外発生時はセッションが破棄されて未認証状態に戻ってしまう
      const internalServerError = err.response.status >= 500
      if (unauthorized || internalServerError) {
        if (ui.messages.find(v => v.message === MZPZZMG00C052) === undefined) {
          return {
            ...ui,
            loggedIn: false,
            messages: [
              ...ui.messages,
              {
                key: random(),
                type: 'error',
                message: MZPZZMG00C052,
              },
            ],
          }
        }
        return {
          ...ui,
          loggedIn: false,
          messages: [...ui.messages],
        }
      }
    }
  }

  switch (action.type) {
    case 'UI.SetAppStatus': {
      const { payload: appStatus } = action
      return {
        ...ui,
        appStatus,
      }
    }

    case 'UI.SetLogin': {
      const { payload: loggedIn } = action
      return {
        ...ui,
        loggedIn,
      }
    }

    case 'UI.SetModalSearchConditionShow': {
      const { payload: modalSearchCondition } = action
      return {
        ...ui,
        modalSearchCondition,
      }
    }

    case 'UI.SetNavIsOpen': {
      const { payload: navIsOpen } = action
      return {
        ...ui,
        navIsOpen,
      }
    }

    case 'UI.SetUserId': {
      const { payload: userId } = action
      return {
        ...ui,
        userId,
      }
    }

    case 'UI.SetUserName': {
      const { payload: userName } = action
      return {
        ...ui,
        userName,
      }
    }

    case 'UI.SetBizGroupInfo': {
      const { payload: bizGroupInfo } = action
      return {
        ...ui,
        bizGroupInfo,
      }
    }

    case 'UI.SetRoleInfo': {
      const { payload: roleInfo } = action
      return {
        ...ui,
        roleInfo,
      }
    }

    case 'UI.SetTitle': {
      const { payload: title } = action
      return {
        ...ui,
        title,
      }
    }

    case 'UI.SetLang': {
      const { payload: lang } = action
      return {
        ...ui,
        lang,
      }
    }

    case 'UI.SetNavGroups': {
      const { payload: navGroups } = action
      return {
        ...ui,
        navGroups,
      }
    }

    case 'UI.SetNewNotificationAPTT1002Status': {
      const { payload: APTT1002Status } = action
      return produce(ui, draft => {
        draft.newNotification.APTT1002Status = APTT1002Status
        draft.newNotification.APCR1015Status = 'INITIAL'
      })
    }

    case 'UI.SetNewNotificationShowModal': {
      const { payload: newNotificationShowModal } = action
      return {
        ...ui,
        newNotificationShowModal,
      }
    }

    case 'UI.SetNewNotificationPushUrl': {
      const { payload: url } = action
      return produce(ui, draft => {
        draft.newNotification.pushUrl = url
      })
    }

    case 'UI.SetNewNotificationPush': {
      const { payload: eventSource } = action
      return produce(ui, draft => {
        draft.newNotification.eventSource = eventSource
      })
    }

    case 'UI.SetNewNotificationPushTimer': {
      const { payload: pushTimer } = action
      return produce(ui, draft => {
        draft.newNotification.pushTimer = pushTimer
      })
    }

    case 'UI.SetNewNotificationCount': {
      const { payload: count } = action
      return produce(ui, draft => {
        draft.newNotification.newNotificationCnt = count
      })
    }

    case 'UI.SetNewNotification': {
      const { payload: newNotification } = action
      return {
        ...ui,
        newNotification,
      }
    }

    case 'UI.AddMessage': {
      const { payload: message } = action
      return {
        ...ui,
        messages: [
          ...ui.messages,
          {
            key: random(),
            ...message,
          },
        ],
      }
    }

    case 'UI.RemoveMessage': {
      const { payload: key } = action
      return {
        ...ui,
        messages: ui.messages.filter(m => m.key !== key),
      }
    }

    case 'UI.AddBlockingMessage': {
      const { payload: blockingMessage } = action
      return {
        ...ui,
        blockingMessages: [
          ...ui.blockingMessages,
          {
            key: random(),
            ...blockingMessage,
          },
        ],
      }
    }

    case 'UI.RemoveBlockingMessage': {
      const { payload: key } = action
      return {
        ...ui,
        blockingMessages: ui.blockingMessages.filter(m => m.key !== key),
      }
    }

    case 'UI.SetSearchTab': {
      const { payload: tab } = action
      return produce(ui, draft => {
        draft.searchTab = tab
      })
    }
    case 'UI.SetScreenId': {
      const { payload: screenId } = action
      return produce(ui, draft => {
        draft.screenId = screenId
      })
    }
    case 'UI.SetItemAuthority': {
      const { payload: ZZAU1001Status } = action
      return {
        ...ui,
        ZZAU1001Status,
      }
    }
    case 'UI.SetListAuthCategory': {
      const { payload: listAuthCategory } = action
      return {
        ...ui,
        listAuthCategory,
      }
    }

    default: {
      const _: never = action
      return ui
    }
  }
}

export default reducer

type ErrorAction = {
  type: string
  payload: unknown
  error: true
}

function isErrorAction(action: any): action is ErrorAction {
  return action.error && action.payload
}
