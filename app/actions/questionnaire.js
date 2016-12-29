// @flow
export const CHANGE_QUESTIONNAIRE = 'CHANGE_QUESTIONNAIRE';
export function changeQuestionnaire(questionnaireId: string) {
  return {
    type: CHANGE_QUESTIONNAIRE,
    data: questionnaireId
  };
}

export const ANSWER_QUESTION = 'ANSWER_QUESTION';
export function answerQuestion(question: string, answer: number, key: string) {
  return {
    type: ANSWER_QUESTION,
    data: { question, answer, key }
  };
}

export const SET_PROPERTY = 'SET_PROPERTY';
export function setProperty(id: string, value: string) {
  return {
    type: SET_PROPERTY,
    data: { id, value }
  };
}

export const RESET_QUESTIONNAIRE = 'RESET_QUESTIONNAIRE';
export function resetQuestionnaire() {
  return {
    type: RESET_QUESTIONNAIRE
  };
}

export const SET_QUESTIONNAIRE_STEP = 'SET_QUESTIONNAIRE_STEP';
export function setQuestionnaireStep(stepIndex: number) {
  return {
    type: SET_QUESTIONNAIRE_STEP,
    data: stepIndex
  };
}
