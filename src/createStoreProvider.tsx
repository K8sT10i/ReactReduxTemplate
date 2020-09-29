import React from 'react'
import {
  createStore,
  Reducer,
  AnyAction,
  DeepPartial,
  StoreEnhancer,
  StoreEnhancerStoreCreator,
  compose,
} from 'redux'
import { Provider as ReactReduxProvider } from 'react-redux'
import { RootState } from './modules'

/**
 * Receives Reducer and returns Provider with middleware (Redux devtool)
 * It also returns the store because it is convenient for testing.
 *
 * @param reducer Reducer passed to Redux's 'createStore ()'.
 * @param preloadedState PreloadedState passed to Redux's 'createStore ()'
 *
 * @example
 *
 * const { Provider } = createStoreProvider(rootReducer)
 * ReactDOM.render(
 *   <Provider>
 *     <App />
 *   </Provider>,
 *   document.getElementById('root'),
 * )
 */
export default function createStoreProvider(
  reducer: Reducer<unknown, AnyAction>,
  preloadedState?: DeepPartial<unknown>,
) {
  const store = createStore(
    reducer,
    preloadedState,
    reduxDevtoolsExtensionEnhancer
      ? compose(appendableReducerStoreEnhancer, reduxDevtoolsExtensionEnhancer)
      : appendableReducerStoreEnhancer,
  )

  function Provider({ children }: { children: React.ReactNode }) {
    return <ReactReduxProvider store={store}>{children}</ReactReduxProvider>
  }

  return {
    Provider,
    store,
  }
}

export type StoreExt = {
  /**
   * Add Reducer.
   *
   * @param additional Reducer you want to add
   * @returns Function to remove the added reducer
   * @see https://redux.js.org/recipes/code-splitting
   */
  appendReducer(
    additional: Reducer<DeepReadonly<RootState>, AnyAction>,
  ): () => void
}

/**
 * Allow 'reducer' to be added with 'store.appendReducer'.
 *
 * @param _createStore createStore
 */
const appendableReducerStoreEnhancer: StoreEnhancer<StoreExt> = (
  _createStore: StoreEnhancerStoreCreator<StoreExt>,
) => (reducer, preloadedState) => {
  const reducers: Reducer<unknown, AnyAction>[] = [reducer]
  const appendReducer: StoreExt['appendReducer'] = additional => {
    reducers.push(additional)
    // eslint-disable-next-line no-console
    // console.debug(reducers)

    return function removeReducer(): void {
      const index = reducers.lastIndexOf(additional)
      if (index < 0) return

      reducers.splice(index, 1)
      // eslint-disable-next-line no-console
      // console.debug(reducers)
    }
  }

  // If you don't set it to `<any, any>` here, it won't work for some reason.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const store = _createStore<any, any>(
    (state, action) => reducers.reduce((s, r) => r(s, action), state),
    preloadedState,
  )
  store.appendReducer = appendReducer

  return store
}

/**
 * Incorporate a debugging mechanism with Chrome's Redux DevTools Extension
 *
 * @see https://github.com/zalmoxisus/redux-devtools-extension#usage
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
const reduxDevtoolsExtensionEnhancer: StoreEnhancerStoreCreator | undefined =
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
  (window as any).__REDUX_DEVTOOLS_EXTENSION__()
/* eslint-enable */
