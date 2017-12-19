// @flow
import React, { Component, PropTypes } from 'react';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';

import { connect } from '../../actions';

import QuestionnaireCard from './Card';

class QuestionnaireGroupQuestion extends Component {
  static propTypes = {
    answers: PropTypes.arrayOf(PropTypes.string).isRequired,
    cards: PropTypes.string,
    question: PropTypes.shape({
      key: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      'doesnt-apply': PropTypes.bool
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
    if (this.props.cards) {
      return true;
    }
    return true;
  }

  render() {
    const {
      i18n,
      getCurrentQuestionAnswer,
      answerQuestion,
      questionnaire,
      question: elementQuestion,
      cards: elementCards,
      answers: elementQuestionsAnswers
    } = this.props;

    const { results } = questionnaire;
    const { key: questionKey, id: groupQuestionId, 'doesnt-apply': doesntApply = false } = elementQuestion;

    const elementAnswers = Object.assign([], elementQuestionsAnswers);
    if (doesntApply) {
      elementAnswers.push('questionnaire-doesnt-apply');
    }

    const currentAnswer = getCurrentQuestionAnswer(results, groupQuestionId);

    return (
      <div className="question__group-item" id={groupQuestionId} key={questionKey}>
        <div className="question__subtitle">
          {i18n(questionKey)}
        </div>
        {elementCards ?
          <QuestionnaireCard
            type={elementCards}
            answers={elementAnswers}
            question={elementQuestion}
          /> : ''}
        <RadioButtonGroup
          className="question__radio question__radio-landscape"
          name={groupQuestionId}
          valueSelected={currentAnswer}
        >
          {elementAnswers.map((answerKey, answerValue) =>
            (<RadioButton
              className="question__radio-item"
              key={`${groupQuestionId}-${answerKey}`}
              name={groupQuestionId}
              style={{ padding: '0.5rem 0', cursor: 'pointer' }}
              value={answerValue}
              label={i18n(`${answerKey}`)}
              onTouchTap={() => answerQuestion(groupQuestionId, answerValue, answerKey)}
            />))}
        </RadioButtonGroup>
      </div>
    );
  }
}

export default connect(QuestionnaireGroupQuestion);
