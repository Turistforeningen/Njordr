import React from 'react';
import {connect} from 'react-redux';

import TagsFilter from '../components/TagsFilter.jsx';
import {fetchAlbum, setAlbumNeedsReload, toggleTag} from '../actions/index.js';

const mapStateToProps = (state) => (Object.assign({}, {
  album: state.selectedAlbum,
  tags: state.tags,
}));

const mapDispatchToProps = (dispatch) => ({
  toggleTag: (tag, album) => {
    dispatch(toggleTag(tag));
    dispatch(setAlbumNeedsReload(album, true));
  },
});

const TagsFilterContainer = connect(mapStateToProps, mapDispatchToProps)(TagsFilter);
export default TagsFilterContainer;
