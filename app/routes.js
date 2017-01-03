// @flow
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';

import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import PatientsPage from './components/PatientsPage';
import StatisticsPage from './components/StatisticsPage';
import StatisticsQuestionnairePage from './components/StatisticsQuestionnairePage';
import StatisticsPatientPage from './components/StatisticsPatientPage';
import QuestionnairePage from './components/QuestionnairePage';
import TermsPage from './components/TermsPage';
import SettingsPage from './components/SettingsPage';

import routesConfig from './config/routes.json';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path={routesConfig.about.url} component={AboutPage} />
    <Route path={routesConfig.patients.url} component={PatientsPage} />
    <Route path={routesConfig.questionnaire.url} component={QuestionnairePage} />
    <Route path={routesConfig.settings.url} component={SettingsPage} />
    <Route path={routesConfig.statistics.url} component={StatisticsPage} />
    <Route path={`${routesConfig.statistics.url}/questionnaire/:id`} component={StatisticsQuestionnairePage} />
    <Route path={`${routesConfig.statistics.url}/patient/:id`} component={StatisticsPatientPage} />
    <Route path={routesConfig.terms.url} component={TermsPage} />
  </Route>
);
