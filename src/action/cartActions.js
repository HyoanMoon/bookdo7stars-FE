import api from '../utils/api';
import * as types from '../constants/cart.constants';

// 장바구니 아이템 추가.
const addToCart =
  ({ id, qty }) =>
  async (dispatch) => {};

// 장바구니 아이템 조회.
// const getCartList = () => async (dispatch) => {
//   try {
//     dispatch({ type: types.GET_CART_LIST_REQUEST });
//     const response = await api.get('/cart');
//     console.log('response', response);
//     if (response.status !== 200) throw new Error(response.error);
//     dispatch({ type: types.GET_CART_LIST_SUCCESS, payload: response.data.data });
//   } catch (error) {
//     dispatch({ type: types.GET_CART_LIST_FAIL, payload: error.message });
//   }
// };

const getCartList = () => async (dispatch) => {
  try {
    dispatch({ type: types.GET_CART_LIST_REQUEST });
    const response = await api.get('/cart');
    console.log('response', response);
    if (response.status !== 200) throw new Error(response.error);
    dispatch({ type: types.GET_CART_LIST_SUCCESS, payload: response.data.data });
  } catch (error) {
    dispatch({ type: types.GET_CART_LIST_FAIL, payload: error.message });
  }
};

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
