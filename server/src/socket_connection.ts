import createSocketServer from 'socket.io'
import * as http from 'http'
import { SocketEventType as events } from './events'

const io = createSocketServer(http)

const socketToDBMaps = new Map()

io.on('connection', socket => {
  socket.on(events.CREATE_DB_CONN_REQ, msg => {
    const request = JSON.parse(msg)
    socket.emit(events.CREATE_DB_CONN_REQ, JSON.stringify(request))
  })
})
