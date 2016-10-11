import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Photo from '../components/Photo.jsx';

import {confirmSelection, togglePhotoSelection} from '../actions/index.js';

const mapStateToProps = (state) => ({
  selectedPhotos: state.app.selectedPhotos,
});

const mapDispatchToProps = (dispatch) => ({
  selectPhoto: function selectPhoto(photo) {
    dispatch(togglePhotoSelection(photo));
  },
});


const PhotoCard = connect(mapStateToProps, mapDispatchToProps)(Photo);

export default PhotoCard;
