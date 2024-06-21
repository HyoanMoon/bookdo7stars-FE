import * as types from '../constants/book.constants';
const initialState = {
  books: [],
  groupBooks: [],
  getBooksError: null,
  getBooksLoading: false,
  getBooksByGroupError: null,
  getBooksByGroupLoading: false,
  group: null,
  selectedBook: null,
};

function bookReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case types.BOOK_GET_REQUEST:
    case types.GET_BOOK_DETAIL_REQUEST:
      return { ...state, getBooksLoading: true };
    case types.BOOK_GET_SUCCESS:
      return { ...state, getBooksLoading: false, books: payload.books };
    case types.BOOK_GET_FAIL:
    case types.GET_BOOK_DETAIL_FAIL:
      return { ...state, getBooksLoading: false, books: [], getBooksError: payload };
    case types.BOOK_GET_BY_GROUP_REQUEST:
      return { ...state, getBooksLoading: true };
    case types.BOOK_GET_BY_GROUP_SUCCESS:
      return { ...state, getBooksByGroupLoading: false, groupBooks: payload.books };
    case types.BOOK_GET_BY_GROUP_FAIL:
      return { ...state, getBooksByGroupLoading: false, groupBooks: [], getBooksByGroupError: payload };
    case types.GET_BOOK_DETAIL_SUCCESS:
      console.log('[북리듀서] 셀렉티드북의 페이로드 잘 들어오는 지: ', payload.data);
      return { ...state, getBooksLoading: false, selectedBook: payload.data };

    default:
      return state;
  }
}

export default bookReducer;
