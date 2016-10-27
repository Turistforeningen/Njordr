import React from 'react';
import {connect} from 'react-redux';

import Archives from '../components/Archives.jsx';
import {setCurrentArchive} from '../actions/index.js';

const mapStateToProps = (state) => ({
  archives: state.albums,
  promotedArchives: state.app.promotedArchives,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentArchive: (id) => {
    dispatch(setCurrentArchive(id));
  },
});

const ArchivesContainer = connect(mapStateToProps, mapDispatchToProps)(Archives);

export default ArchivesContainer;
