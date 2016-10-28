import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import $ from 'jquery';

$.fn.popup = require('semantic-ui-popup');
$.fn.transition = require('semantic-ui-transition');

const SelectPhotoButton = ({
  photo,
  isSelected,
  isSelectable,
  isMultiselect,
  selectPhoto,
  confirmSelection,
  doctype,
}) => {
  if (!isSelectable) {
    return (
      <div data-tooltip={`Kan ikke velge denne typen (${doctype.friendlyName})`} data-inverted="">
        <div className="ui bottom attached button disabled">
          <i className="add icon"></i> Velg {doctype.friendlyName}
        </div>
      </div>
    );
  } else if (!isMultiselect) {
    return (
      <div className="ui bottom attached button" onClick={() => { confirmSelection(photo); }}>
        <i className="check icon"></i> Velg {doctype.friendlyName}
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
      <i className="add icon"></i> Velg {doctype.friendlyName}
    </div>
  );
};

class Photo extends Component {
  componentDidMount() {
    const {copyright} = this.props;

    // Setup description popup
    const descriptionPopupTrigger = ReactDOM.findDOMNode(this.refs.description);
    const $descriptionPopupTrigger = $(descriptionPopupTrigger);
    $descriptionPopupTrigger.popup({hoverable: true, lastResort: true});

    // Setup meta popup
    const metaPopupTrigger = ReactDOM.findDOMNode(this.refs.meta);
    const $metaPopupTrigger = $(metaPopupTrigger);
    $metaPopupTrigger.popup({hoverable: true, lastResort: true});

    // Setup copyright popup
    if (copyright) {
      const copyrightPopupTrigger = ReactDOM.findDOMNode(this.refs.copyright);
      const $copyrightPopupTrigger = $(copyrightPopupTrigger);
      $copyrightPopupTrigger.popup();
    }
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
      doctypes,
      isMultiselect,
      confirmSelection,
    } = this.props;

    const doctype = doctypes[photo.doctype];
    const isSelectable = !!doctype.selectable;

    return (
      <div className={`ui ${isSelected ? 'raised ' : ''}card photo`}>
        <div className="ui image">
          {copyright ? <a className="ui right red ribbon label" ref="copyright">
            <i className="warning icon"></i> Bruksbegrensing
          </a> : ''}

          {copyright ? <div className="ui inverted popup top center">
            <div className="content">
              {copyright}
            </div>
          </div> : ''}

          <img src={src} />
        </div>
        <div className="extra content">
          <a className="left floated info" ref="meta">
            <i className="info icon"></i> Info
          </a>
          <div className="ui popup top center" style={{width: '250px'}}>
            <div className="header">{id.length > 30 ? `${id.substring(0, 27)}...` : id}</div>
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
          isSelectable={isSelectable}
          selectPhoto={selectPhoto}
          isMultiselect={isMultiselect}
          confirmSelection={confirmSelection}
          doctype={doctype}
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
