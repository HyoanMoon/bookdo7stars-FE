import * as types from '../constants/user.constants';
const initialState = {
  loading: false,
  user: null,
  error: '',
};

function userReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case types.USER_LOGIN_REQUEST:
    case types.REGISTER_USER_REQUEST:
    case types.GOOGLE_LOGIN_REQUEST:
    case types.LOGIN_WITH_TOKEN_REQUEST:
      return { ...state, loading: true };
    case types.USER_LOGIN_SUCCESS:
    case types.LOGIN_WITH_TOKEN_SUCCESS:
    case types.GOOGLE_LOGIN_SUCCESS:
      return { ...state, loading: false, user: payload, error: '' };
    case types.USER_LOGIN_FAIL:
    case types.REGISTER_USER_FAIL:
    case types.GOOGLE_LOGIN_FAIL:
      return { ...state, loading: false, error: payload };
    case types.USER_LOGOUT:
      return { ...state, user: null };
    case types.LOGIN_WITH_TOKEN_FAIL:
      return { ...state, loading: false };
    // case types.DELETE_ERROR:
    //   return { ...state, error: '' };
    default:
      return state;
  }
}

export default userReducer;
