import fetch from 'isomorphic-fetch'

export const REQUEST_USERS = 'REQUEST_USERS'
export const RECEIVE_USERS = 'RECEIVE_USERS'


function requestUsers(){
  return {
    type: 'REQUEST_USERS'
  }
}

function receiveUsers(json){
  return {
    type: 'RECEIVE_USERS',
    users: json
  }
}

function fetchUsers(){
  return dispatch => {
    dispatch(requestUsers())
    return fetch('http://localhost:3000/users', {method: 'GET'})
      .then(response => response.json())
      .then(json => dispatch(receiveUsers(json)))
    // dispatch(receiveUsers({
    //   data: [{
    //     name: "uwewuwle",
    //     id: 1
    //   }, {
    //     name: "pedal",
    //     id: 2
    //   }, {
    //     name: "uwewuwle",
    //     id: 3
    //   }, {
    //     name: "pedal",
    //     id: 4
    //   }, {
    //     name: "uwewuwle",
    //     id: 5
    //   }, {
    //     name: "pedal",
    //     id: 6
    //   }, {
    //     name: "uwewuwle",
    //     id: 7
    //   }))
  }
}

export function fetchIfNeeded(){
  return (dispatch, getState) => {
    if (!getState().isFetching){
      return dispatch(fetchUsers())
    }
  }
}
