import React from 'react';
import {connect} from 'react-redux';

import TagsFilter from '../components/TagsFilter.jsx';
import {fetchPhotos, toggleTag} from '../actions/index.js';

const mapStateToProps = (state) => (Object.assign({}, {
  album: state.albums[state.selectedAlbum],
  tags: state.tags,
}));

const mapDispatchToProps = (dispatch) => ({
  toggleTag: (tag, album) => {
    dispatch(toggleTag(tag));
    dispatch(fetchPhotos(album.id, false));
  },
});

const TagsFilterContainer = connect(mapStateToProps, mapDispatchToProps)(TagsFilter);
export default TagsFilterContainer;
