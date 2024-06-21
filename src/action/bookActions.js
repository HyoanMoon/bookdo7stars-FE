import api from '../utils/api';
import * as types from '../constants/book.constants';

// 도서 정보 불러오기.
const getBookList = (query) => async (dispatch) => {
  try {
    dispatch({ type: types.BOOK_GET_REQUEST });
    const response = await api.get('/book', { params: { ...query } });
    console.log('도서-조회-response', response);
    dispatch({ type: types.BOOK_GET_SUCCESS, payload: response.data });
  } catch (err) {
    dispatch({ type: types.BOOK_GET_FAIL, payload: err.error });
  }
};

// 도서 디테일 불러오기.
const getBookDetail = () => async (dispatch) => {};

// 도서 등록.
const createBook = () => async (dispatch) => {};

// 도서 삭제.
const deleteBook = (id) => async (dispatch) => {
  try {
    dispatch({ type: types.BOOK_DELETE_REQUEST });
    const response = await api.delete(`/book/${id}`);
    console.log('도서-삭제-response', response);
    dispatch({ type: types.BOOK_DELETE_SUCCESS });
    dispatch(getBookList());
  } catch (err) {
    dispatch({ type: types.BOOK_DELETE_FAIL, payload: err.error });
  }
};

// 도서 수정.
const updateBook = () => async (dispatch) => {};

export const bookActions = {
  getBookList,
  getBookDetail,
  createBook,
  deleteBook,
  updateBook,
};
