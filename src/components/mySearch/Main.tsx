import React from 'react'
import { useSelector } from 'react-redux'
import styled, { keyframes } from 'styled-components/macro'
import RowItem from './RowItem'
import {
  TVFL1001,
  TVVP1001,
  TVTT1001,
  TVMS1002,
  ITEM_ID_001,
  CATEGORY_ID_01,
  SUB_CATEGORY_ID_001,
  TVZZ1001,
  SUB_CATEGORY_ID_000,
  ITEM_ID_002,
  ITEM_ID_003,
  CATEGORY_ID_03,
} from '../../util/constants'
import useGetItemName from '../../hooks/useGetItemName'

export default function Main(prop) {
  const checkLoading = useSelector(
    state => state.mySearch.APMS1002Status === 'LOADING',
  )
  const dataCE = useSelector(state =>
    state.mySearch.searchPtrnInfo.filter(item => item.screenId === TVFL1001),
  )
  const dataVip = useSelector(state =>
    state.mySearch.searchPtrnInfo.filter(item => item.screenId === TVVP1001),
  )
  const dataTask = useSelector(state =>
    state.mySearch.searchPtrnInfo.filter(item => item.screenId === TVTT1001),
  )
  const elementGroupCE = dataCE.map((v, k) => {
    return (
      <div key={k.toString()}>
        <RowItem title={v.searchPtrnName} data={v} />
      </div>
    )
  })

  const elementGroupVip = dataVip.map((v, k) => {
    return (
      <div key={k.toString()}>
        <RowItem title={v.searchPtrnName} data={v} />
      </div>
    )
  })
  const elementGroupTask = dataTask.map((v, k) => {
    return (
      <div key={k.toString()}>
        <RowItem title={v.searchPtrnName} data={v} />
      </div>
    )
  })
  const getItemName = useGetItemName(
    TVMS1002,
    CATEGORY_ID_01,
  )(SUB_CATEGORY_ID_001)
  const getItemNameScreen = useGetItemName(
    TVZZ1001,
    CATEGORY_ID_03,
  )(SUB_CATEGORY_ID_000)
  return (
    <ContainerContent>
      <MyTitle>{getItemName(ITEM_ID_001) || 'TITLE'}</MyTitle>
      <GroupScreen>{getItemNameScreen(ITEM_ID_001) || 'TEST'}</GroupScreen>
      {!checkLoading ? elementGroupCE : <Rotate />}
      <GroupScreen>{getItemNameScreen(ITEM_ID_002) || 'VIP'}</GroupScreen>
      {!checkLoading ? elementGroupVip : <Rotate />}
      <GroupScreen>{getItemNameScreen(ITEM_ID_003) || 'TEST'}</GroupScreen>
      {!checkLoading ? elementGroupTask : <Rotate />}
    </ContainerContent>
  )
}

const ContainerContent = styled.div`
  position: relative;
  cursor: default;
  margin-bottom: 10px;
`
const MyTitle = styled.div`
  font-size: 16px;
  line-height: 44px;
  text-align: center;
  font-weight: bold;
  letter-spacing: 3%;
  color: #353f58;
`
const GroupScreen = styled.div`
  font-size: 14px;
  padding-left: 16px;
  line-height: 32px;
  font-weight: 500;
  color: #0f0f0f;
  background-color: #edeff5;
  letter-spacing: 3%;
  color: #686d7e;
`
const rotate = keyframes`
from{
  transform:rotate(0deg);
}
to{
  transform:rotate(360deg);
}
`
const Rotate = styled.div`
  display: inline-block;
  width: 30px;
  height: 30px;
  &::after {
    content: '';
    display: block;
    width: 25px;
    height: 25px;
    margin: 8px;
    border-radius: 50%;
    border: 3px dotted #edeff5;
    border-color: #edeff5 transparent #edeff5 transparent #edeff5 transparent;
    animation: ${rotate} 2s linear infinite;
  }
`
