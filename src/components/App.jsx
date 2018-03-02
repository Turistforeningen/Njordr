import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';

import AlbumContainer from '../containers/AlbumContainer.jsx';
import ArchivesContainer from '../containers/ArchivesContainer.jsx';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import Message from '../components/Message.jsx';

require('semantic-ui-css/semantic.css');
require('../sass/app.scss');

export const App = ({
  currentArchive,
  isMultiselect,
  error,
}) => (
  <div>
    <Header />
    <div className="ui grid">
      <div className="ui sixteen wide column">
        {error
          ? <Message type="error">{error}</Message>
          : null
        }
        {currentArchive ? <AlbumContainer /> : <ArchivesContainer />}
      </div>
    </div>
    {isMultiselect ? <Footer /> : ''}
  </div>
);

const mapStateToProps = (state) => ({
  currentArchive: state.app.currentArchive,
  isMultiselect: state.app.isMultiselect,
  error: state.app.error,
});

const AppConnected = connect(mapStateToProps)(App);

export default AppConnected;
