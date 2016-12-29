// @flow

export const SET_FILTER = 'SET_FILTER';
export function setFilter(filter: Object = {}) {
  return {
    type: SET_FILTER,
    data: filter
  };
}

export const SET_SORT = 'SET_SORT';
export function setSort(sort: Object = {}) {
  return {
    type: SET_SORT,
    data: sort
  };
}
