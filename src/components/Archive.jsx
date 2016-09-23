import React from 'react';

const Archive = ({albums, selectAlbum}) => (
  <div>
    Archive
    {(Object.keys(albums).map((key) => (
      <div key={key}>
        <a onClick={(e) => { selectAlbum(key); }}>
          {albums[key].name}
        </a>
      </div>
    )))}
  </div>
);

export default Archive;
