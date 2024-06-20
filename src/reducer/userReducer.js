import * as types from '../constants/user.constants';
const initialState = {};

function userReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case types.USER_LOGIN_REQUEST:
      return {};
    default:
      return state;
  }
}

export default userReducer;
