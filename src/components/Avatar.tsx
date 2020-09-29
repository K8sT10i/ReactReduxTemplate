import styled, { css } from 'styled-components/macro'
import { NeutralColors } from '@uifabric/fluent-theme'
import { contentWidth } from '../theme'

// const internet = false
// window.addEventListener('online', () => {
//   internet
// })

const url = ({
  src,
  fallback = 'unknown',
}: {
  src?: string
  fallback?: string
}) => src || `https://avatars/132/${fallback.replace('/', '-')}.png`

const Avatar = styled.span`
  background-color: ${NeutralColors.gray130};
  background-image: url(${url});
  display: inline-block;
  min-width: 104px;
  min-height: 104px;
  background-size: cover;
  border-radius: 4px;
  @media (min-width: ${contentWidth.maxWidth}px) {
    width: 168px;
    height: 168px;
  }
  ${p => (p.src ? '' : noPhotoMark.join(''))}
`

const noPhotoMark = css`
  ::after {
    content: 'NO PHOTO';
    display: inline-block;
    width: 100%;
    text-align: center;
    margin-top: calc(50% - 0.5em);
    color: white;
    text-shadow: 1px 1px 0.5em black;
    font-weight: bold;
  }
`

export default Avatar
