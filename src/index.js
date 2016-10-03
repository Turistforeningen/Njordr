import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import {
  selectAlbum,
  fetchAlbums,
  fetchPhotos,
  fetchTags,
  toggleMultiselect,
} from './actions/index.js';

import {selectedAlbumSelector} from './selectors/index.js';

import store from './store.js';

const DEFAULT_ALBUM = '5001.6xpe2e7cIM88BTcTtyQ9iQ';

store.dispatch(toggleMultiselect(true));
store.dispatch(fetchTags());
store.dispatch(fetchAlbums())
  .then(() => {
    store.dispatch(selectAlbum(DEFAULT_ALBUM));
    // store.dispatch(fetchPhotos(selectedAlbumSelector(store.getState())));
  });

import App from './components/App.jsx';

function handleChange() {
  // TODO: Need to revisit this
  const {albums, selectedAlbum, tags} = store.getState();
  if (albums && albums[selectedAlbum] && albums[selectedAlbum].needsReload) {
    store.dispatch(fetchPhotos(
      albums[selectedAlbum],
      tags.filter((item, index, list) => item.isApplied).map(item => item.val)
    ));
  }
}

const unsubscribe = store.subscribe(handleChange);

ReactDOM.render(
  React.createElement(Provider, {store}, React.createElement(App)),
  document.getElementById('app')
);
