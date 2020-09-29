import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Layer } from 'office-ui-fabric-react/lib/Layer'
import {
  MessageBar,
  MessageBarType,
} from 'office-ui-fabric-react/lib/MessageBar'
// import { SearchForVIPAction } from '../../modules/searchForVIP'

export default function MessageArea() {
  const messages = useSelector(state => state.ui.messages.slice(-3))
  const dispatch = useDispatch()
  // const searchCompleted: boolean = useSelector(
  //   state =>
  //     state.searchForVIP &&
  //     state.searchForVIP.searchFlag &&
  //     ((state.searchForVIP.APTO1001Status === 'COMPLETE' ||
  //       state.searchForVIP.APTO1002Status === 'COMPLETE') &&
  //       (state.searchForVIP.segmentInfoList.every(
  //         seg => seg.APVP1001Status === 'COMPLETE',
  //       ) ||
  //         state.searchForVIP.segmentInfoList.every(
  //           seg => seg.APVP1002Status === 'COMPLETE',
  //         )) &&
  //       !state.searchForVIP.segmentInfoList.some(
  //         seg =>
  //           seg.APVP1003Status === 'LOADING' ||
  //           seg.APVP1003Status === 'ERROR' ||
  //           seg.APVP1003Status === 'NEED_TO_REFRESH',
  //       ) &&
  //       state.searchForVIP.segmentInfoList
  //         .flatMap(seg => seg.paxInfoList || [])
  //         .filter(v => v)
  //         .every(
  //           pax =>
  //             (pax && pax.APVP1004Status === 'COMPLETE') ||
  //             (pax && pax.APVP1004Status === 'NEED_TO_REFRESH'),
  //         ) &&
  //       state.searchForVIP.segmentInfoList
  //         .flatMap(seg => seg.paxInfoList || [])
  //         .filter(v => v)
  //         .every(pax => pax && pax.APAP1002Status === 'COMPLETE')),
  // )

  return (
    <Layer
      styles={{ content: { width: '50%', minWidth: 560, margin: 'auto' } }}
    >
      {/*
       {searchCompleted ? ( 
        <MessageBar
          key="searchSuccess"
          styles={{ root: { marginTop: 8 } }}
          messageBarType={MessageBarType.success}
          isMultiline={false}
        >
          {(() => {
            setTimeout(
              () =>
                dispatch<ValueOf<SearchForVIPAction>>({
                  type: 'SearchForVIP.SetSearchFlag',
                  payload: false,
                }),
              5000,
            )
          })()}
        </MessageBar>
      ) : null}
    */}
      {messages.map(({ key, type, message }) => (
        <MessageBar
          key={key}
          styles={{ root: { marginTop: 8 } }}
          messageBarType={MessageBarType[type]}
          isMultiline={false}
          onDismiss={() =>
            dispatch({
              type: 'UI.RemoveMessage',
              payload: key,
            })
          }
          dismissButtonAriaLabel="Close"
        >
          {message}
        </MessageBar>
      ))}
    </Layer>
  )
}
