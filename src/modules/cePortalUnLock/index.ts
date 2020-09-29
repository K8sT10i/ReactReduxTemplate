import { Reducer, Status } from '..'
import { CePortalUnLock } from './state'

export * from './state'

export type CePortalUnLockAction = {
  CePortalUnLock: {
    type: 'CePortalUnLock.SetParam'
    payload: {
      ZZEC1001Status: Status
      key: string
      keyList?: string[]
      user: string
    }
  }
}

const reducer: Reducer<
  CePortalUnLock,
  ValueOf<CePortalUnLockAction>
> = function(
  cePortalUnLock = {
    ZZEC1001Status: 'INITIAL',
    key: '',
    keyList: [],
    user: '',
  },
  action,
  state,
) {
  switch (action.type) {
    case 'CePortalUnLock.SetParam': {
      const { ZZEC1001Status, key, keyList, user } = action.payload
      return {
        ...cePortalUnLock,
        ZZEC1001Status,
        key,
        keyList,
        user,
      }
    }
    default: {
      return cePortalUnLock
    }
  }
}

export default reducer
