// @flow
import { getUser, updateUser } from '../api/database';
import { ERROR } from './error';

import { saveRemoteUserInfo } from '../api/backup';

export const CHANGE_PASSPHRASE = 'CHANGE_PASSPHRASE';
export function changePassphrase(newPassphrase: string) {
  return (dispatch: Function) => {
    getUser()
      .then(user => updateUser(Object.assign({}, user, {
        passphrase: newPassphrase
      })))
      .then(user => {
        dispatch(changePassphraseDone(null, user.passphrase));
        return user;
      })
      .then(user => saveRemoteUserInfo(user))
      .catch(err => {
        dispatch(changePassphraseDone(err, null));
      });
  };
}

export const CHANGE_PASSPHRASE_DONE = 'CHANGE_PASSPHRASE_DONE';
export function changePassphraseDone(error: string | null, value: string | null) {
  if (error) {
    return {
      type: ERROR,
      data: error
    };
  }
  return {
    type: CHANGE_PASSPHRASE_DONE,
    data: value
  };
}

export const TOGGLE_ANALYTICS = 'TOGGLE_ANALYTICS';
export function toggleAnalytics(value: boolean) {
  return (dispatch: Function) => {
    getUser()
      .then(user => updateUser(Object.assign({}, user, {
        analytics: !!value
      })))
      .then(user => {
        dispatch(toggleAnalyticsDone(null, user.analytics));
        return user;
      })
      .then(user => saveRemoteUserInfo(user))
      .catch(err => {
        dispatch(toggleAnalyticsDone(err, null));
      });
  };
}

export const TOGGLE_ANALYTICS_DONE = 'TOGGLE_ANALYTICS_DONE';
export function toggleAnalyticsDone(error: string | null, value: boolean | null) {
  if (error) {
    return {
      type: ERROR,
      data: error
    };
  }
  return {
    type: TOGGLE_ANALYTICS_DONE,
    data: value
  };
}
