import React from 'react';
import {connect} from 'react-redux';

import Search from '../components/Search.jsx';
import {searchAlbum, fetchPhotos} from '../actions/index.js';

const mapStateToProps = (state) => (Object.assign({}, {
  album: state.albums[state.selectedAlbum],
}));

const mapDispatchToProps = (dispatch) => ({
  handleKeyPress: (album, e) => {
    if (e.charCode === 13) {
      const term = e.target.value;
      dispatch(searchAlbum(album.id, term));
      dispatch(fetchPhotos(album, false));
    }
  },
});

const SearchContainer = connect(mapStateToProps, mapDispatchToProps)(Search);

export default SearchContainer;
