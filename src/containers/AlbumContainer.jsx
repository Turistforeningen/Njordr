import React from 'react';
import {connect} from 'react-redux';

import Album from '../components/Album.jsx';
import {clearSearch, fetchPhotos} from '../actions/index.js';

const getPhotos = function getPhotos(state) {
  if (state.albums[state.selectedAlbum].hasActiveSearch) {
    return state.albums[state.selectedAlbum].result.data.map(photo => photo);
  } else if (
    state.selectedAlbum &&
    state.albums[state.selectedAlbum] &&
    state.albums[state.selectedAlbum].photos &&
    state.albums[state.selectedAlbum].photos.length
  ) {
    return state.albums[state.selectedAlbum].photos.map(photo => photo);
  }
  return [];
};

const mapStateToProps = (state) => ({
  album: state.albums[state.selectedAlbum],
  photos: getPhotos(state),
  isFetching: !!state.albums[state.selectedAlbum].isFetching,
});

const mapDispatchToProps = (dispatch) => ({
  fetchPhotos: (album) => {
    dispatch(fetchPhotos(album));
  },
  clearSearch: (albumId) => {
    dispatch(clearSearch(albumId));
  },
});

const AlbumContainer = connect(mapStateToProps, mapDispatchToProps)(Album);

export default AlbumContainer;
