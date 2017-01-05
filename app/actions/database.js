// @flow
import { ERROR } from './error';

import {
  loadDatastore,
  updateUser,
  findOneIntoDatabase,
  INFO_OBJECT_ID
} from '../api/database';

export const LOAD_DATABASE = 'LOAD_DATABASE';
export function loadDatabase() {
  // callback hell yeah!
  return (dispatch: Function) => {
    loadDatastore()
      .then(() => findOneIntoDatabase({ _id: INFO_OBJECT_ID }))
      .then(user => {
        if (!user) {
          return updateUser();
        }
        return user;
      })
      .then(user => updateUser(user))
      .then(user => {
        dispatch(loadDatabaseDone(null, user));
        return true;
      })
      .catch(err => {
        dispatch(loadDatabaseDone(err, null));
      });
  };
}

export const LOAD_DATABASE_DONE = 'LOAD_DATABASE_DONE';
export function loadDatabaseDone(error: string | null, info: Object | null) {
  if (error) {
    return {
      type: ERROR,
      data: error
    };
  }
  return {
    type: LOAD_DATABASE_DONE,
    data: info
  };
}
