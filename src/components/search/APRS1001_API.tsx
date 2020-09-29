import { useEffect } from 'react'
import { useStore } from 'react-redux'
import produce from 'immer'
import { RootState } from '../../modules'
import * as API from '../../api/v1/IntReservationInfoFind'
import { random } from '../../util'
import { useAPI } from '../../hooks'
import api from '../../api'
import {
  MZPZZMG00C004,
  MZPZZMG00C037,
  MZPZZMG00C016,
  MZPZZMG00C010,
} from '../../util/MessageIdConstants'

export default function APRS1001_API() {
  const store = useStore()

  useEffect(() => store.appendReducer(reducer), [store])

  useAPI(
    ({
      searchForCeRecord: { pnrRecordLocator, confirmationNum, APRS1001Status },
    }) => ({
      pnrRecordLocator,
      confirmationNum,
      APRS1001Status,
    }),

    dispatch => async ({
      pnrRecordLocator,
      confirmationNum,
      APRS1001Status,
    }) => {
      // 検索するタイミングじゃない
      if (APRS1001Status !== 'NEED_TO_REFRESH') return
      // 必須のパラメーターが入っていない
      if (!(pnrRecordLocator || confirmationNum)) return

      dispatch<ValueOf<Action>>({
        type: 'search.APRS1001.Loading',
      })

      try {
        const param: API.ApiParameter = {
          pnrRecordLocator,
          flightTicketNum: confirmationNum,
        }

        const data = await api('/portal/api/v1/IntReservationInfoFind', param)

        dispatch<ValueOf<Action>>({
          type: 'search.APRS1001.Complete',
          payload: [param, data],
        })

        dispatch<ValueOf<Action>>({
          type: 'search.APRS1001.Status',
        })
      } catch (e) {
        dispatch<ValueOf<Action>>({
          type: 'search.APRS1001.Error',
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
    type: 'search.APRS1001.Loading'
  }
  Complete: {
    type: 'search.APRS1001.Complete'
    payload: [API.ApiParameter, API.ApiResultData]
  }
  Status: {
    type: 'search.APRS1001.Status'
  }
  Error: {
    type: 'search.APRS1001.Error'
    payload: [API.ApiParameter, unknown?]
    error: true
  }
}

export const reducer = produce(
  ({ searchForCeRecord, ui }: RootState, action: ValueOf<Action>): void => {
    switch (action.type) {
      case 'search.APRS1001.Loading': {
        searchForCeRecord.APRS1001Status = 'LOADING'
        searchForCeRecord.searchFlag = true
        return
      }
      case 'search.APRS1001.Complete': {
        searchForCeRecord.APRS1001Status = 'COMPLETE'
        const [, data] = action.payload

        if (!data.pnrInfo) {
          ui.blockingMessages.push({
            key: random(),
            title: MZPZZMG00C037,
            subText: MZPZZMG00C004,
            // type: 'info',
            url: '/search',
          })
          return
        }

        window.open(compose(data.pnrInfo, ui.lang))
        return
      }
      case 'search.APRS1001.Status': {
        searchForCeRecord.APRS1001Status = 'INITIAL'
        return
      }
      case 'search.APRS1001.Error': {
        searchForCeRecord.APRS1001Status = 'ERROR'
        ui.blockingMessages.push({
          key: random(),
          title: MZPZZMG00C016,
          subText: MZPZZMG00C010,
          type: 'error',
        })
        return
      }
      default: {
        const _: never = action
      }
    }
  },
)

function compose(
  {
    pnrRecordLocator,
    pnrCreationDate,
    paxElementId,
    groupElementId,
  }: {
    pnrRecordLocator: string
    pnrCreationDate: string
    paxElementId?: string
    groupElementId?: string
  },
  lang,
) {
  const params = new URLSearchParams()
  if (pnrRecordLocator) {
    params.append('pnr', pnrRecordLocator)
  }
  if (pnrCreationDate) {
    params.append('pcd', pnrCreationDate)
  }
  if (paxElementId) {
    params.append('pt', paxElementId)
  }
  if (groupElementId) {
    params.append('gt', groupElementId)
  }
  if (lang === 'ja') {
    params.append('lang', 'J')
  } else {
    params.append('lang', 'E')
  }

  return `/ce-record?${params.toString()}&di=I`
}
