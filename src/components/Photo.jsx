import React, {PropTypes} from 'react';

const Photo = ({previews, filesize, onPhotoClick}) => (
  <li>
    <img src={previews[10].href} />
    {filesize}
  </li>
);

Photo.propTypes = {
  id: PropTypes.string.isRequired,
  previews: PropTypes.arrayOf(PropTypes.shape({
    href: PropTypes.string.isRequired,
  }).isRequired).isRequired,
};

export default Photo;
