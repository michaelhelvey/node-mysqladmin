/**
 * MySQL database driver implementing the DatabaseDriver
 * interface.
 */

import * as mysql from 'mysql'
import {
  DatabaseDriver,
  DBConnectionOptions,
  DBConnection,
  DBQueryResult,
} from '../db'

export class MySQLDatabaseDriver implements DatabaseDriver {
  public connect(options: DBConnectionOptions): Promise<DBConnection> {
    return new Promise((resolve, reject) => {
      const connection = mysql.createConnection({
        host: options.host,
        user: options.user,
        password: options.password,
        database: options.database,
      })
      connection.connect(err => {
        if (err) {
          reject(err)
        } else {
          resolve(this._createConnectionFromBaseConnection(connection))
        }
      })
    })
  }

  private _createConnectionFromBaseConnection(
    baseConn: mysql.Connection
  ): DBConnection {
    return {
      disconnect: () => this._disconnect(baseConn),
      query: (...args) => this._query(baseConn, ...args),
    }
  }

  private _query(
    baseConn: mysql.Connection,
    query: string,
    // declare initializers for values and options so we get clearly defined defaults
    values: any[] = [],
    options: any = {}
  ): Promise<DBQueryResult> {
    return new Promise((resolve, reject) => {
      baseConn.query(
        {
          sql: query,
          values,
          // will be undefined if not passed, so will default to node-mysql 'no timeout'
          timeout: options.timeout,
        },
        (error, results, fields) => {
          if (error) {
            reject(error)
          } else {
            resolve({
              results,
              metadata: fields,
            })
          }
        }
      )
    })
  }

  private _disconnect(baseConn: mysql.Connection): Promise<void> {
    return new Promise((resolve, reject) => {
      baseConn.end(err => {
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      })
    })
  }
}
