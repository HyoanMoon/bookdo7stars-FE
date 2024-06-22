import api from '../utils/api';
import * as types from '../constants/book.constants';
import { commonUiActions } from './commonUiAction';

// 도서 정보 불러오기.
const getBookList = (query) => async (dispatch) => {
  try {
    dispatch({ type: types.BOOK_GET_REQUEST });
    const response = await api.get('/book', { params: { ...query } });
    // console.log('도서-조회-response', response);
    dispatch({ type: types.BOOK_GET_SUCCESS, payload: response.data });
  } catch (err) {
    dispatch({ type: types.BOOK_GET_FAIL, payload: err.error });
  }
};

// 도서 디테일 불러오기.
const getBookDetail = () => async (dispatch) => {};

// 도서 등록.
const createBook = (bookForm) => async (dispatch) => {
  try {
    dispatch({ type: types.BOOK_CREATE_REQUEST });
    const response = await api.post('/book', bookForm);
    // console.log('도서-생성-response', response);
    dispatch({ type: types.BOOK_CREATE_SUCCESS });
    dispatch(commonUiActions.showToastMessage('도서 상품을 추가 했습니다', 'success'));
    dispatch(getBookList());
  } catch (err) {
    dispatch({ type: types.BOOK_CREATE_FAIL, payload: err.error });
    dispatch(commonUiActions.showToastMessage(err.error, 'error'));
  }
};

// 도서 삭제.
const deleteBook = (id) => async (dispatch) => {
  try {
    dispatch({ type: types.BOOK_DELETE_REQUEST });
    const response = await api.delete(`/book/${id}`);
    // console.log('도서-삭제-response', response);
    dispatch({ type: types.BOOK_DELETE_SUCCESS });
    dispatch(getBookList());
  } catch (err) {
    dispatch({ type: types.BOOK_DELETE_FAIL, payload: err.error });
  }
};

// 도서 수정.
const updateBook = (bookForm, id) => async (dispatch) => {
  try {
    dispatch({ type: types.BOOK_EDIT_REQUEST });
    const response = await api.put(`/book/${id}`, bookForm);
    console.log('도서-수정-response', response);
    dispatch({ type: types.BOOK_EDIT_SUCCESS });
    dispatch(commonUiActions.showToastMessage('도서 정보 수정을 완료했습니다', 'success'));
    dispatch(getBookList());
  } catch (err) {
    dispatch({ type: types.BOOK_EDIT_FAIL, payload: err.error });
    dispatch(commonUiActions.showToastMessage(err.error, 'error'));
  }
};

export const bookActions = {
  getBookList,
  getBookDetail,
  createBook,
  deleteBook,
  updateBook,
};
