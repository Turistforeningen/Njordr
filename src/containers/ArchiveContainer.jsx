import React from 'react';
import {connect} from 'react-redux';

import Archive from '../components/Archive.jsx';
import {selectAlbum} from '../actions/index.js';

const mapStateToProps = (state) => (Object.assign({}, state));

const mapDispatchToProps = (dispatch) => ({
  selectAlbum: (id) => {
    dispatch(selectAlbum(id));
  },
});

const ArchiveContainer = connect(mapStateToProps, mapDispatchToProps)(Archive);
export default ArchiveContainer;
