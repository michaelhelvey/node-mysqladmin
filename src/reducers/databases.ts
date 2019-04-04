import { Action } from 'redux'

export interface DatabaseConnection {
  name: string
  mysqlHost: string
  username: string
  password: string
  database: string
  port: number
}

export interface DatabasesState {
  metadata: {
    activeConnection: DatabaseConnection | null
  }
  connections: DatabaseConnection[]
}

const initialState: DatabasesState = {
  metadata: {
    activeConnection: null,
  },
  connections: [],
}

export default (state: DatabasesState = initialState, action: Action) => {
  switch (action.type) {
    default:
      return state
  }
}
