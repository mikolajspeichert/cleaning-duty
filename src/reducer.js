import {users} from './containers/App/reducer'
import {user} from './containers/UserPanel/reducer'
import {duties} from './containers/DutyTable/reducer'
import {combineReducers} from 'redux'

//Global reducer
export default combineReducers({
  users,
  user,
  duties
})
