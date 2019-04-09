export interface DBConnectionOptions {
  host: string
  user: string
  password: string
  database: string
  options?: any
}

export interface DBQueryOptions {
  sql: string
  values?: any[]
  options?: any
}

export interface DBQueryResult {
  results: any
  metadata: any
}

export interface DBConnection {
  query: (options: DBQueryOptions) => Promise<DBQueryResult>
}

export interface DatabaseDriver {
  connect: (options: DBConnectionOptions) => Promise<DBConnection>
  disconnect: () => void
}

export class Database {
  private connection?: DBConnection
  private driver: DatabaseDriver

  constructor(driver: DatabaseDriver) {
    this.driver = driver
  }

  async createConnection(options: DBConnectionOptions): Promise<DBConnection> {
    this.connection = await this.driver.connect(options)
    return this.connection
  }

  disconnect() {
    this.driver.disconnect()
  }

  async query(
    query: string,
    values?: any[],
    options?: any
  ): Promise<DBQueryResult> {
    if (!this.connection) {
      throw new Error(
        `Database.query called without a valid database connection.  
        You must call Database.createConnection before making queries.`
      )
    }
    const result = await this.connection.query({
      sql: query,
      values,
      options,
    })
    return result
  }
}
