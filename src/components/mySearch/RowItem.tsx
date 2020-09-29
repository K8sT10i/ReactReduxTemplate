import React, { useState } from 'react'
import styled from 'styled-components/macro'
import { Icon } from 'office-ui-fabric-react/lib/Icon'
import { useDispatch, useSelector } from 'react-redux'
import DialogDel from './DialogDel'
import BtnDel from './BtnDel'
import { SearchCondition as CeRecordSearchCondition } from '../../modules/searchForCeRecord'
import { SearchCondition as VipSearchCondition } from '../../modules/searchForVIP'
import { SearchCondition as TaskSearchCondition } from '../../modules/searchForTask'
import { SearchTab } from '../../modules/ui/state'
import { TVVP1001, TVFL1001 } from '../../util/constants'
import { useRouter } from '../../hooks'

type Iprops = {
  title: string
  data: {
    searchPtrnSeq: string
    screenId: string
    searchPtrnName: string
    searchPtrn: string
  }
}
export default function RowItem({ data, title }: Iprops) {
  const [showBtnDel, setShowBtnDel] = useState(false)
  const [DiaLogShow, setDiaLogShow] = useState(false)
  const dispatch = useDispatch()
  const arrayMess = useSelector(state => state.ui.messages)

  const removeMessage = () => {
    setTimeout(
      () =>
        arrayMess.forEach(val => {
          if (val.key)
            dispatch({
              type: 'UI.RemoveMessage',
              payload: val.key,
            })
        }),
      1000,
    )
  }
  const onDeleteSearch = () => {
    dispatch({
      type: 'ModifySearch.UpdateMySearch',
      payload: {
        updateType: 'D',
        screenId: data.screenId,
        searchPtrnName: data.searchPtrnName,
        searchPtrnSeq: data.searchPtrnSeq,
        APMS1001Status: 'NEED_TO_REFRESH',
        searchPtrn: data.searchPtrn,
      },
    })
  }

  const {
    location: { pathname },
    history,
  } = useRouter()
  const url = `/search`
  const onMoveScreen = () => {
    if (!pathname.match(/^\/search$/)) history.push(decodeURIComponent(url))
    let tabName: SearchTab = 'ceRecord'
    let actionType

    switch (data.screenId) {
      case TVFL1001:
        tabName = 'ceRecord'
        actionType = 'SearchForCeRecord.MergeCondition'
        break
      case TVVP1001:
        tabName = 'vip'
        actionType = 'SearchForVIP.MergeCondition'
        break
      default:
        tabName = 'notice'
        actionType = 'SearchForTask.MergeCondition'
        break
    }

    const searchPtrnCondition:
      | Partial<CeRecordSearchCondition>
      | Partial<VipSearchCondition>
      | Partial<TaskSearchCondition> = JSON.parse(data.searchPtrn)

    dispatch({
      type: 'UI.SetSearchTab',
      payload: tabName,
    })

    dispatch({
      type: actionType,
      payload: searchPtrnCondition,
    })

    dispatch({
      type: 'UI.SetModalSearchConditionShow',
      payload: false,
    })
    removeMessage()
  }
  return (
    <Item>
      <SpanItem
        onClick={() => {
          onMoveScreen()
        }}
      >
        <SearchIcon />
        {title}
      </SpanItem>
      <OpbtnPanel>
        <BtnDel
          show={showBtnDel}
          setShowDialog={() => {
            removeMessage()
            setDiaLogShow(!DiaLogShow)
          }}
          hidenBtnDel={() => setShowBtnDel(!showBtnDel)}
        />
        <MoreBtn
          onClick={() => {
            setShowBtnDel(!showBtnDel)
          }}
        />
      </OpbtnPanel>
      {/* DIALOG DELETE Or Cancel */}
      <DialogDel
        DiaLogShow={DiaLogShow}
        DiaLogHiden={() => {
          setDiaLogShow(!DiaLogShow)
        }}
        onclickdel={() => onDeleteSearch()}
      />
    </Item>
  )
}

const SearchIcon = styled(Icon).attrs(() => ({
  iconName: 'Search',
}))`
  font-size: 14px;
  color: #686d7e;
  padding-right: 15px;
  &:hover {
    color: #686d7e;
    transform: scale(1.1);
    transition: all 800ms;
  }
`
const MoreBtn = styled(Icon).attrs(() => ({
  iconName: 'More',
}))`
  line-height: 40px;
  width: 40px;
  text-align: center;
  font-size: 14px;
  color: #686d7e;
  &:hover {
    box-shadow: 1px 2px 5px #ccc;
    /* transform: scale(1.1); */
    transition: all 1000ms;
  }
`
const Item = styled.div`
  font-size: 14px;
  color: #353f58;
  background-color: white;
  font-style: inherit;
  font-weight: bold;
  position: relative;
  letter-spacing: 3%;
  line-height: 44px;
  border-bottom: 1px solid #edeff5;
  padding-left: 16px;
  &:hover {
    transition: all 1s;
    background-color: rgba(0, 50, 200, 0.04);
    cursor: pointer;
  }
`
const OpbtnPanel = styled.div`
  display: inline-block;
  position: absolute;
  right: 2px;
`
const SpanItem = styled.span`
  display: inline-block;
  width: 100%;
`
