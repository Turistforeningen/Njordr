import fetch from 'isomorphic-fetch';

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
    albums: json.data.map(album => album),
    receivedAt: Date.now(),
  };
}

export const REQUEST_ALBUM = 'REQUEST_ALBUM';
export function requestAlbum(album) {
  return {type: REQUEST_ALBUM, album};
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

export const SEARCH_ALBUM = 'SEARCH_ALBUM';
export function searchAlbum(album, term) {
  return {
    type: SEARCH_ALBUM,
    album,
    term,
  };
}

export const RECEIVE_SEARCH_RESULT = 'RECEIVE_SEARCH_RESULT';
export function receiveSearchResult(album, term, result) {
  return {
    type: RECEIVE_SEARCH_RESULT,
    album,
    term,
    result,
  };
}

export const CLEAR_SEARCH = 'CLEAR_SEARCH';
export function clearSearch(album) {
  return {
    type: CLEAR_SEARCH,
    album,
  };
}

export function fetchAlbum(album) {
  return function _fetchAlbum(dispatch) {
    dispatch(requestAlbum(album));

    return fetch(`https://skadi.app.dnt.no/v1/albums/${album}/photos`)
      .then(response => response.json())
      .then(json => dispatch(receiveAlbum(album, json)));
  };
}

export function fetchAlbums() {
  return function _fetchAlbums(dispatch) {
    dispatch(requestAlbums());
    return fetch('https://skadi.app.dnt.no/v1/albums')
      .then(response => response.json())
      .then(json => dispatch(receiveAlbums(json)));
  };
}

export function fetchSearchResult(album, term) {
  return function _fetchSearchResult(dispatch) {
    dispatch(searchAlbum(album, term));
    return fetch(`https://skadi.app.dnt.no/v1/albums/${album}/photos?query=${term}`)
      .then(response => response.json())
      .then(json => dispatch(receiveSearchResult(album, term, json)));
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

export function fetchTags() {
  return function _fetchTags(dispatch) {
    dispatch(requestAlbums());
    return fetch('https://skadi.app.dnt.no/v1/tags')
      .then(response => response.json())
      .then(json => dispatch(receiveTags(json)));
  };
}
