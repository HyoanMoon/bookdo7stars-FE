import * as types from '../constants/comment.constans';

const initialState = {
  comments: [],
  loading: false,
  error: null,
};

export default function commentReducer(state = initialState, action) {
  switch (action.type) {
    case types.CREATE_COMMENT_REQUEST:
    case types.GET_COMMENT_LIST_REQUEST:
    case types.DELETE_COMMENT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.CREATE_COMMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        comments: [...state.comments, action.payload],
      };
    case types.GET_COMMENT_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        comments: action.payload,
      };
    case types.DELETE_COMMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        comments: state.comments.filter((comment) => comment._id !== action.payload),
      };
    case types.CREATE_COMMENT_FAIL:
    case types.GET_COMMENT_LIST_FAIL:
    case types.DELETE_COMMENT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
