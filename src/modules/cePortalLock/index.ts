import { Reducer, Status } from '..'
import { CePortalLock } from './state'

export * from './state'

export type CePortalLockAction = {
  SetParam: {
    type: 'CePortalLock.SetParam'
    payload: {
      ZZEC1001Status: Status
      key: string
      info: string
      infoList?: string[]
      keyList?: string[]
      user: string
    }
  }
  Clear: {
    type: 'CePortalLock.Clear'
    payload: any
  }
}

const reducer: Reducer<CePortalLock, ValueOf<CePortalLockAction>> = function(
  cePortalLock = {
    ZZEC1001Status: 'INITIAL',
    key: '',
    info: '',
    infoList: [],
    keyList: [],
    user: '',
  },
  action,
  state,
) {
  switch (action.type) {
    case 'CePortalLock.SetParam': {
      const {
        ZZEC1001Status,
        key,
        info,
        infoList,
        keyList,
        user,
      } = action.payload
      return {
        ...cePortalLock,
        ZZEC1001Status,
        key,
        infoList,
        info,
        keyList,
        user,
      }
    }
    case 'CePortalLock.Clear': {
      return {
        ...cePortalLock,
        resultLockData: {
          result: false,
        },
      }
    }

    default: {
      return cePortalLock
    }
  }
}

export default reducer
