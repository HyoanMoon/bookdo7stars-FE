import * as types from '../constants/user.constants';
const initialState = {
  loading: false,
  user: null,
  error: null,
};

function userReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case types.USER_LOGIN_REQUEST:
      return { ...state, loading: true };
    case types.USER_LOGIN_SUCCESS:
      return { ...state, loading: false, user: payload };
    case types.USER_LOGIN_FAIL:
      return { ...state, loading: false, error: payload };
    case types.USER_LOGOUT:
      return { ...state, user: null };
    default:
      return state;
  }
}

export default userReducer;
