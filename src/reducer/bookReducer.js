import * as types from '../constants/book.constants';
const initialState = {
  books: [],
  groupBooks: [],
  getBooksError: null,
  getBooksLoading: false,
  getBooksByGroupError: null,
  getBooksByGroupLoading: false,
  group: null,
};

function bookReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case types.BOOK_GET_REQUEST:
      return { ...state, getBooksLoading: true };
    case types.BOOK_GET_SUCCESS:
      return { ...state, getBooksLoading: false, books: payload.books };
    case types.BOOK_GET_FAIL:
      return { ...state, getBooksLoading: false, books: [], getBooksError: payload };
    case types.BOOK_GET_BY_GROUP_REQUEST:
      return { ...state, getBooksLoading: true };
    case types.BOOK_GET_BY_GROUP_SUCCESS:
      return { ...state, getBooksByGroupLoading: false, groupBooks: payload.books };
    case types.BOOK_GET_BY_GROUP_FAIL:
      return { ...state, getBooksByGroupLoading: false, groupBooks: [], getBooksByGroupError: payload };
    default:
      return state;
  }
}

export default bookReducer;
