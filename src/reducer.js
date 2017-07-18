import {users} from './containers/App/reducer'
import {user} from './containers/UserPanel/reducer'
import {combineReducers} from 'redux'
import locations from './locations'
import {LOCATION_CHANGE} from './actions'



function location(state = locations.LOCATION_USERS, action) {
  if(action.type == LOCATION_CHANGE){
    return action.location
  }else return state
}

export default combineReducers({
  users,
  location,
  user
})
