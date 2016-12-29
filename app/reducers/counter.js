// @flow
import {
  RESET_QUESTIONNAIRE,
  SET_QUESTIONNAIRE_STEP
} from '../actions/questionnaire';

export default function counter(state: Object = { count: 0, step: 0 }, action: Object) {
  switch (action.type) {
    case RESET_QUESTIONNAIRE:
      return Object.assign({}, state, {
        step: 0
      });
    case SET_QUESTIONNAIRE_STEP:
      return Object.assign({}, state, {
        step: action.data
      });
    default:
      return state;
  }
}
