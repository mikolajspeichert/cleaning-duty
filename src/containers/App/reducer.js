import {combineReducers} from 'redux'
import {
  REQUEST_USERS,
  RECEIVE_USERS,
  LOCATION_CHANGE
} from './actions'


var initialState = {
  isFetching: true,
  items: [],
}

export function users(state = initialState, action){
  switch(action.type){
    case REQUEST_USERS:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECEIVE_USERS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.users
      })
    default:
      return state
  }
}
