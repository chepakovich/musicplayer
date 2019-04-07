import { FETCH_SONGS } from '../actions/types';

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_SONGS:
      return action.payload.results;
    default:
      return state;
  }
};
