import React from 'react';

const Search = ({album, handleKeyPress}) => (
  <div className="ui fluid icon input">
    <input
      type="text"
      placeholder="Søk i album"
      onKeyPress={(e) => { handleKeyPress(album, e); }}
    />
    <i className="search icon"></i>
  </div>
);

export default Search;
