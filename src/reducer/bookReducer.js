import * as types from '../constants/book.constants';
const initialState = {
  loading: true,
  error: '',
  bookList: [],
};

function bookReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case types.BOOK_GET_REQUEST:
    case types.BOOK_DELETE_REQUEST:
      return { ...state, loading: true };
    case types.BOOK_GET_SUCCESS:
      return { ...state, loading: false, error: '', bookList: payload.books };
    case types.BOOK_DELETE_SUCCESS:
      return { ...state, loading: false, error: '' };
    case types.BOOK_GET_FAIL:
    case types.BOOK_DELETE_FAIL:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
}

export default bookReducer;
