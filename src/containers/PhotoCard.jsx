import {connect} from 'react-redux';
import Photo from '../components/Photo.jsx';

import {confirmSelection, handleError, togglePhotoSelection} from '../actions/index.js';

const mapStateToProps = (state) => ({
  doctypes: state.app.doctypes,
  isMultiselect: state.app.isMultiselect,
});

const mapDispatchToProps = (dispatch) => ({
  selectPhoto: (photo) => {
    dispatch(togglePhotoSelection(photo));
  },
  confirmSelection: (selection) => {
    dispatch(confirmSelection(selection));
  },
  handleError: (err, info) => {
    dispatch(handleError(err, info));
  },
});


const PhotoCard = connect(mapStateToProps, mapDispatchToProps)(Photo);

export default PhotoCard;
