import fetch from 'isomorphic-fetch'
import { DUTIES, DUTY } from '../../apilinks'

export const RECEIVE_DUTIES = 'RECEIVE_DUTIES'
export const UPDATE_DUTIES = 'UPDATE_DUTIES'

// Action dispatched when fetching has begun
function receiveDuties(json) {
  return {
    type: 'RECEIVE_DUTIES',
    data: json,
  }
}

function updateDuty(id, frequency) {
  return {
    type: 'UPDATE_DUTIES',
    id,
    frequency,
  }
}

function fetchDuties() {
  return dispatch => {
    fetch(DUTIES, { method: 'GET' })
      .then(response => response.json())
      .then(json => dispatch(receiveDuties(json)))
  }
}

export function getDuties() {
  return dispatch => dispatch(fetchDuties())
}

function update(id, frequency) {
  return dispatch => {
    dispatch(updateDuty(id, frequency))
    return fetch(DUTIES, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
        update: {
          frequency,
        },
      }),
    }).then(response => {
      if (response.json().error) {
        console.error(response.json().error)
      }
    })
  }
}

function remove(id) {
  return dispatch =>
    fetch(`${DUTIES}/remove`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
      }),
    }).then(response => {
      dispatch(getDuties())
      if (response.json().error) {
        console.error(response.json().error)
      }
    })
}

function post(name) {
  console.log('posting')
  return dispatch =>
    fetch(DUTY, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
      }),
    }).then(response => {
      dispatch(getDuties())
      if (response.json().error) {
        console.error(response.json().error)
      }
    })
}

export function updateDuties(id, day, value) {
  return (dispatch, getState) => {
    let duty = Object.assign(
      {},
      getState().duties.find(element => element.id === id)
    )
    let bit = 1 << day
    // value is an old value !!!!!!!
    if (!value) {
      duty.frequency |= bit
    } else {
      duty.frequency &= ~bit
    }
    return dispatch(update(id, duty.frequency))
  }
}

export function postDuty(name) {
  return dispatch => dispatch(post(name))
}

export function removeDuty(id) {
  return dispatch => dispatch(remove(id))
}
