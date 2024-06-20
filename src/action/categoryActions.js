import api from '../utils/api';
import * as types from '../constants/category.constants';

// 카테고리 불러오기.
const getCategoryList = (query) => async (dispatch) => {
  try {
    dispatch({ type: types.CATEGORY_GET_REQUEST });
    const response = await api.get('/category', {
      params: { ...query },
    });
    console.log(response.data);
    dispatch({ type: types.CATEGORY_GET_SUCCESS, payload: response.data });
  } catch (err) {
    dispatch({ type: types.CATEGORY_GET_FAIL, payload: err });
    console.error(err);
  }
};

export const categoryActions = {
  getCategoryList,
};
