import {
  REQUEST_USERS,
  RECEIVE_USERS,
} from './actions'

//Initial state is set as the app is fetching data
var initialState = {
  isFetching: true,
  items: [],
}

// Reducer for UserTable container
// handles two actions:
// REQUEST_USERS means app started fetching data
// RECEIVE_USERS means app finished fetching data, we assume it is correct
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
