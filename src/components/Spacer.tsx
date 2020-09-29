import styled from 'styled-components/macro'

const Spacer = styled.div`
  flex-grow: 1;
  ${(p: { grow?: number }) => p.grow && `flex-grow: ${p.grow};`}
`

export default Spacer
