import React, { Suspense } from 'react'
import { useSelector } from 'react-redux'
import { Route, Switch } from 'react-router'
import styled from 'styled-components/macro'
import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator'
import Layout from '../layout/Layout'
import Helmet from './Helmet'
import AuthGuard from './AuthGuard'
import MessageArea from './MessageArea'
import BlockingDialog from './BlockingDialog'
import ErrorBoundary from './ErrorBoundary'
type Props = {
  pages: {
    path?: string
    component: Parameters<typeof React.createElement>[0]
  }[]
}

export default function App({ pages = [] }: Props) {
  const completed = useSelector(state => state.ui.appStatus === 'COMPLETE')

  return (
    <ErrorBoundary>
      {completed && <AuthGuard />}
      <SVZP0002_API />
      <Helmet />

      <MessageArea />
      <BlockingDialog />
      <Layout>
        <ErrorBoundary>
          <Switch>
            {completed ? (
              pages.map(({ path, component }) => (
                <Route
                  key={path || ''}
                  path={path}
                  exact
                  render={() => (
                    <Suspense fallback={<Loading />}>
                      {React.createElement(component)}
                    </Suspense>
                  )}
                />
              ))
            ) : (
              <Loading />
            )}
          </Switch>
        </ErrorBoundary>
      </Layout>
    </ErrorBoundary>
  )
}

const Loading = styled(ProgressIndicator).attrs(() => ({
  styles: { itemProgress: { padding: 0, marginTop: -1 } },
}))``
