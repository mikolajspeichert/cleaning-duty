import {users} from './containers/App/reducer'
import {user} from './containers/UserPanel/reducer'
import {combineReducers} from 'redux'


export default combineReducers({
  users,
  user
})
