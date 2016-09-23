import React, {PropTypes} from 'react';

const Photo = ({src, copyright, description, onPhotoClick}) => (
  <div className="ui card photo">
    <div className="image">
      {copyright ? <div className="ui red ribbon label">
        <i className="copyright icon"></i>
      </div> : ''}
      <img src={src} />
    </div>
    <div className="content">
      <div className="meta">
        <div className="description">{description}</div>
      </div>
    </div>
  </div>
);

Photo.propTypes = {
  id: PropTypes.string.isRequired,
  src: PropTypes.string,
  copyright: PropTypes.string,
};

export default Photo;
