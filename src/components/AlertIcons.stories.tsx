import { storiesOf } from '@storybook/react'
import React from 'react'
import styled from 'styled-components/macro'
import AlertIcons from './AlertIcons'

storiesOf(`COMPONENTS|AlertIcons`, module)
  .addDecorator(story => <Container>{story()}</Container>)
  .add('VipCode', () => <AlertIcons Type="VipCode" VipCode="V1" />)
  .add('Alert', () => <AlertIcons Type="Alert" />)
  .add('Medical', () => <AlertIcons Type="Medical" />)
  .add('AMCStatus', () => <AlertIcons Type="AMCStatus" AMCCode="DIA" />)
  .add('Million', () => <AlertIcons Type="Million" />)

const Container = styled.div`
  padding: 20px;
`
