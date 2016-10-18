import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import $ from 'jquery';
$.fn.popup = require('semantic-ui-popup');
$.fn.transition = require('semantic-ui-transition');

import {confirmSelection, togglePhotoSelection} from '../actions/index.js';
import {photoThumbnailSelector} from '../selectors/index.js';

// TODO: Create and use thumbnailSelector to select preview
class SelectedPhoto extends Component {
  componentDidMount() {
    const trigger = ReactDOM.findDOMNode(this.refs.trigger);
    const $trigger = $(trigger);
    $trigger.popup({hoverable: true});
  }

  render() {
    const {photo, removePhoto} = this.props;
    const thumbnail = photoThumbnailSelector(photo);

    return (
      <span>
        <img
          className="ui mini circular image"
          src={thumbnail}
          ref="trigger"
        />
        <div className="ui popup top center">
          <div className="header">{photo.id}</div>
          <div className="content">
            <img className="ui medium rounded bordered image" src={photo.previews[4].href} />
            <button
              className="ui red button"
              onClick={() => { removePhoto(photo); }}>
              Fjern fra valgte
            </button>
          </div>
        </div>
      </span>
    );
  }
}

const SelectedPhotos = ({selectedPhotos, removePhoto}) => {
  if (selectedPhotos.length === 0) {
    return <div>Du har ikke valgt noen bilder</div>;
  }
  return (
    <div>
      <div className="ui images">
        {selectedPhotos.map(photo => (
          <SelectedPhoto key={photo.id} photo={photo} removePhoto={removePhoto} />
        ))}
      </div>
    </div>
  );
};

export const Footer = ({selectedPhotos, insertPhotos, removePhoto}) => (
  <footer className="ui bottom fixed menu">
    <div className="ui fluid container">
      <div className="left menu">
        <SelectedPhotos selectedPhotos={selectedPhotos} removePhoto={removePhoto} />
      </div>
      <div className="right menu">
        <button className="ui default button">Avbryt</button>
        {
          selectedPhotos.length === 0 ?
          <button className="ui primary disabled button">Sett inn bilder</button>
          :
          <button className="ui primary button">Sett inn {selectedPhotos.length} bilder</button>
        }
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
  removePhoto: function removePhoto(photo) {
    dispatch(togglePhotoSelection(photo));
  },
});

const FooterContainer = connect(mapStateToProps, mapDispatchToProps)(Footer);

export default FooterContainer;
