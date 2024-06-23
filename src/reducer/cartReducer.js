import * as types from '../constants/cart.constants';

const initialState = {
  loading: false,
  error: '',
  cartList: [],
  selectedItem: {},
  cartItemCount: 0,
  totalPrice: 0,
  user: {},
};

function cartReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case types.ADD_TO_CART_REQUEST:
    case types.GET_CART_LIST_REQUEST:
      return { ...state, loading: true };

    case types.GET_CART_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        cartList: payload.items,
        user: payload.user,
        totalPrice: payload.items.reduce((total, item) => total + item.bookId.priceSales * item.qty, 0),
      };

    case types.GET_CART_LIST_FAIL:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
}

export default cartReducer;
