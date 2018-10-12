import fetch from 'isomorphic-fetch';

import {
  appliedTagsSelector,
  currentArchiveSelector,
} from '../selectors/index.js';

export const SET_ERROR = 'SET_ERROR';
export function setError(err) {
  return {
    type: 'SET_ERROR',
    error: err,
  };
}

export function handleError(err) {
  window.opener.fotoweb.errorHandler(err);

  return (dispatch, getState) => (
    dispatch(setError('Det skjedde en feil ved henting av arkiver.'))
  );
}

export const SET_API_URL = 'SET_API_URL';
export function setApiUrl(url) {
  return {
    type: SET_API_URL,
    url,
  };
}

export const SET_MULTISELECT = 'SET_MULTISELECT';
export function setMultiselect(isMultiselect) {
  return {
    type: SET_MULTISELECT,
    isMultiselect,
  };
}

export const SET_CURRENT_ARCHIVE = 'SET_CURRENT_ARCHIVE';
export function setCurrentArchive(archive) {
  return {type: SET_CURRENT_ARCHIVE, archive};
}

export const REMOVE_ARCHIVES = 'REMOVE_ARCHIVES';
export function removeArchives(archives) {
  return {type: REMOVE_ARCHIVES, archives};
}

export const SET_PROMOTED_ARCHIVES = 'SET_PROMOTED_ARCHIVES';
export function setPromotedArchives(archives) {
  return {type: SET_PROMOTED_ARCHIVES, archives};
}

export const REQUEST_ALBUMS = 'REQUEST_ALBUMS';
export function requestAlbums() {
  return {type: REQUEST_ALBUMS};
}

export const RECEIVE_ALBUMS = 'RECEIVE_ALBUMS';
export function receiveAlbums(json) {
  return {
    type: RECEIVE_ALBUMS,
    albums: json.data.map(album => Object.assign({}, album, {pagination: {hasMore: true}})),
    receivedAt: Date.now(),
  };
}

export const REQUEST_PHOTOS = 'REQUEST_PHOTOS';
export function requestPhotos(album) {
  return {
    type: REQUEST_PHOTOS,
    album,
  };
}

export const RECEIVE_PHOTOS = 'RECEIVE_PHOTOS';
export function receivePhotos(album, json, append) {
  const hasMore = (!!json.paging && !!json.paging.next);
  const photos = json.data.map(photo => {
    if (!photo.metadata || !photo.metadata.albums) {
      photo.metadata.albums = [];
    }

    if (!photo.metadata || !photo.metadata.photographers) {
      photo.metadata.photographers = [];
    }

    if (!photo.metadata || !photo.metadata.tags) {
      photo.metadata.tags = [];
    }

    return photo;
  });
  const isEmpty = !hasMore && !photos.length;

  return {
    type: RECEIVE_PHOTOS,
    album,
    photos,
    pagination: {...json.paging, hasMore},
    receivedAt: Date.now(),
    isEmpty,
    append,
  };
}

export const SEARCH_ALBUM = 'SEARCH_ALBUM';
export function searchAlbum(album, term) {
  return {
    type: SEARCH_ALBUM,
    album,
    term,
  };
}

export const CLEAR_SEARCH = 'CLEAR_SEARCH';
export function clearSearch(album) {
  return {
    type: CLEAR_SEARCH,
    album,
  };
}

export const CLEAR_PHOTOS = 'CLEAR_PHOTOS';
export function clearPhotos(album) {
  return {
    type: CLEAR_PHOTOS,
    album,
  };
}

export function fetchAlbums() {
  return function(dispatch, getState) { // eslint-disable-line
    const {app} = getState();

    dispatch(requestAlbums());

    return fetch(`${app.apiUrl}/albums`)
      .then(response => response.json())
      .then(json => dispatch(receiveAlbums(json)))
      .catch(err => dispatch(handleError(err)));
  };
}

export function fetchPhotos(archiveId, append = true) {
  return function(dispatch, getState) { // eslint-disable-line
    const state = getState();
    const tags = appliedTagsSelector(state);
    const archive = currentArchiveSelector(state);
    let url = archive.photosUrl;

    if (append === true && archive.pagination && archive.pagination.next) {
      url = archive.pagination.next;
    } else if (append === false) {
      dispatch(clearPhotos(archive));

      const tagsStr = tags.length ? `tags=${tags.join()}` : '';
      const queryStr = archive.term ? `query=${archive.term}` : '';

      if (tagsStr || queryStr) {
        url = `${url}?${[tagsStr, queryStr].join('&')}`;
      }
    }

    dispatch(requestPhotos(archive.id));

    return fetch(url.replace('http:', 'https:')) // TODO: Skadi returns http links only
      .then(response => response.json())
      .then(json => {
        dispatch(receivePhotos(archive, json, append));
      });
  };
}

export const REQUEST_TAGS = 'REQUEST_TAGS';
export function requestTags() {
  return {type: REQUEST_TAGS};
}

export const RECEIVE_TAGS = 'RECEIVE_TAGS';
export function receiveTags(json) {
  return {
    type: RECEIVE_TAGS,
    tags: json,
    receivedAt: Date.now(),
  };
}

export const TOGGLE_TAG = 'TOGGLE_TAG';
export function toggleTag(tag) {
  return {
    type: TOGGLE_TAG,
    tag,
  };
}

export const TOGGLE_PHOTO = 'TOGGLE_PHOTO';
export function togglePhoto(photo) {
  return {
    type: TOGGLE_PHOTO,
    photo,
    albumId: photo.albumId,
  };
}

export const TOGGLE_PHOTO_IN_SELECTION = 'TOGGLE_PHOTO_IN_SELECTION';
export function togglePhotoInSelection(photo, album) {
  return {
    type: TOGGLE_PHOTO_IN_SELECTION,
    photo,
  };
}

export function togglePhotoSelection(photo) {
  return function(dispatch) { // eslint-disable-line
    dispatch(togglePhotoInSelection(photo)); // Adds or removes from selected photos
    dispatch(togglePhoto(photo)); // Changes state for on a photo
  };
}

export function confirmSelection(selection) {
  return function (dispatch, getState) { // eslint-disable-line func-names
    try {
      window.opener.fotoweb.confirmSelected(selection);
    } catch (err) {
      console.error('Browser was not opened in popup — tried to confirm', selection); // eslint-disable-line no-console, max-len
    }
  };
}

export function fetchTags() {
  return (dispatch, getState) => {
    const {app} = getState();

    dispatch(requestTags());

    return fetch(`${app.apiUrl}/tags`)
      .then(response => response.json())
      .then(json => dispatch(receiveTags(json)));
  };
}
