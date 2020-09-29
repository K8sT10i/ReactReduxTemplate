import React from 'react'
import styled from 'styled-components/macro'
import {
  CATEGORY_ID_01,
  SUB_CATEGORY_ID_001,
  TVMS1002,
  ITEM_ID_002,
} from '../../util/constants'
import useGetItemName from '../../hooks/useGetItemName'

type IProps = {
  show?: boolean
  hidenBtnDel: () => void
  setShowDialog: () => void
}
export default function BtnDel({ hidenBtnDel, show, setShowDialog }: IProps) {
  const getItemName = useGetItemName(
    TVMS1002,
    CATEGORY_ID_01,
  )(SUB_CATEGORY_ID_001)
  return show ? (
    <>
      <ContainerMoreOption
        onClick={() => {
          hidenBtnDel()
        }}
      />
      <MorePanel
        onClick={() => {
          setShowDialog()
          hidenBtnDel()
        }}
      >
        {getItemName(ITEM_ID_002) || 'DELETE'}
      </MorePanel>
    </>
  ) : (
    <></>
  )
}
const ContainerMoreOption = styled.div`
  position: fixed;
  left: 0px;
  top: 0px;
  right: 0px;
  height: 100vh;
  cursor: default;
  z-index: 1;
`
const MorePanel = styled.div`
  font-size: 14px;
  color: #dc0706;
  width: 88px;
  line-height: 20px;
  position: absolute;
  text-align: left;
  font-weight: normal;
  top: 30px;
  right: 0px;
  padding: 9px 8px;
  border: 1 solid gray;
  border-radius: 2px;
  background-color: white;
  box-shadow: 1px 1px 1px 1px gray;
  z-index: 10;
`
