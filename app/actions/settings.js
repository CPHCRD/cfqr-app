// @flow
import { Database, INFO_OBJECT_ID } from '../api/database';
import { ERROR } from './error';

export const CHANGE_PASSWORD = 'CHANGE_PASSWORD';
export function changePassword(newPassword: string) {
  return (dispatch: Function) => {
    Database.find({ // eslint-disable-line
      _id: INFO_OBJECT_ID
    }, (err, results) => {
      if (err) {
        dispatch(changePasswordDone(err, ''));
      }
      const doc = results[0];
      if (doc) {
        doc.password = newPassword;
        Database.update({ // eslint-disable-line
          _id: INFO_OBJECT_ID
        }, doc, (updateErr) => {
          if (updateErr) {
            dispatch(changePasswordDone(updateErr, ''));
          }
          dispatch(changePasswordDone('', newPassword));
        });
      } else {
        dispatch(changePasswordDone(`"${INFO_OBJECT_ID}" object not found in database`, ''));
      }
    });
  };
}

export const CHANGE_PASSWORD_DONE = 'CHANGE_PASSWORD_DONE';
export function changePasswordDone(error: string, value: string | null) {
  if (error) {
    return {
      type: ERROR,
      data: error
    };
  }
  return {
    type: CHANGE_PASSWORD_DONE,
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

export const TOGGLE_STATISTICS = 'TOGGLE_STATISTICS';
export function toggleStatistics(value: boolean) {
  return (dispatch: Function) => {
    Database.find({ // eslint-disable-line
      _id: INFO_OBJECT_ID
    }, (err, results) => {
      if (err) {
        dispatch(toggleStatisticsDone(err, null));
      }
      const doc = results[0];
      if (doc) {
        doc.usage = !!value;
        Database.update({ // eslint-disable-line
          _id: INFO_OBJECT_ID
        }, doc, (updateErr) => {
          if (updateErr) {
            dispatch(toggleStatisticsDone(updateErr, null));
          }
          dispatch(toggleStatisticsDone(null, value));
        });
      } else {
        dispatch(toggleStatisticsDone(`"${INFO_OBJECT_ID}" object not found in database`, null));
      }
    });
  };
}

export const TOGGLE_STATISTICS_DONE = 'TOGGLE_STATISTICS_DONE';
export function toggleStatisticsDone(error: string | null, value: boolean | null) {
  if (error) {
    return {
      type: ERROR,
      data: error
    };
  }
  return {
    type: TOGGLE_STATISTICS_DONE,
    data: value
  };
}
