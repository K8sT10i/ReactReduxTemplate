import produce from 'immer'
import requireContext from 'require-context.macro'
import { configure, addParameters, addDecorator } from '@storybook/react'
// import bootstrap from '../src/stories/bootstrap'
import { BrowserRouter as Router } from 'react-router-dom'
import React from 'react'
import { Customizer } from 'office-ui-fabric-react/lib/Utilities'
import { initializeIcons } from '@uifabric/icons'
import createStoreProvider from '../src/createStoreProvider'
import { GlobalStyle, customizations } from '../src/theme'
import { rootReducer } from '../src/modules'
import stub from '../stub/data'

import 'ress/dist/ress.min.css'
import '../src/fonts/notosansjp.css'

configure(function bootstrap() {
  initializeIcons()

  const { Provider } = createStoreProvider(
    rootReducer,
    produce(stub, draft => {
      draft.profile.basicInfo = {}
    }),
  )

  addDecorator(story => (
    <Provider>
      <GlobalStyle />
      <Customizer {...customizations}>
        <Router>{story()}</Router>
      </Customizer>
    </Provider>
  ))
}, module)

configure(function loadStories() {
  const src = requireContext('../src', true, /\.stories\.tsx?$/)
  src.keys().forEach(src)
}, module)

// configure(function loadStories() {
//   const docs = requireContext('../docs', true, /\.stories\.tsx?$/)
//   docs.keys().forEach(docs)
// }, module)

// configure(function loadStories() {
//   const deprecated = requireContext('../src', true, /_story\.tsx?$/)
//   deprecated.keys().forEach(deprecated)
// }, module)
