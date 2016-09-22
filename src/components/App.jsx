import React, {Component} from 'react';
import {connect} from 'react-redux';

import AlbumContainer from '../containers/AlbumContainer.jsx';
import ArchiveContainer from '../containers/ArchiveContainer.jsx';
import Breadcrumb from './Breadcrumb.jsx';
import selectAlbum from '../actions/index.js';

require('semantic-ui-css/semantic.css');
require('../sass/app.scss');

const mapStateToProps = (state) => ({
  selectedAlbum: state.selectedAlbum,
});

export const App = ({selectedAlbum, dispatch}) => (
  <div>
    <h1>Njordr</h1>
    <Breadcrumb />
    {selectedAlbum ? <AlbumContainer /> : <ArchiveContainer />}
  </div>
);

const AppConnected = connect(mapStateToProps)(App);

export default AppConnected;
