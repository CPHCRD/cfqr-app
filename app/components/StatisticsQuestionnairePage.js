// @flow
import React, { Component, PropTypes } from 'react';
import Back from './Back';

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
        <Back
          style={{
            position: 'absolute',
            left: 0,
            marginTop: '1rem'
          }}
        />
        <h2>{ i18n('statistics-questionnaire-title') }</h2>
        <StatisticsQuestionnaire />
      </article>
    );
  }
}

export default connect(StatisticsQuestionnairePage);
