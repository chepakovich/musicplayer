import { FETCH_COLLECTION } from '../actions/types';

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_COLLECTION:
      return action.payload.results;
    default:
      return state;
  }
};
