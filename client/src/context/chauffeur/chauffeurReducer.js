import {
  GET_CHAUFFEURS,
  GET_CHAUFFEUR,
  SET_LOADING_CHAUFFEUR,
  CHAUFFEURS_ERROR,
  RESET_CHAUFFEURS
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_CHAUFFEURS:
      return {
        ...state,
        chauffeurs: action.payload,
        loading: false,
        error: null
      };
    case GET_CHAUFFEUR: {
      return {
        ...state,
        loading: false,
        chauffeur: action.payload,
        error: null
      };
    }
    case SET_LOADING_CHAUFFEUR:
      return {
        ...state,
        loading: true
      };
    case CHAUFFEURS_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case RESET_CHAUFFEURS:
      return {
        chauffeurs: {},
        chauffeur: {},
        loading: false,
        error: null
      };
    default:
      return state;
  }
};
