// @flow
import React, { Component, PropTypes } from 'react';

import { connect } from '../actions';
import StatisticsPatient from './Statistics/Patient';
import Back from './Back';

class StatisticsPatientPage extends Component {
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
        <h2>{i18n('statistics-patient-title')}</h2>
        <StatisticsPatient />
      </article>
    );
  }
}

export default connect(StatisticsPatientPage);
