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
              id: 5
            }, {
              name: "pedal",
              id: 10
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
