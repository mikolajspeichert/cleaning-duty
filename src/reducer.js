import globalReducer from './containers/App/reducer'
import userReducer from './containers/UserPanel/reducer'
import {combineReducers} from 'redux'
import locations from './locations'
import {LOCATION_CHANGE, changeLocation} from './actions'

function locationReducer(state = { location: LOCATION_USERS }, action) {
  if(action.type == LOCATION_CHANGE){
    return Object.assign({}, state, {
      location: action.location
    })
  }
}

export default combineReducers({
  globalReducer,
  userReducer,
  locationReducer
})
