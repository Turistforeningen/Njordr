import fetch from 'isomorphic-fetch';

export const SELECT_ALBUM = 'SELECT_ALBUM';
export function selectAlbum(album) {
  return {type: SELECT_ALBUM, album};
}

export const SHOW_ROOT = 'SHOW_ROOT';
export function showRoot() {
  return {type: SHOW_ROOT};
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

export function fetchAlbum(album) {
  return function _fetchAlbum(dispatch) {
    dispatch(requestAlbum(album));

    return fetch(`https://skadi.app.dnt.no/v1/albums/${album}/photos`)
      .then(response => response.json())
      .then(json => dispatch(receiveAlbum(album, json)));
  };
}
