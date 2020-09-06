import {
  GET_USERS,
  GET_USER,
  SET_LOADING_USER,
  USER_ERROR,
  RESET_USERS
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false,
        error: null
      };
    case GET_USER: {
      return {
        ...state,
        loading: false,
        user: action.payload,
        error: null
      };
    }
    case SET_LOADING_USER:
      return {
        ...state,
        loading: true
      };
    case USER_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case RESET_USERS:
      return {
        users: {},
        user: {},
        loading: false,
        error: null
      };
    default:
      return state;
  }
};
