import {combineReducers} from 'redux';
import {
  SELECT_ALBUM,
  SHOW_ROOT,
  REQUEST_ALBUM,
  REQUEST_ALBUMS,
  RECEIVE_ALBUMS,
  SEARCH_ALBUM,
  RECEIVE_SEARCH_RESULT,
  CLEAR_SEARCH,
  REQUEST_TAGS,
  RECEIVE_TAGS,
  TOGGLE_TAG,
  TOGGLE_MULTISELECT,
  TOGGLE_PHOTO,
  TOGGLE_PHOTO_IN_SELECTION,
  REQUEST_PHOTOS,
  RECEIVE_PHOTOS,
} from '../actions/index.js';

function app(state = {multiselect: false, selectedPhotos: []}, action) {
  switch (action.type) {
    case TOGGLE_MULTISELECT:
      return Object.assign({}, state, {multiselect: action.multiselect});
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

function selectedAlbum(state = null, action) {
  switch (action.type) {
    case SELECT_ALBUM:
      return action.album;
    default:
      return state;
  }
}

function album(state = {isFetching: false, photos: []}, action) {
  switch (action.type) {
    case REQUEST_ALBUM:
      return Object.assign({}, state, {
        id: action.album,
        isFetching: true,
      });
    case REQUEST_PHOTOS:
      return Object.assign({}, state, {
        id: action.album.id,
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
    case SEARCH_ALBUM:
      return Object.assign({}, state, {
        isSearching: true,
        term: action.term,
      });
    case RECEIVE_SEARCH_RESULT:
      return Object.assign({}, state, {
        isSearching: false,
        hasActiveSearch: true,
        term: action.term,
      });
    case CLEAR_SEARCH:
      // TODO: Mega hack
      document.querySelectorAll('input[type="text"]')[0].value = '';
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

function albums(state = {}, action) {
  switch (action.type) {
    case REQUEST_ALBUM:
    case SEARCH_ALBUM:
    case RECEIVE_SEARCH_RESULT:
    case CLEAR_SEARCH:
      return Object.assign(
        {},
        state,
        {[action.album]: album(state[action.album], action)}
      );
    case REQUEST_PHOTOS:
    case RECEIVE_PHOTOS:
      return Object.assign(
        {},
        state,
        {[action.album.id]: album(state[action.album.id], action)}
      );
    case TOGGLE_PHOTO:
      return Object.assign(
        {},
        state,
        {[action.albumId]: album(state[action.albumId], action)}
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

function tags(state = [], action) {
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
  app,
  albums,
  selectedAlbum,
  tags,
});

export default rootReducer;
