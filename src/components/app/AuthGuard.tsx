import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router'
import { useRouter } from '../../hooks'

export default function AuthGuard() {
  const {
    location: { pathname, search },
  } = useRouter()
  const loggedIn = useSelector(state => state.ui.loggedIn)
  const bizGroupInfo = useSelector(state => state.ui.bizGroupInfo)

  if (pathname === '/login') {
    if (loggedIn && bizGroupInfo && bizGroupInfo.bizGroupCode) {
      const params = new URLSearchParams(search)
      const redirectTo = params.get('redirectTo')
      return redirectTo ? <Redirect to={redirectTo} /> : <Redirect to="/" />
    }

    return null
  }

  if (loggedIn && bizGroupInfo && bizGroupInfo.bizGroupCode) {
    return null
  }

  const params = new URLSearchParams(search)
  params.append('redirectTo', pathname)

  return <Redirect to={`/login?${params}`} />
}
