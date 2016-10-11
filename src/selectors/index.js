export const currentArchiveSelector = state => state.albums[state.app.currentArchive];

export const selectedPhotosSelector = state => state.app.selectedPhotos;

export const appliedTagsSelector = state => state.tags
  .filter((item, index, list) => item.isApplied)
  .map(item => item.val);

export const photoThumbnailSelector = photo => photo.previews[8].href;

export const currentArchivePhotosSelector = state => {
  const currentArchive = currentArchiveSelector(state);

  if (currentArchive.hasActiveSearch) {
    return currentArchive.result.data.map(photo => photo);
  } else if (
    state.app.currentArchive &&
    state.albums[state.app.currentArchive] &&
    state.albums[state.app.currentArchive].photos &&
    state.albums[state.app.currentArchive].photos.length
  ) {
    return state.albums[state.app.currentArchive].photos.map(photo => photo);
  }
  return [];
};
