import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Stack, IStackItemStyles } from 'office-ui-fabric-react/lib/Stack'
import { Label } from 'office-ui-fabric-react/lib/Label'
import {
  PrimaryButton,
  IButtonStyles,
  DefaultButton,
} from 'office-ui-fabric-react/lib/Button'
import { mergeStyleSets } from '@uifabric/styling'
import SuggestionsPicker from '../SuggestionsPicker'
import { AirportNoticeAction } from '../../modules/airportNotice'
import {
  TVAS1001,
  CATEGORY_ID_01,
  SUB_CATEGORY_ID_001,
  ITEM_ID_001,
  ITEM_ID_002,
  ITEM_ID_003,
  ITEM_ID_004,
} from '../../util/constants'
import useGetItemName from '../../hooks/useGetItemName'
import * as messages from '../../util/MessageIdConstants'
import { setErrorMssg } from '../../util/string'

// eslint-disable-next-line @typescript-eslint/camelcase
export default function AirportNotice_FormSearch(props) {
  const dispatch = useDispatch()
  const [airportCode, setAirportCode] = useState('')
  const [err, setErr] = useState('')

  const mess = useSelector(state => state.ui.messages)
  const domIntAirportInfoList = useSelector(
    state => state.ui.domIntAirportInfoList,
  )
  const deleteEnable: boolean = useSelector(
    state =>
      state.airportNoticeInfo &&
      state.airportNoticeInfo.airportCode !== '' &&
      state.airportNoticeInfo.noticeSeqInfoListDelete.length !== 0,
  )
  const createEnable: boolean = useSelector(
    state =>
      state.airportNoticeInfo &&
      state.airportNoticeInfo.airportCode !== '' &&
      state.airportNoticeInfo.noticeSeqInfoListDelete.length !== 0,
  )
  const noticeSeqInfoListUpdate = useSelector(
    state => state.airportNoticeInfo.noticeSeqInfoListUpdate,
  )

  const pickerChangeValue = value => {
    if (value[0] === undefined) {
      setErr('Required.')
      dispatch<ValueOf<AirportNoticeAction>>({
        type: 'AirportNotice.SetAirportCode',
        payload: {
          airportCode: '',
          APAN1001Status: 'INITIAL',
          clearList: [],
        },
      })
      return
    }
    setAirportCode(value[0].key)
    if (value[0].key) {
      setErr('')
    }

    mess.forEach(val => {
      if (val.key) {
        dispatch({
          type: 'UI.RemoveMessage',
          payload: val.key,
        })
      }
    })
    dispatch<ValueOf<AirportNoticeAction>>({
      type: 'AirportNotice.SetAirportCode',
      payload: {
        airportCode: value[0].key,
        APAN1001Status: 'NEED_TO_REFRESH',
      },
    })
  }
  function showNoticeUpdateModal() {
    mess.forEach(val => {
      if (val.key) {
        dispatch({
          type: 'UI.RemoveMessage',
          payload: val.key,
        })
      }
    })
    if (
      airportCode === null ||
      airportCode === undefined ||
      airportCode.trim() === ''
    ) {
      setErr('Required.')
      return true
    }
    if (err) return
    props.setNoticeData(true, 'M', noticeSeqInfoListUpdate),
      dispatch({
        type: 'AirportNotice.ShowNoticeModal',
        payload: 'UPDATE',
      })
  }
  function showNoticeDeleteModal() {
    dispatch({
      type: 'AirportNotice.ShowNoticeModal',
      payload: 'DELETE',
    })
  }
  const deleteButtonStyle: IButtonStyles = {
    root: {
      backgroundColor: '#DC0706',
      color: '#FFFFFF',
      fontWeight: 600,
      fontSize: 14,
      lineHeight: 19,
      marginRight: 16,
    },
  }
  const getItemName = useGetItemName(
    TVAS1001,
    CATEGORY_ID_01,
  )(SUB_CATEGORY_ID_001)

  const airCodeLabel = getItemName(ITEM_ID_002) || '空港コード'
  function setAirCodeErrMsg(airCode): string {
    if (!airCode || !airCode.length) {
      return setErrorMssg(messages.MZPZZMG00C012, airCodeLabel)
    }
    if (airCode.length !== 3) {
      return setErrorMssg(messages.MZPZZMG00C008, airCodeLabel, '3')
    }
    if (!airCode.match(/^[A-Z]{3}$/)) {
      return setErrorMssg(messages.MZPZZMG00C009, airCodeLabel)
    }

    return ''
  }

  return (
    <Stack styles={headerStack}>
      <Label styles={titleStyle}>{getItemName(ITEM_ID_001) || 'TEST'}</Label>

      <Stack styles={headerTitleStyle}>
        <SuggestionsPicker
          label={getItemName(ITEM_ID_002) || 'AIRPORT'}
          suggestions={domIntAirportInfoList.map(v => ({
            key: v,
            name: v,
          }))}
          onChange={v => pickerChangeValue(v)}
          itemLimit={1}
          className={airportListStyle.root}
          errorMessage={err || ''}
          onInputChange={value => {
            setErr(setAirCodeErrMsg(value))
            return value
          }}
        />
        <Stack style={{ flexDirection: 'row' }}>
          <PrimaryButton
            type="submit"
            text={getItemName(ITEM_ID_004) || 'DELETE'}
            styles={deleteButtonStyle}
            disabled={!deleteEnable}
            onClick={() => showNoticeDeleteModal()}
          />
          <DefaultButton
            type="submit"
            text={getItemName(ITEM_ID_003) || 'SUBMIT'}
            onClick={() => showNoticeUpdateModal()}
            styles={registButtonStyle}
            disabled={createEnable}
          />
        </Stack>
      </Stack>
    </Stack>
  )
}

const headerStack: IStackItemStyles = {
  root: {
    flex: 1,
    height: 168,
    padding: '22px 32px 32px 32px',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
  },
}

const headerTitleStyle: IStackItemStyles = {
  root: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}

const titleStyle: IStackItemStyles = {
  root: {
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '24px',
    lineHeight: '32px',
    letterSpacing: '0.03em',
    color: '#0B308E',
  },
}

const registButtonStyle: IButtonStyles = {
  root: {
    backgroundColor: '#FFFFFF',
    color: '#353F58',
    border: '1px solid #ABAFBA',
    width: 100,
    height: 32,
    fontSize: 14,
    fontWeight: 600,
    lineHeight: 19,
  },
}

const airportListStyle = mergeStyleSets({
  root: {
    overflowX: 'auto',
    overflowY: 'auto',
    maxHeight: 300,
    width: 260,
  },
})
