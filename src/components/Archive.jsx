import React from 'react';

const Archive = ({albums, selectAlbum}) => (
  <div>
    Archive
    {(Object.keys(albums).map((key) => (
      <div
        key={key}
        onClick={(e) => { selectAlbum(key); }}
      >
        {albums[key].name}
      </div>
    )))}
  </div>
);

export default Archive;
