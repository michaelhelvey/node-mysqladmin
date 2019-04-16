import { DatabaseConnection } from '../reducers/databases'

export const SAVE_CONNECTION = 'SAVE_CONNECTION'

export const DELETE_CONNECTION = 'DELETE_CONNECTION'

export const saveConnection = (form: DatabaseConnection) => ({
  type: SAVE_CONNECTION,
  payload: form,
})

export const deleteConnection = (connectionName: string) => ({
  type: DELETE_CONNECTION,
  payload: {
    connectionName,
  },
})
