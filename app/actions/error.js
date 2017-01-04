// @flow

export const ERROR = 'ERROR';

export const ERROR_LOG = 'ERROR_LOG';
export function errorLog(error: string = '') {
  if (global.console) {
    global.console.warn(error);
  }
  return {
    type: ERROR_LOG,
    data: error
  };
}
