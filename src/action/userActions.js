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
  } catch (error) {
    dispatch({ type: types.GOOGLE_LOGIN_FAIL, payload: error.error });
    dispatch(commonUiActions.showToastMessage(error.error, 'error'));
  }
};

// 회원가입.
const registerUser =
  ({ email, name, password }, Navigate) =>
  async (dispatch) => {
    try {
      dispatch({ type: types.REGISTER_USER_REQUEST });
      const Response = await api.post('/user', { email, name, password });
      if (Response.status !== 200) throw new Error(Response.error);
      dispatch({ type: types.REGISTER_USER_SUCCESS, payload: Response.data });
      dispatch(commonUiActions.showToastMessage('Registration completed successfully.', 'success'));
      Navigate('/login');
    } catch (error) {
      dispatch({ type: types.REGISTER_USER_FAIL, payload: error.error });
    }
  };

// 토큰 로그인.
const loginWithToken = () => async (dispatch) => {
  try {
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

export const userActions = {
  loginWithEmail,
  loginWithGoogle,
  registerUser,
  loginWithToken,
  logout,
  removeUser,
};
