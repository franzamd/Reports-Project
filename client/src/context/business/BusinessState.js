import React, { useReducer } from "react";
import axios from "axios";

import chauffeurReducer from "./businessReducer";
import BusinessContext from "./businessContext";

import {
  GET_BUSINESS,
  GET_BUSINESS_ID,
  SET_LOADING_BUSINESS,
  BUSINESS_ERROR,
  RESET_BUSINESS
} from "../types";

const BusinessState = props => {
  const initialState = {
    business: {},
    businessSelected: {},
    loading: false,
    error: null
  };

  const [state, dispatch] = useReducer(chauffeurReducer, initialState);

  // Get business
  const getBusiness = async () => {
    try {
      setLoading();

      const res = await axios.get("/api/business");

      dispatch({
        type: GET_BUSINESS,
        payload: res.data
      });
    } catch (error) {
      dispatch({
        BUSINESS_ERROR,
        payload: error.response.data.error
      });
    }
  };

  // Get business by id
  const getBusinessById = async id => {
    try {
      setLoading();

      const res = await axios.get(`/api/business/${id}`);

      dispatch({
        type: GET_BUSINESS_ID,
        payload: res.data
      });
    } catch (error) {
      dispatch({
        BUSINESS_ERROR,
        payload: error.response.data.error
      });
    }
  };

  // Fetch all business by query param regex
  const getBusinessByRegex = async (text, select) => {
    try {
      setLoading();

      const res = await axios.get(
        `/api/business?${select}[regex]=${text}&${select}[options]=i`
      );

      dispatch({
        type: GET_BUSINESS_ID,
        payload: res.data
      });
    } catch (error) {
      dispatch({
        BUSINESS_ERROR,
        payload: error.response.data.error
      });
    }
  };

  // Create a new business
  const createBusiness = async (formData, history) => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      setLoading();

      await axios.post("/api/business", formData, config);

      history.goBack();
    } catch (error) {
      dispatch({
        type: BUSINESS_ERROR,
        payload: error.response.data.error
      });
    }
  };

  // Create a new manager for business
  const createManager = async (id, formData, history) => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      setLoading();

      await axios.post(`/api/business/${id}/managers`, formData, config);

      history.push({
        pathname: "/business/managers",
        state: { _id: id }
      });
    } catch (error) {
      dispatch({
        type: BUSINESS_ERROR,
        payload: error.response.data.error
      });
    }
  };

  // Update business
  const updateBusiness = async (id, formData, history) => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      setLoading();

      await axios.put(`/api/business/${id}`, formData, config);

      history.goBack();
    } catch (error) {
      dispatch({
        type: BUSINESS_ERROR,
        payload: error.response.data.error
      });
    }
  };

  // Update business for business
  const updateManager = async (id, managerId, formData, history) => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      setLoading();

      await axios.put(
        `/api/business/${id}/managers/${managerId}`,
        formData,
        config
      );

      history.push({
        pathname: "/business/managers",
        state: { _id: id }
      });
    } catch (error) {
      dispatch({
        type: BUSINESS_ERROR,
        payload: error.response.data.error
      });
    }
  };

  // Set loading
  const setLoading = async () => {
    dispatch({
      type: SET_LOADING_BUSINESS
    });
  };

  // Reset business
  const resetBusiness = async => {
    dispatch({
      type: RESET_BUSINESS
    });
  };

  return (
    <BusinessContext.Provider
      value={{
        business: state.business,
        businessSelected: state.businessSelected,
        loading: state.loading,
        error: state.error,
        getBusiness,
        getBusinessById,
        createBusiness,
        updateBusiness,
        createManager,
        updateManager,
        resetBusiness,
        getBusinessByRegex
      }}
    >
      {props.children}
    </BusinessContext.Provider>
  );
};

export default BusinessState;
