import api from '../utils/api';
import * as types from '../constants/book.constants';

// 도서 정보 불러오기.
const getBookList = () => async (dispatch) => {};

// 도서 디테일 불러오기.
const getBookDetail = () => async (dispatch) => {};

// 도서 등록.
const createBook = () => async (dispatch) => {};

// 도서 삭제.
const deleteBook = () => async (dispatch) => {};

// 도서 수정.
const updateBook = () => async (dispatch) => {};

export const bookActions = {
  getBookList,
  getBookDetail,
  createBook,
  deleteBook,
  updateBook,
};
