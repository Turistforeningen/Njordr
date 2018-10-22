import React, {Component} from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import PropTypes from 'prop-types';

import PhotoCard from '../containers/PhotoCard.jsx';
import SearchContainer from '../containers/SearchContainer.jsx';
import TagsFilterContainer from '../containers/TagsFilterContainer.jsx';

class Photos extends Component {
  loadMore() {
    const {album, fetchPhotos} = this.props;

    // NOTE: The conditional should not be necessary, as hasMore is also passed to InfiniteScroll
    // and it does not make sense to call this function if hasMore is false.
    // https://github.com/RealScout/redux-infinite-scroll/pull/39
    if (album.pagination.hasMore) {
      fetchPhotos(album.id);
    }
  }

  renderPhotos() {
    const {photos} = this.props;

    return photos.map((photo) => (
      <PhotoCard
        id={photo.id}
        src={photo.previews[10].href}
        description={photo.metadata.description}
        copyright={photo.metadata.copyright}
        photo={photo}
        key={photo.id}
        isSelected={photo.isSelected}
      />
    ));
  }

  render() {
    const {album, isFetching, photos} = this.props;
    const loader = photos.length === 0 ?
      <div className="ui active centered loader" key="unique-loader"></div>
      :
      (
        <div className="card" key="unique-loader">
          <div className="ui active inverted dimmer">
            <div className="ui loader"></div>
          </div>
        </div>
      );

    if (album.isEmpty) {
      return (
        <div className="ui info message">
          <div className="header">
            Ingen bilder
          </div>
          <p>Dette albumet inneholder ingen bilder.</p>
        </div>
      );
    }

    return (
      <InfiniteScroll
        className="ui four cards"
        loader={loader}
        loadMore={this.loadMore.bind(this)}
        threshold={500}
        hasMore={isFetching ? false : album.pagination.hasMore}
      >
        {this.renderPhotos()}
      </InfiniteScroll>
    );
  }
}

class Album extends Component {
  render() {
    const {album, photos, isFetching, fetchPhotos, clearSearch} = this.props;
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
          <div className="ui fluid vertical menu" ref="filters">
            <div className="item">
              <SearchContainer />
            </div>
            <TagsFilterContainer />
          </div>
        </div>
        <div className="twelve wide column">
          {album.term && !album.isFetching ? activeSearchFilterMessage : ''}
          <Photos
            album={album}
            fetchPhotos={fetchPhotos}
            isFetching={isFetching}
            photos={photos}
          />
        </div>
      </div>
    );
  }
}

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
