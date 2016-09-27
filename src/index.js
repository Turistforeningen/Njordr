import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

import {
  selectAlbum,
  setAlbumNeedsUpdate,
  fetchAlbum,
  fetchAlbums,
  fetchTags,
} from './actions/index.js';

const loggerMiddleware = createLogger();
const store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware, loggerMiddleware)
);

store.dispatch(fetchAlbums());
store.dispatch(fetchTags());
store.dispatch(selectAlbum('5001.6xpe2e7cIM88BTcTtyQ9iQ'));
store.dispatch(fetchAlbum('5001.6xpe2e7cIM88BTcTtyQ9iQ'));

import App from './components/App.jsx';

function handleChange() {
  // TODO: Need to revisit this
  const {albums, selectedAlbum, tags} = store.getState();
  if (albums && albums[selectedAlbum] && albums[selectedAlbum].needsUpdate) {
    store.dispatch(setAlbumNeedsUpdate(selectedAlbum, false));
    store.dispatch(fetchAlbum(
      selectedAlbum,
      tags.filter((item, index, list) => item.isApplied).map(item => item.val)
    ));
  }
}

const unsubscribe = store.subscribe(handleChange);

ReactDOM.render(
  React.createElement(Provider, {store}, React.createElement(App)),
  document.getElementById('app')
);
