import React from 'react';
import {connect} from 'react-redux';

import Archive from '../components/Archive.jsx';
import {setCurrentArchive, fetchAlbum} from '../actions/index.js';

const mapStateToProps = (state) => (Object.assign({}, state));

const mapDispatchToProps = (dispatch) => ({
  setCurrentArchive: (id) => {
    dispatch(setCurrentArchive(id));
    dispatch(fetchAlbum(id));
  },
});

const ArchiveContainer = connect(mapStateToProps, mapDispatchToProps)(Archive);
export default ArchiveContainer;
