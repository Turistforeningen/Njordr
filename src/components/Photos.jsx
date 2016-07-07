import React, {PropTypes} from 'react';
import Photo from './Photo.jsx';

const Photos = ({photos}) => {
  if (photos.length === 0) {
    return (<div>Empty album!</div>);
  }
  return (
    <ul>
      {photos.map(photo =>
        <Photo
          key={photo.id}
          {...photo}
        />
      )}
    </ul>
  );
};

Photos.propTypes = {
  photos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
  })).isRequired,
};

export default Photos;
