import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Stack } from 'office-ui-fabric-react/lib/Stack'
import APRS1001_API from './APRS1001_API'
import APRS1002_API from './APRS1002_API'
import { ContainerChildrenGap12 } from '../../theme'

export default function Search() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({
      type: 'UI.SetTitle',
      payload: 'TEST',
    })
    dispatch({
      type: 'UI.SetNavGroups',
      payload: [],
    })
  }, [dispatch])
  const controRefreshPage = useSelector(
    state => state.searchForCeRecord.controlLoadFlg,
  )
  const searchTab = useSelector(state => state.ui.searchTab)
  const ce = useSelector(state => state.searchForCeRecord)
  const vip = useSelector(state => state.searchForVIP)

  return (
    <div>
      <APRS1001_API />
      <APRS1002_API />

      <Stack childrenGap="76 0">
        {searchTab === 'ceRecord' ? (
          <ContainerChildrenGap12></ContainerChildrenGap12>
        ) : null}
        {searchTab === 'vip' ? <div></div> : null}
        {searchTab === 'notice' ? <div /> : null}
      </Stack>
    </div>
  )
}
