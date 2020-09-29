import produce from 'immer'
import { useEffect } from 'react'
import { useStore } from 'react-redux'
import * as API from '../../api/v1/DmsReservationInfoFind'
import api from '../../api'
import { useAPI } from '../../hooks'
import { RootState } from '../../modules'
import { random } from '../../util'
import {
  MZPZZMG00C004,
  MZPZZMG00C037,
  MZPZZMG00C016,
  MZPZZMG00C010,
} from '../../util/MessageIdConstants'
export default function APRS1002_API() {
  const store = useStore()
  useEffect(() => store.appendReducer(reducer), [store])

  useAPI(
    ({
      searchForCeRecord: { pnrRecordLocator, confirmationNum, APRS1002Status },
    }) => ({
      pnrRecordLocator,
      confirmationNum,
      APRS1002Status,
    }),

    dispatch => async ({
      pnrRecordLocator,
      confirmationNum,
      APRS1002Status,
    }) => {
      if (APRS1002Status !== 'NEED_TO_REFRESH') return

      dispatch<ValueOf<Action>>({
        type: 'search.APRS1002.Loading',
      })

      const param: API.ApiParameter = {
        pnrRecordLocator,
        confirmationNum,
      }

      try {
        const data = await api('/portal/api/v1/DmsReservationInfoFind', param)

        dispatch<ValueOf<Action>>({
          type: 'search.APRS1002.Complete',
          payload: [param, data],
        })

        dispatch<ValueOf<Action>>({
          type: 'search.APRS1002.Status',
        })
      } catch (e) {
        dispatch<ValueOf<Action>>({
          type: 'search.APRS1002.Error',
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
    type: 'search.APRS1002.Loading'
  }

  Complete: {
    type: 'search.APRS1002.Complete'
    payload: [API.ApiParameter, API.ApiResultData]
  }

  Status: {
    type: 'search.APRS1002.Status'
  }

  Error: {
    type: 'search.APRS1002.Error'
    payload: unknown
    error: true
  }
}

export const reducer = produce(
  ({ searchForCeRecord, ui }: RootState, action: ValueOf<Action>): void => {
    switch (action.type) {
      case 'search.APRS1002.Loading': {
        searchForCeRecord.APRS1002Status = 'LOADING'
        searchForCeRecord.searchFlag = true

        return
      }

      case 'search.APRS1002.Complete': {
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
        searchForCeRecord.APRS1002Status = 'COMPLETE'

        window.open(compose(data.pnrInfo, ui.lang))
        return
      }

      case 'search.APRS1002.Status': {
        searchForCeRecord.APRS1002Status = 'INITIAL'
        return
      }
      case 'search.APRS1002.Error': {
        searchForCeRecord.APRS1002Status = 'ERROR'
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
    processCategory,
    pnrRecordLocator,
    intlPnrRecordLocator,
    paxElementId,
    paxFamilyName,
    paxFirstName,
    groupName,
    flightDate,
    carrierCode,
    flightNumber,
  },
  lang,
) {
  const params = new URLSearchParams()
  if (processCategory) {
    params.append('pc', processCategory)
  }
  if (pnrRecordLocator) {
    params.append('pnr', pnrRecordLocator)
  }
  if (intlPnrRecordLocator) {
    params.append('ipnr', intlPnrRecordLocator)
  }
  if (paxFamilyName) {
    params.append('pfamn', paxFamilyName)
  }
  if (paxFirstName) {
    params.append('pfirn', paxFirstName)
  }
  if (groupName) {
    params.append('gn', groupName)
  }
  if (flightDate) {
    params.append('fd', flightDate)
  }
  if (carrierCode) {
    params.append('cc', carrierCode)
  }
  if (flightNumber) {
    params.append('fn', flightNumber)
  }
  if (paxElementId) {
    params.append('pt', paxElementId)
  }
  if (lang === 'ja') {
    params.append('lang', 'J')
  } else {
    params.append('lang', 'E')
  }

  return `/ce-record?${params.toString()}&di=D`
}
