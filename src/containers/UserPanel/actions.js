import fetch from 'isomorphic-fetch'
import {fetchIfNeeded} from '../App/actions'

export const FIELD_CHANGED = 'FIELD_CHANGED'
export const WRONG_FIELD = 'WRONG_FIELD'
export const USER_SENT = 'USER_SENT'
export const USER_RECEIVED = 'USER_RECEIVED'
export const RESET = 'RESET'


var validate = (name, value) => {
  switch(name){
    case "name":
      if(value == '') return wrongField("name")
  //  case "email":
  ////    if(!/\S+@\S+\.\S+/.test(value)) return {
  //      wrongField("email")

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

function userReceived(json){
  return{
    type: 'USER_RECEIVED',
    data: json
  }
}

export function reset(){
  return{
    type: 'RESET'
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
    }).then(response => {
      if(!!response.json().error){
        console.error(response.json().error)
      }
    })
  }
}

function fetchUser(id){
  return dispatch => {
    return fetch('http://localhost:3000/user/' + id, {}).then(
      response => {
        return response.json()}
      ).then(json => {
        return dispatch(userReceived(json))})
  }
}

export function getUser(id){
  return (dispatch, getState) => {
    return dispatch(fetchUser(id))
  }
}

export function postUser(){
  return (dispatch, getState) => {
    let body = getState().user.credentials

    return dispatch(post(body))
  }
}
