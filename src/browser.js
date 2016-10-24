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
  setMultiselect,
} from './actions/index.js';

import {selectedAlbumSelector} from './selectors/index.js';

import App from './components/App.jsx';

const appContainer = document.getElementById('app');

if (appContainer) {
  let options;

  try {
    options = JSON.parse(window.name);
  } catch (err) {
    // TODO: Browser started without options, log event
    options = {
      promotedArchives: ['DNT Sentralt'],
      multiselect: false,
    };
  }

  store.dispatch(setMultiselect(true));
  store.dispatch(fetchTags());
  store.dispatch(fetchAlbums())
    .then(() => {
      const state = store.getState();
      const defaultAlbum = Object.values(state.albums).find(album => (
        album.name === options.promotedArchives[0])
      );
      store.dispatch(setCurrentArchive(defaultAlbum.id));
    });

  ReactDOM.render(
    React.createElement(Provider, {store}, React.createElement(App)),
    document.getElementById('app')
  );
}
