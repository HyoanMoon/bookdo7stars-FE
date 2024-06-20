import api from '../utils/api';
import * as types from '../constants/cart.constants';

// 장바구니 아이템 추가.
const addToCart = () => async (dispatch) => {};

// 장바구니 아이템 조회.
const getCartList = () => async (dispatch) => {};

// 장바구니 아이템 삭제.
const deleteCartItem = () => async (dispatch) => {};

// 장바구니 아이템 아이템 수량 수정.
const updateItemQty = () => async (dispatch) => {};

// 장바구니에 담긴 아이템 갯수.
const getCartQty = () => async (dispatch) => {};

export const cartActions = {
  addToCart,
  getCartList,
  deleteCartItem,
  updateItemQty,
  getCartQty,
};
