// @flow
import React, { Component, PropTypes } from 'react';
import { connect } from '../actions';

import StatisticsQuestionnaire from './Statistics/Questionnaire';

class StatisticsQuestionnairePage extends Component {

  static propTypes = {
    i18n: PropTypes.func
  };

  render() {
    const { i18n } = this.props;

    return (
      <article>
        <h2>{ i18n('statistics-questionnaire-title') }</h2>
        <StatisticsQuestionnaire />
      </article>
    );
  }
}

export default connect(StatisticsQuestionnairePage);
