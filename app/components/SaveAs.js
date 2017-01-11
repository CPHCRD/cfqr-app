// @flow
import React, { Component, PropTypes } from 'react';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import FileSaver from 'file-saver';
import jsonexport from 'jsonexport';

import { connect } from '../actions';
import { getQuestionsInfo, calculateScore } from '../utils/questionnaire';
import { format as dateFormat } from '../config/date.json';

class SaveAs extends Component {

  static propTypes = {
    i18n: PropTypes.func,
    style: PropTypes.instanceOf(Object),
    exportData: PropTypes.instanceOf(Array),
    fileName: PropTypes.string,
    cfqrData: PropTypes.instanceOf(Object),
    locale: PropTypes.string
  };

  formatData(data) {
    const { i18n, locale, cfqrData } = this.props;

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

    const scores = calculateScore(data);

    const csvObject = {};
    infoHead.forEach((header, i) => {
      csvObject[header] = infoRow[i];
    });

    Object.keys(scores).forEach(type => {
      csvObject[`score.${type}`] = scores[type];
    });

    questionsIdRow.forEach((header, i) => {
      csvObject[header] = questionsRow[i];
      csvObject[`${header}.type`] = typeRow[i];
      csvObject[`${header}.answer`] = answersRow[i];
      csvObject[`${header}.score`] = scoreRow[i];
    });

    return csvObject;
  }

  saveAs() {
    const { exportData, fileName } = this.props;
    const csvObject = exportData.map(exportQst => this.formatData(exportQst));

    jsonexport(csvObject, {
      verticalOutput: false,
      undefinedString: 0
    }, (err, csv) => {
      const blob = new Blob([csv], {
        type: 'text/csv;charset=utf-8'
      });
      FileSaver.saveAs(blob, (`${fileName}.csv`).replace(/\s/g, '_').toLowerCase());
    });
  }

  render() {
    const { i18n } = this.props;

    return (
      <IconButton tooltip={i18n('export')} onTouchTap={this.saveAs.bind(this)} style={this.props.style}>
        <FontIcon className="material-icons">save</FontIcon>
      </IconButton>
    );
  }
}

export default connect(SaveAs);
