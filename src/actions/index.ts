import { Action as ReduxAction } from 'redux'

export default interface Action extends ReduxAction {
  payload: any
}
