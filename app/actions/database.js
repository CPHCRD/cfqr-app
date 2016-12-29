// @flow
import { ERROR } from './error';

import {
  loadDatastore,
  initUserIntoDatabase,
  findOneIntoDatabase,
  INFO_OBJECT_ID
} from '../api/database';

export const LOAD_DATABASE = 'LOAD_DATABASE';
export function loadDatabase() {
  // callback hell yeah!
  return (dispatch: Function) => {
    loadDatastore()
      .then(() => findOneIntoDatabase({ _id: INFO_OBJECT_ID }))
      .then(results => {
        if (!results) {
          return initUserIntoDatabase();
        }
        return results;
      })
      .then(info => {
        dispatch(loadDatabaseDone(null, info));
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
