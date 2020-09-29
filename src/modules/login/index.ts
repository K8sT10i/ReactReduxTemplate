import produce from 'immer'
import { Reducer, Status } from '..'
import { Login, Notice } from './state'
import { BizGroupData } from '../../api/v1/InitData'

export * from './state'

export type LoginAction = {
  SetNoticeList: {
    type: 'Login.SetNoticeList'
    payload: Notice[]
  }

  SetBizGroupList: {
    type: 'Login.SetUserBizGroupList'
    payload: BizGroupData[]
  }

  SetUserName: {
    type: 'Login.SetUserNameUpdateParam'
    payload: string
  }

  SetBizGroup: {
    type: 'Login.SetBizGroupUpdateParam'
    payload: string
  }

  SetStatus: {
    type: 'Login.SetStatus'
    payload: {
      APSN1001Status?: Status
      TVLG1002Status?: Status
      TVLG1003Status?: Status
    }
  }
}

const reducer: Reducer<Login, ValueOf<LoginAction>> = function(
  login = {
    noticeList: [],
    APSN1001Status: 'INITIAL',
    TVLG1002Status: 'INITIAL',
    TVLG1003Status: 'INITIAL',
  },
  action,
  state,
) {
  switch (action.type) {
    case 'Login.SetNoticeList': {
      const { payload: noticeList } = action
      return {
        ...login,
        noticeList,
      }
    }

    case 'Login.SetUserBizGroupList': {
      const { payload: userBizGroupList } = action
      return {
        ...login,
        userBizGroupList,
      }
    }

    case 'Login.SetUserNameUpdateParam': {
      const { payload: userName } = action
      return {
        ...login,
        userName,
      }
    }

    case 'Login.SetBizGroupUpdateParam': {
      const { payload: bizGroupCode } = action
      return {
        ...login,
        bizGroupCode,
      }
    }

    case 'Login.SetStatus': {
      const { payload: status } = action
      return produce(login, draft => {
        Object.keys(status).forEach(key => {
          draft[key] = status[key]
        })
      })
    }

    default: {
      const _: never = action
      return login
    }
  }
}

export default reducer
