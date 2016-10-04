import fetch from 'isomorphic-fetch';

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
    needsReload: false,
  };
}

export const RECEIVE_PHOTOS = 'RECEIVE_PHOTOS';
export function receivePhotos(album, json, append) {
  return {
    type: RECEIVE_PHOTOS,
    album,
    photos: json.data.map(photo => photo),
    pagination: {...json.paging, hasMore: json.paging && !!json.paging.next},
    receivedAt: Date.now(),
    needsReload: false,
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

export const SET_ALBUM_NEEDS_RELOAD = 'SET_ALBUM_NEEDS_RELOAD';
export function setAlbumNeedsReload(album, needsReload) {
  return {
    type: SET_ALBUM_NEEDS_RELOAD,
    album,
    needsReload,
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

export function fetchPhotos(album, tags = []) {
  return function(dispatch) { // eslint-disable-line
    const tagsStr = tags.length ? `tags=${tags.join()}` : '';
    const queryStr = album.term ? `query=${album.term}` : '';
    const append = !album.needsReload;
    let url = !album.needsReload && album.pagination ? album.pagination.next : album.photosUrl;
    if (tagsStr || queryStr) {
      url = `${url}?${[tagsStr, queryStr].join('&')}`;
    }
    // NOTE: requestAlbum has to be first to set isFetching and prevent firing fetch
    // from redux-infinite-scroll twice (or more)
    dispatch(requestAlbum(album.id));
    dispatch(setAlbumNeedsReload(album.id, false)); // TODO: Hack to reload if tag filter is set

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
