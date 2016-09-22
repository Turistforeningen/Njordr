import React from 'react';

const Search = ({album, handleKeyPress}) => (
  <div>
    <div className="ui search">
      <div className="ui icon input">
        <input
          className="prompt"
          type="text"
          placeholder="Søk i album"
          onKeyPress={(e) => { handleKeyPress(album, e); }}
        />
        <i className="search icon"></i>
      </div>
    </div>
  </div>
);

export default Search;
