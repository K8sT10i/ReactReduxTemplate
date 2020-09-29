import styled from 'styled-components/macro'
import { FontSizes } from '@uifabric/fluent-theme'

const mohicanBlue = '#00a7ea'

const AreaHeading = styled.h3`
  font-size: ${FontSizes.size18};
  padding-left: 8px;
  border-left: 2px solid ${mohicanBlue};
  color: rgba(0, 0, 0, 0.85);
`

export default AreaHeading
