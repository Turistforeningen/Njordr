import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import {selectAlbum} from '../actions/index.js';
import {currentArchiveSelector} from '../selectors/index.js';

const Breadcrumb = ({album, showArchive}) => (
  <div className="ui breadcrumb">
    <a className ="section" onClick={() => { showArchive(); }}>Arkiv</a>
    {album ? <i className="right chevron icon divider"></i> : ''}
    {album ? <a className="section">{album.name}</a> : ''}
  </div>
);

const mapStateToProps = (state) => ({
  album: currentArchiveSelector(state),
});

const mapDispatchToProps = (dispatch) => ({
  showArchive: (e) => {
    dispatch(selectAlbum(null));
  },
});

const BreadcrumbContainer = connect(mapStateToProps, mapDispatchToProps)(Breadcrumb);

export default BreadcrumbContainer;
