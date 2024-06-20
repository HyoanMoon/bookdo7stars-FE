import api from '../utils/api';
import * as types from '../constants/user.constants';
import { Password } from '@mui/icons-material';
import { commonUiActions } from './commonUiAction';

// 이메일 로그인.
const loginWithEmail = (payload) => async (dispatch) => {
  try {
    dispatch({ type: types.USER_LOGIN_REQUEST });
    const response = await api.post('/auth/login', payload);
    console.log('response', response.data);
    dispatch({ type: types.USER_LOGIN_SUCCESS, payload: response.data });
    dispatch(commonUiActions.showToastMessage('로그인을 성공하셨습니다!', 'success'));

    sessionStorage.setItem('token', response.data.token);
  } catch (error) {
    dispatch({ type: types.USER_LOGIN_FAIL, payload: error });
    dispatch(commonUiActions.showToastMessage(error.message, 'error'));
  }
};

// 구글 로그인.
const loginWithGoogle = () => async (dispatch) => {};

// 회원가입.
const registerUser = () => async (dispatch) => {};

// 토큰 로그인.
const loginWithToken = () => async (dispatch) => {}; // 변수 이름 token으로 해주세요.

// 로그아웃.
const logout = () => async (dispatch) => {
  try {
    dispatch({ type: types.USER_LOGOUT });
    dispatch(commonUiActions.showToastMessage('로그아웃을 성공하셨습니다!', 'success'));
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
