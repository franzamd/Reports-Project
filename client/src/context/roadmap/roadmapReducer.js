import {
  GET_ROADMAPS,
  GET_ROADMAP,
  SET_LOADING_TRUE_ROADMAP,
  SET_LOADING_FALSE_ROADMAP,
  ROADMAP_ERROR,
  RESET_ROADMAPS,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_ROADMAPS:
      return {
        ...state,
        roadmaps: action.payload,
        loading: false,
        error: null,
      };
    case GET_ROADMAP: {
      return {
        ...state,
        loading: false,
        roadmap: action.payload,
        error: null,
      };
    }
    case SET_LOADING_TRUE_ROADMAP:
      return {
        ...state,
        loading: true,
      };
    case SET_LOADING_FALSE_ROADMAP:
      return {
        ...state,
        loading: false,
      };
    case ROADMAP_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case RESET_ROADMAPS:
      return {
        roadmaps: {},
        roadmap: {},
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};
