// @flow
import {
  LOAD_DATABASE_DONE
} from '../actions/database';
import {
  TOGGLE_ANALYTICS_DONE,
  TOGGLE_STATISTICS_DONE,
  CHANGE_PASSWORD_DONE
} from '../actions/settings';

export default function database(state: Object = {}, action: Object) {
  switch (action.type) {

    case LOAD_DATABASE_DONE:
      return Object.assign({}, state, action.data ? action.data : {});

    case CHANGE_PASSWORD_DONE:
      return Object.assign({}, state, {
        password: action.data
      });

    case TOGGLE_ANALYTICS_DONE:
      return Object.assign({}, state, {
        analytics: action.data
      });

    case TOGGLE_STATISTICS_DONE:
      return Object.assign({}, state, {
        usage: action.data
      });

    default:
      return state;
  }
}
