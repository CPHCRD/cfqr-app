// @flow
import { Database, INFO_OBJECT_ID } from '../api/database';
import { errorLog } from './error';

export const AUTHENTICATE = 'AUTHENTICATE';
export function authenticate(passphrase: string) {
  return (dispatch: Function) => {
    Database.find({ // eslint-disable-line
      _id: INFO_OBJECT_ID
    }, (err, results) => {
      if (err) {
        dispatch(errorLog(err));
      }
      if (results[0] && results[0].passphrase === passphrase) {
        dispatch(authenticateDone(true));
      } else {
        dispatch(authenticateDone(false));
      }
    });
  };
}

export const AUTHENTICATE_DONE = 'AUTHENTICATE_DONE';
export function authenticateDone(valid: boolean) {
  return {
    type: AUTHENTICATE_DONE,
    data: valid
  };
}

export const SIGN_OUT = 'SIGN_OUT';
export function signOut() {
  return {
    type: SIGN_OUT,
    data: true
  };
}

export const LOGGED_IN = 'LOGGED_IN';
export function loggedIn(userInfo: Object) {
  return {
    type: LOGGED_IN,
    data: userInfo
  };
}

export const LOGGED_OUT = 'LOGGED_OUT';
export function loggedOut(userInfo: Object) {
  return {
    type: LOGGED_OUT,
    data: userInfo
  };
}
