// @flow
import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { hashHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import { autoRehydrate } from 'redux-persist';
import rootReducer from '../reducers';

const router = routerMiddleware(hashHistory);

const enhancer = compose(
 applyMiddleware(thunk, router),
 autoRehydrate(),
);

export default function configureStore(initialState: Object) {
  return createStore(rootReducer, initialState, enhancer);
}
