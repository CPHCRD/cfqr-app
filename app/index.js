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
require('!style-loader!css-loader!sass-loader!./scss/style.scss');
require('!style-loader!css-loader!sass-loader!./scss/fonts.scss');
/* eslint-enable */

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

initDatastore({
  filename: './CFQR-questionnaire.db',
  // inMemoryOnly: true, //-> only dev
  timestampData: true
});

const store = configureStore();
const history = syncHistoryWithStore(hashHistory, store);
persistStore(store, {
  whitelist: ['locale']
});

ReactGA.initialize('UA-89248310-1', { debug: true });

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
