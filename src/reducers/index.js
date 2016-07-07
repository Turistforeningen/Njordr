import {combineReducers} from 'redux';
import {
  SELECT_ALBUM,
  SHOW_ROOT,
  REQUEST_ALBUM,
  RECEIVE_ALBUM,
} from '../actions/index.js';

function selectedAlbum(state = null, action) {
  switch (action.type) {
    case SELECT_ALBUM:
      return action.album;
    default:
      return state;
  }
}

function album(state = { isFetching: false, photos: []}, action) {
  switch (action.type) {
    case REQUEST_ALBUM:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case RECEIVE_ALBUM:
      return Object.assign({}, state, {
        isFetching: false,
        photos: action.photos,
        lastUpdated: action.receivedAt,
      });
    default:
      return state;
  }
}

function albums(state = {}, action) {
  switch (action.type) {
    case REQUEST_ALBUM:
    case RECEIVE_ALBUM:
      return Object.assign({}, state, {
        [action.album]: album(state[action.album], action),
      });
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  albums,
  selectedAlbum,
});

export default rootReducer;
