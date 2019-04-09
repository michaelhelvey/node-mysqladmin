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
  results: any[]
  metadata: any
}

export interface DBConnection {
  query: (
    query: string,
    values?: any[],
    options?: any
  ) => Promise<DBQueryResult>
  disconnect: () => void
}

export interface DatabaseDriver {
  connect: (options: DBConnectionOptions) => Promise<DBConnection>
  disconnect: () => void
}

export class Database {
  private driver: DatabaseDriver

  constructor(driver: DatabaseDriver) {
    this.driver = driver
  }

  async createConnection(options: DBConnectionOptions): Promise<DBConnection> {
    const connection = await this.driver.connect(options)
    return connection
  }
}
