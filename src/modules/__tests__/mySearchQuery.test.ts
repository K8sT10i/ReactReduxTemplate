import produce from 'immer'
import mySearch, { MySearch, MySearchAction } from '../mySearchQuery'

const initialState: MySearch = {
  APMS1002Status: 'NEED_TO_REFRESH',
  searchPtrnInfo: [],
  userId: '',
}
describe('MySearch.GetDataByUseID', () => {
  test('GetMySearchRecordByUseID', () => {
    const action: ValueOf<MySearchAction> = {
      type: 'MySearch.GetDataByUseID',
      payload: {
        APMS1002Status: 'NEED_TO_REFRESH',
        userId: '',
      },
    }

    const currentState = produce(initialState, draft => {
      draft.APMS1002Status = 'INITIAL'
      draft.searchPtrnInfo = []
      draft.userId = ''
    })
    const expected = produce(currentState, draft => {
      draft.userId = ''
      draft.APMS1002Status = 'NEED_TO_REFRESH'
    })

    expect(mySearch(currentState, action)).toEqual(expected)
  })
})
