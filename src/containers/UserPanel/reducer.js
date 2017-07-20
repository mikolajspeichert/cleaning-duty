import {
    WRONG_FIELD,
    USER_SENT,
    FIELD_CHANGED,
    USER_RECEIVED,
    RESET
} from './actions'

var initialState = {
  credentials: {
    name: '',
    email: '',
    slack: true,
    holidays: []
  },
  error: ''
}

function credentials(state = initialState.credentials, action){
  switch (action.type) {
    case FIELD_CHANGED:
    return Object.assign({}, state, {
      [action.name]: action.value
    })
    default:
      return state
  }
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
    case USER_RECEIVED:{
      return Object.assign({}, state, {
        credentials: action.data
      })
    }
    case RESET:
      return initialState
    default:
      return state
  }
}
