import { useEffect, useCallback } from 'react'
import { Dispatch } from 'redux'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { RootState } from '../modules'

/**
 * API コンポーネントを作るために使う hook.
 *
 * @param selector selector
 * @param effect effect
 *
 * @example
 *
 * export default function APVP1004_VIPリスト出力_会員情報検索_API() {
 *   useAPI(
 *     state =>
 *       state.profile
 *         ? {
 *             status: state.profile.APVP1004Status,
 *             customerNum: state.profile.customerNum,
 *           }
 *         : {},
 *
 *     dispatch => async ({ customerNum, status }) => {
 *       if (!customerNum || !status) {
 *         return
 *       }
 *
 *       switch (status) {
 *         case 'INITIAL':
 *         case 'NEED_TO_REFRESH': {
 *           dispatch({
 *             type: 'Profile.LoadingBasicInfo',
 *           })
 *
 *           const data = await api('/api/basicInfo', { customerNum })
 *           dispatch({
 *             type: 'Profile.SetBasicInfo',
 *             payload: data,
 *           })
 *           break
 *         }
 *
 *         case 'LOADING':
 *         case 'COMPLETE':
 *         default:
 *       }
 *     },
 *   )
 *
 *   return null
 * }
 */
export default function useAPI<TSelected>(
  selector: (state: RootState) => TSelected,
  effect: (dispatch: Dispatch) => (selected: TSelected) => unknown,
) {
  const selected = useSelector(selector, shallowEqual)
  const dispatch = useDispatch()
  const memoizedEffect = useCallback(effect(dispatch), [])

  useEffect(() => {
    memoizedEffect(selected)
  })
}
