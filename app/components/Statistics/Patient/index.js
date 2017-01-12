// @flow
import React, { Component, PropTypes } from 'react';
import Divider from 'material-ui/Divider';

import { connect } from '../../../actions';
import { findIntoDatabase } from '../../../api/database';

import AdminLogin from '../../Login';
import StatisticsPatientInfo from './Info';
import StatisticsPatientQuestionnaires from './Questionnaires';
import StatisticsPatientChart from './Chart';
import Print from '../../Print';
import SaveAs from '../../SaveAs';

import { getIdFromHash } from '../../../utils/misc';
import { format as dateFormat } from '../../../config/date.json';

class StatisticsPatient extends Component {

  static propTypes = {
    errorLog: PropTypes.func,
    auth: PropTypes.bool,
    statistics: PropTypes.instanceOf(Object),
    locale: PropTypes.string
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
    const { auth, locale } = this.props;
    const { data } = this.state;
    if (data.length < 1) {
      this.getQuestionnaires();
      return (<div />);
    }
    const latestQuestionnaire = data[0];

    const exportDate = new global.Intl
      .DateTimeFormat(locale, dateFormat.date)
      .format(new Date());

    if (!auth) {
      return (<AdminLogin />);
    }

    return (
      <div>
        <Print style={{ float: 'right' }} />
        <SaveAs
          exportData={data}
          fileName={`cfqr-app-patient-${latestQuestionnaire.patient}-export-${exportDate}`}
          style={{ float: 'right' }}
        />
        <StatisticsPatientInfo questionnaireData={latestQuestionnaire} />
        <Divider />
        <StatisticsPatientChart questionnairesData={data} />
        <Divider />
        <StatisticsPatientQuestionnaires questionnairesData={data} />
        <Divider />
      </div>
    );
  }
}

export default connect(StatisticsPatient);
