import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import store from './store.js';

import {
  fetchAlbums,
  fetchPhotos,
  fetchTags,
  setApiUrl,
  setCurrentArchive,
  removeArchives,
  setMultiselect,
  setPromotedArchives,
} from './actions/index.js';

import {selectedAlbumSelector} from './selectors/index.js';

import App from './components/App.jsx';

const appContainer = document.getElementById('app');

let options;

try {
  options = JSON.parse(window.name);
} catch (err) {
  // TODO: Browser started without options, log event
  options = {
    multiselect: false,
  };
}

store.dispatch(setMultiselect(options.multiselect));
store.dispatch(setApiUrl(options.apiUrl));

store.dispatch(fetchTags());
store.dispatch(fetchAlbums())
  .then(() => {
    const state = store.getState();

    const hiddenArchives = Object.values(state.albums).filter((archive) => (
      options.hiddenArchives.find((name) => (
        new RegExp(archive.name, 'i').test(name)
      ))
    )).map(archive => archive.id);

    store.dispatch(removeArchives(hiddenArchives));

    return state;
  })
  .then((state) => {
    const promotedArchives = options.promotedArchives.map((name) => (
      Object.values(state.albums).find((archive) => (
        new RegExp(archive.name, 'i').test(name)
      )).id
    ));

    store.dispatch(setPromotedArchives(promotedArchives));

    return state;
  })
  .then((state) => {
    const defaultAlbum = Object.values(state.albums).find(album => (
      album.name === options.promotedArchives[0])
    );

    store.dispatch(setCurrentArchive(defaultAlbum.id));
  });

ReactDOM.render(
  React.createElement(Provider, {store}, React.createElement(App)),
  document.getElementById('app')
);
