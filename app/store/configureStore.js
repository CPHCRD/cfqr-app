import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { hashHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import createLogger from 'redux-logger';
import { autoRehydrate } from 'redux-persist';
import rootReducer from '../reducers';

const middlewares = [thunk, routerMiddleware(hashHistory)];

if (import.meta.env.DEV) {
  middlewares.push(createLogger({
    level: 'info',
    collapsed: true
  }));
}

// If Redux DevTools Extension is installed use it, otherwise use Redux compose
/* eslint-disable no-underscore-dangle */
const composeEnhancers = (import.meta.env.DEV && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
/* eslint-enable no-underscore-dangle */

const enhancer = composeEnhancers(
  applyMiddleware(...middlewares),
  autoRehydrate(),
);

export default function configureStore(initialState) {
  return createStore(rootReducer, initialState, enhancer);
}
