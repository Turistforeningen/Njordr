import React, {Component} from 'react';
import {connect} from 'react-redux';

import AlbumContainer from '../containers/AlbumContainer.jsx';
import ArchivesContainer from '../containers/ArchivesContainer.jsx';
import Header from '../components/Header.jsx';
import FooterContainer from '../components/Footer.jsx';
import Message from '../components/Message.jsx';

import {handleError} from '../actions/index.js';

require('semantic-ui-css/semantic.css');
require('../sass/app.scss');

class App extends Component {
  componentDidCatch(err, info) {
    this.props.handleError(err, info);
  }

  render() {
    const {currentArchive, isMultiselect, error} = this.props;

    return (
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
        {isMultiselect ? <FooterContainer /> : ''}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentArchive: state.app.currentArchive,
  isMultiselect: state.app.isMultiselect,
  error: state.app.error,
});

const mapDispatchToProps = (dispatch) => ({
  handleError: (err, info) => {
    dispatch(handleError(err, info));
  },
});

const AppConnected = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppConnected;
