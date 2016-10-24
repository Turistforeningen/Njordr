import React from 'react';

import AlbumCardContainer from '../components/AlbumCard.jsx';

const Archive = ({albums, setCurrentArchive}) => (
  <div className="ui four column grid">
    {(Object.keys(albums).map((key) => (
      <div key={key} className="column">
        <AlbumCardContainer id={key}/>
      </div>
    )))}
  </div>
);

export default Archive;
