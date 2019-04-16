import Action from '../actions'
import { SAVE_CONNECTION, DELETE_CONNECTION } from '../actions/connections'

export interface DatabaseConnection {
  connectionName: string
  host: string
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
    case SAVE_CONNECTION: // save connection is only fired on connection so we can update activeConnection
      const existingConnection =
        state.connections.filter(
          conn => conn.connectionName === action.payload.connectionName
        )[0] || {}
      return {
        ...state,
        metadata: {
          ...state.metadata,
          activeConnection: action.payload,
        },
        connections: [
          action.payload,
          ...state.connections.filter(
            conn => conn.connectionName !== existingConnection.connectionName
          ),
        ],
      }
    case DELETE_CONNECTION:
      return {
        ...state,
        connection: state.connections.filter(
          conn => conn.connectionName !== action.payload.connectionName
        ),
      }
    default:
      return state
  }
}
