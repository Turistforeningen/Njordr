import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import moment from 'moment';
$.fn.dimmer = require('semantic-ui-dimmer');
$.fn.popup = require('semantic-ui-popup');
$.fn.transition = require('semantic-ui-transition');

class Photo extends Component {
  componentDidMount() {
    // Setup photo blur
    const img = ReactDOM.findDOMNode(this.refs.image);
    const $img = $(img);
    $img.dimmer({on: 'hover'});

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
    } = this.props;

    const isAllowed = app.allowedDoctypes.indexOf(photo.doctype) > -1;

    return (
      <div className="card photo">
        <div className="blurring dimmable image" ref="image">
          <div className="ui dimmer">
            <div className="content">
              <div className="center">
                {
                  isAllowed ?
                  <button
                    className="ui inverted button"
                    onClick={() => {
                      selectPhoto(photo);
                    }}
                  >
                    Velg bilde
                  </button> :
                  <div
                    className="ui inverted button disabled"
                    >
                    Kan ikke velge denne typen ({photo.doctype})
                  </div>
                }
              </div>
            </div>
          </div>
          <img src={src} />
        </div>
        <div className="content">
          <div className="meta">
          <div className="description">
            {description || <span style={{fontStyle: 'italic'}}>{id}</span>}
          </div>
            {copyright ? <div className="ui red label">
              <i className="copyright icon"></i>
            </div> : ''}
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
                    {photo.metadata.photographers.map((photographer, index) => (
                      `
                        ${photographer}
                        ${index === (photo.metadata.photographers.length - 1) ? '' : ','}
                      `
                    ))}
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
                    {photo.metadata.tags.map((tag, index) => (
                      `${tag}${index === (photo.metadata.tags.length - 1) ? '' : ','} `
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {isAllowed ?
            <span className="right floated select">
              <i className="toggle off icon"></i>
              Velg
            </span> :
              <span className="right floated">
                <i className="ban icon"></i>
              </span>
          }
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
