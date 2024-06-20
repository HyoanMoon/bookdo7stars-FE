import * as types from '../constants/order.constants';
const initialState = {};

function orderReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case types.CREATE_ORDER_REQUEST:
      return {};
    default:
      return state;
  }
}

export default orderReducer;
