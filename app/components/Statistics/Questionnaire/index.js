// @flow
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import FontIcon from 'material-ui/FontIcon';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import { cyan700 } from 'material-ui/styles/colors';

import { connect } from '../../../actions';
import { findOneIntoDatabase } from '../../../api/database';
import { getIdFromHash } from '../../../utils/misc';

import AdminLogin from '../../Login';
import StatisticsPatientInfo from '../Patient/Info';
import StatisticsQuestionnaireAnswers from './Answers';
import StatisticsQuestionnaireScore from './Score';
import Print from '../../Print';
import SaveAs from '../../SaveAs';

import { format as dateFormat } from '../../../config/date.json';
import { getQuestionsInfo } from '../../../utils/questionnaire';

class StatisticsQuestionnaire extends Component {

  static propTypes = {
    i18n: PropTypes.func,
    errorLog: PropTypes.func,
    auth: PropTypes.bool,
    locale: PropTypes.string,
    cfqrData: PropTypes.instanceOf(Object)
  };

  state = {
    debug: false,
    data: {}
  };

  componentWillReceiveProps() {
    // ugly, params are not available
    this.getQuestionnaire();
  }

  getExportData() {
    const { i18n, locale, cfqrData } = this.props;
    const { data } = this.state;

    const infoHead = [];
    const infoRow = [];

    infoHead.push(i18n('statistics-questionnaire-patient'));
    infoRow.push(data.patient || i18n('statistics-questionnaire-patient-unidentified'));

    infoHead.push(i18n('statistics-questionnaire-gender'));
    infoRow.push(i18n(`statistics-questionnaire-gender-${data.gender}`));

    infoHead.push(i18n('statistics-questionnaire-race'));
    infoRow.push(i18n(`statistics-questionnaire-race-${data.race}`));

    infoHead.push(i18n('statistics-questionnaire-birth-date'));
    infoRow.push(new global.Intl.DateTimeFormat(locale, dateFormat.date).format(data['birth-date']));

    if (data.relationship) {
      infoHead.push(i18n('statistics-questionnaire-patient-parent'));
      infoRow.push(i18n(`statistics-questionnaire-relationship-${data.relationship}`));
    }

    if (data['birth-parent']) {
      infoHead.push(i18n('statistics-questionnaire-birth-date'));
      infoRow.push(new global.Intl.DateTimeFormat(locale, dateFormat.date).format(data['birth-parent']));
    }

    if (data['marital-parent']) {
      infoHead.push(i18n('statistics-questionnaire-marital'));
      infoRow.push(i18n(`statistics-questionnaire-marital-${data['marital-parent']}`));
    }

    if (data['school-parent']) {
      infoHead.push(i18n('statistics-questionnaire-school-level'));
      infoRow.push(i18n(`statistics-questionnaire-school-${data['school-parent']}`));
    }

    if (data['work-parent']) {
      infoHead.push(i18n('statistics-questionnaire-work-status'));
      infoRow.push(i18n(`statistics-questionnaire-work-${data['work-parent']}`));
    }

    if (data['grade-young-child']) {
      infoHead.push(i18n('statistics-questionnaire-grade'));
      infoRow.push(i18n(`statistics-questionnaire-grade-young-child-${data['grade-young-child']}`));
    }

    if (data['grade-older-child']) {
      infoHead.push(i18n('statistics-questionnaire-grade'));
      infoRow.push(i18n(`statistics-questionnaire-grade-older-child-${data['grade-older-child']}`));
    }

    if (data['grade-teen-adult']) {
      infoHead.push(i18n('statistics-questionnaire-grade'));
      infoRow.push(i18n(`statistics-questionnaire-grade-teen-adult-${data['grade-teen-adult']}`));
    }

    if (data.work) {
      infoHead.push(i18n('statistics-questionnaire-work-status'));
      infoRow.push(i18n(`statistics-questionnaire-work-${data.work}`));
    }

    if (data.vacation) {
      infoHead.push(i18n('statistics-questionnaire-vacation-recent'));
      infoRow.push(data.vacation ? i18n('statistics-questionnaire-yes') : i18n('statistics-questionnaire-no'));
    }

    const questionnaireElements = cfqrData.elements[data.type];
    const questionnaireScores = cfqrData.scores[data.type];
    const questionsInfo = getQuestionsInfo(questionnaireElements);
    const questionsIdRow = [];
    const questionsRow = [];
    const answersRow = [];
    const typeRow = [];
    const scoreRow = [];

    if (data.answers) {
      Object.keys(data.answers).forEach(qstKey => {
        const question = questionsInfo[qstKey];
        const answer = data.answers[qstKey];
        questionsIdRow.push(qstKey);
        questionsRow.push(i18n(question.key));
        answersRow.push(i18n(question.answers[answer]));
        typeRow.push(i18n(`statistics-questionnaire-type-${questionnaireScores[qstKey].type}`));
        scoreRow.push(questionnaireScores[qstKey].score[answer]);
      });
    }

    return {
      data: [
        infoHead,
        infoRow,
        [],
        questionsIdRow,
        questionsRow,
        answersRow,
        typeRow,
        scoreRow
      ]
    };
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
    const { locale } = this.props;

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

    const exportFileName = (data.type && data.createdAt) ?
      `${data.type}-${data.createdAt.toString().replace(' ', '_')}` : '';

    const exportData = this.getExportData();

    return (
      (!auth) ? <AdminLogin /> : <div>
        <List>
          <Print style={{ float: 'right' }} />
          <SaveAs exportData={exportData} fileName={exportFileName} style={{ float: 'right' }} />
          <Subheader>{i18n('statistics-questionnaire-info')}</Subheader>
          {Object.keys(data).map(key => this.renderQuestionnaireInfo(
            key,
            data[key]))}
        </List>
        <Divider />
        <StatisticsPatientInfo questionnaireData={data} />
        {data.patient ?
          <FlatButton
            containerElement={<Link
              className="statistics__patient-link no-print"
              to={`/statistics/patient/${data.patient}`}
              style={{ color: cyan700 }}
            >{i18n('statistics-patient-click-here')}</Link>}
            label={i18n('statistics-patient-view-information')}
            labelPosition="before"
            primary={true}
            icon={<FontIcon color={cyan700} className="material-icons">folder_shared</FontIcon>}
          /> : ''}
        <Divider />
        <StatisticsQuestionnaireScore questionnaireData={data} />
        <Divider />
        <StatisticsQuestionnaireAnswers questionnaireData={data} />
        <div className="no-print" style={{ maxWidth: 150, marginTop: '1rem' }}>
          <Toggle
            label="Debug"
            defaultToggled={this.state.debug}
            onToggle={() => {
              this.setState({
                debug: !this.state.debug
              });
            }}
          />
        </div>
        {this.state.debug ? <List>
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
        : ''}
      </div>
    );
  }
}

export default connect(StatisticsQuestionnaire);
