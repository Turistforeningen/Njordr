import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

import {selectAlbum, fetchAlbum} from './actions/index.js';
import rootReducer from './reducers/index.js';

const loggerMiddleware = createLogger();
const store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware, loggerMiddleware)
);

store.dispatch(selectAlbum('5001.6xpe2e7cIM88BTcTtyQ9iQ'));
store.dispatch(fetchAlbum('5001.6xpe2e7cIM88BTcTtyQ9iQ'));

import App from './components/App.jsx';

ReactDOM.render(
  React.createElement(Provider, {store}, React.createElement(App)),
  document.getElementById('app')
);
