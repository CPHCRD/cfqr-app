// @flow
import { Database, INFO_OBJECT_ID } from '../api/database';
import { ERROR } from './error';

export const CHANGE_PASSPHRASE = 'CHANGE_PASSPHRASE';
export function changePassphrase(newPassphrase: string) {
  return (dispatch: Function) => {
    Database.find({ // eslint-disable-line
      _id: INFO_OBJECT_ID
    }, (err, results) => {
      if (err) {
        dispatch(changePassphraseDone(err, ''));
      }
      const doc = results[0];
      if (doc) {
        doc.passphrase = newPassphrase;
        Database.update({ // eslint-disable-line
          _id: INFO_OBJECT_ID
        }, doc, (updateErr) => {
          if (updateErr) {
            dispatch(changePassphraseDone(updateErr, ''));
          }
          dispatch(changePassphraseDone('', newPassphrase));
        });
      } else {
        dispatch(changePassphraseDone(`"${INFO_OBJECT_ID}" object not found in database`, ''));
      }
    });
  };
}

export const CHANGE_PASSPHRASE_DONE = 'CHANGE_PASSPHRASE_DONE';
export function changePassphraseDone(error: string, value: string | null) {
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
    Database.find({ // eslint-disable-line
      _id: INFO_OBJECT_ID
    }, (err, results) => {
      if (err) {
        dispatch(toggleAnalyticsDone(err, null));
      }
      const doc = results[0];
      if (doc) {
        doc.analytics = !!value;
        Database.update({ // eslint-disable-line
          _id: INFO_OBJECT_ID
        }, doc, (updateErr) => {
          if (updateErr) {
            dispatch(toggleAnalyticsDone(updateErr, null));
          }
          dispatch(toggleAnalyticsDone(null, value));
        });
      } else {
        dispatch(toggleAnalyticsDone(`"${INFO_OBJECT_ID}" object not found in database`, null));
      }
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
