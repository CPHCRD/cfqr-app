// @flow
import React, { Component } from 'react';
import { connect } from '../actions';

import StatisticsPatient from './Statistics/Patient';

class StatisticsPatientPage extends Component {

  render() {
    return (
      <article>
        <StatisticsPatient />
      </article>
    );
  }
}

export default connect(StatisticsPatientPage);
