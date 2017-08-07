import { RECEIVE_DUTIES, UPDATE_DUTIES } from './actions';

var initialState = [];

export function duties(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_DUTIES:
      return Object.values(Object.assign({}, [], action.data));
    case UPDATE_DUTIES:
      return Object.values(
        Object.assign(
          {},
          state,
          state.map(element => {
            if (element.id === action.id) element.frequency = action.frequency;
            return element;
          }),
        ),
      );
    default:
      return state;
  }
}
