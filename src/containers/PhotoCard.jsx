import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Photo from '../components/Photo.jsx';

import {confirmSelection, togglePhotoSelection} from '../actions/index.js';

const mapStateToProps = (state) => ({
  app: state.app,
});

const mapDispatchToProps = (dispatch) => ({
  selectPhoto: function selectPhoto(photo) {
    dispatch(togglePhotoSelection(photo));
  },
});


const PhotoCard = connect(mapStateToProps, mapDispatchToProps)(Photo);

export default PhotoCard;
