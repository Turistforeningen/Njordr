import React, {Component} from 'react';
import {connect} from 'react-redux';

import Album from '../containers/Album.jsx';
import Breadcrumb from './Breadcrumb.jsx';

require('semantic-ui-css/semantic.css');


export default class App extends Component {
  render() {
    return (
      <div>
        <h1>Njordr</h1>
        <Breadcrumb />
        <Album />
      </div>
    );
  }
}
