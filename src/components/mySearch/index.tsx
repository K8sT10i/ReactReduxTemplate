/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components/macro'
import Main from './Main'
import { theme } from '../../theme'

type IProps = {
  modalShow?: boolean
  hideModal: () => void
}
export default function index({ modalShow, hideModal }: IProps) {
  const arrayMess = useSelector(state => state.ui.messages)
  const Dispatch = useDispatch()
  const removeMessage = () => {
    setTimeout(
      () =>
        arrayMess.forEach(val => {
          if (val.key)
            Dispatch({
              type: 'UI.RemoveMessage',
              payload: val.key,
            })
        }),
      1000,
    )
  }
  return modalShow ? (
    <>
      <Container
        onClick={() => {
          hideModal()
          removeMessage()
        }}
      />
      <ContainerContent>
        <MySearchPage>
          <Main />
        </MySearchPage>
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
  background-color: rgba(0, 0, 0, 0.5);
  cursor: default;
  z-index: 1;
`
const ContainerContent = styled.div`
  position: fixed;
  left: 0px;
  top: 0px;
  right: 0px;
  z-index: 2;
  cursor: default;
`
const MySearchPage = styled.div`
  position: absolute;
  width: 540px;
  overflow: auto;
  max-height: 90vh;
  line-height: 30px;
  background-color: white;
  top: 40px;
  right: 10px;
  border: 1px solid white;
  border-radius: 8px;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
  z-index: 2;
  cursor: default;
  padding-bottom: 16px;
  &::-webkit-scrollbar {
    width: 12px;
    border-radius: 8px;
    background-color: ${theme.palette.whiteTranslucent40};
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 8px;
    background-color: ${theme.palette.blackTranslucent40};
    /* background-image: -webkit-gradient(
      linear,
      40% 0%,
      75% 84%,
      from(#4D9c41),
      to(#19911d),
      color-stop(0.1, #54de5d)
    ); */
  }
`
