import React, { useState } from 'react'
import {
  Dialog,
  DialogType,
  DialogFooter,
} from 'office-ui-fabric-react/lib/Dialog'
import styled from 'styled-components/macro'
import { useDispatch, useSelector } from 'react-redux'
import {
  PrimaryButton,
  DefaultButton,
  IButtonStyles,
} from 'office-ui-fabric-react/lib/Button'
import {
  CATEGORY_ID_01,
  TVAS1001,
  SUB_CATEGORY_ID_001,
  ITEM_ID_006,
  ITEM_ID_007,
  ITEM_ID_008,
  ITEM_ID_009,
} from '../../util/constants'
import useGetItemName from '../../hooks/useGetItemName'
import { Spinner } from 'office-ui-fabric-react/lib/components/Spinner'
import { mergeStyleSets } from '@uifabric/styling'

export default function AirportNoticeModalDelete(props) {
  const dispatch = useDispatch()
  const airporeCode = useSelector(state => state.airportNoticeInfo.airportCode)
  const listNoticeDelete = useSelector(
    state => state.airportNoticeInfo.noticeSeqInfoListDelete,
  )

  const deleting = useSelector(
    state =>
      state.airportNoticeInfo &&
      state.airportNoticeInfo.APAN1002Status === 'LOADING',
  )

  const modalDeleteShow: boolean = useSelector(
    state =>
      state.airportNoticeInfo && state.airportNoticeInfo.showModal === 'DELETE',
  )
  function deleteNotice() {
    dispatch({
      type: 'AirportNotice.SetAirportNoticeInfoDelete',
      payload: {
        APAN1002Status: 'NEED_TO_REFRESH',
        updateType: 'D',
        airportCode: airporeCode,
        noticeSeqInfoListDelete: listNoticeDelete,
      },
    })
  }
  function hideNoticeModal() {
    dispatch({
      type: 'AirportNotice.ShowNoticeModal',
      payload: 'HIDDEN',
    })
  }
  const getItemName = useGetItemName(
    TVAS1001,
    CATEGORY_ID_01,
  )(SUB_CATEGORY_ID_001)

  const title = getItemName(ITEM_ID_006) || 'TEST'

  return (
    <Dialog
      hidden={!modalDeleteShow}
      onDismiss={() => hideNoticeModal()}
      dialogContentProps={{
        type: DialogType.close,
        title,
      }}
      modalProps={{
        isDarkOverlay: true,
        isBlocking: false,
      }}
      minWidth={416}
      maxWidth={416}
    >
      <Content>{getItemName(ITEM_ID_007) || 'TEST'}</Content>
      <DialogFooter>
        <DefaultButton
          text={getItemName(ITEM_ID_008) || 'CANCEL'}
          onClick={() => hideNoticeModal()}
          styles={cancelSttyle}
        />
        {deleting ? (
          <Spinner
            label={'Deleting...'}
            ariaLive="assertive"
            labelPosition="right"
            styles={{
              root: { float: 'right', paddingRight: 8, paddingLeft: 8 },
            }}
          />
        ) : (
          <PrimaryButton
            type="submit"
            text={getItemName(ITEM_ID_009) || 'DELETE'}
            styles={delSttyle}
            onClick={() => deleteNotice()}
          />
        )}
      </DialogFooter>
    </Dialog>
  )
}

const deleteButtonStyle: IButtonStyles = {
  root: {
    backgroundColor: '#d40b09',
  },
  rootHovered: {
    backgroundColor: '#d40b09',
  },
}
const Content = styled.div`
  margin-top: -8px;
`
const cancelSttyle: IButtonStyles = {
  root: {
    height: 32,
    background: '#FFFFFF',
    marginRight: 16,
    fontSize: 14,
    borderRadius: 2,
    border: '1px solid #ABAFBA',
  },
}

const delSttyle: IButtonStyles = {
  root: {
    height: 32,
    background: '#DC0706',
    fontSize: 14,
    borderRadius: 2,
  },
}
const styleButton = mergeStyleSets({
  container: {
    marginRight: '16px',
  },
})
