import React, {PropTypes} from 'react';
import Photo from './Photo.jsx';
import SearchContainer from '../containers/SearchContainer.jsx';
import TagsFilterContainer from '../containers/TagsFilterContainer.jsx';

const Album = ({album, photos, isFetching, clearSearch}) => {
  function getPhotos() {
    if (isFetching) {
      return (<div>Henter bilder...</div>);
    } else if (photos.length === 0) {
      return (<div>Ingen bilder i dette albumet.</div>);
    }
    return (<div className="ui grid photos">
      {photos.map(photo =>
        <div key={photo.id} className="four wide column">
          <Photo
            id={photo.id}
            src={photo.previews[10].href}
            description={photo.metadata.description}
          />
        </div>
      )}
    </div>);
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
    <div className="ui grid album">
      <div className="four wide column">
        <div className="ui fluid vertical menu">
          <div className="item">
            <SearchContainer />
          </div>
          <TagsFilterContainer />
        </div>
      </div>
      <div className="twelve wide column">
        {album.hasActiveSearch ? activeSearchFilterMessage : ''}
        {getPhotos()}
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
