import {
    WRONG_FIELD,
    USER_SENT,
    FIELD_CHANGED
} from './actions'
import locations from '../../locations'

var initialState = {
  type: locations.user.ADD_USER,
  credentials: {
    name: '',
    email: '',
    slack: true
  },
  error: ''
}

function credentials(state = {
  name: '',
  email: '',
  slack: true
}, action){
  if(action.type == FIELD_CHANGED){
    return Object.assign({}, state, {
      [action.name]: action.value
    })
  }else return state
}

export function user(state = initialState, action){
  switch(action.type){
    case USER_SENT:{
      error: action.error
    }
    case WRONG_FIELD:{
      return Object.assign({}, state, {
        error: action.field
      })
    }
    case FIELD_CHANGED:{
      return Object.assign({}, state, {
        credentials: credentials(state.credentials, action),
        error: ''
      })
    }
    default:
      return state
  }
}
