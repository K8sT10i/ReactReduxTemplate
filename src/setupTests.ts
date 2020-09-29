/* eslint-disable @typescript-eslint/no-explicit-any */

// Make it easier to see the differences when changing styles with styled-components
// import 'jest-styled-components'
import _flatMap from 'lodash/flatMap'
// eslint-disable-next-line no-restricted-imports
import { Stylesheet, InjectionMode } from '@uifabric/merge-styles'

// It seems that there is no Array # flatMap () method in Jest's execution environment (Node.js), so add polyfill.
if (!('flatMap' in Array.prototype)) {
  ;(Array.prototype as any).flatMap = function flatMap(
    this: any,
    callback: Function,
    thisArg = this,
  ) {
    return _flatMap(thisArg, callback)
  }
}

// When taking a snapshot, control the serial number attached to the CSS class name as much as possible so that there is no extra difference.
// https://github.com/OfficeDev/office-ui-fabric-react/blob/97eaa2d0347b8ab1a6ee47a241693610b3029d18/packages/merge-styles/src/styleToClassName.test.ts#L13
// https://github.com/OfficeDev/office-ui-fabric-react/blob/97eaa2d0347b8ab1a6ee47a241693610b3029d18/packages/utilities/src/object.ts#L86
const _stylesheet = Stylesheet.getInstance()
_stylesheet.setConfig({ injectionMode: InjectionMode.none })
beforeEach(() => {
  _stylesheet.reset()
})
