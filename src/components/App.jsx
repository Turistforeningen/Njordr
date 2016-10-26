import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import $ from 'jquery';
$.fn.dropdown = require('semantic-ui-dropdown');

import AlbumContainer from '../containers/AlbumContainer.jsx';
import ArchiveContainer from '../containers/ArchiveContainer.jsx';
import {fetchPhotos, setCurrentArchive} from '../actions/index.js';
import {currentArchiveSelector} from '../selectors/index.js';
import Footer from '../components/Footer.jsx';

require('semantic-ui-css/semantic.css');
require('../sass/app.scss');

class AlbumsDropdown extends Component {
  componentDidMount() {
    // Setup albums dropdown
    const dropdown = ReactDOM.findDOMNode(this.refs.dropdown);
    const $dropdown = $(dropdown);
    $dropdown.dropdown({fullTextSearch: 'exact'});
  }

  render() {
    const {album, albums, promotedArchives, handleSelectAlbum} = this.props;

    return (
      <div className="ui dropdown item" ref="dropdown">
        {album ? album.name : 'Velg arkiv'} <i className="dropdown icon"></i>
        <div className="menu">
          <div className="header">
            <i className="star icon"></i> Mine arkiver
          </div>
          {(promotedArchives.map((key) => (
            <div key={key} className="item" onClick={() => { handleSelectAlbum(albums[key]); }}>
              {albums[key].name}
            </div>
          )))}
          <div className="divider"></div>
          <div className="ui left search icon input">
            <i className="search icon"></i>
            <input type="text" name="search" placeholder="Finn arkiv..." />
          </div>
          <div className="divider"></div>
          <div className="header">
            <i className="book icon"></i> Alle arkiver
          </div>
          {(Object.keys(albums).map((key) => (
            <div key={key} className="item" onClick={() => { handleSelectAlbum(albums[key]); }}>
              {albums[key].name}
            </div>
          )))}
        </div>
      </div>
    );
  }
}

export const App = ({
  isMultiselect,
  albums,
  album,
  showArchive,
  handleSelectAlbum,
  hiddenArchives,
  promotedArchives,
  app,
}) => (
  <div>
    <header className="ui fixed inverted menu">
      <div className="ui fluid container">
        <a className="header item">FotoWeb</a>
        <a className="item" onClick={() => { showArchive(); }}>Alle arkiver</a>
        {Object.keys(albums || {}).length ?
          <AlbumsDropdown
            album={album}
            albums={albums}
            handleSelectAlbum={handleSelectAlbum}
            promotedArchives={promotedArchives}
          /> :
          <div className="item">Henter arkiver...</div>
        }
      </div>
    </header>
    {app && app.currentArchive ? <AlbumContainer /> : <ArchiveContainer />}
    {isMultiselect ? <Footer /> : ''}
  </div>
);

const mapStateToProps = (state) => ({
  isMultiselect: state.app.isMultiselect,
  currentArchive: state.app.currentArchive,
  album: currentArchiveSelector(state),
  albums: state.albums,
  hiddenArchives: state.app.hiddenArchives,
  promotedArchives: state.app.promotedArchives,
  app: state.app,
});

const mapDispatchToProps = (dispatch) => ({
  handleSelectAlbum: function handleSelectAlbum(album) {
    dispatch(setCurrentArchive(album.id));
  },
  showArchive: function showArchive(e) {
    dispatch(setCurrentArchive(null));
  },
});

const AppConnected = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppConnected;
