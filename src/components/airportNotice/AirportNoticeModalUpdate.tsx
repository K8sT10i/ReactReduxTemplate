/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/camelcase */
import React, { useState, useEffect } from 'react'
import { Modal } from 'office-ui-fabric-react/lib/Modal'
import {
  PrimaryButton,
  DefaultButton,
  IconButton,
  IButtonStyles,
} from 'office-ui-fabric-react/lib/Button'
import { useDispatch, useSelector } from 'react-redux'
import { TextField } from 'office-ui-fabric-react/lib/TextField'
import { Stack, IStackStyles } from 'office-ui-fabric-react/lib/Stack'
import { mergeStyleSets } from '@uifabric/styling'
import { Label, ILabelStyles } from 'office-ui-fabric-react/lib/Label'
import { IIconProps } from 'office-ui-fabric-react/lib/Icon'
import { Spinner } from 'office-ui-fabric-react/lib/Spinner'
import { ILayerProps } from 'office-ui-fabric-react/lib/Layer'
import dayjs from 'dayjs'
import DatePicker from '../fabric/DatePicker'
import {
  SUB_CATEGORY_ID_002,
  CATEGORY_ID_01,
  TVAS1001,
  ITEM_ID_001,
  ITEM_ID_003,
  ITEM_ID_005,
  ITEM_ID_004,
  ITEM_ID_006,
  ITEM_ID_002,
} from '../../util/constants'
import useGetItemName from '../../hooks/useGetItemName'

export default function AirportNoticeFormUpdate(props) {
  const airport = useSelector(state => state.airportNoticeInfo.airportCode)
  const dispatch = useDispatch()
  const exitIcon: IIconProps = { iconName: 'Cancel' }
  const loading = useSelector(
    state =>
      state.airportNoticeInfo &&
      state.airportNoticeInfo.APAN1002Status === 'LOADING',
  )
  const [noticeContent, setNoticeContent] = useState('')
  const [endDate, setEndDate] = useState('')
  const [noticeSEQ, setNoticeSEQ] = useState('')
  const [updateSystemDateTime, setUpdateSystemDateTime] = useState('')

  useEffect(() => {
    if (props.noticeData.noticeInfo !== null) {
      setNoticeContent(props.noticeData.noticeInfo.noticeContent)
      setEndDate(
        props.noticeData.noticeInfo.dispEndDatetime === '' ||
          props.noticeData.noticeInfo.dispEndDatetime === null ||
          props.noticeData.noticeInfo.dispEndDatetime === null
          ? '9999/12/31'
          : props.noticeData.noticeInfo.dispEndDatetime,
      )
      setNoticeSEQ(props.noticeData.noticeInfo.airportNoticeSeq)
      setUpdateSystemDateTime(props.noticeData.noticeInfo.updateSystemDateTime)
    } else {
      setNoticeContent('')
      setEndDate('')
      setNoticeSEQ('')
      setUpdateSystemDateTime('')
    }
  }, [props.noticeData.noticeInfo])
  function changeDate(date) {
    setEndDate(date)
  }

  function updateNotice() {
    if (
      !(
        noticeContent === null ||
        noticeContent === undefined ||
        noticeContent.trim() === ''
      )
    ) {
      if (noticeContent.length > 1000) {
        return
      }
    }

    if (
      endDate &&
      new Date().setHours(0, 0, 0, 0) > new Date(endDate).setHours(0, 0, 0, 0)
    ) {
      dispatch({
        type: 'UI.AddMessage',
        payload: {
          message: 'End date must be larger or equal than current date.',
          type: 'error',
        },
      })
      return
    }

    dispatch({
      type: 'AirportNotice.SetAirportNoticeInfoUpdate',
      payload: {
        APAN1002Status: 'NEED_TO_REFRESH',
        updateType: props.noticeData.updateType,
        airportCode: airport,
        noticeSeqInfoListUpdate: [
          {
            airportNoticeSeq: noticeSEQ,
            noticeContent,
            dispEndDatetime: endDate
              ? dayjs(endDate)
                  .format('YYYY/MM/DD')
                  .concat(' 23:59')
              : '',
            updateSystemDateTime,
          },
        ],
      },
    })
  }

  function hideNoticeModal() {
    if (props.noticeData.updateType === 'M') {
      props.setNoticeData(false, '', null)
    }
    dispatch({
      type: 'AirportNotice.ShowNoticeModal',
      payload: 'HIDDEN',
    })
  }

  const modalUpdateShow: boolean = useSelector(
    state =>
      state.airportNoticeInfo && state.airportNoticeInfo.showModal === 'UPDATE',
  )

  const getItemName = useGetItemName(
    TVAS1001,
    CATEGORY_ID_01,
  )(SUB_CATEGORY_ID_002)

  return (
    <Modal
      isOpen={modalUpdateShow}
      subtitleAriaId="Modal"
      containerClassName={styleModal.container}
      layerProps={modalLayerStyle}
    >
      <Stack styles={modalStackHeaderStyle}>
        <Label styles={modalStackHeaderTitleStyle}>
          {getItemName(ITEM_ID_001) || '空港別周知事項'}
        </Label>
        <IconButton iconProps={exitIcon} onClick={() => hideNoticeModal()} />
      </Stack>
      <Stack styles={modalContentStyle}>
        <Stack>
          <Label
            styles={{
              root: {
                fontWeight: 'bold',
                lineHeight: 24,
                left: 16,
                fontSize: 16,
                borderBottom: '2px solid #353F58',
              },
            }}
          >
            {airport}
          </Label>
        </Stack>

        <Stack style={{ flex: 1, marginTop: 4 }}>
          <Label styles={labelTileStyle} style={{ marginTop: 10 }}>
            {getItemName(ITEM_ID_003) || '表示終了日'}
          </Label>
          <DatePicker
            value={!endDate ? undefined : new Date(endDate)}
            style={{ width: '50%', marginTop: 4 }}
            onSelectDate={date => changeDate(date)}
            allowTextInput
          />
          <Label styles={labelTileStyle} style={{ marginTop: 10 }}>
            {getItemName(ITEM_ID_002) || 'TEST'}
          </Label>

          <TextField
            autoFocus
            multiline
            rows={11}
            resizable={false}
            placeholder={getItemName(ITEM_ID_006) || 'TEST'}
            defaultValue={noticeContent}
            onChange={(e, v) =>
              v === undefined ? setNoticeContent('') : setNoticeContent(v!)
            }
            errorMessage={
              noticeContent?.length > 1000 &&
              (noticeContent.length !== null || noticeContent !== undefined)
                ? `${`${getItemName(ITEM_ID_002) ||
                    // eslint-disable-next-line no-useless-concat
                    'TEST'} must be less than 1000 characters.`}`
                : ''
            }
          />
        </Stack>
      </Stack>
      <Stack styles={modalBottomStyle}>
        {loading ? (
          <Spinner
            label={
              props.noticeData.updateType === 'U' ? 'Updating...' : 'Saving...'
            }
            ariaLive="assertive"
            labelPosition="right"
            className={styleButton.container}
          />
        ) : (
          <PrimaryButton
            styles={saveBtnStyle}
            text={getItemName(ITEM_ID_005) || '保存'}
            className={styleButton.container}
            onClick={() => updateNotice()}
          />
        )}

        <DefaultButton
          styles={cancelBtnStyle}
          text={getItemName(ITEM_ID_004) || 'TEST'}
          className={styleButton.container}
          onClick={() => hideNoticeModal()}
        />
      </Stack>
    </Modal>
  )
}
const styleModal = mergeStyleSets({
  container: {
    width: 540,
    height: 492,
    'border-radius': '8px',
  },
})

const styleButton = mergeStyleSets({
  container: {
    marginRight: '16px',
  },
})

const saveBtnStyle: IButtonStyles = {
  label: {
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 16,
    textAlign: 'center',
  },
  root: {
    backgroundColor: '#1A6DFA',
  },
}

const cancelBtnStyle: IButtonStyles = {
  label: {
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 16,
    textAlign: 'center',
  },
}

const modalStackHeaderTitleStyle: ILabelStyles = {
  root: {
    flex: 1,
    textAlign: 'center',
    fontSize: 14,
    color: 'black',
    fontWeight: 'bold',
  },
}

const modalStackHeaderStyle: IStackStyles = {
  root: {
    flexDirection: 'row',
    width: '100%',
    height: 44,
    background: '#F7F7FC',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottom: '1px ridge',
    borderBottomColor: '#f1f1f6',
  },
}
const modalContentStyle: IStackStyles = {
  root: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    padding: '10px 16px 16px 16px',
    borderBottom: '1px ridge',
    borderBottomColor: '#f1f1f6',
  },
}
const labelTileStyle: ILabelStyles = {
  root: {
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: '0.03em',
    color: '#353F58',
  },
}

const modalBottomStyle: IStackStyles = {
  root: {
    marginTop: 16,
    flexDirection: 'row-reverse',
    width: '100%',
    alignItems: 'center',
  },
}

const modalLayerStyle: ILayerProps = {
  styles: {
    root: {
      zIndex: 100000,
    },
  },
}
