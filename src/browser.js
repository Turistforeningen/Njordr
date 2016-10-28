import 'babel-polyfill';
import './polyfills/custom-event.js';
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

let options;

try {
  options = JSON.parse(window.name);
} catch (err) {
  // TODO: Browser started without options, log event
  console.error('FotoWeb Browser started without options');
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

    if (options.hiddenArchives && options.hiddenArchives.length) {
      const hiddenArchives = Object.values(state.albums).filter((archive) => (
        options.hiddenArchives.find((name) => (
          new RegExp(archive.name, 'i').test(name)
        ))
      )).map(archive => archive.id);

      store.dispatch(removeArchives(hiddenArchives));
    }

    return state;
  })
  .then((state) => {
    if (options.promotedArchives && options.promotedArchives.length) {
      const promotedArchives = options.promotedArchives.reduce((archives, name) => {
        const hiddenArchive = Object.values(state.albums).find((archive) => (
          new RegExp(archive.name, 'i').test(name)
        ));

        if (hiddenArchive) {
          archives.push(hiddenArchive.id);
        } else {
          // NOTE: `Promoted archive "${name}" was not found in archives`
        }

        return archives;
      }, []);

      store.dispatch(setPromotedArchives(promotedArchives));
    }

    return state;
  })
  .then((state) => {
    if (options.promotedArchives && options.promotedArchives.length) {
      const defaultAlbum = Object.values(state.albums).find(album => (
        album.name === options.promotedArchives[0])
      );

      store.dispatch(setCurrentArchive(defaultAlbum.id));
    }
  });

ReactDOM.render(
  React.createElement(Provider, {store}, React.createElement(App)),
  document.getElementById('app')
);
