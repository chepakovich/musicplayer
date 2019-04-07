import songs from '../apis/songs';
import { FETCH_SONGS, FETCH_COLLECTION } from './types';

export const fetchSongs = artist => async dispatch => {
  const response = await songs.get('/search?term=' + artist + '&entity=musicTrack&limit=10');

  dispatch({ type: FETCH_SONGS, payload: response.data });
}

export const fetchCollection = collectionId => async dispatch => {
  const response = await songs.get('/lookup?id=' + collectionId + '&entity=song');
  
  console.log("response:", response);
  dispatch({ type: FETCH_COLLECTION, payload: response.data });
}
