// Allow any as it is for testing / debugging
/* eslint-disable @typescript-eslint/no-explicit-any */
import { RootState, Reducer, AllActions } from '../modules'

const testReducer: Reducer<RootState, AllActions> = function(
  state: DeepReadonlyObject<RootState> = {} as any,
  action,
) {
  if (!('meta' in action) || !action.meta.debug) {
    return state
  }

  switch (action.type) {
    case 'Debug.Mutate': {
      return {
        ...state,
        debug: {
          ...state.debug,
          ...action.payload,
        },
      }
    }

    // no default
  }

  return state
}

export default testReducer
