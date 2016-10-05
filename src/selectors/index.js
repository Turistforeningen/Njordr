export const selectedAlbumSelector = state => state.albums[state.selectedAlbum];

export const appliedTagsSelector = state => state.tags
  .filter((item, index, list) => item.isApplied)
  .map(item => item.val);
