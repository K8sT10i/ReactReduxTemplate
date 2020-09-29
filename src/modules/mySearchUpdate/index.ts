import { Reducer, Status } from '..'
import { ModifySearch } from './state'

export * from './state'

export type ModifySearchAtion = {
  UpdateMySearch: {
    type: 'ModifySearch.UpdateMySearch'
    payload: {
      updateType: string
      screenId: string
      searchPtrnSeq: string
      searchPtrn: string
      searchPtrnName: string
      APMS1001Status: Status
    }
  }
}

const reducer: Reducer<ModifySearch, ValueOf<ModifySearchAtion>> = function(
  modifySearch = {
    updateType: '',
    screenId: '',
    searchPtrnSeq: '',
    searchPtrnName: '',
    searchPtrn: '',
    APMS1001Status: 'INITIAL',
  },
  action,
  state,
) {
  switch (action.type) {
    case 'ModifySearch.UpdateMySearch': {
      const {
        searchPtrn,
        APMS1001Status,
        screenId,
        searchPtrnName,
        searchPtrnSeq,
        updateType,
      } = action.payload
      return {
        ...modifySearch,
        searchPtrn,
        APMS1001Status,
        screenId,
        searchPtrnName,
        searchPtrnSeq,
        updateType,
      }
    }

    default: {
      return modifySearch
    }
  }
}

export default reducer
