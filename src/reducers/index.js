import {combineReducers} from 'redux';

import {
  SET_ERROR,
  SET_API_URL,
  SET_MULTISELECT,
  TOGGLE_PHOTO_IN_SELECTION,
  SET_CURRENT_ARCHIVE,
  SET_PROMOTED_ARCHIVES,
  REMOVE_ARCHIVES,
  REQUEST_ALBUMS,
  RECEIVE_ALBUMS,
  SEARCH_ALBUM,
  CLEAR_SEARCH,
  REQUEST_TAGS,
  RECEIVE_TAGS,
  TOGGLE_TAG,
  REQUEST_PHOTOS,
  RECEIVE_PHOTOS,
  CLEAR_PHOTOS,
  TOGGLE_PHOTO,
} from '../actions/index.js';

function appReducer(state = {
  isMultiselect: false,
  selectedPhotos: [],
  promotedArchives: [],
  doctypes: {
    image: {friendlyName: 'bilde', selectable: true},
    movie: {friendlyName: 'video', selectable: false},
    document: {friendlyName: 'dokument', selectable: false},
    unknown: {friendlyName: 'ukjent', selectable: false},
  },
}, action) {
  switch (action.type) {
    case SET_ERROR:
      return Object.assign({}, state, {error: action.error});
    case SET_API_URL:
      return Object.assign({}, state, {apiUrl: action.url});
    case SET_CURRENT_ARCHIVE:
      return Object.assign({}, state, {currentArchive: action.archive});
    case SET_PROMOTED_ARCHIVES:
      return Object.assign({}, state, {promotedArchives: action.archives});
    case SET_MULTISELECT:
      return Object.assign({}, state, {isMultiselect: action.isMultiselect});
    case TOGGLE_PHOTO_IN_SELECTION: // eslint-disable-line no-case-declarations
      const photoIndex = state.selectedPhotos.findIndex(
        element => element.id === action.photo.id
      );
      let selectedPhotos;

      if (photoIndex === -1) {
        selectedPhotos = [
          ...state.selectedPhotos,
          action.photo,
        ];
      } else {
        selectedPhotos = [
          ...state.selectedPhotos.slice(0, photoIndex),
          ...state.selectedPhotos.slice(photoIndex + 1),
        ];
      }

      return Object.assign({}, state, {selectedPhotos});
    default:
      return state;
  }
}

function photoReducer(state = {}, action) {
  switch (action.type) {
    case TOGGLE_PHOTO:
      return Object.assign({}, state, {isSelected: !state.isSelected});
    default:
      return state;
  }
}

function photosReducer(state = [], action) {
  switch (action.type) {
    case TOGGLE_PHOTO:
      return state.map((photo) => {
        if (photo.id === action.photo.id) {
          return photoReducer(photo, action);
        }
        return photo;
      });
    default:
      return state;
  }
}

function albumReducer(state = {isFetching: false, photos: []}, action) {
  switch (action.type) {
    case REQUEST_PHOTOS:
      return Object.assign({}, state, {
        id: action.album,
        isFetching: true,
      });
    case RECEIVE_PHOTOS:
      return Object.assign({}, state, {
        id: action.album.id,
        isFetching: false,
        photos: action.append ? [...state.photos || [], ...action.photos] : action.photos,
        pagination: action.pagination,
        lastUpdated: action.receivedAt,
        isEmpty: action.isEmpty,
      });
    case CLEAR_PHOTOS:
      return {...state, photos: []};
    case SEARCH_ALBUM:
      return Object.assign({}, state, {
        isSearching: true,
        term: action.term,
      });
    case CLEAR_SEARCH:
      // TODO: Mega hack
      document.querySelectorAll('input[name="archive-search"]')[0].value = '';
      return Object.assign({}, state, {
        term: undefined,
        hasActiveSearch: false,
        result: undefined,
      });
    case TOGGLE_PHOTO:
      return Object.assign({}, state, {
        photos: photosReducer(state.photos, action),
      });
    default:
      return state;
  }
}

function albumsReducer(state = {}, action) {
  switch (action.type) {
    case REMOVE_ARCHIVES:
      if (action.archives && action.archives.length) {
        return Object.keys(state).reduce((archives, archive) => {
          if (action.archives.indexOf(archive) === -1) {
            archives[archive] = state[archive];
          }
          return archives;
        }, {});
      }
      return state;
    case REQUEST_PHOTOS:
    case SEARCH_ALBUM:
    case CLEAR_SEARCH:
      return Object.assign(
        {},
        state,
        {[action.album]: albumReducer(state[action.album], action)}
      );
    case RECEIVE_PHOTOS:
    case CLEAR_PHOTOS:
      return Object.assign(
        {},
        state,
        {[action.album.id]: albumReducer(state[action.album.id], action)}
      );
    case TOGGLE_PHOTO:
      return Object.assign(
        {},
        state,
        {[action.albumId]: albumReducer(state[action.albumId], action)}
      );
    case REQUEST_ALBUMS:
      return Object.assign({}, state, {});
    case RECEIVE_ALBUMS:
      return Object.assign(
        {},
        state,
        action.albums.sort((a, b) => {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        }).reduce((previousValue, currentValue, currentIndex, array) => {
          previousValue[currentValue.id] = Object.assign(
            {}, state[currentValue.id], currentValue
          );
          return previousValue;
        }, {})
      );
    default:
      return state;
  }
}

function tagsReducer(state = [], action) {
  switch (action.type) {
    case REQUEST_TAGS:
      return state;
    case RECEIVE_TAGS:
      return action.tags.map(tag => Object.assign({}, tag, {isApplied: false}));
    case TOGGLE_TAG:
      return state.map(tag => Object.assign(
        {},
        tag,
        {isApplied: action.tag === tag.val ? !tag.isApplied : tag.isApplied}
      ));
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  app: appReducer,
  albums: albumsReducer,
  tags: tagsReducer,
});

export default rootReducer;
