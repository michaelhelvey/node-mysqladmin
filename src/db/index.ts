import io from 'socket.io-client'

enum events {
  CREATE_DB_CONN_REQ = 'CREATE_DB_CONN_REQUEST',
  CREATE_DB_CONN_RESPONSE = 'CREATE_DB_CONN_RESPONSE',
  DISCONNCT_DB_CON_RESPONSE = 'DISCONNECT_DB_CON_RESPONSE',
  ISSUE_DB_CMD_REQ = 'ISSUE_DB_CMD_REQUEST',
  ISSUE_DB_CMD_RESPONSE = 'ISSUE_DB_CMD_RESPONSE',
}

const socket = io('http://localhost:3006')

export default () => {
  socket.emit(events.CREATE_DB_CONN_REQ, {
    user: 'root',
    password: 'tallis',
    host: '127.0.0.1',
    database: 'rrm_test_2',
  })
  socket.on(events.CREATE_DB_CONN_RESPONSE, (data: any) => {
    console.log('create db conn ', data)
    socket.emit(events.ISSUE_DB_CMD_REQ, {
      sql: 'select User,Host from mysql.user',
      id: Math.random(),
    })
  })

  socket.on(events.ISSUE_DB_CMD_RESPONSE, (data: any) => {
    console.log('query db ', data)
  })
}
