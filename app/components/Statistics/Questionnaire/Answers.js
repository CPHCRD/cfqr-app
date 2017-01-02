// @flow
import React, { Component, PropTypes } from 'react';

import { connect } from '../../../actions';

class StatisticsQuestionnaireAnswers extends Component {

  static propTypes = {
    i18n: PropTypes.func,
    cfqrData: PropTypes.shape({
      scores: PropTypes.object
    }),
    questionnaireData: PropTypes.instanceOf(Object)
  };

    // const { type } = questionnaireData;
    // const answerKey = `${type}-${key}`;
    
  render() {
    const { i18n, questionnaireData } = this.props;
    return (<div>
      {Object.keys(questionnaireData).map(key => {
        if (key === 'answers') {
          const answers = questionnaireData[key];
          return (<div key={key}>
            {Object.keys(answers).map(answerKey => {
              const questionKey = `${questionnaireData.type}-${answerKey}`;
              return (<div key={answerKey}>
                <h4>{i18n(questionKey)}</h4>
                <p>
                  Answer: {i18n(answers[answerKey])}<br />
                  Score: {questionnaireData.scores[answerKey]}
                </p>
              </div>);
            })}
          </div>);
        }
        return '';
      })}
    </div>);
  }
}

export default connect(StatisticsQuestionnaireAnswers);
