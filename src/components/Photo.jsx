import React, {PropTypes} from 'react';

const Photo = ({previews, filesize, onPhotoClick}) => (
  <div className="ui card">
    <div className="image">
      <img src={previews[10].href} />
    </div>
  </div>
);

Photo.propTypes = {
  id: PropTypes.string.isRequired,
  previews: PropTypes.arrayOf(PropTypes.shape({
    href: PropTypes.string.isRequired,
  }).isRequired).isRequired,
};

export default Photo;
