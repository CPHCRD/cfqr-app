// @flow
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { filterActions } from 'redux-ignore';

import auth from './auth';
import logged from './logged';
import {
  AUTHENTICATE_DONE,
  SIGN_OUT,
  LOGGED_IN,
  LOGGED_OUT
} from '../actions/auth';

import counter from './counter';

import database from './database';
import {
  LOAD_DATABASE_DONE
} from '../actions/database';

import error from './error';
import { ERROR_LOG } from '../actions/error';

import locale from './locale';
import { CHANGE_LOCALE } from '../actions/locale';

import questionnaire from './questionnaire';
import {
  RESET_QUESTIONNAIRE,
  CHANGE_QUESTIONNAIRE,
  ANSWER_QUESTION,
  SET_PROPERTY,
  SET_QUESTIONNAIRE_STEP
} from '../actions/questionnaire';

import settings from './settings';
import {
  TOGGLE_ANALYTICS_DONE,
  CHANGE_PASSPHRASE_DONE
} from '../actions/settings';

import {
  SET_FILTER,
  SET_SORT
} from '../actions/statistics';
import statistics from './statistics';

const rootReducer = combineReducers({
  auth: filterActions(auth, [AUTHENTICATE_DONE, SIGN_OUT, LOGGED_IN, LOGGED_OUT]),
  logged: filterActions(logged, [LOGGED_IN, LOGGED_OUT]),
  counter: filterActions(counter, [RESET_QUESTIONNAIRE, SET_QUESTIONNAIRE_STEP]),
  locale: filterActions(locale, [CHANGE_LOCALE]),
  questionnaire: filterActions(questionnaire, [
    RESET_QUESTIONNAIRE, CHANGE_QUESTIONNAIRE, ANSWER_QUESTION, SET_PROPERTY
  ]),
  database: filterActions(database, [LOAD_DATABASE_DONE]),
  error: filterActions(error, [ERROR_LOG]),
  settings: filterActions(settings, [
    LOAD_DATABASE_DONE, TOGGLE_ANALYTICS_DONE, CHANGE_PASSPHRASE_DONE
  ]),
  routing,
  statistics: filterActions(statistics, [SET_FILTER, SET_SORT])
});

export default rootReducer;
