import produce from 'immer'
import { useEffect } from 'react'
import { useStore } from 'react-redux'
import { type } from 'os'
import * as API from '../../api/v1/AirportNoticeInfoQuery'
import api from '../../api'
import { useAPI } from '../../hooks'
import { RootState } from '../../modules'
import { random } from '../../util'

export default function APAN1001() {
  const store = useStore()
  useEffect(() => store.appendReducer(reducer), [store])

  useAPI(
    ({ airportNoticeInfo: { airportCode, APAN1001Status } }) => ({
      airportCode,
      APAN1001Status,
    }),

    dispatch => async ({ airportCode, APAN1001Status }) => {
      if (APAN1001Status !== 'NEED_TO_REFRESH') return
      if (!airportCode) return

      dispatch<ValueOf<Action>>({
        type: 'airportNotice.APAN1001.Loading',
      })

      try {
        const param: API.ApiParameter = {
          airportCode,
        }
        const data = await api('/portal/api/v1/AirportNoticeInfoQuery', param)

        dispatch<ValueOf<Action>>({
          type: 'airportNotice.APAN1001.Complete',
          payload: data,
        })
      } catch (e) {
        dispatch<ValueOf<Action>>({
          type: 'airportNotice.APAN1001.Error',
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
    type: 'airportNotice.APAN1001.Loading'
  }

  Complete: {
    type: 'airportNotice.APAN1001.Complete'
    payload: API.ApiResultData
  }

  Error: {
    type: 'airportNotice.APAN1001.Error'
    payload: Error
    error: true
  }
}

export const reducer = produce(
  (draft: RootState, action: ValueOf<Action>): void => {
    // eslint-disable-next-line default-case
    switch (action.type) {
      case 'airportNotice.APAN1001.Loading': {
        draft.airportNoticeInfo.APAN1001Status = 'LOADING'

        return
      }

      case 'airportNotice.APAN1001.Complete': {
        const { payload: data } = action
        draft.airportNoticeInfo.noticeSeqInfoList = data.noticeSeqInfoList
        draft.airportNoticeInfo.APAN1001Status = 'COMPLETE'
        return
      }

      case 'airportNotice.APAN1001.Error': {
        const { message } = action.payload
        draft.airportNoticeInfo.APAN1001Status = 'ERROR'
        draft.airportNoticeInfo.noticeMessage = {
          messageContent: message,
          messageFlag: true,
          messageType: 1,
        }
      }
    }
  },
)
