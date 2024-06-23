import * as types from '../constants/book.constants';
const initialState = {
  books: [],
  groupBooks: [],
  categoryBooks: [],
  getBooksError: null,
  getBooksLoading: false,
  selectedBook: null,
  getBooksByCategoryError: null,
  getBooksByCategoryLoading: false,
  bookGroup: '',
  loading: true,
  error: '',
};

function bookReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case types.BOOK_GET_BY_GROUP_REQUEST:
      return { ...state, loading: true };

    case types.BOOK_GET_BY_GROUP_SUCCESS:
      console.log('xxxx', payload.books);
      return { ...state, loading: false, groupBooks: payload.books };

    case types.BOOK_GET_BY_GROUP_FAIL:
      return { ...state, loading: false, error: payload };

    case types.SET_SELECTED_BOOK:
      return { ...state, loading: false, error: '', selectedBook: payload };

    case types.BOOK_CREATE_REQUEST:
      return { ...state, loading: true };

    case types.BOOK_CREATE_SUCCESS:
      return { ...state, loading: false, error: '' };

    case types.BOOK_CREATE_FAIL:
      return { ...state, loading: false, error: payload };

    case types.BOOK_GET_REQUEST:
    case types.GET_BOOK_DETAIL_REQUEST:
      return { ...state, getBooksLoading: true };
    case types.BOOK_GET_SUCCESS:
      return { ...state, getBooksLoading: false, books: payload.books };
    case types.BOOK_GET_FAIL:
    case types.GET_BOOK_DETAIL_FAIL:
      return { ...state, getBooksLoading: false, books: [], getBooksError: payload };
    case types.BOOK_GET_BY_CATEGORY_REQUEST:
      return { ...state, getBooksByCategoryLoading: true };
    case types.BOOK_GET_BY_CATEGORY_SUCCESS:
      console.log('VVVVV', payload);
      return { ...state, getBooksByCategoryLoading: false, books: state.books, categoryBooks: payload.data };
    case types.BOOK_GET_BY_CATEGORY_FAIL:
      return { ...state, getBooksByCategoryLoading: false, groupBooks: [], getBooksByCategoryError: payload };
    case types.SET_CATEGORY_BOOKS:
      return { categoryBooks: payload };
    case types.SET_BOOK_GROUP:
      return { bookGroup: payload };
    case types.GET_BOOK_DETAIL_SUCCESS:
      console.log('[북리듀서] 셀렉티드북의 페이로드 잘 들어오는 지: ', payload.data);
      return { ...state, getBooksLoading: false, selectedBook: payload.data };

    default:
      return state;
  }
}

export default bookReducer;
