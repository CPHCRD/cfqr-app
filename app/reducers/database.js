import {
  LOAD_DATABASE_DONE
} from '../actions/database';

export default function database(state = {
  loaded: false
}, action) {
  switch (action.type) {
    case LOAD_DATABASE_DONE:
      return Object.assign({}, state, {
        loaded: !!action.data
      });

    default:
      return state;
  }
}
