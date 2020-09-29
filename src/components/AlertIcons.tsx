import React from 'react'
import styled from 'styled-components/macro'
import { Stack } from 'office-ui-fabric-react/lib/Stack'

export type Type = 'VipCode' | 'Alert' | 'Medical' | 'AMCStatus' | 'Million'
export type VipCode = 'V1' | 'V2' | 'V3' | 'C1' | 'C2' | 'C3'
export type AMCCode = 'DIA' | 'PLT' | 'BRZ'

type Props = {
  Type: Type
  DspVipCode?: VipCode
  AMCCode?: AMCCode
}

export default function AlertIcons({ Type, DspVipCode, AMCCode }: Props) {
  return (
    <Stack horizontal disableShrink>
      {Type === 'VipCode' ? (
        <span style={{ alignItems: 'center' }}>
          <VipCodeIcon>
            <Text>{DspVipCode}</Text>
          </VipCodeIcon>
        </span>
      ) : null}
      {Type === 'Alert' ? (
        <Stack horizontal disableShrink>
          <span style={{ alignItems: 'center' }}>
            <Alert />
          </span>
          <span style={{ alignItems: 'center' }}>
            <AlertIcon>
              <Text>!</Text>
            </AlertIcon>
          </span>
        </Stack>
      ) : null}
      {Type === 'Medical' ? (
        <span style={{ alignItems: 'center' }}>
          <Medical>
            <Text>+</Text>
          </Medical>
        </span>
      ) : null}
      {Type === 'AMCStatus' ? (
        <span style={{ alignItems: 'center' }}>
          <AMCStatus>
            <Text>{AMCCode}</Text>
          </AMCStatus>
        </span>
      ) : null}
      {Type === 'Million' ? (
        <span style={{ alignItems: 'center' }}>
          <Million>
            <Text>Million</Text>
          </Million>
        </span>
      ) : null}
    </Stack>
  )
}

const VipCodeIcon = styled.div`
  border-radius: 50%;
  color: white;
  background-color: #ffb800;
  width: 32px;
  height: 32px;
  position: relative;
  font-weight: bold;
  line-height: 32px;
`

const Text = styled.p`
  margin: 0;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  left: 50%;
  margin-right: -50%;
`
const Alert = styled.div`
  margin-left: 8px;
  width: 20px;
  height: 20px;
  text-align: center;
  color: transparent;
  border-radius: 0px 0px 2px 2px;
  border-left: 16px solid transparent;
  border-right: 16px solid transparent;
  border-top: 0px;
  border-bottom: 32px solid #ff8a00;
`

const AlertIcon = styled.div`
  border-radius: 50%;
  color: white;
  background-color: transparent;
  width: 32px;
  height: 32px;
  position: relative;
  margin-top: 3px;
  margin-left: -32px;
  font-weight: bold;
`

const Medical = styled.div`
  margin-left: 8px;
  border-radius: 2px;
  background-color: #ee1c23;
  width: 32px;
  height: 32px;
  text-align: center;
  color: white;
  position: relative;
  font-weight: bold;
  font-size: 32px;
  line-height: 32px;
`

const AMCStatus = styled.div`
  border-radius: 2px;
  margin-left: 8px;
  background-color: #962b44;
  width: 44px;
  height: 32px;
  text-align: center;
  color: white;
  position: relative;
  font-weight: bold;
`

const Million = styled.div`
  margin-left: 8px;
  border-radius: 2px;
  background-color: #918367;
  width: 71px;
  height: 32px;
  text-align: center;
  color: white;
  position: relative;
  font-weight: bold;
`
