// @flow
import {
  SET_FILTER,
  SET_SORT
} from '../actions/statistics';
import { BASE_FILTER } from '../api/database';

const DEFAULT_STATE = {
  filter: BASE_FILTER,
  sort: {
    createdAt: -1
  }
};

export default function database(state: Object = DEFAULT_STATE, action: Object) {
  switch (action.type) {
    case SET_FILTER:
      return Object.assign({}, state, {
        filter: action.data
      });

    case SET_SORT:
      return Object.assign({}, state, {
        sort: action.data
      });

    default:
      return state;
  }
}
