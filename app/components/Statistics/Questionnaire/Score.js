// @flow
import React, { Component, PropTypes } from 'react';
import cfqrData from 'cfqr-data';

import { connect } from '../../../actions';

class StatisticsQuestionnaireScore extends Component {

  static propTypes = {
    questionnaireData: PropTypes.instanceOf(Object)
  };

  calculateScoreByType() {
    const { questionnaireData } = this.props;
    const { scores, type } = questionnaireData;
    const questionsScores = cfqrData.scores[type];
    if (!questionsScores) {
      return {};
    }
    const scoresByType = {};
    Object.keys(questionsScores).forEach(questionId => {
      const question = questionsScores[questionId];
      const questionType = question.type;
      const score = scores[questionId];

      if (!scoresByType[questionType]) {
        scoresByType[questionType] = {
          total: 0,
          count: 0
        };
      }
      scoresByType[questionType].total += score;
      scoresByType[questionType].count += 1;
    });
    const finalScores = {};
    Object.keys(scoresByType).forEach(scoreTypeKey => {
      const scoreType = scoresByType[scoreTypeKey];
      finalScores[scoreTypeKey] = (scoreType.total - scoreType.count) / ((scoreType.count * 3) * 100);
      if (isNaN(finalScores[scoreTypeKey])) {
        finalScores[scoreTypeKey] = 0;
      }
    });
    return finalScores;
  }

  render() {
    // const { i18n } = this.props;
    const scores = this.calculateScoreByType();
    return (<div>
      {Object.keys(scores).map(key => <p key={`score-${key}`}>
        <strong>{key}:</strong> {scores[key]}
      </p>)}
    </div>
    );
  }
}

export default connect(StatisticsQuestionnaireScore);
