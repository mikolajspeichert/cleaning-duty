import {users} from './containers/App/reducer'
import user from './containers/UserPanel/reducer'
import {combineReducers} from 'redux'
import locations from './locations'


function location(state = LOCATION_USERS, action) {
  if(action.type == LOCATION_CHANGE){
    return Object.assign({}, state, {
      location: action.location
    })
  }else return state
}


export default combineReducers({
  users,
  location,
  user
})
