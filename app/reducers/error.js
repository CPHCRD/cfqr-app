import { ERROR_LOG } from '../actions/error';

export default function locale(state = '', action) {
  switch (action.type) {
    case ERROR_LOG:
      return action.data;
    default:
      return state;
  }
}
