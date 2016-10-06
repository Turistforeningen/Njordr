export const selectedAlbumSelector = state => state.albums[state.selectedAlbum];

export const selectedPhotosSelector = state => state.app.selectedPhotos;

export const appliedTagsSelector = state => state.tags
  .filter((item, index, list) => item.isApplied)
  .map(item => item.val);

export const photoThumbnailSelector = photo => photo.previews[8].href;
