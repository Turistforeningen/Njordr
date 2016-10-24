import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import moment from 'moment';
$.fn.dimmer = require('semantic-ui-dimmer');
$.fn.popup = require('semantic-ui-popup');
$.fn.transition = require('semantic-ui-transition');

const SelectPhotoButton = ({
  photo,
  isSelected,
  isAllowed,
  isMultiselect,
  selectPhoto,
  confirmSelection,
}) => {
  if (!isAllowed) {
    return (
      <div className="ui bottom attached button">
        <i className="add icon"></i> Velg bilde
      </div>
    );
  } else if (!isMultiselect) {
    return (
      <div className="ui bottom attached button" onClick={() => { confirmSelection(photo); }}>
        <i className="check icon"></i> Velg bilde
      </div>
    );
  } else if (isSelected) {
    return (
      <div className="ui black bottom attached button" onClick={() => { selectPhoto(photo); }}>
        <i className="remove icon"></i> Fjern
      </div>
    );
  }

  return (
    <div className="ui bottom attached button" onClick={() => { selectPhoto(photo); }}>
      <i className="add icon"></i> Velg bilde
    </div>
  );
};

class Photo extends Component {
  componentDidMount() {
    // Setup description popup
    const descriptionPopupTrigger = ReactDOM.findDOMNode(this.refs.description);
    const $descriptionPopupTrigger = $(descriptionPopupTrigger);
    $descriptionPopupTrigger.popup({hoverable: true, lastResort: true});

    // Setup meta popup
    const metaPopupTrigger = ReactDOM.findDOMNode(this.refs.meta);
    const $metaPopupTrigger = $(metaPopupTrigger);
    $metaPopupTrigger.popup({hoverable: true, lastResort: true});
  }

  render() {
    const {
      id,
      src,
      copyright,
      description,
      selectPhoto,
      photo,
      isSelected,
      allowedDoctypes,
      isMultiselect,
      confirmSelection,
    } = this.props;

    const isAllowed = allowedDoctypes.indexOf(photo.doctype) > -1;

    return (
      <div className={`ui ${isSelected ? 'raised ' : ''}card photo`}>
        <div className="ui image">
          {copyright ?
            <a className="ui right red ribbon label">
              <i className="warning icon"></i> Bruksbegrensing
            </a> : ''}
          <img src={src} />
        </div>
        <div className="extra content">
          <a className="left floated info" ref="meta">
            <i className="info icon"></i> Info
          </a>
          <div className="ui popup top center">
            <div className="header">{id.length > 15 ? `${id.substring(0, 12)}...` : id}</div>
            <div className="content">
              <div className="ui list">
                <div className="item">
                  <i className="camera icon"></i>
                  <div className="content">
                    {photo.metadata.photographers.join(', ')}
                  </div>
                </div>
                <div className="item">
                  <i className="calendar icon"></i>
                  <div className="content">
                    {moment(photo.modified).format('DD.MM.YY')}
                  </div>
                </div>
                <div className="item">
                  <i className="tag icon"></i>
                  <div className="content">
                    {photo.metadata.tags.join(', ')}
                  </div>
                </div>
                <div className="item">
                  <i className="copyright icon"></i>
                  <div className="content">
                    {copyright || 'Kan brukes fritt'}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="right floated">
            <a className="description" ref="description">
              <i className="align left icon"></i> Tekst
            </a>
            <div className="ui inverted popup top center">
              <div className="content">
                {description || 'Ingen bildetekst'}
              </div>
            </div>
          </div>
        </div>
        <SelectPhotoButton
          photo={photo}
          isSelected={isSelected}
          isAllowed={isAllowed}
          selectPhoto={selectPhoto}
          isMultiselect={isMultiselect}
          confirmSelection={confirmSelection}
        />
      </div>
    );
  }
}

Photo.propTypes = {
  id: PropTypes.string.isRequired,
  src: PropTypes.string,
  copyright: PropTypes.string,
  description: PropTypes.string,
};

export default Photo;
