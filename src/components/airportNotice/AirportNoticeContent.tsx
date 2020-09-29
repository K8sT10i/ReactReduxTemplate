import React, { useState, useEffect } from 'react'
import styled from 'styled-components/macro'
import { Checkbox, ICheckboxStyles } from 'office-ui-fabric-react/lib/Checkbox'

import {
  Stack,
  IStackItemStyles,
} from 'office-ui-fabric-react/lib/components/Stack'
import { Label, ILabelStyles } from 'office-ui-fabric-react/lib/Label'
import { useDispatch, useSelector } from 'react-redux'
import { ActionButton, IButtonStyles } from 'office-ui-fabric-react/lib/Button'
import { AirportNoticeAction } from '../../modules/airportNotice'
import * as day from '../../util/day'
import {
  ITEM_ID_005,
  SUB_CATEGORY_ID_002,
  CATEGORY_ID_01,
  SUB_CATEGORY_ID_001,
  TVAS1001,
} from '../../util/constants'
import useGetItemName from '../../hooks/useGetItemName'

type Props = {
  data: NoticeContent
}
type NoticeContent = {
  airportNoticeSeq: string
  noticeContent: string
  dispEndDatetime: string
  updateSystemDateTime: string
}

export function AirportNoticeContent(props) {
  const [active, setActive] = useState(false)
  const dispatch = useDispatch()
  const deleteNoticeList = useSelector(
    state => state.airportNoticeInfo.noticeSeqInfoListDelete,
  )

  const editEnable: boolean = useSelector(
    state =>
      state.airportNoticeInfo &&
      state.airportNoticeInfo.airportCode !== '' &&
      state.airportNoticeInfo.noticeSeqInfoListDelete.length !== 0,
  )

  const checkBoxOnchange = (data: NoticeContent) => {
    if (active) {
      for (let i = deleteNoticeList.length - 1; i >= 0; i--) {
        if (deleteNoticeList[i].airportNoticeSeq === data.airportNoticeSeq) {
          deleteNoticeList.splice(i, 1)
        }
      }
    } else {
      const { noticeContent, dispEndDatetime, ...deleteData } = data
      deleteNoticeList.push(deleteData)
    }
    dispatch<ValueOf<AirportNoticeAction>>({
      type: 'AirportNotice.SetListNoticeDelete',
      payload: {
        noticeSeqInfoListDelete: deleteNoticeList,
      },
    })
    setActive(!active)
  }
  function showNoticeUpdateModal() {
    props.setNoticeData(true, 'U', props.data)
    dispatch({
      type: 'AirportNotice.ShowNoticeModal',
      payload: 'UPDATE',
    })
  }
  const stackItemContentStyle: IStackItemStyles = {
    root: {
      flex: 1,
      flexDirection: 'row',
      padding: '22px 28px 22px 32px',
      justifyContent: 'flex-start',
      width: '100%',
      minHeight: 100,
      backgroundColor: active === true ? '#f6f7fb' : 'white',
    },
  }
  const getItemName = useGetItemName(
    TVAS1001,
    CATEGORY_ID_01,
  )(SUB_CATEGORY_ID_001)

  return (
    <>
      <Stack key={props.data.airportNoticeSeq} styles={stackContainerStyle}>
        <Stack styles={stackItemHeaderStyle} />
        <Stack styles={stackItemContentStyle}>
          <Stack style={{ width: 52, marginTop: 10 }}>
            <Checkbox
              onChange={() => checkBoxOnchange(props.data)}
              styles={checkBoxStyle}
            />
          </Stack>
          <Stack
            style={{
              flex: 1,
              flexDirection: 'column',
            }}
          >
            <Label styles={labelTimeStyle}>
              {''.concat(
                props.data.dispEndDatetime === null ||
                  props.data.dispEndDatetime === undefined ||
                  props.data.dispEndDatetime.length === 0
                  ? day.formatDDMMMYY('9999/12/31')
                  : day.formatDDMMMYY(props.data.dispEndDatetime),
              )}
            </Label>
            <Label styles={labelContentStyle}>{props.data.noticeContent}</Label>
          </Stack>
          <Stack style={{ flexDirection: 'row-reverse', width: 60 }}>
            <ActionButton
              disabled={editEnable}
              styles={editButtonStyle}
              onClick={() => showNoticeUpdateModal()}
            >
              {getItemName(ITEM_ID_005) || 'TEST'}
            </ActionButton>
          </Stack>
        </Stack>
      </Stack>
    </>
  )
}

export default function AirportNoticeContentList(props) {
  const elmContent = props.data.map((v, k) => {
    return (
      <AirportNoticeContent
        setNoticeData={props.setNoticeData}
        key={k}
        data={v}
      />
    )
  })
  return <Container>{elmContent}</Container>
}
const Container = styled.div`
  position: relative;
  padding: 10px 0px;
`
const stackContainerStyle: IStackItemStyles = {
  root: {
    flex: 1,
    flexDirection: 'column',
  },
}

const stackItemHeaderStyle: IStackItemStyles = {
  root: {
    width: '100%',
    background: '#f1f1f6',
    height: 10,
  },
}

const checkBoxStyle: ICheckboxStyles = {
  root: {
    justifyContent: 'flex-start',
  },
}

const editButtonStyle: IButtonStyles = {
  root: {
    color: '#0646C6',
    textAlign: 'right',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '14px',
    lineHeight: '24px',
  },
}

const editButtonDisableStyle: ILabelStyles = {
  root: {
    marginTop: 10,
    justifyContent: 'center',
    color: 'gray',
    textAlign: 'center',
  },
}

const labelContentStyle: ILabelStyles = {
  root: {
    color: '#353f58',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '14px',
    lineHeight: '24px',
    letterSpacing: '0.03em',
    whiteSpace: 'pre-wrap',
  },
}

const labelTimeStyle: ILabelStyles = {
  root: {
    color: '#353f58',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '14px',
    lineHeight: '24px',
    letterSpacing: '0.03em',
    verticalAlign: 'top',
    paddingBottom: 16,
  },
}
