import { Reducer, Status } from '..'
import { MySearch } from './state'

export * from './state'

export type MySearchAction = {
  GetSearchCondition: {
    type: 'MySearch.GetDataByUseID'
    payload: {
      APMS1002Status: Status
      userId: string
    }
  }
}

const reducer: Reducer<MySearch, ValueOf<MySearchAction>> = function(
  mySearch = {
    userId: '',
    APMS1002Status: 'INITIAL',
    searchPtrnInfo: [],
  },
  action,
) {
  switch (action.type) {
    case 'MySearch.GetDataByUseID': {
      const { APMS1002Status, userId } = action.payload
      return {
        ...mySearch,
        userId,
        APMS1002Status,
      }
    }

    default: {
      return mySearch
    }
  }
}

export default reducer
