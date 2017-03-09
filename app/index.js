// @flow
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { persistStore } from 'redux-persist';
import ReactGA from 'react-ga';
import injectTapEventPlugin from 'react-tap-event-plugin';

import routes from './routes';
import configureStore from './store/configureStore';
import { initDatastore } from './api/database';

// CSS
/* eslint-disable */
import './scss/fonts.scss';
import './scss/style.scss';
/* eslint-enable */

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();


let databasePath = 'CFQR-questionnaire.db';
if (!process.env.isWeb) {
  /* eslint-disable */
  const remote = require('electron').remote;
  const { app } = remote;
  databasePath = `${app.getPath('userData')}/${databaseName}`;
  /* eslint-enable */
}

initDatastore({
  filename: databasePath,
  timestampData: true
});

const store = configureStore();
const history = syncHistoryWithStore(hashHistory, store);
persistStore(store, {
  whitelist: ['locale']
});

ReactGA.initialize(process.env.GOOGLE_ANALYTICS_ID, {
  debug: process.env.NODE_ENV !== 'production'
});

function logPageView() {
  // Google Analytics
  // this is the code to store usage information on Google Analytics.
  // this is active only if the user has the "analytics" option toggled on.
  // the option can be found in the application settings.
  // all the information logged are anonymous.
  // the purpose of this information is to detect bugs and improve the user experience.
  // no questionnaire data is stored using Google Analytics.
  if (navigator.onLine) {
    setTimeout(() => {
      const state = store.getState();
      const { database, settings } = state;
      if (database.loaded &&
          settings.uuid &&
          settings.analytics) {
        ReactGA.set({ userId: settings.uuid });
      }
      ReactGA.set({ page: window.location.hash });
      ReactGA.pageview(window.location.hash);
    }, 500);
  }
}

render(
  <Provider store={store}>
    <Router history={history} routes={routes} onUpdate={logPageView.bind(this)} />
  </Provider>,
  document.getElementById('root')
);
