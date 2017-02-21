// @flow
import React, { PureComponent, PropTypes } from 'react';
import { cyan700 } from 'material-ui/styles/colors';

import { connect } from '../../actions';

import QuestionnaireGroupQuestion from './GroupQuestion';

class QuestionnaireGroup extends PureComponent {

  static propTypes = {
    element: PropTypes.shape({
      key: PropTypes.string.isRequired,
      answers: PropTypes.array.isRequired,
      cards: PropTypes.string,
      questions: PropTypes.array.isRequired
    }).isRequired,
    i18n: PropTypes.func,
    locale: PropTypes.string
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
    const { element, i18n } = this.props;
    const {
      key: elementKey,
      questions: elementQuestions,
      cards: elementCards,
      answers: elementQuestionsAnswers } = element;

    return (
      <div className="question question--landscape" key={elementKey}>
        <div className="question__title" style={{ color: cyan700 }}>
          {i18n(elementKey)}
        </div>
        <div className="question__group-container">
          {elementQuestions.map(question =>
            <QuestionnaireGroupQuestion
              key={`${elementKey}-${question.id}`}
              cards={elementCards}
              question={question}
              answers={elementQuestionsAnswers}
            />
          )}
        </div>
      </div>
    );
  }
}

export default connect(QuestionnaireGroup);
