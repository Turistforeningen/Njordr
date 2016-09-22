import React, {PropTypes} from 'react';
import Photo from './Photo.jsx';
import SearchContainer from '../containers/SearchContainer.jsx';

const Album = ({album, photos, isFetching, clearSearch}) => {
  if (isFetching) {
    return (<div>Henter bilder...</div>);
  } else if (photos.length === 0) {
    return (<div>Empty album!</div>);
  }

  const activeSearchFilterMessage = <div>
    <div className="ui info message">
      <div className="content">
        <p>
          Viser søkeresultat for <strong>{album.term}</strong>.
          {' '}
          <a onClick={() => { clearSearch(album.id); } }>Vis alle</a>
        </p>
      </div>
    </div>
  </div>;

  return (
    <div>
      {album && album.name ? album.name : 'Album uten navn'}
      <SearchContainer />
      {album.hasActiveSearch ? activeSearchFilterMessage : ''}
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

Album.propTypes = {
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

export default Album;
