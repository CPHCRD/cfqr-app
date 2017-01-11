// @flow
import React, { Component, PropTypes } from 'react';
import Divider from 'material-ui/Divider';

import { connect } from '../../../actions';
import { findIntoDatabase } from '../../../api/database';

import AdminLogin from '../../Login';
import StatisticsPatientInfo from './Info';
import StatisticsPatientQuestionnaires from './Questionnaires';
import Print from '../../Print';
import SaveAs from '../../SaveAs';

import { getIdFromHash } from '../../../utils/misc';

class StatisticsPatient extends Component {

  static propTypes = {
    errorLog: PropTypes.func,
    auth: PropTypes.bool,
    statistics: PropTypes.instanceOf(Object)
  };

  state = {
    data: []
  };

  componentWillReceiveProps() {
    // ugly, params are not available
    this.getQuestionnaires();
  }

  getQuestionnaires() {
    const { errorLog, statistics } = this.props;
    const { sort } = statistics;
    const patient = getIdFromHash();

    findIntoDatabase({ patient }, { sort })
      .then(result => {
        this.setState({ data: result });
        return true;
      })
      .catch(err => {
        errorLog(err);
      });
  }

  render() {
    const { auth } = this.props;
    const { data } = this.state;
    if (data.length < 1) {
      this.getQuestionnaires();
      return (<div />);
    }
    const latestQuestionnaire = data[0];

    return (
      (!auth) ? <AdminLogin /> : <div>
        <Print style={{ float: 'right' }} />
        <SaveAs
          exportData={data}
          fileName={`cfqr-app-patient-${latestQuestionnaire.patient}-export-${new Date().toString()}`}
          style={{ float: 'right' }}
        />
        <StatisticsPatientInfo questionnaireData={latestQuestionnaire} />
        <Divider />
        <StatisticsPatientQuestionnaires questionnairesData={data} />
        <Divider />
      </div>
    );
  }
}

export default connect(StatisticsPatient);
