import React, {PropTypes} from 'react';
import Photo from './Photo.jsx';

const Photos = ({album, photos, isFetching}) => {
  if (isFetching) {
    return (<div>Henter bilder...</div>);
  } else if (photos.length === 0) {
    return (<div>Empty album!</div>);
  }
  return (
    <div>
      {album && album.name ? album.name : 'Album uten navn'}
      <div className="ui grid">
        {photos.map(photo =>
          <div key={photo.id} className="four wide column">
            <Photo id={photo.id} src={photo.previews[10].href} />
          </div>
        )}
      </div>
    </div>
  );
};

Photos.propTypes = {
  album: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    description: PropTypes.string,
  }),
  photos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
  })).isRequired,
  isFetching: PropTypes.bool,
};

export default Photos;
