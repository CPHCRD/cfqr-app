// @flow
import {
  AUTHENTICATE_DONE,
  SIGN_OUT
} from '../actions/auth';
import {
  LOAD_DATABASE_DONE
} from '../actions/database';

export default function auth(state: boolean = false, action: Object) {
  switch (action.type) {
    case LOAD_DATABASE_DONE:
      return !action.data.passphrase;
    case SIGN_OUT:
      return !action.data;
    case AUTHENTICATE_DONE:
      return action.data;
    default:
      return state;
  }
}
