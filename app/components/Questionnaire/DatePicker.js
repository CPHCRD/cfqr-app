// @flow
import React, { PureComponent, PropTypes } from 'react';
import DatePicker from 'material-ui/DatePicker';

import { connect } from '../../actions';

class QuestionnaireDatePicker extends PureComponent {

  static propTypes = {
    element: PropTypes.shape({
      key: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired
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
    const {
      element, getCurrentQuestionAnswer,
      i18n, locale,
      answerQuestion, questionnaire } = this.props;
    const { key: elementKey, id: questionId } = element;
    const { results } = questionnaire;
    const currentAnswer = getCurrentQuestionAnswer(results, questionId);

    return (
      <div className="question" id={questionId} key={elementKey}>
        <div className="question__title">{i18n(elementKey)}</div>
        {currentAnswer ? (
          <DatePicker
            locale={locale}
            defaultDate={currentAnswer}
            DateTimeFormat={global.Intl.DateTimeFormat}
            hintText={i18n('questionnaire-date-enter')}
            onChange={(e, value) => answerQuestion(questionId, value)}
          />
        ) : (
        <DatePicker
          locale={locale}
          DateTimeFormat={global.Intl.DateTimeFormat}
          hintText={i18n('questionnaire-date-enter')}
          onChange={(e, value) => answerQuestion(questionId, value)}
        />)}
      </div>
    );
  }
}

export default connect(QuestionnaireDatePicker);
