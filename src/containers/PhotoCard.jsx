import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Photo from '../components/Photo.jsx';

import {confirmSelection, togglePhotoSelection} from '../actions/index.js';

const mapStateToProps = (state) => ({
  allowedDoctypes: state.app.allowedDoctypes,
  isMultiselect: state.app.isMultiselect,
});

const mapDispatchToProps = (dispatch) => ({
  selectPhoto: (photo) => {
    dispatch(togglePhotoSelection(photo));
  },
  confirmSelection: (selection) => {
    dispatch(confirmSelection(selection));
  },
});


const PhotoCard = connect(mapStateToProps, mapDispatchToProps)(Photo);

export default PhotoCard;
