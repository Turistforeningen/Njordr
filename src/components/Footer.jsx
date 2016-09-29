import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import {confirmSelection} from '../actions/index.js';

const SelectedPhotos = ({selectedPhotos}) => {
  if (selectedPhotos.length === 0) {
    return <div>Du har ikke valgt noen bilder</div>;
  }
  return <div>Du har valgt {selectedPhotos.length} bilder</div>;
};

export const Footer = ({selectedPhotos, insertPhotos}) => (
  <footer className="ui bottom fixed menu">
    <div className="ui fluid container">
      <div className="left menu">
        <SelectedPhotos selectedPhotos={selectedPhotos} />
      </div>
      <div className="right menu">
        <button className="ui default button">Avbryt</button>
        <button className="ui primary button">Sett inn bilder</button>
      </div>
    </div>
  </footer>
);

const mapStateToProps = (state) => ({
  selectedPhotos: state.app.selectedPhotos,
});

const mapDispatchToProps = (dispatch) => ({
  insertPhotos: function insertPhotos() {
    dispatch(confirmSelection());
  },
});

const FooterContainer = connect(mapStateToProps, mapDispatchToProps)(Footer);

export default FooterContainer;
