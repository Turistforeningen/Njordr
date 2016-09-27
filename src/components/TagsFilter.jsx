import React from 'react';

const TagsFilter = ({album, tags, toggleTag, fetchAlbum}) => (
  <div className="item">
    Tags
    <div className="menu">
      {tags.map(tag => (
        <a className="item" key={tag.key} onClick={() => {
          toggleTag(tag.val, album);
        }}>
          <input type="checkbox" checked={tag.isApplied ? 'checked' : ''} />
          {' '}
          {tag.val}
        </a>
      ))}
    </div>
  </div>
);

export default TagsFilter;
