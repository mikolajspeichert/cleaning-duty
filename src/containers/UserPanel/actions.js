import fetch from 'isomorphic-fetch'
import {fetchIfNeeded} from '../App/actions'
import {USER} from '../../apilinks'
export const FIELD_CHANGED = 'FIELD_CHANGED'
export const WRONG_FIELD = 'WRONG_FIELD'
export const USER_SENT = 'USER_SENT'
export const USER_RECEIVED = 'USER_RECEIVED'
export const RESET = 'RESET'

// Client-side validation
var validate = (name, value) => {
  switch(name){
  //  case "name":
  //    if(value == '') return wrongField("name")
  //  case "email":
  ////    if(!/\S+@\S+\.\S+/.test(value)) return {
  //      wrongField("email")

    default: return true
  }
  return true
}

// Action dispatched on form field change
export function fieldChanged(name, value) {
  let val = validate(name, value)
  if(val !== true) return val
  return {
    type: 'FIELD_CHANGED',
    name: name,
    value: value
  }
}

// Acion dispatched on failed validation
export function wrongField(field_name) {
  return{
    type: 'WRONG_FIELD',
    field: field_name
  }
}

// Action dispatched as server response comes
function userSent(success){
  return{
    type: 'USER_SENT',
    error: error
  }
}

// Action dipatched when user data come when edit clicked
function userReceived(json){
  return{
    type: 'USER_RECEIVED',
    data: json
  }
}

// Action resetting app state containing user data
export function reset(){
  return{
    type: 'RESET'
  }
}

// Action pushig new user to server and dispatching response
function post(body){
  return dispatch => {
    return fetch(USER, {
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

// Action fetching user data when edit clicked
function fetchUser(id){
  return dispatch => {
    return fetch(USER + '/' + id, {}).then(
      response => {
        return response.json()}
      ).then(json => {
        return dispatch(userReceived(json))})
  }
}

// Thunk middleware magic
export function getUser(id){
  return (dispatch, getState) => {
    return dispatch(fetchUser(id))
  }
}

// Thunk middleware magic
export function postUser(){
  return (dispatch, getState) => {
    let body = getState().user.credentials

    return dispatch(post(body))
  }
}
