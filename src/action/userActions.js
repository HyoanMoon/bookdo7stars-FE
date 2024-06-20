import api from '../utils/api';
import * as types from '../constants/user.constants';

// 이메일 로그인.
const loginWithEmail = () => async (dispatch) => {};

// 구글 로그인.
const loginWithGoogle = () => async (dispatch) => {};

// 회원가입.
const registerUser = () => async (dispatch) => {};

// 토큰 로그인.
const loginWithToken = () => async (dispatch) => {}; // 변수 이름 token으로 해주세요.

// 로그아웃.
const logout = () => async (dispatch) => {};

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
