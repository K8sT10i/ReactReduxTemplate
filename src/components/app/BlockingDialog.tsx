import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Icon } from 'office-ui-fabric-react/lib/Icon'
import { Stack } from 'office-ui-fabric-react/lib/Stack'
import { color } from '../../theme'
import { LargeBold } from '../typography'
import Dialog from '../fabric/Dialog'
import { useRouter } from '../../hooks'
import { MZPZZMG00C035, MZPZZMG00C036 } from '../../util/MessageIdConstants'

export default function BlockingDialog() {
  const { history } = useRouter()
  const dispatch = useDispatch()
  const message = useSelector(state => state.ui.blockingMessages[0])
  const lang = useSelector(state => state.ui.lang)
  if (!message) {
    return null
  }

  return (
    <Dialog
      title={_title(message.title, message.type)}
      subText={message.subText}
      buttonText={
        (message.type && message.type === 'error') ||
        message.type === 'blockEdit'
          ? 'OK'
          : lang === 'ja'
          ? MZPZZMG00C035
          : MZPZZMG00C036
      }
      isBlocking
      hidden={false}
      onSubmit={() => {
        if (message.url) {
          history.push(message.url)
        }
        dispatch({
          type: 'UI.RemoveBlockingMessage',
          payload: message.key,
        })
      }}
    />
  )
}
function _title(value: string, type?: string): JSX.Element {
  return (
    <Stack horizontal verticalAlign="center" childrenGap="8 8">
      {type && type === 'error' ? (
        <>
          <Icon
            style={{
              color: `${color.attentionRed}`,
              fontSize: '20px',
              lineHeight: '24px',
            }}
            iconName="ErrorBadge"
          />
        </>
      ) : (
        <></>
      )}
      <LargeBold style={{ lineHeight: '32px' }}>{value}</LargeBold>
    </Stack>
  )
}
