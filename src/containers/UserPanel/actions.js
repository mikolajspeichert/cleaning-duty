import fetch from 'isomorphic-fetch'
import {changeLocation} from '../../actions'
import locations from '../../locations'

export const FIELD_CHANGED = 'FIELD_CHANGED'
export const WRONG_FIELD = 'WRONG_FIELD'
export const USER_SENT = 'USER_SENT'


var validate = (name, value) => {
  switch(name){
    case "name":
      if(value == '') return wrongField("name")
      break
    case "email":
      if(!/\S+@\S+\.\S+/.test(value)) return wrongField("email")
      break
    default: return true
  }
  return true
}

export function fieldChanged(name, value) {
  let val = validate(name, value)
  if(val !== true) return val
  return {
    type: 'FIELD_CHANGED',
    name: name,
    value: value
  }
}

export function wrongField(field_name) {
  return{
    type: 'WRONG_FIELD',
    field: field_name
  }
}

function userSent(success){
  return{
    type: 'USER_SENT',
    error: error
  }
}

function post(body){
  return dispatch => {
    return fetch('http://localhost:3000/user', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    }).then(response => response.json())
    .then(json => dispatch(changeLocation(locations.LOCATION_USERS)))
  }
}

export function postUser(){
  return (dispatch, getState) => {
    let body = getState().user.credentials

    return dispatch(post(body))
  }
}
