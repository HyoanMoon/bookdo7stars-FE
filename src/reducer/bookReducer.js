import * as types from '../constants/book.constants';
const initialState = {};

function bookReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case types.BOOK_GET_REQUEST:
      return {};
    default:
      return state;
  }
}

export default bookReducer;
