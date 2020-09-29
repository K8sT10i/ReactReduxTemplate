import { Reducer, Status } from '..'
import { GoogleTranslation } from './state'

export * from './state'

export type GoogleTranslationAction = {
  SetListTranslation: {
    type: 'GoogleTranslation.SetListTranslation'
    payload: {
      ZZGT0001Status: Status
      translationType: string
      translationValueList: string[]
    }
  }
}

const reducer: Reducer<
  GoogleTranslation,
  ValueOf<GoogleTranslationAction>
> = function(
  googleTranslation = {
    ZZGT0001Status: 'INITIAL',
    translationType: '',
    translationValueList: [],
    translationalResult: [{ in: '', out: '' }],
  },
  action,
) {
  switch (action.type) {
    case 'GoogleTranslation.SetListTranslation': {
      const {
        ZZGT0001Status,
        translationType,
        translationValueList,
      } = action.payload
      return {
        ...googleTranslation,
        ZZGT0001Status,
        translationType,
        translationValueList,
      }
    }
    default: {
      return googleTranslation
    }
  }
}

export default reducer
