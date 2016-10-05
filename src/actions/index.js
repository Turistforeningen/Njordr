import fetch from 'isomorphic-fetch';

import {
  appliedTagsSelector,
  selectedAlbumSelector,
} from '../selectors/index.js';

export const SET_ERROR = 'SET_ERROR';
export function setError(err) {
  return {
    type: 'SET_ERROR',
    err,
  };
}

export const SELECT_ALBUM = 'SELECT_ALBUM';
export function selectAlbum(album) {
  return {type: SELECT_ALBUM, album};
}

export const SHOW_ROOT = 'SHOW_ROOT';
export function showRoot() {
  return {type: SHOW_ROOT};
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

export const REQUEST_ALBUM = 'REQUEST_ALBUM';
export function requestAlbum(album, tags) {
  return {
    type: REQUEST_ALBUM,
    album,
    tags,
  };
}

export const RECEIVE_ALBUM = 'RECEIVE_ALBUM';
export function receiveAlbum(album, json) {
  return {
    type: RECEIVE_ALBUM,
    album,
    photos: json.data.map(photo => photo),
    receivedAt: Date.now(),
  };
}

export const RECEIVE_PHOTOS = 'RECEIVE_PHOTOS';
export function receivePhotos(album, json, append) {
  const hasMore = (!!json.paging && !!json.paging.next);
  const photos = json.data.map(photo => photo);
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

export const RECEIVE_SEARCH_RESULT = 'RECEIVE_SEARCH_RESULT';
export function receiveSearchResult(album, term) {
  return {
    type: RECEIVE_SEARCH_RESULT,
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

export function fetchAlbums() {
  return function(dispatch) { // eslint-disable-line
    dispatch(requestAlbums());
    return fetch('https://skadi.app.dnt.no/v1/albums')
      .then(response => response.json())
      .then(
        json => dispatch(receiveAlbums(json)),
        err => dispatch(setError(err))
      );
  };
}

export function fetchPhotos(album2, append = true) {
  return function(dispatch, getState) { // eslint-disable-line
    const state = getState();
    const tags = appliedTagsSelector(state);
    const album = selectedAlbumSelector(state);

    const tagsStr = tags.length ? `tags=${tags.join()}` : '';
    const queryStr = album.term ? `query=${album.term}` : '';
    let url = append && !!album.pagination && !!album.pagination.next ?
      album.pagination.next : album.photosUrl;
    if (tagsStr || queryStr) {
      url = `${url}?${[tagsStr, queryStr].join('&')}`;
    }

    dispatch(requestAlbum(album.id));

    return fetch(url.replace('http:', 'https:')) // TODO: Ensure HTTPS
      .then(response => response.json())
      .then(json => {
        dispatch(receivePhotos(album, json, append));
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
  };
}

export const TOGGLE_MULTISELECT = 'TOGGLE_MULTISELECT';
export function toggleMultiselect(multiselect) {
  return {
    type: TOGGLE_MULTISELECT,
    multiselect,
  };
}

export function confirmSelectedPhotos() {
  // TODO: Implement this
  console.warn('Not implemented yet.'); // eslint-disable-line no-console
}

export function fetchTags() {
  return (dispatch) => {
    dispatch(requestAlbums());
    return fetch('https://skadi.app.dnt.no/v1/tags')
      .then(response => response.json())
      .then(json => dispatch(receiveTags(json)));
  };
}
