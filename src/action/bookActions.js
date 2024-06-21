import api from '../utils/api';
import * as types from '../constants/book.constants';
import { BOOK_GET_BY_GROUP_REQUEST } from '../constants/book.constants';
import { Response } from '../../node_modules/whatwg-fetch/fetch';
import { type } from '@testing-library/user-event/dist/type';
import { commonUiActions } from './commonUiAction';

// 도서 정보 불러오기.
const getBookList = (query) => async (dispatch) => {
  try {
    dispatch({ type: types.BOOK_GET_REQUEST });
    const response = await api.get('/book', {
      params: { ...query },
    });
    console.log('xxxxx', response.data);
    dispatch({ type: types.BOOK_GET_SUCCESS, payload: response.data });
  } catch (err) {
    dispatch({ type: types.BOOK_GET_FAIL, payload: err });
    console.error(err);
  }
};

const getBooksByQueryType = (query, queryType) => async (dispatch) => {
  try {
    dispatch({ type: types.BOOK_GET_BY_GROUP_REQUEST });
    const response = await api.get(`/book/${queryType}`, {
      params: { ...query },
    });
    dispatch({ type: types.BOOK_GET_BY_GROUP_SUCCESS, payload: response.data });
  } catch (err) {
    dispatch({ type: types.BOOK_GET_BY_GROUP_FAIL, payload: err });
    console.error(err);
  }
};

// 도서 디테일 불러오기.
const getBookDetail = (id) => async (dispatch) => {
  try {
    dispatch({ type: types.GET_BOOK_DETAIL_REQUEST });
    console.log('[북액션디테일] 들어온id: ', id);
    const response = await api.get(`book/detail/${id}`);
    console.log('[북액션디테일] response받은것: ', response);
    if (response.status !== 200) throw new Error(response.error);
    dispatch({ type: types.GET_BOOK_DETAIL_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: types.GET_BOOK_DETAIL_FAIL, payload: error.error });
    dispatch(commonUiActions.showToastMessage(error.error, 'error'));
  }
};

// 도서 등록.
const createBook = () => async (dispatch) => {};

// 도서 삭제.
const deleteBook = () => async (dispatch) => {};

// 도서 수정.
const updateBook = () => async (dispatch) => {};

export const bookActions = {
  getBookList,
  getBookDetail,
  getBooksByQueryType,
  createBook,
  deleteBook,
  updateBook,
};
