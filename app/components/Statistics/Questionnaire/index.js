// @flow
import React, { Component, PropTypes } from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';

import { connect } from '../../../actions';
import { getQuestionsFromData } from '../../../utils/questionnaire';
import { findOneIntoDatabase } from '../../../api/database';

import AdminLogin from '../../Login';
import StatisticsQuestionnairePatient from './Patient';
import StatisticsQuestionnaireAnswers from './Answers';
import StatisticsQuestionnaireScore from './Score';

const cfqrQuestions = getQuestionsFromData();

const getIdFromHash = () => {
  const { hash } = window.location;
  const pathParts = hash.split('/');
  const pathIdWithQuery = pathParts[pathParts.length - 1];
  return pathIdWithQuery.split('?')[0];
};

class StatisticsQuestionnaire extends Component {

  static propTypes = {
    i18n: PropTypes.func,
    errorLog: PropTypes.func,
    auth: PropTypes.bool
  };

  state = {
    data: {}
  };

  componentWillReceiveProps() {
    // ugly, params are not available
    this.getQuestionnaire();
  }

  getQuestionnaire() {
    const { errorLog } = this.props;
    const id = getIdFromHash();

    findOneIntoDatabase({ _id: id })
      .then(result => {
        this.setState({ data: result });
        return true;
      })
      .catch(err => {
        errorLog(err);
      });
  }

  render() {
    const { auth, i18n } = this.props;
    const { data } = this.state;
    if (!data) {
      return (<div />);
    }
    const { type: questionnaireType } = data;
    const questions = cfqrQuestions[questionnaireType];
    if (!data._id) {
      this.getQuestionnaire();
    }

    return (
      (!auth) ? <AdminLogin /> : <Tabs style={{ margin: '0 -5% 0 -5%' }}>
        <Tab
          icon={<FontIcon className="material-icons">assignment_ind</FontIcon>}
          label={i18n('statistics-questionnaire-patient')}
        >
          <StatisticsQuestionnairePatient questionnaireData={data} questionnaireQuestions={questions} />
        </Tab>
        <Tab
          icon={<FontIcon className="material-icons">assignment</FontIcon>}
          label={i18n('statistics-questionnaire-answers')}
        >
          <StatisticsQuestionnaireAnswers questionnaireData={data} />
        </Tab>
        <Tab
          icon={<FontIcon className="material-icons">assessment</FontIcon>}
          label={i18n('statistics-questionnaire-score')}
        >
          <StatisticsQuestionnaireScore questionnaireData={data} />
        </Tab>
      </Tabs>
    );
  }
}

export default connect(StatisticsQuestionnaire);
