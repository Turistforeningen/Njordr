import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import {selectAlbum} from '../actions/index.js';

const Breadcrumb = ({album, showArchive}) => (
  <ul>
    <li onClick={() => { showArchive(); }}>Arkiv</li>
    {album ? <li>{album.name}</li> : ''}
  </ul>
);

const mapStateToProps = (state) => ({
  album: state.albums[state.selectedAlbum],
});

const mapDispatchToProps = (dispatch) => ({
  showArchive: (e) => { dispatch(selectAlbum(null)); },
});

const BreadcrumbContainer = connect(mapStateToProps, mapDispatchToProps)(Breadcrumb);

export default BreadcrumbContainer;
