import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import moment from 'moment';
$.fn.dimmer = require('semantic-ui-dimmer');
$.fn.popup = require('semantic-ui-popup');
$.fn.transition = require('semantic-ui-transition');

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
      confirmSelectedPhotos,
      photo,
      app,
      isSelected,
    } = this.props;

    const isAllowed = app.allowedDoctypes.indexOf(photo.doctype) > -1;

    return (
      <div className={`ui ${isSelected ? 'raised ' : ''}card photo`}>
        <div className="ui image">
          {copyright ?
            <a className="ui right red ribbon label">
              <i className="warning icon"></i> Bruksbegrensing
            </a> : ''}
          <img src={src} />
        </div>
        <div className="content">
          <div className="meta">
            <div className="description" ref="description">
              {description || <span style={{fontStyle: 'italic'}}>{id}</span>}
            </div>
            <div className="ui inverted popup top center">
              <div className="content">
                {description || 'Ingen bildetekst'}
              </div>
            </div>
          </div>
        </div>
        <div className="extra content">
          <a className="left floated info" ref="meta">
            <i className="info icon"></i>
            Info
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
            {isAllowed ?
              <a onClick={() => { selectPhoto(photo); }} className="select">
                <i className={`toggle icon ${isSelected ? 'on' : 'off'}`}></i>
              </a> :
              <span className="right floated">
                <i className="ban icon"></i>
              </span>
            }
          </div>
        </div>
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
