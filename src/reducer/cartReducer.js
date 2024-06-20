import * as types from '../constants/cart.constants';
const initialState = {};

function cartReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case types.ADD_TO_CART_REQUEST:
      return {};
    default:
      return state;
  }
}

export default cartReducer;
