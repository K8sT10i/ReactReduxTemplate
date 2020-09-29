import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components/macro'

export default function NotFound() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch({
      type: 'UI.SetTitle',
      payload: '500: System error',
    })
  }, [dispatch])

  return (
    <Container>
      <h1
        style={{
          borderBottom: '2px solid #0B318F',
          marginBottom: 24,
          color: '#0B318F',
        }}
      >
        SYSTEM ERROR
      </h1>
      <p>ERROR</p>
    </Container>
  )
}

const Container = styled.div`
  padding: 16px 16px 160px 24px;
`
