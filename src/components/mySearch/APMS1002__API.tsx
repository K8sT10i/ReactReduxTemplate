import produce from 'immer'
import { useEffect } from 'react'
import { useStore } from 'react-redux'
import api from '../../api'
import { useAPI } from '../../hooks'
import * as API from '../../api/v1/MySearchQuery'
import { RootState } from '../../modules'
import { SearchPtrnInfo } from '../../modules/mySearchQuery'
import { random } from '../../util'
import { MZPZZMG00C044 } from '../../util/MessageIdConstants'

export default function APMS1002_API() {
  const store = useStore()
  useEffect(() => store.appendReducer(reducer), [store])

  useAPI(
    ({ mySearch: { APMS1002Status }, ui: { userId } }) => ({
      APMS1002Status,
      userId,
    }),
    dispatch => async ({ APMS1002Status, userId }) => {
      if (APMS1002Status === 'INITIAL' || APMS1002Status === 'COMPLETE') {
        return
      }
      if (APMS1002Status === 'NEED_TO_REFRESH') {
        dispatch({
          type: 'APMS1002.Loading',
        })
      }
      if (APMS1002Status === 'LOADING') {
        try {
          const data = await api('/portal/api/v1/MySearchQuery', { userId })
          dispatch({
            type: 'APMS1002.Complete',
            payload: data,
          })
        } catch (e) {
          dispatch({
            type: 'APMS1002.Error',
            payload: e,
            error: true,
          })
        }
      }
    },
  )

  return null
}

export type Action = {
  Loading: {
    type: 'APMS1002.Loading'
  }

  Complete: {
    type: 'APMS1002.Complete'
    payload: API.ApiResultData
  }

  Error: {
    type: 'APMS1002.Error'
    payload: unknown
    error: true
  }
}

export const reducer = produce((draft: RootState, action: ValueOf<Action>) => {
  switch (action.type) {
    case 'APMS1002.Loading': {
      draft.mySearch.APMS1002Status = 'LOADING'

      return
    }

    case 'APMS1002.Complete': {
      const { payload: data } = action
      if (data.searchPtrnInfoList) {
        const resultSearchPrtn: SearchPtrnInfo[] = []
        data.searchPtrnInfoList.forEach(v => {
          resultSearchPrtn.push({
            searchPtrnSeq: v.searchPtrnSeq ? v.searchPtrnSeq : '',
            screenId: v.screenId ? v.screenId : '',
            searchPtrnName: v.searchPtrnName ? v.searchPtrnName : '',
            searchPtrn: v.searchPtrn ? v.searchPtrn : '',
          })
        })
        draft.mySearch.searchPtrnInfo = resultSearchPrtn
      }
      draft.mySearch.APMS1002Status = 'COMPLETE'
      return
    }

    case 'APMS1002.Error': {
      draft.mySearch.APMS1002Status = 'ERROR'
      if (draft.ui.loggedIn) {
        draft.ui.messages.push({
          key: random(),
          type: 'error',
          message: MZPZZMG00C044,
        })
      }
      return
    }

    default: {
      const _ = action
    }
  }
})
