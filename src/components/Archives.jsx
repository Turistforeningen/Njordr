import React from 'react';

import AlbumCardContainer from '../components/AlbumCard.jsx';

const Archives = ({archives, setCurrentArchive}) => (
  <div className="ui four column grid">
    {(Object.keys(archives).map((key) => (
      <div key={key} className="column">
        <AlbumCardContainer id={key} />
      </div>
    )))}
  </div>
);

export default Archives;
