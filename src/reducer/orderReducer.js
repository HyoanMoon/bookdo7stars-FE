import * as types from '../constants/order.constants';
const initialState = {
  loading: false,
  error: '',
  orderList: [],
  selectedOrder: '',
  fullAdress: '',
  deliveryInfo: '',
};

function orderReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case types.GET_ORDER_LIST_REQUEST:
    case types.UPDATE_ORDER_REQUEST:
      return { ...state, loading: true };
    case types.SET_SELECTED_ORDER:
      return { ...state, loading: false, error: '', selectedOrder: payload };
    case types.GET_ORDER_LIST_SUCCESS:
      return { ...state, loading: false, error: '', orderList: payload.orders };
    case types.UPDATE_ORDER_SUCCESS:
      return { ...state, loading: false, error: '' };
    case types.GET_ORDER_FAIL:
    case types.UPDATE_ORDER_FAIL:
      return { ...state, loading: false, error: payload };
    case types.SET_FULL_ADDRESS:
      return { ...state, fullAdress: payload };
    case types.SET_DELIVERY_INFO:
      return { ...state, deliveryInfo: payload };
    default:
      return state;
  }
}

export default orderReducer;
