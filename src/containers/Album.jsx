import React from 'react';
import {connect} from 'react-redux';

import Photos from '../components/Photos.jsx';

const mapStateToProps = (state) => ({
  album: state.albums[state.selectedAlbum],
  photos: (
    state.selectedAlbum &&
    state.albums[state.selectedAlbum] &&
    state.albums[state.selectedAlbum].photos &&
    state.albums[state.selectedAlbum].photos.length
  ) ?
    state.albums[state.selectedAlbum].photos.map(photo => photo) : [],
  isFetching: !!state.albums[state.selectedAlbum].isFetching,
});

const mapDispatchToProps = (dispatch) => ({});

const Album = connect(mapStateToProps, mapDispatchToProps)(Photos);

export default Album;
