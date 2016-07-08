import React, {Component} from 'react';
import {connect} from 'react-redux';

import Album from '../containers/Album.jsx';
import ArchiveContainer from '../containers/ArchiveContainer.jsx';
import Breadcrumb from './Breadcrumb.jsx';
import selectAlbum from '../actions/index.js';

require('semantic-ui-css/semantic.css');

const mapStateToProps = (state) => ({
  selectedAlbum: state.selectedAlbum,
});

const App = ({selectedAlbum, dispatch}) => (
  <div>
    <h1>Njordr</h1>
    <Breadcrumb />
    {selectedAlbum ? <Album /> : <ArchiveContainer />}
  </div>
);

const AppConnected = connect(mapStateToProps)(App);

export default AppConnected;
