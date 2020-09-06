import {
  GET_VEHICLES,
  GET_VEHICLE,
  SET_LOADING_VEHICLE,
  VEHICLE_ERROR,
  RESET_VEHICLES
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_VEHICLES:
      return {
        ...state,
        vehicles: action.payload,
        loading: false,
        error: null
      };
    case GET_VEHICLE: {
      return {
        ...state,
        loading: false,
        vehicle: action.payload,
        error: null
      };
    }
    case SET_LOADING_VEHICLE:
      return {
        ...state,
        loading: true
      };
    case VEHICLE_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case RESET_VEHICLES:
      return {
        vehicles: {},
        vehicle: {},
        loading: false,
        error: null
      };
    default:
      return state;
  }
};
