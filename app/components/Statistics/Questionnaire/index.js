// @flow
import React, { Component, PropTypes } from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

import { connect } from '../../../actions';
import { findOneIntoDatabase } from '../../../api/database';

import AdminLogin from '../../Login';
import StatisticsQuestionnairePatient from './Patient';
import StatisticsQuestionnaireAnswers from './Answers';
import StatisticsQuestionnaireScore from './Score';

import { format as dateFormat } from '../../../config/date.json';

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
    auth: PropTypes.bool,
    locale: PropTypes.string
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

  renderQuestionnaireInfo(key, answer) {
    const { i18n, locale } = this.props;

    switch (key) {
      case 'createdAt':
        return (
          <ListItem
            className="statistics__element"
            key={`statistics-questionnaire-${key}`}
            disabled={true}
          >
            <strong>{i18n(`statistics-questionnaire-${key}`)}: </strong>
            {new global.Intl
              .DateTimeFormat(locale, dateFormat.full)
              .format(answer)}
          </ListItem>
        );
      case 'type':
        return (
          <ListItem
            className="statistics__element"
            key={`statistics-questionnaire-${key}`}
            disabled={true}
          >
            <strong>{i18n(`statistics-questionnaire-${key}`)}: </strong>
            {i18n(answer)}
          </ListItem>
        );
      default:
        return '';
    }
  }

  render() {
    const { auth, i18n } = this.props;
    const { data } = this.state;
    if (!data) {
      return (<div />);
    }
    if (!data._id) {
      this.getQuestionnaire();
    }

    return (
      (!auth) ? <AdminLogin /> : <div>

        <List>
          <Subheader>{i18n('statistics-questionnaire-info')}</Subheader>
          {Object.keys(data).map(key => this.renderQuestionnaireInfo(
            key,
            data[key]))}
        </List>
        <StatisticsQuestionnairePatient questionnaireData={data} />
        <Tabs style={{ margin: '0 -5% 0 -5%' }}>
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
      </div>
    );
  }
}

export default connect(StatisticsQuestionnaire);
