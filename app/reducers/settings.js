// @flow
import {
  LOAD_DATABASE_DONE
} from '../actions/database';
import {
  TOGGLE_ANALYTICS_DONE,
  CHANGE_PASSPHRASE_DONE
} from '../actions/settings';

export default function database(state: Object = {}, action: Object) {
  switch (action.type) {

    case LOAD_DATABASE_DONE:
      return Object.assign({}, state, action.data ? action.data : {});

    case CHANGE_PASSPHRASE_DONE:
      return Object.assign({}, state, {
        passphrase: action.data
      });

    case TOGGLE_ANALYTICS_DONE:
      return Object.assign({}, state, {
        analytics: action.data
      });

    default:
      return state;
  }
}
