// @flow
import React, { Component, PropTypes } from 'react';
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';
import {
  grey50,
  blue900,
  pink300,
} from 'material-ui/styles/colors';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

import { connect } from '../../../actions';

import { format as dateFormat } from '../../../config/date.json';
import { race, gender, relationship, marital, work, school, grade } from '../../../config/patient.json';

class StatisticsQuestionnairePatient extends Component {

  static propTypes = {
    i18n: PropTypes.func,
    questionnaireData: PropTypes.instanceOf(Object),
    locale: PropTypes.string
  };

  renderPatientInfo() {
    const { i18n, questionnaireData, locale } = this.props;

    return (
      <ListItem
        className="statistics__element"
        key="qst-stats-patient"
        disabled={true}
        leftAvatar={
          <Avatar
            icon={<FontIcon className="material-icons">person</FontIcon>}
            color={grey50}
            backgroundColor={questionnaireData.gender === 1 ? pink300 : blue900}
          />
        }
      >
        <div>
          <div className="statistics__patient-name">
            {questionnaireData.patient ?
              questionnaireData.patient :
              i18n('statistics-questionnaire-patient-unidentified')}
          </div>
          <div className="statistics__patient-info">
            {i18n('statistics-questionnaire-gender')}:
            <strong> {i18n(`statistics-questionnaire-gender-${gender[questionnaireData.gender]}`)}</strong>
          </div>
          <div className="statistics__patient-info">
            {i18n('statistics-questionnaire-birth-date')}:
            <strong> {new global.Intl
                .DateTimeFormat(locale, dateFormat.date)
                .format(questionnaireData['birth-date'])}</strong>
          </div>
          {questionnaireData.work ? <div className="statistics__patient-info">
            {i18n('statistics-questionnaire-work')}:
            <strong> {i18n(`statistics-questionnaire-work-${work[questionnaireData.work]}`)}</strong>
          </div> : ''}
        </div>
      </ListItem>
    );
  }

  renderPatientParentInfo() {
    const { i18n, questionnaireData, locale } = this.props;

    return (
      <ListItem
        className="statistics__element"
        key="qst-stats-patient-parent"
        disabled={true}
        leftAvatar={
          <Avatar
            icon={<FontIcon className="material-icons">person</FontIcon>}
          />
        }
      >
        <div>
          <div className="statistics__patient-name">
            {i18n(`statistics-questionnaire-relationship-${relationship[questionnaireData.relationship]}`)}
          </div>
          <div className="statistics__patient-info">
            {i18n('statistics-questionnaire-birth-date')}:
            <strong> {new global.Intl
                .DateTimeFormat(locale, dateFormat.date)
                .format(questionnaireData['birth-parent'])}</strong>
          </div>
          <div className="statistics__patient-info">
            {i18n('statistics-questionnaire-race')}:
            <strong> {i18n(`statistics-questionnaire-race-${race[questionnaireData.race]}`)}</strong>
          </div>
          <div className="statistics__patient-info">
            {i18n('statistics-questionnaire-marital')}:
            <strong> {i18n(`statistics-questionnaire-marital-${marital[questionnaireData.marital]}`)}</strong>
          </div>
          <div className="statistics__patient-info">
            {i18n('statistics-questionnaire-school-level')}:
            <strong> {i18n(`statistics-questionnaire-school-${school[questionnaireData.school]}`)}</strong>
          </div>
          <div className="statistics__patient-info">
            {i18n('statistics-questionnaire-work-status')}:
            <strong> {i18n(`statistics-questionnaire-work-${work[questionnaireData.work]}`)}</strong>
          </div>
        </div>
      </ListItem>
    );
  }

  render() {
    const { i18n, questionnaireData } = this.props;
console.log(questionnaireData)
    return (
      <List>
        <Subheader>{i18n('statistics-questionnaire-patient')}</Subheader>
        {this.renderPatientInfo()}
        {this.renderPatientParentInfo()}
      </List>
    );
  }
}

export default connect(StatisticsQuestionnairePatient);
