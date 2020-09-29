import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components/macro'
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner'
import { Icon } from 'office-ui-fabric-react/lib/Icon'
import useGetItemName from '../../hooks/useGetItemName'
import {
  TVMS1002,
  CATEGORY_ID_01,
  SUB_CATEGORY_ID_001,
  ITEM_ID_003,
  ITEM_ID_004,
  ITEM_ID_005,
  ITEM_ID_006,
} from '../../util/constants'

type IDProps = {
  DiaLogShow?: boolean
  DiaLogHiden: () => void
  onclickdel: () => void
}
export default function DialogDel({
  DiaLogShow,
  DiaLogHiden,
  onclickdel,
}: IDProps) {
  const loading = useSelector(
    state =>
      state.modifySearch && state.modifySearch.APMS1001Status === 'LOADING',
  )
  const getItemName = useGetItemName(
    TVMS1002,
    CATEGORY_ID_01,
  )(SUB_CATEGORY_ID_001)

  return DiaLogShow ? (
    <>
      <Container onClick={() => DiaLogHiden()} />
      <ContainerContent>
        <Dialog>
          <Title>{getItemName(ITEM_ID_003) || 'TEST'}</Title>
          <CloseIcon onClick={() => DiaLogHiden()} />
          <Content>{getItemName(ITEM_ID_004) || 'TEST?'}</Content>
          <Footter>
            <CanLBtn
              onClick={() => {
                DiaLogHiden()
              }}
            >
              {getItemName(ITEM_ID_005) || 'CANCEL'}
            </CanLBtn>
            {loading ? (
              <Deleting>
                <Spinner
                  label="Deleting..."
                  ariaLive="assertive"
                  labelPosition="right"
                  size={SpinnerSize.small}
                />
              </Deleting>
            ) : (
              <DelBtn
                onClick={() => {
                  onclickdel()
                  DiaLogHiden()
                }}
              >
                {getItemName(ITEM_ID_006) || 'DELETE'}
              </DelBtn>
            )}
          </Footter>
        </Dialog>
      </ContainerContent>
    </>
  ) : (
    <></>
  )
}
const Container = styled.div`
  position: fixed;
  left: 0px;
  top: 0px;
  right: 0px;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.005);
  cursor: default;
  z-index: 1;
`
const ContainerContent = styled.div`
  position: fixed;
  left: 0px;
  top: 0px;
  z-index: 2;
  cursor: default;
`
const Dialog = styled.div`
  position: fixed;
  width: 416px;
  height: 154px;
  background-color: white;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  border-radius: 3px;
  box-shadow: 2px 5px 5px rgba(0, 0, 0, 0.2);
  z-index: 2;
  padding: 12px 24px;
`
const Title = styled.label`
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 3%;
  line-height: 20px;
  color: #353f58;
`
const Content = styled.label`
  display: flex;
  line-height: 20px;
  font-size: 14px;
  font-weight: normal;
  letter-spacing: 3%;
  color: #353f58;
`
const Deleting = styled.button`
  background-color: #dc0706;
  text-align: center;
  font-size: 12px;
  color: white;
  border-radius: 3px;
  border-inline: 1px solid #dc0706;
  padding: 2px 16px;
  margin-left: 7px;
`
const DelBtn = styled.button`
  background-color: #dc0706;
  text-align: center;
  font-size: 14px;
  color: white;
  border-radius: 3px;
  border: 1px solid #dc0706;
  margin-left: 7px;
  padding: 2px 18px;
  font-weight: normal;
`
const CanLBtn = styled.button`
  background-color: white;
  font-size: 14px;
  text-align: center;
  color: #353f58;
  border: 1px solid #abafba;
  border-radius: 3px;
  padding: 2px 18px;
`
const Footter = styled.div`
  text-align: right;
  line-height: 28px;
  position: absolute;
  right: 24px;
  bottom: 24px;
`
const CloseIcon = styled(Icon).attrs(() => ({
  iconName: 'Cancel',
}))`
  :hover {
    cursor: pointer;
  }
  font-size: 14px;
  color: #686d7e;
  padding-right: 15px;
  position: absolute;
  top: 8px;
  right: 8px;
`
