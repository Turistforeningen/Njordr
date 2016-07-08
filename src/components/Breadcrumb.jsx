import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import {selectAlbum} from '../actions/index.js';

const Breadcrumb = ({album}) => (
  <ul>
    <li>Arkiv</li>
    <li>{album.name}</li>
  </ul>
);

const mapStateToProps = (state) => ({
  album: state.albums[state.selectedAlbum],
});

const mapDispatchToProps = (dispatch) => ({
  showArchive: () => {
    dispatch(selectAlbum(null));
  },
});

const BreadcrumbContainer = connect(mapStateToProps, mapDispatchToProps)(Breadcrumb);

export default BreadcrumbContainer;
