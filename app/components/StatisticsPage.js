// @flow
import React, { Component, PropTypes } from 'react';
import { connect } from '../actions';

import Statistics from './Statistics';

class StatisticsPage extends Component {

  static propTypes = {
    i18n: PropTypes.func
  };

  render() {
    const { i18n } = this.props;

    return (
      <article>
        <h2>{ i18n('statistics-title') }</h2>
        <p>{ i18n('statistics-description') }</p>
        <Statistics />
      </article>
    );
  }
}

export default connect(StatisticsPage);
