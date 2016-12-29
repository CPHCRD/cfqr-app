// @flow
import React, { Component, PropTypes } from 'react';

import { connect } from '../../../actions';

class StatisticsQuestionnairePatient extends Component {

  static propTypes = {
    i18n: PropTypes.func,
    questionnaireQuestions: PropTypes.instanceOf(Array),
    questionnaireData: PropTypes.instanceOf(Object)
  };

  render() {
    const { i18n, questionnaireQuestions, questionnaireData } = this.props;
    return (<div>
      {Object.keys(questionnaireData).map(key => {
        const value = questionnaireData[key];
        const question = questionnaireQuestions[key];
        if (question) {
          return (<div key={question}>
            <h4>{i18n(question)}</h4>
            <p>{value}</p>
          </div>);
        } else if (typeof value !== 'object') {
          return (<div key={key}>
            <h3>{key}</h3>
            <p>{value}</p>
          </div>);
        }
        return '';
      })}
    </div>);
  }
}

export default connect(StatisticsQuestionnairePatient);
