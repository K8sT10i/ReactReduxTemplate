import { Store, Dispatch as ReduxDispatch, Action } from 'redux'
import { RootState, AllActions } from '.'
import { StoreExt } from '../createStoreProvider'

declare module 'react-redux' {
  type Dispatch<A extends Action = AllActions> = ReduxDispatch<A>

  function useDispatch(): Dispatch
  function useStore(): Store<RootState, AllActions> & StoreExt
  function useSelector<TSelected>(
    selector: (state: RootState) => TSelected,
    equalityFn?: (left: TSelected, right: TSelected) => boolean,
  ): TSelected
}
