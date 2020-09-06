import {
  GET_BUSINESS,
  GET_BUSINESS_ID,
  SET_LOADING_BUSINESS,
  BUSINESS_ERROR,
  RESET_BUSINESS
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_BUSINESS:
      return {
        ...state,
        business: action.payload,
        loading: false,
        error: null
      };
    case GET_BUSINESS_ID: {
      return {
        ...state,
        loading: false,
        businessSelected: action.payload,
        error: null
      };
    }
    case SET_LOADING_BUSINESS:
      return {
        ...state,
        loading: true
      };
    case BUSINESS_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case RESET_BUSINESS:
      return {
        business: {},
        businessSelected: {},
        loading: false,
        error: null
      };
    default:
      return state;
  }
};
