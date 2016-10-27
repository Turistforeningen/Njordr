import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';

import AlbumContainer from '../containers/AlbumContainer.jsx';
import ArchivesContainer from '../containers/ArchivesContainer.jsx';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';

require('semantic-ui-css/semantic.css');
require('../sass/app.scss');

export const App = ({
  currentArchive,
  isMultiselect,
}) => (
  <div>
    <Header />
    {currentArchive ? <AlbumContainer /> : <ArchivesContainer />}
    {isMultiselect ? <Footer /> : ''}
  </div>
);

const mapStateToProps = (state) => ({
  currentArchive: state.app.currentArchive,
  isMultiselect: state.app.isMultiselect,
});

const AppConnected = connect(mapStateToProps)(App);

export default AppConnected;
