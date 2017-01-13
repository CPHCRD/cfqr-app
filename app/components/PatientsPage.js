// @flow
import React, { Component, PropTypes } from 'react';
import { connect } from '../actions';

import Patients from './Statistics/Patients';

import NotConnected from './NotConnected';

class PatientsPage extends Component {

  static propTypes = {
    i18n: PropTypes.func
  };

  render() {
    const { i18n } = this.props;

    return (
      <article>
        <h2>{i18n('patients-title')}</h2>
        <NotConnected />
        <Patients />
      </article>
    );
  }
}

export default connect(PatientsPage);
