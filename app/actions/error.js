
export const ERROR = 'ERROR';

export const ERROR_LOG = 'ERROR_LOG';
export function errorLog(error = '') {
  if (console) {
    console.warn(error);
  }
  return {
    type: ERROR_LOG,
    data: error
  };
}
