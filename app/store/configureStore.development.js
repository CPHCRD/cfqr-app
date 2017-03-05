import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { hashHistory } from 'react-router';
import { routerMiddleware, push } from 'react-router-redux';
import createLogger from 'redux-logger';
import { autoRehydrate } from 'redux-persist';
import rootReducer from '../reducers';

import * as localeActions from '../actions/locale';
import * as questionnaireActions from '../actions/questionnaire';
import * as databaseActions from '../actions/database';
import * as authActions from '../actions/auth';
import * as statisticsActions from '../actions/statistics';
import * as settingsActions from '../actions/settings';
import * as errorActions from '../actions/error';

const actionCreators = {
  ...localeActions,
  ...questionnaireActions,
  ...databaseActions,
  ...authActions,
  ...statisticsActions,
  ...settingsActions,
  ...errorActions,
  push,
};

const logger = createLogger({
  level: 'info',
  collapsed: true
});

const router = routerMiddleware(hashHistory);

// If Redux DevTools Extension is installed use it, otherwise use Redux compose
/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    // Options: http://zalmoxisus.github.io/redux-devtools-extension/API/Arguments.html
    actionCreators,
  }) :
  compose;
/* eslint-enable no-underscore-dangle */
const enhancer = composeEnhancers(
  applyMiddleware(thunk, router, logger),
  autoRehydrate(),
);

export default function configureStore(initialState: Object) {
  const store = createStore(rootReducer, initialState, enhancer);

  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers')) // eslint-disable-line global-require
    );
  }

  return store;
}

