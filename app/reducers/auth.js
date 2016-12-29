// @flow
import {
  AUTHENTICATE_DONE,
  SIGN_OUT
} from '../actions/auth';

export default function auth(state: boolean = false, action: Object) {
  switch (action.type) {
    case SIGN_OUT:
      return !action.data;
    case AUTHENTICATE_DONE:
      return action.data;
    default:
      return state;
  }
}
