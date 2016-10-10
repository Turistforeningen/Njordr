import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
$.fn.dimmer = require('semantic-ui-dimmer');

class Photo extends Component {
  componentDidMount() {
    const img = ReactDOM.findDOMNode(this.refs.image);
    const $img = $(img);
    $img.dimmer({on: 'hover'});
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
    } = this.props;

    return (
      <div className="card photo">
        <div className="blurring dimmable image" ref="image">
          <div className="ui dimmer">
            <div className="content">
              <div className="center">
                <button
                  className="ui inverted button"
                  onClick={() => {
                    selectPhoto(photo);
                  }}
                >
                  Velg bilde
                </button>
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
