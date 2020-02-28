import React, { useReducer } from "react";
import axios from "axios";

import chauffeurReducer from "./chauffeurReducer";
import ChauffeurContext from "./chauffeurContext";

import {
  GET_CHAUFFEURS,
  GET_CHAUFFEUR,
  SET_LOADING_CHAUFFEUR,
  CHAUFFEURS_ERROR,
  RESET_CHAUFFEURS
} from "../types";

const ChauffeurState = props => {
  const initialState = {
    chauffeurs: {},
    chauffeur: {},
    loading: false,
    error: null
  };

  const [state, dispatch] = useReducer(chauffeurReducer, initialState);

  // Get Chauffeurs
  const getChauffeurs = async () => {
    try {
      setLoading();

      const res = await axios.get("/api/chauffeurs");

      dispatch({
        type: GET_CHAUFFEURS,
        payload: res.data
      });
    } catch (error) {
      dispatch({
        CHAUFFEURS_ERROR,
        payload: error.response.data.error
      });
    }
  };

  // Get Chauffeur
  const getChauffeur = async id => {
    try {
      setLoading();

      const res = await axios.get(`/api/chauffeurs/${id}`);

      dispatch({
        type: GET_CHAUFFEUR,
        payload: res.data
      });
    } catch (error) {
      dispatch({
        CHAUFFEURS_ERROR,
        payload: error.response.data.error
      });
    }
  };

  // Fetch all chauffeurs by query param regex
  const getChauffeursByRegex = async (text, select) => {
    try {
      setLoading();

      const res = await axios.get(
        `/api/chauffeurs?${select}[regex]=${text}&${select}[options]=i`
      );

      dispatch({
        type: GET_CHAUFFEURS,
        payload: res.data
      });
    } catch (error) {
      dispatch({
        CHAUFFEURS_ERROR,
        payload: error.response.data.error
      });
    }
  };

  // Create a new chauffeur
  const createChauffeur = async (formData, history) => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      setLoading();

      await axios.post("/api/chauffeurs", formData, config);

      history.goBack();
    } catch (error) {
      dispatch({
        type: CHAUFFEURS_ERROR,
        payload: error.response.data.error
      });
    }
  };

  // Update chauffeur
  const updateChauffeur = async (id, formData, history) => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      setLoading();

      await axios.put(`/api/chauffeurs/${id}`, formData, config);

      history.goBack();
    } catch (error) {
      dispatch({
        type: CHAUFFEURS_ERROR,
        payload: error.response.data.error
      });
    }
  };

  // Set loading
  const setLoading = async () => {
    dispatch({
      type: SET_LOADING_CHAUFFEUR
    });
  };

  // Reset Chauffeurs
  const resetChauffeurs = async => {
    dispatch({
      type: RESET_CHAUFFEURS
    });
  };

  return (
    <ChauffeurContext.Provider
      value={{
        chauffeurs: state.chauffeurs,
        chauffeur: state.chauffeur,
        loading: state.loading,
        error: state.error,
        getChauffeurs,
        getChauffeur,
        createChauffeur,
        updateChauffeur,
        resetChauffeurs,
        getChauffeursByRegex
      }}
    >
      {props.children}
    </ChauffeurContext.Provider>
  );
};

export default ChauffeurState;
