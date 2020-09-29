import produce from 'immer'
import { useEffect } from 'react'
import { useStore } from 'react-redux'
import * as API from '../../api/v1/AirportNoticeInfoUpdate'
import api from '../../api'
import { useAPI } from '../../hooks'
import { RootState } from '../../modules'
import { random } from '../../util'
import * as messages from '../../util/MessageIdConstants'

export default function APAN1002() {
  const store = useStore()
  useEffect(() => store.appendReducer(reducer), [store])

  useAPI(
    ({
      airportNoticeInfo: {
        APAN1002Status,
        airportCode,
        noticeSeqInfoListUpdate,
        noticeSeqInfoListDelete,
        updateType,
      },
    }) => ({
      APAN1002Status,
      airportCode,
      noticeSeqInfoListUpdate,
      noticeSeqInfoListDelete,
      updateType,
    }),
    dispatch => async ({
      APAN1002Status,
      airportCode,
      noticeSeqInfoListUpdate,
      noticeSeqInfoListDelete,
      updateType,
    }) => {
      if (APAN1002Status !== 'NEED_TO_REFRESH') {
        return
      }

      dispatch<ValueOf<Action>>({
        type: 'airportNotice.APAN1002.Loading',
      })

      try {
        const param: API.ApiParameter = {
          updateType,
          airportCode,
          noticeSeqInfoList:
            updateType === 'D'
              ? noticeSeqInfoListDelete
              : noticeSeqInfoListUpdate,
        }
        const data = await api('/portal/api/v1/AirportNoticeInfoUpdate', param)
        dispatch<ValueOf<Action>>({
          type: 'airportNotice.APAN1002.Complete',
          payload: data,
        })
      } catch (error) {
        dispatch<ValueOf<Action>>({
          type: 'airportNotice.APAN1002.Error',
          payload: error,
          error: true,
        })
      }
    },
  )

  return null
}

export type Action = {
  Loading: {
    type: 'airportNotice.APAN1002.Loading'
  }

  Complete: {
    type: 'airportNotice.APAN1002.Complete'
    payload: API.ApiResultData
  }

  Error: {
    type: 'airportNotice.APAN1002.Error'
    payload: Error
    error: true
  }
}

export const reducer = produce(
  (draft: RootState, action: ValueOf<Action>): void => {
    switch (action.type) {
      case 'airportNotice.APAN1002.Loading': {
        draft.airportNoticeInfo.APAN1002Status = 'LOADING'

        return
      }

      case 'airportNotice.APAN1002.Complete': {
        const { updateType } = draft.airportNoticeInfo
        draft.airportNoticeInfo.APAN1002Status = 'COMPLETE'
        draft.airportNoticeInfo.APAN1001Status = 'NEED_TO_REFRESH'
        draft.airportNoticeInfo.noticeSeqInfoListDelete = []
        draft.airportNoticeInfo.noticeSeqInfoListUpdate = []
        draft.airportNoticeInfo.showModal = 'HIDDEN'

        draft.ui.messages.push({
          key: random(),
          type: 'success',
          message:
            // eslint-disable-next-line no-nested-ternary
            updateType === 'M' || updateType === 'U'
              ? messages.MZPZZMG00C034
              : messages.MZPZZMG00C031,
        })

        return
      }

      case 'airportNotice.APAN1002.Error': {
        const { message } = action.payload
        draft.airportNoticeInfo.APAN1002Status = 'ERROR'
        draft.ui.blockingMessages = [
          {
            key: random(),
            type: 'error',
            title: messages.MZPZZMG00C016,
            subText: messages.MZPZZMG00C002,
          },
        ]
        return
      }

      default: {
        const _: never = action
      }
    }
  },
)
