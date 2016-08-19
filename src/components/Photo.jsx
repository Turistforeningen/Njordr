import React, {PropTypes} from 'react';

const Photo = ({src, copyright, onPhotoClick}) => (
  <div className="ui card">
    <div className="image">
      {copyright ? <div className="ui red ribbon label">
        <i className="copyright icon"></i>
      </div> : ''}
      <img src={src} />
    </div>
  </div>
);

Photo.propTypes = {
  id: PropTypes.string.isRequired,
  src: PropTypes.string,
  copyright: PropTypes.string,
};

export default Photo;
