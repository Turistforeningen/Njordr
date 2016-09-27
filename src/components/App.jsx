import React, {Component} from 'react';
import {connect} from 'react-redux';

import AlbumContainer from '../containers/AlbumContainer.jsx';
import ArchiveContainer from '../containers/ArchiveContainer.jsx';
import Breadcrumb from './Breadcrumb.jsx';
import {selectAlbum} from '../actions/index.js';

require('semantic-ui-css/semantic.css');
require('../sass/app.scss');

const mapStateToProps = (state) => ({
  selectedAlbum: state.selectedAlbum,
  album: state.albums[state.selectedAlbum],
  albums: state.albums,
});

const mapDispatchToProps = (dispatch) => ({
  handleSelectAlbum: (album) => {
    dispatch(selectAlbum(album));
  },
  showArchive: (e) => {
    dispatch(selectAlbum(null));
  },
});

export const App = ({albums, selectedAlbum, album, showArchive, handleSelectAlbum}) => (
  <div>
    <div className="ui fixed inverted menu">
      <div className="ui fluid container">
        <a className="header item">FotoWeb</a>
        <a className="item" onClick={() => { showArchive(); }}>Arkiv</a>
        <div className="ui simple dropdown item">
          {album ? album.name : 'Velg album'} <i className="dropdown icon"></i>
          <div className="menu">
            <div className="ui left search icon input">
              <i className="search icon"></i>
              <input type="text" name="search" disabled placeholder="Finn album..." />
            </div>
            <div className="divider"></div>
            <div className="header">
              <i className="book icon"></i>
              Velg album
            </div>
            {(Object.keys(albums).map((key) => (
              <div key={key} className="item" onClick={() => { handleSelectAlbum(key); }}>
                <div
                  className="ui empty circular label"
                  style={{backgroundColor: albums[key].color}}
                ></div>
                {albums[key].name}
              </div>
            )))}
          </div>
        </div>
      </div>
    </div>
    {selectedAlbum ? <AlbumContainer /> : <ArchiveContainer />}
  </div>
);

const AppConnected = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppConnected;
