// @flow
import React, { PureComponent, PropTypes } from 'react';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';

import { connect } from '../../actions';

class QuestionnaireQuestion extends PureComponent {

  static propTypes = {
    element: PropTypes.shape({
      key: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      answers: PropTypes.array.isRequired
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
    const { element, getCurrentQuestionAnswer, i18n, answerQuestion, questionnaire } = this.props;
    const { key: elementKey, id: questionId, answers: elementAnswers } = element;
    const { results } = questionnaire;
    const currentAnswer = getCurrentQuestionAnswer(results, questionId);

    return (
      <div className="question" id={questionId} key={elementKey}>
        <div className="question__title">{i18n(elementKey)}</div>
        <RadioButtonGroup className="question__radio" name={elementKey} defaultSelected={currentAnswer}>
          {elementAnswers.map((answerKey, answerValue) => <RadioButton
            name={elementKey}
            key={`${elementKey}-${answerKey}`}
            style={{ padding: '0.5rem 0', cursor: 'pointer' }}
            value={answerValue}
            label={
              <span>
                {i18n(`${answerKey}`)}
                <i style={{ display: 'block' }}>{i18n(`${answerKey}-description`)}</i>
              </span>
              }
            onTouchTap={() => answerQuestion(questionId, answerValue, answerKey)}
          />)}
        </RadioButtonGroup>
      </div>
    );
  }
}

export default connect(QuestionnaireQuestion);
