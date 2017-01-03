// @flow
import React, { Component, PropTypes } from 'react';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';

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

  renderQuestionnaireDebug(key, answer) {
    const { i18n, locale } = this.props;

    switch (key) {
      case 'updatedAt':
        return (
          <ListItem
            className="statistics__element"
            key={`statistics-questionnaire-${key}`}
            disabled={true}
          >
            <strong>{key}: </strong>
            {new global.Intl
              .DateTimeFormat(locale, dateFormat.full)
              .format(answer)}
          </ListItem>
        );
      case '_id':
      case 'appVersion':
      case 'dataVersion':
        return (
          <ListItem
            className="statistics__element"
            key={`statistics-questionnaire-${key}`}
            disabled={true}
          >
            <strong>{key}: </strong>
            {answer}
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
        <Divider />
        <StatisticsQuestionnairePatient questionnaireData={data} />
        <Divider />
        <StatisticsQuestionnaireScore questionnaireData={data} />
        <Divider />
        <StatisticsQuestionnaireAnswers questionnaireData={data} />
        <Divider />
        <List>
          <Subheader>Debug</Subheader>
          {Object.keys(data).map(key => this.renderQuestionnaireDebug(
            key,
            data[key]))}
            <ListItem
              className="statistics__element"
              key="statistics-questionnaire-debug-object"
              disabled={true}
            >
              <strong>Debug object</strong>
              <br /><br />
              <i>
                {JSON.stringify(data)}
              </i>
            </ListItem>
        </List>
      </div>
    );
  }
}

export default connect(StatisticsQuestionnaire);
