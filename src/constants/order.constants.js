// 주문 생성.
export const CREATE_ORDER_REQUEST = 'CREATE_ORDER_REQUEST';
export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_FAIL = 'CREATE_ORDER_FAIL';

// 내 주문 조회.
export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAIL = 'GET_ORDER_FAIL';

// 모든 주문 조회.
export const GET_ORDER_LIST_REQUEST = 'GET_ORDER_LIST_REQUEST';
export const GET_ORDER_LIST_SUCCESS = 'GET_ORDER_LIST_SUCCESS';
export const GET_ORDER_LIST_FAIL = 'GET_ORDER_LIST_FAIL';

// 주문 상태 업데이트.
export const UPDATE_ORDER_REQUEST = 'UPDATE_ORDER_REQUEST';
export const UPDATE_ORDER_SUCCESS = 'UPDATE_ORDER_SUCCESS';
export const UPDATE_ORDER_FAIL = 'UPDATE_ORDER_FAIL';

// 주문 상태.
export const ORDER_STATUS = ['preparing', 'shipping', 'delivered', 'refund'];

// 도서 수정할 때 주문 id값 불러오기.
export const SET_SELECTED_ORDER = 'SET_SELECTED_ORDER';

//도서 주문시 배송 정보 지역 선택.
export const SET_FULL_ADDRESS = 'SET_FULL_ADDRESS';
export const SET_DELIVERY_INFO = 'SET_DELIVERY_INFO';

export const badgeBg = {
  // 아래 항목을 채워주세요.
  // preparing:
  // shipping:
  // refund:
  // delivered:
};
