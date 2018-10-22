import {connect} from 'react-redux';

import Search from '../components/Search.jsx';
import {searchAlbum, fetchPhotos} from '../actions/index.js';
import {currentArchiveSelector} from '../selectors/index.js';

const mapStateToProps = (state) => (Object.assign({}, {
  album: currentArchiveSelector(state),
}));

const mapDispatchToProps = (dispatch) => ({
  handleKeyPress: (album, e) => {
    if (e.charCode === 13) {
      const term = e.target.value;
      dispatch(searchAlbum(album.id, term));
      dispatch(fetchPhotos(album.id, false));
    }
  },
});

const SearchContainer = connect(mapStateToProps, mapDispatchToProps)(Search);

export default SearchContainer;
