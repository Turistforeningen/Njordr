import React from 'react';
import {connect} from 'react-redux';

import {setCurrentArchive} from '../actions/index.js';

const AlbumCard = ({id, name, posterImage, handleAlbumClick}) => (
  <a className="ui card" onClick={(e) => { handleAlbumClick(id); }}>
    <div className="image">
      <img src={posterImage} />
    </div>
    <div className="content">
      <div className="header">{name}</div>
    </div>
  </a>
);

function getPosterImage(state, album) {
  if (state.albums[album] && state.albums[album].posterImages.length) {
    return state.albums[album].posterImages[0].href;
  }
  return '';
}

const mapStateToProps = (state, ownProps) => ({
  id: ownProps.id,
  name: state.albums[ownProps.id].name,
  posterImage: getPosterImage(state, ownProps.id),
});

const mapDispatchToProps = (dispatch) => ({
  handleAlbumClick: (archive) => {
    dispatch(setCurrentArchive(archive));
  },
});

const AlbumCardContainer = connect(mapStateToProps, mapDispatchToProps)(AlbumCard);

export default AlbumCardContainer;
