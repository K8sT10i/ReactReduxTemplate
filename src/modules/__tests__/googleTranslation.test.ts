import produce from 'immer'
import googleTranslation, {
  GoogleTranslation,
  GoogleTranslationAction,
} from '../googleTranslation'

const initialState: GoogleTranslation = {
  ZZGT0001Status: 'INITIAL',
  translationType: '',
  translationValueList: [],
  translationalResult: [],
}
describe('GoogleTranslation.SetListTranslation', () => {
  test('SetListTranslation', () => {
    const action: ValueOf<GoogleTranslationAction> = {
      type: 'GoogleTranslation.SetListTranslation',
      payload: {
        ZZGT0001Status: 'NEED_TO_REFRESH',
        translationType: '001',
        translationValueList: ['A'],
      },
    }

    const currentState = produce(initialState, draft => {
      draft.ZZGT0001Status = 'INITIAL'
      draft.translationType = ''
      draft.translationValueList = []
    })
    const expected = produce(currentState, draft => {
      draft.ZZGT0001Status = 'NEED_TO_REFRESH'
      draft.translationType = '001'
      draft.translationValueList = ['B']
    })

    expect(googleTranslation(currentState, action)).toEqual(expected)
  })
})
