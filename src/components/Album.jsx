import React, {Component, PropTypes} from 'react';

import PhotoCard from '../containers/PhotoCard.jsx';
import SearchContainer from '../containers/SearchContainer.jsx';
import TagsFilterContainer from '../containers/TagsFilterContainer.jsx';


import InfiniteScroll from 'redux-infinite-scroll';

class Photos extends Component {
  loadMore() {
    this.props.fetchPhotos(this.props.album);
  }

  renderPhotos() {
    const {photos} = this.props;

    return photos.map(photo => (
      <PhotoCard
        id={photo.id}
        src={photo.previews[10].href}
        description={photo.metadata.description}
        key={photo.id}
      />
    ));
  }

  render() {
    const {isFetching, photos} = this.props;
    const loader = (
      <div className="card">
        <div className="ui active inverted dimmer">
          <div className="ui loader"></div>
        </div>
      </div>
    );

    return (
      <InfiniteScroll
        className="ui four cards"
        elementIsScrollable={false}
        items={this.renderPhotos()}
        loader={loader}
        loadMore={this.loadMore.bind(this)}
        loadingMore={isFetching}
      />
    );
  }
}

const Album = ({album, photos, isFetching, fetchPhotos, clearSearch}) => {
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
        {album.term && !album.isFetching ? activeSearchFilterMessage : ''}
        <Photos album={album} fetchPhotos={fetchPhotos} isFetching={isFetching} photos={photos} />
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
