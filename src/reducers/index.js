import { combineReducers } from 'redux';
import songsReducer from './songsReducer';
import collectionReducer from './collectionReducer';

export default combineReducers({
  songs: songsReducer,
  collection: collectionReducer
});