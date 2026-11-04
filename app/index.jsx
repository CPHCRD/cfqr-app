import './polyfills';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { persistStore } from 'redux-persist';
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


initDatastore({
  filename: 'CFQR-questionnaire.db',
  timestampData: true
});

const store = configureStore();
const history = syncHistoryWithStore(hashHistory, store);
persistStore(store, {
  whitelist: ['locale']
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
      if (!window.gtag) {
        return;
      }
      if (database.loaded &&
          settings.uuid &&
          settings.analytics) {
        window.gtag('set', { user_id: settings.uuid });
      }
      window.gtag('event', 'page_view', {
        page_location: window.location.href,
        page_path: window.location.hash
      });
    }, 500);
  }
}

render(
  <Provider store={store}>
    <Router history={history} routes={routes} onUpdate={logPageView.bind(this)} />
  </Provider>,
  document.getElementById('root')
);
