import React from 'react';

const TagsFilter = ({album, tags}) => (
  <div className="ui segment">
    Tags
    <ul>
      {tags.map(tag => <li key={tag.key}>{tag.val}</li>)}
    </ul>
  </div>
);

export default TagsFilter;
