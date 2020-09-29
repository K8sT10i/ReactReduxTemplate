import produce from 'immer'
import mySearchUpdate, {
  ModifySearch,
  ModifySearchAtion,
} from '../mySearchUpdate'

const initialState: ModifySearch = {
  updateType: '',
  screenId: '',
  searchPtrnSeq: '',
  searchPtrnName: '',
  searchPtrn: '',
  APMS1001Status: 'INITIAL',
}

describe('ModifySearch.UpdateMySearch', () => {
  test('キModifySearch.UpdateMySearch create', () => {
    const action: ValueOf<ModifySearchAtion> = {
      type: 'ModifySearch.UpdateMySearch',
      payload: {
        updateType: 'M',
        screenId: 'TVFL1001',
        searchPtrnName: 'P_1',
        searchPtrn: '{"domIntAirportInfoList":[],"airCode":"","dmsInt":"I",}',
        APMS1001Status: 'NEED_TO_REFRESH',
        searchPtrnSeq: '',
      },
    }

    const currentState = produce(initialState, draft => {
      draft.updateType = 'M'
      draft.screenId = 'TVFL1002'
      draft.searchPtrnName = 'P2'
      draft.searchPtrn =
        '{"domIntAirportInfoList":[],"airCode":"","dmsInt":"I","airFlight":"AIR","depArrOp":"A"}'
      draft.APMS1001Status = 'COMPLETE'
      draft.searchPtrnSeq = ''
    })
    const expected = produce(currentState, draft => {
      draft.updateType = 'M'
      draft.screenId = 'TVFL1001'
      draft.searchPtrnName = 'P_1'
      draft.searchPtrn =
        '{"domIntAirportInfoList":[],"airCode":"","dmsInt":"I","airFlight":"AIR","depArrOp":"A","dateType":"HANDLING","baseDate":"20200104","flightInfoList":[],"segmentInfoList":[],"tagList":["過入金","EB免除"],"ssrKeyWordList":["AVIH","AVML","ATML","COUR"],"searchFlag":false,"handling":2,"tgtTimeFrom":"1000","tgtTimeTo":"2200"}'
      draft.APMS1001Status = 'NEED_TO_REFRESH'
      draft.searchPtrnSeq = ''
    })

    expect(mySearchUpdate(currentState, action)).toEqual(expected)
  })
  test('ModifySearch.UpdateMySearch delete', () => {
    const action: ValueOf<ModifySearchAtion> = {
      type: 'ModifySearch.UpdateMySearch',
      payload: {
        updateType: 'D',
        screenId: 'TVFL1001',
        searchPtrnName: 'P_1',
        searchPtrn:
          '{"domIntAirportInfoList":[],"airCode":"","dmsInt":"I","airFlight":"AIR","depArrOp":"A",}',
        APMS1001Status: 'NEED_TO_REFRESH',
        searchPtrnSeq: '',
      },
    }

    const currentState = produce(initialState, draft => {
      draft.updateType = 'M'
      draft.screenId = 'TVFL1002'
      draft.searchPtrnName = 'P2'
      draft.searchPtrn =
        '{"domIntAirportInfoList":[],"airCode":"","dmsInt":"I","airFlight":"AIR","depArrOp":"A",}'
      draft.APMS1001Status = 'COMPLETE'
      draft.searchPtrnSeq = ''
    })
    const expected = produce(currentState, draft => {
      draft.updateType = 'D'
      draft.screenId = 'TVFL1001'
      draft.searchPtrnName = 'P_1'
      draft.searchPtrn =
        '{"domIntAirportInfoList":[],"airCode":"","dmsInt":"I","airFlight":"AIR","depArrOp":"A","dateType":"HANDLING",}'
      draft.APMS1001Status = 'NEED_TO_REFRESH'
      draft.searchPtrnSeq = ''
    })

    expect(mySearchUpdate(currentState, action)).toEqual(expected)
  })
})
