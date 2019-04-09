import createSocketServer from 'socket.io'
import * as http from 'http'
import { SocketEventType as events } from './events'
import { Database, DBConnectionOptions } from './db'
import { MySQLDatabaseDriver } from './db_drivers/mysql_driver'

export default () => {
  const io = createSocketServer(http)

  const socketToDBMaps = new Map()

  const mysql = new MySQLDatabaseDriver()
  const db = new Database(mysql)

  io.on('connection', socket => {
    socket.on(events.CREATE_DB_CONN_REQ, async msg => {
      const request: DBConnectionOptions = JSON.parse(msg)
      // create connection using our assigned driver
      try {
        const connection = await db.createConnection(request)
        // assign our authenticated db connection to this particular socket
        socketToDBMaps.set(socket, connection)
        // return a simple success message to client
        socket.emit(
          events.CREATE_DB_CONN_RESPONSE,
          JSON.stringify({
            success: true,
          })
        )
      } catch (e) {
        // just handle the error on the client
        socket.emit(events.CREATE_DB_CONN_RESPONSE, JSON.stringify(e))
      }
    })
  })
}
