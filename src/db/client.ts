import io from 'socket.io-client'
import { SocketEventType as events } from 'mysqladmin-server/dist/events'
import { DBConnectionOptions } from 'mysqladmin-server/dist/db'
import { DatabaseConnection } from '../reducers/databases'

export class Client {
  private _socket: SocketIOClient.Socket
  constructor() {
    this._socket = io('http://localhost:3006')
  }

  public createConnection(options: DBConnectionOptions): Promise<any> {
    return new Promise((resolve, reject) => {
      this._socket.emit(events.CREATE_DB_CONN_REQ, options)
      this._socket.on(events.CREATE_DB_CONN_RESPONSE, (data: any) => {
        if (data.success) {
          resolve(data)
        } else {
          reject(data.error)
        }
      })
    })
  }

  public query(query: string) {
    const queryId = Math.random()
    return new Promise((resolve, reject) => {
      this._socket.emit(events.ISSUE_DB_CMD_REQ, {
        sql: query,
        id: queryId,
      })
      this._socket.on(events.ISSUE_DB_CMD_RESPONSE, (data: any) => {
        if (data.id === queryId) {
          if (data.success) {
            resolve(data.response)
          } else {
            reject(data.error)
          }
        }
      })
    })
  }
}
