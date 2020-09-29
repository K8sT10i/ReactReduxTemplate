import produce from 'immer'
import { useEffect } from 'react'
import { useStore } from 'react-redux'
import * as API from '../../api/v1/DomIntAirportInfoListQuery'
import api from '../../api'
import { useAPI } from '../../hooks'
import { RootState } from '../../modules'
import { random } from '../../util'
import { MZPZZMG00C044 } from '../../util/MessageIdConstants'

export default function APAP1003_API() {
  const store = useStore()
  useEffect(() => store.appendReducer(reducer), [store])

  useAPI(
    ({ ui: { APAP1003Status, domIntAirportInfoList } }) => ({
      APAP1003Status,
      domIntAirportInfoList,
    }),

    dispatch => async ({ APAP1003Status, domIntAirportInfoList }) => {
      if (
        (APAP1003Status !== 'INITIAL' &&
          APAP1003Status !== 'NEED_TO_REFRESH') ||
        domIntAirportInfoList.length > 0
      )
        return

      dispatch<ValueOf<Action>>({
        type: 'app.APAP1003.Loading',
      })

      try {
        const data = await api('/portal/api/v1/DomIntAirportInfoListQuery', {})

        dispatch<ValueOf<Action>>({
          type: 'app.APAP1003.Complete',
          payload: data,
        })
      } catch (e) {
        dispatch<ValueOf<Action>>({
          type: 'app.APAP1003.Error',
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
    type: 'app.APAP1003.Loading'
  }

  Complete: {
    type: 'app.APAP1003.Complete'
    payload: API.ApiResultData
  }

  Error: {
    type: 'app.APAP1003.Error'
    payload: unknown
    error: true
  }
}

export const reducer = produce(
  (draft: RootState, action: ValueOf<Action>): void => {
    switch (action.type) {
      case 'app.APAP1003.Loading': {
        draft.ui.APAP1003Status = 'LOADING'

        return
      }

      case 'app.APAP1003.Complete': {
        const { payload: data } = action
        draft.ui.domIntAirportInfoList = data.domIntAirportInfoList
        draft.ui.APAP1003Status = 'COMPLETE'

        return
      }

      case 'app.APAP1003.Error': {
        draft.ui.APAP1003Status = 'ERROR'
        draft.ui.messages.push({
          key: random(),
          type: 'error',
          message: MZPZZMG00C044,
        })

        return
      }

      default: {
        const _: never = action
      }
    }
  },
)
