import React, { useEffect } from 'react'
import styled from 'styled-components'
import io from 'socket.io-client'

export enum events {
  CREATE_DB_CONN_REQ = 'CREATE_DB_CONN_REQUEST',
  CREATE_DB_CONN_RESPONSE = 'CREATE_DB_CONN_RESPONSE',
  DISCONNCT_DB_CON_RESPONSE = 'DISCONNECT_DB_CON_RESPONSE',
  ISSUE_DB_CMD_REQ = 'ISSUE_DB_CMD_REQUEST',
  ISSUE_DB_CMD_RESPONSE = 'ISSUE_DB_CMD_RESPONSE',
}

const socket = io('http://localhost:3006')

const MyNewButton = styled.button`
  background-color: red;
`

const ConnectionsPage = (props: any) => {
  useEffect(() => {
    socket.emit(
      events.CREATE_DB_CONN_REQ,
      JSON.stringify({
        user: 'root',
        password: 'tallis',
        host: '127.0.0.1',
        database: 'rrm_test_2',
      })
    )
    socket.on(events.CREATE_DB_CONN_RESPONSE, data => {
      console.log(data)
      socket.emit(
        events.ISSUE_DB_CMD_REQ,
        JSON.stringify({
          query: 'select * from courses',
        })
      )
    })

    socket.on(events.ISSUE_DB_CMD_RESPONSE, data => {
      console.log(data)
    })
  })

  return (
    <div>
      Connections Page Number 4!
      <MyNewButton>Yay</MyNewButton>
    </div>
  )
}

export default ConnectionsPage
