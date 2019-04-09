import { Socket } from 'socket.io'
import { SocketEventType as events } from './events'
import {
  Database,
  DBConnectionOptions,
  DBConnection,
  DBQueryOptions,
} from './db'
import { MySQLDatabaseDriver } from './db_drivers/mysql_driver'

const socketToDBMap: Map<Socket, DBConnection> = new Map()

const mysql = new MySQLDatabaseDriver()
const db = new Database(mysql)

export const dbRequest = async (request: DBQueryOptions, socket: Socket) => {
  const connection = socketToDBMap.get(socket)
  try {
    if (!connection) {
      throw new Error(
        'A database command was issued, but no database connection has been created for the current socket.'
      )
    }
    const queryResults = await connection.query(
      request.sql,
      request.values,
      request.options
    )
    socket.emit(events.ISSUE_DB_CMD_RESPONSE, {
      success: true,
      response: queryResults,
    })
  } catch (e) {
    socket.emit(events.ISSUE_DB_CMD_RESPONSE, {
      success: false,
      error: e,
    })
  }
}

export const handleConnectionRequest = async (
  request: DBConnectionOptions,
  socket: Socket
) => {
  try {
    // create connection using our assigned driver
    const connection = await db.createConnection(request)
    // assign our authenticated db connection to this particular socket
    socketToDBMap.set(socket, connection)
    // return a simple success message to client
    socket.emit(events.CREATE_DB_CONN_RESPONSE, {
      success: true,
    })
  } catch (e) {
    // just handle the error on the client
    socket.emit(events.CREATE_DB_CONN_RESPONSE, {
      success: false,
      error: e,
    })
  }
}

export const handleDisconnect = async (socket: Socket) => {
  try {
    const conn = socketToDBMap.get(socket)
    if (conn) {
      await conn.disconnect()
    }
  } catch (_) {
    // discard
  }
}
