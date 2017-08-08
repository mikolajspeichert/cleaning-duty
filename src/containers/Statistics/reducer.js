import { REQUEST_STATS, RECEIVE_STATS } from './actions'

var initialState = {
  isFetching: false,
  items: [],
}

export function stats(state = initialState, action) {
  switch (action.type) {
    case REQUEST_STATS:
      return Object.assign({}, state, {
        isFetching: true,
      })
    case RECEIVE_STATS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.items,
      })
    default:
      return state
  }
}
