import React, { useReducer } from "react";
import axios from "axios";

import vehicleReducer from "./vehicleReducer";
import VehicleContext from "./vehicleContext";

import {
  GET_VEHICLES,
  GET_VEHICLE,
  SET_LOADING_VEHICLE,
  VEHICLE_ERROR,
  RESET_VEHICLES
} from "../types";

const VehicleState = props => {
  const initialState = {
    vehicles: {},
    vehicle: {},
    loading: false,
    error: null
  };

  const [state, dispatch] = useReducer(vehicleReducer, initialState);

  // Get vehicles
  const getVehicles = async () => {
    try {
      setLoading();

      const res = await axios.get("/api/vehicles");

      dispatch({
        type: GET_VEHICLES,
        payload: res.data
      });
    } catch (error) {
      dispatch({
        VEHICLE_ERROR,
        payload: error.response.data.error
      });
    }
  };

  // Get vehicles by state
  const getVehiclesByState = async state => {
    try {
      setLoading();

      const res = await axios.get(`/api/vehicles?[state]=${state}`);

      dispatch({
        type: GET_VEHICLES,
        payload: res.data
      });
    } catch (error) {
      dispatch({
        VEHICLE_ERROR,
        payload: error.response.data.error
      });
    }
  };

  // Get vehicle
  const getVehicle = async id => {
    try {
      setLoading();

      const res = await axios.get(`/api/vehicles/${id}`);

      dispatch({
        type: GET_VEHICLE,
        payload: res.data
      });
    } catch (error) {
      dispatch({
        VEHICLE_ERROR,
        payload: error.response.data.error
      });
    }
  };

  // Fetch all vehicles by query param regex
  const getVehiclesByRegex = async (text, select) => {
    try {
      setLoading();

      const res = await axios.get(
        `/api/vehicles?${select}[regex]=${text}&${select}[options]=i`
      );

      dispatch({
        type: GET_VEHICLES,
        payload: res.data
      });
    } catch (error) {
      dispatch({
        VEHICLE_ERROR,
        payload: error.response.data.error
      });
    }
  };

  // Create a new vehicle
  const createVehicle = async (formData, history) => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      setLoading();

      await axios.post("/api/vehicles", formData, config);

      history.goBack();
    } catch (error) {
      dispatch({
        type: VEHICLE_ERROR,
        payload: error.response.data.error
      });
    }
  };

  // Update vehicle
  const updateVehicle = async (id, formData, history) => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      setLoading();

      await axios.put(`/api/vehicles/${id}`, formData, config);

      history.goBack();
    } catch (error) {
      dispatch({
        type: VEHICLE_ERROR,
        payload: error.response.data.error
      });
    }
  };

  // Set loading
  const setLoading = async () => {
    dispatch({
      type: SET_LOADING_VEHICLE
    });
  };

  // Reset vehicles
  const resetVehicles = async => {
    dispatch({
      type: RESET_VEHICLES
    });
  };

  return (
    <VehicleContext.Provider
      value={{
        vehicles: state.vehicles,
        vehicle: state.vehicle,
        loading: state.loading,
        error: state.error,
        getVehicles,
        getVehiclesByState,
        getVehicle,
        createVehicle,
        updateVehicle,
        resetVehicles,
        getVehiclesByRegex
      }}
    >
      {props.children}
    </VehicleContext.Provider>
  );
};

export default VehicleState;
