import * as types from '../constants/book.constants';
const initialState = {
  loading: true,
  error: '',
  bookList: [],
  selectedBook: '',
};

function bookReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case types.BOOK_GET_REQUEST:
    case types.BOOK_DELETE_REQUEST:
    case types.BOOK_EDIT_REQUEST:
    case types.BOOK_CREATE_REQUEST:
      return { ...state, loading: true };
    case types.BOOK_GET_SUCCESS:
    case types.BOOK_CREATE_SUCCESS:
      return { ...state, loading: false, error: '', bookList: payload.books };
    case types.SET_SELECTED_BOOK:
      return { ...state, loading: false, error: '', selectedBook: payload };
    case types.BOOK_DELETE_SUCCESS:
    case types.BOOK_EDIT_SUCCESS:
      return { ...state, loading: false, error: '' };
    case types.BOOK_GET_FAIL:
    case types.BOOK_DELETE_FAIL:
    case types.BOOK_EDIT_FAIL:
    case types.BOOK_CREATE_FAIL:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
}

export default bookReducer;
