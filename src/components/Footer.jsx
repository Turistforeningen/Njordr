import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import {confirmSelection} from '../actions/index.js';

// TODO: Create and use thumbnailSelector to select preview
const SelectedPhoto = ({photo}) => (
  <img className="ui circular image" src={photo.previews[8].href} />
);

const SelectedPhotos = ({selectedPhotos}) => {
  if (selectedPhotos.length === 0) {
    return <div>Du har ikke valgt noen bilder</div>;
  }
  return (
    <div>
      <div className="ui mini images">
        {selectedPhotos.map(photo => (
          <SelectedPhoto key={photo.id} photo={photo} />
        ))}
      </div>
    </div>
  );
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
