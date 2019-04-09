import * as http from 'http'
import createSocketServer, { Socket } from 'socket.io'
import { SocketEventType as events } from './events'
import * as handlers from './socket_handlers'

export default (http: http.Server) => {
  const io = createSocketServer(http)

  io.on('connection', socket => {
    socket.on(events.CREATE_DB_CONN_REQ, msg =>
      handlers.handleConnectionRequest(msg, socket)
    )

    socket.on(events.ISSUE_DB_CMD_REQ, msg => handlers.dbRequest(msg, socket))

    socket.on('disconnect', () => handlers.handleDisconnect(socket))
  })
}
