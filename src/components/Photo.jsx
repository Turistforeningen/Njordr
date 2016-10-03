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
    } = this.props;

    return (
      <div className="card">
        <div className="blurring dimmable image" ref="image">
          <div className="ui dimmer">
            <div className="content">
              <div className="center">
                <div
                  className="ui inverted button"
                  onClick={(e) => {
                    selectPhoto({id});
                  }}
                >
                  Sett inn bilde
                </div>
              </div>
            </div>
          </div>
          <img src={src} />
        </div>
        <div className="content">
          <div className="meta">
            <span className="description">{description}</span>
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
