import { combineReducers } from 'redux'
import { users } from './containers/App/reducer'
import { user } from './containers/UserPanel/reducer'
import { duties } from './containers/DutyTable/reducer'
import { stats } from './containers/Statistics/reducer'
import { dates } from './containers/SpecialDates/reducer'

// Global reducer
export default combineReducers({
  users,
  user,
  duties,
  stats,
  dates,
})
