// @flow
import {
  LOGGED_IN,
  LOGGED_OUT
} from '../actions/auth';

export default function auth(state: boolean = false, action: Object) {
  switch (action.type) {
    case LOGGED_IN:
      return true;
    case LOGGED_OUT:
      return false;
    default:
      return state;
  }
}
