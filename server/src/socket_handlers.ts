import { Socket } from 'socket.io'
import { SocketEventType as events } from './events'
import { Database, DBConnectionOptions, DBConnection } from './db'
import { MySQLDatabaseDriver } from './db_drivers/mysql_driver'

const socketToDBMap: Map<Socket, DBConnection> = new Map()

const mysql = new MySQLDatabaseDriver()
const db = new Database(mysql)

export const dbRequest = async (msg: string, socket: Socket) => {
  const connection = socketToDBMap.get(socket)
  try {
    if (!connection) {
      throw new Error(
        'A database command was issued, but no database connection has been created for the current socket.'
      )
    }
    const request = JSON.parse(msg)
    const queryResults = await connection.query(
      request.query,
      request.values,
      request.options
    )
    socket.emit(events.ISSUE_DB_CMD_RESPONSE, {
      success: true,
      results: queryResults,
    })
  } catch (e) {
    socket.emit(
      events.ISSUE_DB_CMD_RESPONSE,
      JSON.stringify({
        success: false,
        error: e,
      })
    )
  }
}

export const handleConnectionRequest = async (msg: string, socket: Socket) => {
  const request: DBConnectionOptions = JSON.parse(msg)
  try {
    // create connection using our assigned driver
    const connection = await db.createConnection(request)
    // assign our authenticated db connection to this particular socket
    socketToDBMap.set(socket, connection)
    // return a simple success message to client
    socket.emit(
      events.CREATE_DB_CONN_RESPONSE,
      JSON.stringify({
        success: true,
      })
    )
  } catch (e) {
    // just handle the error on the client
    socket.emit(
      events.CREATE_DB_CONN_RESPONSE,
      JSON.stringify({
        success: false,
        error: e,
      })
    )
  }
}

export const handleDisconnect = async (socket: Socket) => {
  const conn = socketToDBMap.get(socket)
  try {
    if (conn) {
      await conn.disconnect()
    } else {
      throw new Error(
        'Disconnect was called on the socket, but no database connection was assigned to the current socket.'
      )
    }
  } catch (e) {
    console.error(e)
  }
}
