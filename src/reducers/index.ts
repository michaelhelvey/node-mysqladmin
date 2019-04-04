import { combineReducers } from 'redux'
import databases, { DatabasesState } from './databases'

export interface AppState {
  databases: DatabasesState
}

export default combineReducers({
  databases,
})
