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
    users: json.data
  }
}

function fetchUsers(){
  return dispatch => {
    dispatch(requestUsers())

    dispatch(receiveUsers({
      data: [{
        name: "uwewuwle",
        id: 1
      }, {
        name: "pedal",
        id: 2
      }, {
        name: "uwewuwle",
        id: 3
      }, {
        name: "pedal",
        id: 4
      }, {
        name: "uwewuwle",
        id: 5
      }, {
        name: "pedal",
        id: 6
      }, {
        name: "uwewuwle",
        id: 7
      }, {
        name: "pedal",
        id: 8
      }, {
        name: "uwewuwle",
        id: 9
      }, {
        name: "pedal",
        id: 10
      }, {
        name: "uwewuwle",
        id: 11
      }, {
        name: "pedal",
        id: 12
      }, {
        name: "pedal",
        id: 13
      }, {
        name: "uwewuwle",
        id: 14
      }, {
        name: "pedal",
        id: 15
      }]
    }))
  }
}

export function fetchIfNeeded(){
  return (dispatch, getState) => {
    if (!getState().isFetching){
      return dispatch(fetchUsers())
    }
  }
}
