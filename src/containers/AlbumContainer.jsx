import React from 'react';
import {connect} from 'react-redux';

import Album from '../components/Album.jsx';
import {clearSearch, fetchPhotos} from '../actions/index.js';
import {currentArchiveSelector, currentArchivePhotosSelector} from '../selectors/index.js';

const mapStateToProps = (state) => ({
  album: currentArchiveSelector(state),
  photos: currentArchivePhotosSelector(state),
  isFetching: !!currentArchiveSelector(state).isFetching,
});

const mapDispatchToProps = (dispatch) => ({
  fetchPhotos: (album) => {
    dispatch(fetchPhotos(album));
  },
  clearSearch: (album) => {
    dispatch(clearSearch(album));
  },
});

const AlbumContainer = connect(mapStateToProps, mapDispatchToProps)(Album);

export default AlbumContainer;
