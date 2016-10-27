import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import $ from 'jquery';

import {setCurrentArchive} from '../actions/index.js';
import {currentArchiveSelector} from '../selectors/index.js';

$.fn.dropdown = require('semantic-ui-dropdown');

require('semantic-ui-css/semantic.css');

class ArchivesDropdownComponent extends Component {
  componentDidMount() {
    // Setup archives dropdown
    const dropdown = ReactDOM.findDOMNode(this.refs.dropdown);
    const $dropdown = $(dropdown);
    $dropdown.dropdown({fullTextSearch: 'exact'});
  }

  render() {
    const {archives, currentArchive, promotedArchives, handleArchiveSelect} = this.props;

    return (
      <div className="ui dropdown item" ref="dropdown">
        {currentArchive ? currentArchive.name : 'Velg arkiv'} <i className="dropdown icon"></i>
        <div className="menu">
          <div className="header">
            <i className="star icon"></i> Mine arkiver
          </div>
          {(promotedArchives.map((key) => (
            <div key={key} className="item" onClick={() => { handleArchiveSelect(key); }}>
              {archives[key].name}
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
          {(Object.keys(archives).map((key) => (
            <div key={key} className="item" onClick={() => { handleArchiveSelect(key); }}>
              {archives[key].name}
            </div>
          )))}
        </div>
      </div>
    );
  }
}

export const HeaderComponent = ({
  archives,
  currentArchive,
  promotedArchives,
  handleArchiveSelect,
  showAllArchives,
}) => (
  <header className="ui fixed inverted menu">
    <div className="ui fluid container">
      <a className="header item">FotoWeb</a>
      <a className="item" onClick={() => { showAllArchives(); }}>Alle arkiver</a>
      {Object.keys(archives || {}).length ?
        <ArchivesDropdownComponent
          archives={archives}
          currentArchive={currentArchive}
          promotedArchives={promotedArchives}
          handleArchiveSelect={handleArchiveSelect}
        /> :
        <div className="item">Henter arkiver...</div>
      }
    </div>
  </header>
);

const mapStateToProps = (state) => ({
  archives: state.albums,
  currentArchive: currentArchiveSelector(state),
  promotedArchives: state.app.promotedArchives,
});

const mapDispatchToProps = (dispatch) => ({
  handleArchiveSelect: function handleArchiveSelect(archive) {
    dispatch(setCurrentArchive(archive));
  },
  showAllArchives: function showAllArchives(e) {
    dispatch(setCurrentArchive(null));
  },
});

const Header = connect(mapStateToProps, mapDispatchToProps)(HeaderComponent);

export default Header;
