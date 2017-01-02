// @flow
import { bindActionCreators } from 'redux';
import { connect as reduxConnect, Connector } from 'react-redux';
import cfqrData from 'cfqr-data';

import * as LocaleActions from './locale';
import * as QuestionnaireActions from './questionnaire';
import * as DatabaseActions from './database';
import * as AuthActions from './auth';
import * as SettingsActions from './settings';
import * as StatisticsActions from './statistics';
import * as ErrorActions from './error';

import translations from '../api/i18n';
import routes from '../config/routes.json';
import i18n from '../config/i18n.json';

const config = { routes, i18n };

const mapStateToProps = (state) => ({
  config,
  cfqrData,
  counter: state.counter,
  locale: state.locale,
  questionnaire: state.questionnaire,
  database: state.database,
  auth: state.auth,
  settings: state.settings,
  statistics: state.statistics,
  routing: state.routing,
  i18n: (key) => {
    if (!key) {
      return '';
    }
    return translations[state.locale][key] || translations[i18n.defaultLocale][key];
  },
  getCurrentQuestionAnswer: (results, questionId) => {
    let currentAnswer = '';
    if (typeof questionId !== 'undefined' && typeof results[questionId] !== 'undefined') {
      currentAnswer = results[questionId].answer;
    }
    return currentAnswer;
  }
});

const mapDispatchToProps = (dispatch) => bindActionCreators(Object.assign(
    {},
    LocaleActions,
    QuestionnaireActions,
    DatabaseActions,
    AuthActions,
    StatisticsActions,
    SettingsActions,
    ErrorActions
  ), dispatch);


export const connect: Function = reduxConnect(mapStateToProps, mapDispatchToProps);

export const connector: Function = Connector;
