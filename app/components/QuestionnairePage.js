// @flow
import React, { Component, PropTypes } from 'react';
import { connect } from '../actions';

import Questionnaire from './Questionnaire';

class QuestionnairePage extends Component {

  static propTypes = {
    i18n: PropTypes.func
  };

  render() {
    const { i18n } = this.props;

    return (
      <article>
        <h2>{ i18n('questionnaire-title') }</h2>
        <p>{ i18n('questionnaire-description') }</p>
        <Questionnaire />
      </article>
    );
  }
}

export default connect(QuestionnairePage);
