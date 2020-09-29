import { storiesOf } from '@storybook/react'
import React from 'react'
import styled from 'styled-components/macro'
import Avatar from './Avatar'

storiesOf(`COMPONENTS|Avatar`, module)
  .addDecorator(story => <Container>{story()}</Container>)
  .add('Avatar', () => <Avatar />)

const Container = styled.div`
  padding: 20px;
`
