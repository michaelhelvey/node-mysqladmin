/**
 * Generic database connection implementation.
 * Designed with MySQL and Postgres drivers in mind,
 * but other databases could be made to work easily
 * by implementing the DatabaseDriver interface.
 */

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
