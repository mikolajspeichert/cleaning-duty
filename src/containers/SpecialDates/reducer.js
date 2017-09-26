import { PICKED_NEW } from './actions'

var initialState = {
  items: [],
  new: 0,
}

export function dates(state = initialState, action) {
  switch (action.type) {
    case PICKED_NEW:
      return Object.assign({}, state, { new: action.value })
    default:
      return state
  }
}
