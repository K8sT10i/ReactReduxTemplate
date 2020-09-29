import { storiesOf } from '@storybook/react'
import React from 'react'
import styled from 'styled-components/macro'
import AreaHeading from './AreaHeading'

storiesOf(`COMPONENTS|AreaHeading`, module)
  .addDecorator(story => <Container>{story()}</Container>)
  .add('default', () => <AreaHeading>エリア名</AreaHeading>)

const Container = styled.div`
  padding: 20px;
`
