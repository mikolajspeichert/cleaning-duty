import fetch from 'isomorphic-fetch'
import { STATS } from '../../apilinks'

export const REQUEST_STATS = 'REQUEST_STATS'
export const RECEIVE_STATS = 'RECEIVE_STATS'

function requestStats() {
  return {
    type: 'REQUEST_STATS',
  }
}

function receiveStats(data) {
  return {
    type: 'RECEIVE_STATS',
    items: data,
  }
}

function getStats() {
  return dispatch => {
    dispatch(requestStats())
    return fetch(STATS, { method: 'GET' })
      .then(response => response.json())
      .then(json => dispatch(receiveStats(json)))
  }
}

export function fetchStats() {
  return (dispatch, getState) => {
    if (!getState().stats.isFetching) return dispatch(getStats())
    return false
  }
}
