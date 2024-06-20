import api from '../utils/api';
import * as types from '../constants/favorite.constants';

// 찜한 도서 불러오기.
const getFavorite = () => async (dispatch) => {};

// 도서 찜하기.
const addFavorite = () => async (dispatch) => {};

// 찜한 도서 삭제하기.
const deleteFavorite = () => async (dispatch) => {};

export const favoriteAction = {
  getFavorite,
  addFavorite,
  deleteFavorite,
};
