// @flow
import {
  RESET_QUESTIONNAIRE,
  CHANGE_QUESTIONNAIRE,
  ANSWER_QUESTION,
  SET_PROPERTY
} from '../actions/questionnaire';
import { getQuestionsFromData, validateQuestionnaire } from '../utils/questionnaire';

const cfqrQuestions = getQuestionsFromData();

const DEFAULT_STATE = {
  type: null,
  valid: false,
  stored: null,
  questions: [],
  results: {}
};

export default function questionnaire(
  state: Object = Object.assign({}, DEFAULT_STATE), action: Object) {
  const { data, type } = action;
  let newState;

  switch (type) {
    case RESET_QUESTIONNAIRE:
      newState = Object.assign({}, DEFAULT_STATE);
      newState.results = {};
      newState.questions = [];
      return newState;

    case CHANGE_QUESTIONNAIRE:
      newState = Object.assign({}, state, {
        type: data,
        questions: cfqrQuestions[data]
      });
      newState.valid = validateQuestionnaire(newState);
      return newState;

    case ANSWER_QUESTION:
      newState = Object.assign({}, state);
      newState.results[data.question] = data;
      newState.valid = validateQuestionnaire(state);
      return newState;

    case SET_PROPERTY:
      newState = Object.assign({}, state, {
        [data.id]: data.value
      });
      return newState;

    default:
      return state;

  }
}
