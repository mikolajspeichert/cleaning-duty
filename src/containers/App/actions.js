import fetch from 'isomorphic-fetch'
import { USERS } from '../../apilinks'

export const REQUEST_USERS = 'REQUEST_USERS'
export const RECEIVE_USERS = 'RECEIVE_USERS'

// Action dispatched when fetching has begun
function requestUsers() {
  return {
    type: 'REQUEST_USERS',
  }
}

// Action dispatched when fetching is finished.
// There is no error handling in this version
function receiveUsers(json) {
  return {
    type: 'RECEIVE_USERS',
    users: json,
  }
}

// Async action fetching json data and dispatching it
// so components can update
function fetchUsers() {
  return dispatch => {
    dispatch(requestUsers())
    return fetch(USERS, { method: 'GET' })
      .then(response => response.json())
      .then(json => dispatch(receiveUsers(json)))
  }
}

// Thunk middleware magic
export function fetchIfNeeded() {
  return (dispatch, getState) => {
    if (!getState().users.isFetching) {
      return dispatch(fetchUsers())
    }
    return false
  }
}

function remove(id) {
  return dispatch =>
    fetch(`${USERS}/remove`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
      }),
    }).then(response => {
      dispatch(fetchIfNeeded())
      if (response.json().error) {
        console.error(response.json().error)
      }
    })
}

export function removeUser(id) {
  return dispatch => dispatch(remove(id))
}
