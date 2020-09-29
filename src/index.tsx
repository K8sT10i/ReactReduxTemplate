import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { Redirect } from 'react-router'
import React, { lazy } from 'react'
import { Customizer } from 'office-ui-fabric-react/lib/Utilities'
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons'
import { GlobalStyle, customizations } from './theme'
import { rootReducer } from './modules'
import createStoreProvider from './createStoreProvider'
import App from './components/app/App'
import NotFound from './pages/not-found'

import 'ress/dist/ress.min.css'
import './fonts/notosansjp.css'

initializeIcons('./')

const { Provider } = createStoreProvider(rootReducer)

const pages: React.ComponentProps<typeof App>['pages'] = [
  { path: '/', component: () => <Redirect to="/search/notice" /> },
  {
    path: '/profile',
    component: lazy(() => import('./pages/profile')),
  },
  {
    path: '/ce-record',
    component: lazy(() => import('./pages/ce-record')),
  },
  { path: '/search', component: lazy(() => import('./pages/search')) },
  {
    path: '/search/ce-record',
    component: lazy(() => import('./pages/search-result-ce-record')),
  },
  {
    path: '/search/vip',
    component: lazy(() => import('./pages/search-result-vip')),
  },
  {
    path: '/search/notice',
    component: lazy(() => import('./pages/search-result-notice')),
  },
  {
    path: '/airport-db-maintenance',
    component: lazy(() => import('./pages/airport-db-maintenance')),
  },
  {
    path: '/airportNotice',
    component: lazy(() => import('./pages/airportNotice')),
  },
  { path: '/login', component: lazy(() => import('./pages/login')) },
  { component: NotFound },
]

ReactDOM.render(
  <Provider>
    <GlobalStyle />
    <Customizer {...customizations}>
      <Router>
        <App pages={pages} />
      </Router>
    </Customizer>
  </Provider>,
  document.getElementById('root'),
)
