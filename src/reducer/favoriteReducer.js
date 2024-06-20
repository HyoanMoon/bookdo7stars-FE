import * as types from '../constants/favorite.constants';
const initialState = {};

function favoriteReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case types.GET_FAVORITE_REQUEST:
      return {};
    default:
      return state;
  }
}

export default favoriteReducer;
