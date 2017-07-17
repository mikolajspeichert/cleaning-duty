import {
  REQUEST_USERS,
  RECEIVE_USERS
} from './actions'

function usersFetch(state = {
  isFetching: false,
  users: []
  }, action){
  switch(action.type){
    case REQUEST_USERS:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECEIVE_USERS:
      return Object.assign({}, state, {
        isFetching: false,
        users: action.users
      })
    default:
      return state
  }
}

export default usersFetch
