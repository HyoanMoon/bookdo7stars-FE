import axios from 'axios';
import api from '../utils/api';

import * as types from '../constants/user.constants';
import { commonUiActions } from './commonUiAction';

const loginWithToken = () => async (dispatch) => {
  try {
    dispatch({ type: types.LOGIN_WITH_TOKEN_REQUEST });
    const response = await api.get('/user/me', {
      headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` },
    });
    if (response.status !== 200) throw new Error(response.data.message);
    dispatch({ type: types.LOGIN_WITH_TOKEN_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: types.LOGIN_WITH_TOKEN_FAIL, payload: error });
    dispatch(logout());
  }
};

const loginWithEmail = (payload) => async (dispatch) => {
  try {
    dispatch({ type: types.USER_LOGIN_REQUEST });
    const response = await api.post('/auth/login', payload);
    dispatch({ type: types.USER_LOGIN_SUCCESS, payload: response.data });
    dispatch(commonUiActions.showToastMessage('로그인을 성공하셨습니다!', 'success'));
    sessionStorage.setItem('token', response.data.token);
  } catch (error) {
    dispatch({ type: types.USER_LOGIN_FAIL, payload: error.message });
    dispatch(commonUiActions.showToastMessage(error.message, 'error'));
  }
};

const loginWithGoogle = (token) => async (dispatch) => {
  try {
    dispatch({ type: types.GOOGLE_LOGIN_REQUEST });
    const response = await api.post('/auth/google', { token });
    dispatch({ type: types.GOOGLE_LOGIN_SUCCESS, payload: response.data });
    sessionStorage.setItem('token', response.data.token);
    dispatch(commonUiActions.showToastMessage('Google login successful!', 'success'));
  } catch (error) {
    dispatch({ type: types.GOOGLE_LOGIN_FAIL, payload: error.message });
    dispatch(commonUiActions.showToastMessage(error.message, 'error'));
  }
};

const loginWithKakao = (code, navigate) => async (dispatch) => {
  try {
    dispatch({ type: types.KAKAO_LOGIN_REQUEST });
    const response = await api.get('/auth/kakao', { params: { code } });
    dispatch({ type: types.KAKAO_LOGIN_SUCCESS, payload: response.data });
    sessionStorage.setItem('token', response.data.token);
    dispatch(loginWithToken());
    navigate('/');
    dispatch(commonUiActions.showToastMessage('Kakao login successful!', 'success'));
  } catch (error) {
    dispatch({ type: types.KAKAO_LOGIN_FAIL, payload: error.message });
    dispatch(commonUiActions.showToastMessage(error.message, 'error'));
  }
};

const loginWithGithub = (code, navigate) => async (dispatch) => {
  try {
    dispatch({ type: types.GITHUB_LOGIN_REQUEST });
    const response = await api.get('/auth/github', { params: { code } });
    console.log('[github ]-->', response.data);
    dispatch({ type: types.GITHUB_LOGIN_SUCCESS, payload: response.data });
    sessionStorage.setItem('token', response.data.token);
    dispatch(loginWithToken());
    navigate('/');
    dispatch(commonUiActions.showToastMessage('GitHub login successful!', 'success'));
  } catch (error) {
    dispatch({ type: types.GITHUB_LOGIN_FAIL, payload: error.message });
    dispatch(commonUiActions.showToastMessage(error.message, 'error'));
  }
};

const registerUser =
  ({ email, userName, password, role, level, address, phone }, navigate) =>
  async (dispatch) => {
    try {
      dispatch({ type: types.REGISTER_USER_REQUEST });
      const response = await api.post('/user', { email, userName, password, role, level, address, phone });
      dispatch({ type: types.REGISTER_USER_SUCCESS, payload: response.data });
      dispatch(commonUiActions.showToastMessage('Registration completed successfully.', 'success'));
      navigate('/login');
    } catch (error) {
      dispatch({ type: types.REGISTER_USER_FAIL, payload: error.message });
    }
  };

const logout = () => async (dispatch) => {
  try {
    dispatch({ type: types.USER_LOGOUT });
    sessionStorage.removeItem('token');
  } catch (error) {}
};

export const userActions = {
  loginWithToken,
  loginWithEmail,
  loginWithGoogle,
  loginWithKakao,
  loginWithGithub,
  registerUser,
  logout,
};
