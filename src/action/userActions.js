import api from '../utils/api';
import * as types from '../constants/user.constants';
import { commonUiActions } from './commonUiAction';

// 이메일 로그인.
const loginWithEmail = (payload) => async (dispatch) => {
  try {
    dispatch({ type: types.USER_LOGIN_REQUEST });
    const response = await api.post('/auth/login', payload);
    // console.log('response', response.data);
    dispatch({ type: types.USER_LOGIN_SUCCESS, payload: response.data });
    dispatch(commonUiActions.showToastMessage('로그인을 성공하셨습니다!', 'success'));

    sessionStorage.setItem('token', response.data.token);
  } catch (error) {
    dispatch({ type: types.USER_LOGIN_FAIL, payload: error });
    dispatch(commonUiActions.showToastMessage(error.message, 'error'));
  }
};

// 구글 로그인.
const loginWithGoogle = (token) => async (dispatch) => {
  console.log('토큰 잘 들어와? ', token);
  try {
    dispatch({ type: types.GOOGLE_LOGIN_REQUEST });
    const response = await api.post('/auth/google', { token });
    if (response.status !== 200) throw new Error(response.error);
    sessionStorage.setItem('token', response.data.token);
    dispatch({ type: types.GOOGLE_LOGIN_SUCCESS, payload: response.data });
    dispatch(commonUiActions.showToastMessage('Google login successful!', 'success'));
  } catch (error) {
    dispatch({ type: types.GOOGLE_LOGIN_FAIL, payload: error.error });
    dispatch(commonUiActions.showToastMessage(error.error, 'error'));
  }
};

// 회원가입.
const registerUser =
  ({ email, userName, password, role, level, address, phone }, Navigate) =>
  async (dispatch) => {
    try {
      dispatch({ type: types.REGISTER_USER_REQUEST });
      const Response = await api.post('/user', { email, userName, password, role, level, address, phone });
      if (Response.status !== 200) throw new Error(Response.error);
      dispatch({ type: types.REGISTER_USER_SUCCESS, payload: Response.data });
      dispatch(commonUiActions.showToastMessage('Registration completed successfully.', 'success'));
      Navigate('/login');
    } catch (error) {
      dispatch({ type: types.REGISTER_USER_FAIL, payload: error.error });
    }
  };
// 어드민 대쉬보드에서 어드민 계정 생성
const registerAdmin =
  ({ email, userName, password, role }) =>
  async (dispatch) => {
    try {
      dispatch({ type: types.REGISTER_USER_REQUEST });
      const Response = await api.post('/user', { email, userName, password, role });
      if (Response.status !== 200) throw new Error(Response.error);
      dispatch({ type: types.REGISTER_USER_SUCCESS, payload: Response.data });
      dispatch(commonUiActions.showToastMessage('Registration completed successfully.', 'success'));
    } catch (error) {
      dispatch({ type: types.REGISTER_USER_FAIL, payload: error.error });
    }
  };

// 토큰 로그인.
const loginWithToken = () => async (dispatch) => {
  try {
    const token = sessionStorage.getItem('token');
    if (!token) {
      return;
    }
    dispatch({ type: types.LOGIN_WITH_TOKEN_REQUEST });
    const response = await api.get('/user/me');
    if (response.status !== 200) throw new Error(response.data.message);
    dispatch({ type: types.LOGIN_WITH_TOKEN_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: types.LOGIN_WITH_TOKEN_FAIL, payload: error });
    dispatch(logout());
  }
}; // 변수 이름 token으로 해주세요.

// 로그아웃.
const logout = () => async (dispatch) => {
  try {
    dispatch({ type: types.USER_LOGOUT });
    sessionStorage.removeItem('token');
  } catch (error) {}
};

// 회원 탈퇴.
const removeUser = () => async (dispatch) => {};

// 어드민 대쉬보드에서 관리자를 get 해서 보여주기
const adminUser = () => async (dispatch) => {
  try {
    dispatch({ type: types.GET_ADMIN_REQUEST });
    const response = await api.get('/user/admin');
    console.log('response for admin', response);
    if (response.status !== 200) throw new Error(response.data.message);
    dispatch({ type: types.GET_ADMIN_SUCCESS, payload: response.data.users });
    dispatch(getAllUser());
  } catch (error) {
    dispatch({ type: types.GET_ADMIN_FAIL });
  }
};

// 어드민 대쉬보드에서 모든 유저를 get 해서 보여주기
const getAllUser = () => async (dispatch) => {
  try {
    dispatch({ type: types.GET_All_USERS_REQUEST });
    const response = await api.get('/user/all');
    console.log('response for user', response);
    if (response.status !== 200) throw new Error(response.data.message);
    dispatch({ type: types.GET_All_USERS_SUCCESS, payload: response.data.users });
  } catch (error) {
    dispatch({ type: types.GET_All_USERS_FAIL });
  }
};

const updateUserLevel = (id, level) => async (dispatch) => {
  try {
    dispatch({ type: types.USER_LEVEL_EDIT_REQUEST });

    const response = await api.put(`/user/${id}`, { level }); // PUT 요청으로 변경
    console.log('response for user', response);

    if (response.status !== 200) throw new Error(response.data.message);

    dispatch({ type: types.USER_LEVEL_EDIT_SUCCESS, payload: response.data.user });
  } catch (error) {
    dispatch({ type: types.USER_LEVEL_EDIT_FAIL, payload: error.message });
  }
};

export const userActions = {
  loginWithEmail,
  loginWithGoogle,
  registerUser,
  loginWithToken,
  logout,
  removeUser,
  adminUser,
  registerAdmin,
  getAllUser,
  updateUserLevel,
};
