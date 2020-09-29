import produce from 'immer'
import { Reducer } from '..'
import {
  SearchStatus,
  ResStatusCode,
  SearchCondition,
  SearchForTask,
} from './state'

export * from './state'

export type SearchForTaskAction = {
  SetupDefault: {
    type: 'SearchForTask.SetupDefault'
  }

  SetStatus: {
    type: 'SearchForTask.SetStatus'
    payload: Partial<SearchStatus>
  }

  Clear: {
    type: 'SearchForTask.Clear'
  }

  ResultClear: {
    type: 'SearchForTask.ResultClear'
  }

  SetPathParams: {
    type: 'SearchForTask.SetResultKey'
    payload: {
      scrType?: '1' | '2' | '3'
      tgtTimeFrom?: string
      tgtTimeTo?: string
      airCode?: string
      flightInfoList?: any
      dateType?: 'STDSTA' | 'HANDLING'
      crBizGroupCode?: string
      crUserName?: string
      crDate?: string
      resBizGroupCode?: string
      resStatusList?: any
      depDateFrom?: string
      depDateTo?: string
      handling?: number
    }
  }

  MergeCondition: {
    type: 'SearchForTask.MergeCondition'
    payload: Partial<SearchCondition>
  }

  SetTaskStatus: {
    type: 'SearchForTask.SetTaskStatus'
    payload: {
      taskTodoId: string
      taskTodoBranchNum: string
      resSeq: string
      resBizGroupCode: string
      resStatusCode: ResStatusCode
    }
  }
  SetControlFlgRefreshPage: {
    type: 'SearchForTask.SetControlFlgRefreshPage'
    payload: boolean
  }
}

const reducer: Reducer<SearchForTask, ValueOf<SearchForTaskAction>> = function(
  searchForTask = {
    scrType: '1',
    searchList: [],
    updType: '1',
    bizGroupCode: '',
    userId: '',
    userName: '',
    taskTodoInfo: {},
    APTT1002Status: 'INITIAL',
    APCR1015Status: 'INITIAL',
    APTT1001Status: 'INITIAL',
    airCode: '',
    airFlight: 'AIR',
    dateType: 'STDSTA',
    flightInfoList: [],
    crBizGroupCode: '',
    crUserName: '',
    crDatetime: '',
    resBizGroupCode: '',
    resStatusName: [],
    resultList: [],
    tgtTimeFrom: '',
    tgtTimeTo: '',
  },
  action,
  state,
) {
  switch (action.type) {
    case 'SearchForTask.SetupDefault': {
      return {
        ...searchForTask,
      }
    }

    case 'SearchForTask.SetStatus': {
      const { payload: status } = action
      return {
        ...searchForTask,
        ...status,
      }
    }

    case 'SearchForTask.ResultClear': {
      return {
        ...searchForTask,
        resultList: [],
      }
    }

    case 'SearchForTask.Clear': {
      return {
        ...searchForTask,
        scrType: '1',
        tgtTimeFrom: '',
        tgtTimeTo: '',
        airCode: '',
        flightInfoList: [],
        dateType: 'STDSTA',
        crBizGroupCode: '',
        crUserName: '',
        crDate: '',
        resBizGroupCode: '',
        resStatusList: [],
        depDateFrom: '',
        depDateTo: '',
        handling: undefined,
      }
    }
    case 'SearchForTask.MergeCondition': {
      const { payload: condition } = action
      const result = {
        ...searchForTask,
        ...condition,
      }

      // 時刻の前後関係をチェックして、矛盾が生じないようにする
      const { tgtTimeFrom, tgtTimeTo } = result
      const invalid = tgtTimeFrom && tgtTimeTo && tgtTimeFrom >= tgtTimeTo
      if (invalid) {
        return {
          ...result,
          stdTo: undefined,
        }
      }

      return result
    }

    case 'SearchForTask.SetTaskStatus': {
      const { payload: status } = action
      return produce(searchForTask, draft => {
        draft.updateTaskStatusParam = status
      })
    }
    case 'SearchForTask.SetResultKey': {
      const {
        payload: {
          scrType,
          tgtTimeFrom,
          tgtTimeTo,
          airCode,
          flightInfoList,
          dateType,
          crBizGroupCode,
          crUserName,
          crDate,
          resBizGroupCode,
          resStatusList,
          depDateFrom,
          depDateTo,
          handling,
        },
      } = action

      return {
        ...searchForTask,
        scrType,
        tgtTimeFrom,
        tgtTimeTo,
        airCode,
        flightInfoList,
        dateType,
        crBizGroupCode,
        crUserName,
        crDate,
        resBizGroupCode,
        resStatusList,
        depDateFrom,
        depDateTo,
        APTT1002Status: 'NEED_TO_REFRESH',
        handling,
      }
    }
    case 'SearchForTask.SetControlFlgRefreshPage': {
      const { payload: controlFlgRefreshPage } = action
      return {
        ...searchForTask,
        controlFlgRefreshPage,
      }
    }
    default: {
      const _: never = action
      return searchForTask
    }
  }
}

export default reducer
