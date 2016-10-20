import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import store from './store.js';

import {
  setCurrentArchive,
  fetchAlbums,
  fetchPhotos,
  fetchTags,
  toggleMultiselect,
} from './actions/index.js';

import {selectedAlbumSelector} from './selectors/index.js';

const DEFAULT_ALBUM = '5001.6xpe2e7cIM88BTcTtyQ9iQ'; // NOTE: Oslo
// const DEFAULT_ALBUM = '5059.kNjs4vfT0Zncic-MampLmA'; // NOTE: No pagination
// const DEFAULT_ALBUM = '5069.lz9s-1s6qfMvh6uLBFNppQ'; // NOTE: Empty

store.dispatch(toggleMultiselect(true));
store.dispatch(fetchTags());
store.dispatch(fetchAlbums())
  .then(() => {
    store.dispatch(setCurrentArchive(DEFAULT_ALBUM));
  });

import App from './components/App.jsx';

ReactDOM.render(
  React.createElement(Provider, {store}, React.createElement(App)),
  document.getElementById('app')
);
