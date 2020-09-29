import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components/macro'

export default function Unauthorized() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch({
      type: 'UI.SetTitle',
      payload: '401: Unauthorized',
    })
  }, [dispatch])

  return (
    <Container>
      <h1>Unauthorized</h1>
      <p>Authentication required.</p>
    </Container>
  )
}

const Container = styled.div`
  padding: 16px 16px 160px 24px;
`
