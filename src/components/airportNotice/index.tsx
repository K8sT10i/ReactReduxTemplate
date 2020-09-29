import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import AirportNoticeHeader from './AirportNoticeHeader'
import AirportNoticeContent from './AirportNoticeContent'
import AirportNoticeModalUpdate from './AirportNoticeModalUpdate'
import APAN1001 from './APAN1001_API'
import APAN1002_API from './APAN1002__API'
import AirportNoticeModalDelete from './AirportNoticeModalDelete'
import navGroups from '../layout/navGroups'
import {
  TVAS1001,
  CATEGORY_ID_01,
  SUB_CATEGORY_ID_001,
  ITEM_ID_001,
} from '../../util/constants'
import useGetItemName from '../../hooks/useGetItemName'
import GoToPageTopButton from '../GoToPageTopButton'

export default function index() {
  const dispatch = useDispatch()
  const noticeList = useSelector(
    state => state.airportNoticeInfo.noticeSeqInfoList,
  )
  const getItemName =
    useGetItemName(TVAS1001, CATEGORY_ID_01)(SUB_CATEGORY_ID_001)(
      ITEM_ID_001,
    ) || 'TEST'

  useEffect(() => {
    dispatch({
      type: 'UI.SetTitle',
      payload: getItemName,
    })
    dispatch({
      type: 'UI.SetNavGroups',
      payload: navGroups,
    })
  }, [dispatch, getItemName])

  const [noticeModalData, setNoticeModalData] = useState({
    showNoticeUpdateDialog: false,
    updateType: '',
    noticeInfo: {
      airportNoticeSeq: '',
      noticeContent: '',
      dispStartDatetime: '',
      dispEndDatetime: '',
      updateSystemDateTime: '',
    },
  })

  const setModalData = (sh, ut, ni) => {
    setNoticeModalData({
      showNoticeUpdateDialog: sh,
      updateType: ut,
      noticeInfo: ni,
    })
  }

  return (
    <>
      <APAN1001 />
      <APAN1002_API />
      <AirportNoticeHeader
        setNoticeData={(sh, ut, ni) => setModalData(sh, ut, ni)}
      />
      <AirportNoticeContent
        data={noticeList}
        setNoticeData={(sh, ut, ni) => setModalData(sh, ut, ni)}
      />
      <AirportNoticeModalUpdate
        modalData={noticeModalData}
        setNoticeData={(sh, ut, ni) => setModalData(sh, ut, ni)}
        noticeData={noticeModalData}
      />
      <AirportNoticeModalDelete />
      <GoToPageTopButton style={{ margin: '16px 0px' }} />
    </>
  )
}
