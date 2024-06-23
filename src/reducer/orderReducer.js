import * as types from '../constants/order.constants';
const initialState = {
  loading: false,
  error: '',
  selectedOrder: '',
};

function orderReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case types.SET_SELECTED_ORDER:
      return { ...state, loading: false, error: '', selectedOrder: payload };
    default:
      return state;
  }
}

export default orderReducer;
