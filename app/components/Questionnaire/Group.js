// @flow
import React, { PureComponent, PropTypes } from 'react';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import { cyan700 } from 'material-ui/styles/colors';

import { connect } from '../../actions';

class QuestionnaireGroup extends PureComponent {

  static propTypes = {
    element: PropTypes.shape({
      key: PropTypes.string.isRequired,
      answers: PropTypes.array.isRequired,
      questions: PropTypes.array.isRequired
    }).isRequired,
    getCurrentQuestionAnswer: PropTypes.func,
    i18n: PropTypes.func,
    locale: PropTypes.string,
    answerQuestion: PropTypes.func,
    questionnaire: PropTypes.shape({})
  };

  shouldComponentUpdate(nextProps) {
    /* STATEFUL - PURE component
     * The component rendering will be controlled manually.
     */
    if (nextProps.locale !== this.props.locale) {
      return true;
    }
    return false;
  }

  render() {
    const { element, i18n, getCurrentQuestionAnswer, answerQuestion, questionnaire } = this.props;
    const {
      key: elementKey, questions: elementQuestions,
      answers: elementQuestionsAnswers } = element;
    const { results } = questionnaire;

    return (
      <div className="question question--landscape" key={elementKey}>
        <div className="question__title" style={{ color: cyan700 }}>{i18n(elementKey)}</div>
        <div className="question__group-container">
          {elementQuestions.map(question => {
            const { key: questionKey, id: groupQuestionId, 'doesnt-apply': doesntApply = false } = question;
            const elementAnswers = Object.assign([], elementQuestionsAnswers);
            if (doesntApply) {
              elementAnswers.push('questionnaire-doesnt-apply');
            }

            const currentAnswer = getCurrentQuestionAnswer(results, groupQuestionId);
            return (<div className="question__group-item" id={groupQuestionId} key={questionKey}>
              <div className="question__subtitle">{i18n(questionKey)}</div>
              <RadioButtonGroup
                className="question__radio question__radio-landscape"
                name={groupQuestionId}
                defaultSelected={currentAnswer}
              >
                {elementAnswers.map((answerKey, answerValue) => <RadioButton
                  className="question__radio-item"
                  key={`${groupQuestionId}-${answerKey}`}
                  name={groupQuestionId}
                  style={{ padding: '0.5rem 0' }}
                  value={answerValue}
                  label={i18n(`${answerKey}`)}
                  onTouchTap={() => answerQuestion(groupQuestionId, answerValue, answerKey)}
                />)}
              </RadioButtonGroup>
            </div>);
          })}
        </div>
      </div>
    );
  }
}

export default connect(QuestionnaireGroup);

