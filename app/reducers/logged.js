import {
  LOGGED_IN,
  LOGGED_OUT
} from '../actions/auth';

export default function auth(state = false, action) {
  switch (action.type) {
    case LOGGED_IN:
      return true;
    case LOGGED_OUT:
      return false;
    default:
      return state;
  }
}
