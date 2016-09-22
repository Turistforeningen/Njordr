import React from 'react';
import {connect} from 'react-redux';

import Search from '../components/Search.jsx';
import {searchAlbum, fetchSearchResult} from '../actions/index.js';

const mapStateToProps = (state) => (Object.assign({}, {
  album: state.selectedAlbum,
}));

const mapDispatchToProps = (dispatch) => ({
  handleKeyPress: (album, e) => {
    if (e.charCode === 13) {
      const term = e.target.value;
      dispatch(searchAlbum(album, term));
      dispatch(fetchSearchResult(album, term));
    }
  },
  searchAlbum: (album, term) => {
    dispatch(searchAlbum(album, term));
  },
});

const SearchContainer = connect(mapStateToProps, mapDispatchToProps)(Search);
export default SearchContainer;
