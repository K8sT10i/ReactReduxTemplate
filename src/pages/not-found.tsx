import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components/macro'

export default function NotFound() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch({
      type: 'UI.SetTitle',
      payload: '404: Not found',
    })
  }, [dispatch])

  return (
    <Container>
      <h1>NOT FOUND</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </Container>
  )
}

const Container = styled.div`
  padding: 16px 16px 160px 24px;
`
