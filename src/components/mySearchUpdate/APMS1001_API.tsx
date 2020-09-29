import { useEffect } from 'react'
import { useStore, useSelector } from 'react-redux'
import produce from 'immer'
import * as API from '../../api/v1/MySearchUpdate'
import api from '../../api'
import { useAPI } from '../../hooks'
import { RootState } from '../../modules'
import { random } from '../../util'
import {
  MZPZZMG00C016,
  MZPZZMG00C034,
  MZPZZMG00C031,
  MZPZZMG00C002,
} from '../../util/MessageIdConstants'

export default function APMS1001_API() {
  const store = useStore()
  useEffect(() => store.appendReducer(reducer), [store])
  const userId = useSelector(state => state.ui.userId) as string
  useAPI(
    ({
      modifySearch: {
        updateType,
        screenId,
        searchPtrnSeq,
        searchPtrnName,
        searchPtrn,
        APMS1001Status,
      },
    }) => ({
      updateType,
      screenId,
      searchPtrnSeq,
      searchPtrnName,
      searchPtrn,
      APMS1001Status,
    }),

    dispatch => async ({
      updateType,
      screenId,
      searchPtrnName,
      searchPtrn,
      APMS1001Status,
      searchPtrnSeq,
    }) => {
      if (APMS1001Status !== 'NEED_TO_REFRESH') return
      dispatch<ValueOf<Action>>({
        type: 'APMS1001.Loading',
      })
      try {
        const param: API.ApiParameter = {
          screenId,
          userId,
          searchPtrn,
          searchPtrnName,
          updateType,
          searchPtrnSeq,
        }
        const data = await api('/portal/api/v1/MySearchUpdate', param)
        dispatch<ValueOf<Action>>({
          type: 'APMS1001.Complete',
          payload: data,
        })
      } catch (e) {
        dispatch<ValueOf<Action>>({
          type: 'APMS1001.Error',
          payload: e,
          error: true,
        })
      }
    },
  )
  return null
}

export type Action = {
  Loading: {
    type: 'APMS1001.Loading'
  }

  Complete: {
    type: 'APMS1001.Complete'
    payload: API.ApiResultData
  }

  Error: {
    type: 'APMS1001.Error'
    payload: Error
    error: true
  }
}

export const reducer = produce(
  (draft: RootState, action: ValueOf<Action>): void => {
    const { updateType } = draft.modifySearch
    switch (action.type) {
      case 'APMS1001.Loading': {
        draft.modifySearch.APMS1001Status = 'LOADING'
        return
      }

      case 'APMS1001.Complete': {
        draft.modifySearch.APMS1001Status = 'COMPLETE'
        draft.mySearch.APMS1002Status = 'NEED_TO_REFRESH'
        draft.ui.messages.push({
          key: random(),
          type: 'success',
          message: updateType === 'M' ? MZPZZMG00C034 : MZPZZMG00C031,
        })
        return
      }
      case 'APMS1001.Error': {
        const { message } = action.payload
        draft.modifySearch.APMS1001Status = 'ERROR'
        if (draft.ui.loggedIn) {
          draft.ui.blockingMessages.push({
            key: random(),
            subText: MZPZZMG00C002,
            title: MZPZZMG00C016,
            type: 'error',
          })
        }
        return
      }
      default: {
        const _ = action
      }
    }
  },
)
