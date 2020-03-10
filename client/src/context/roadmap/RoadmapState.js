import React, { useReducer } from "react";
import axios from "axios";

import roadmapReducer from "./roadmapReducer";
import RoadmapContext from "./roadmapContext";

import {
  GET_ROADMAPS,
  GET_ROADMAP,
  SET_LOADING_ROADMAP,
  ROADMAP_ERROR,
  RESET_ROADMAPS
} from "../types";

const RoadmapState = props => {
  const initialState = {
    roadmaps: {},
    roadmap: {},
    loading: false,
    error: null
  };

  const [state, dispatch] = useReducer(roadmapReducer, initialState);

  // Get roadmaps
  const getRoadmaps = async () => {
    try {
      setLoading();

      const res = await axios.get("/api/roadmaps");

      dispatch({
        type: GET_ROADMAPS,
        payload: res.data
      });
    } catch (error) {
      dispatch({
        ROADMAP_ERROR,
        payload: error.response.data.error
      });
    }
  };

  // Get roadmap
  const getRoadmap = async id => {
    try {
      setLoading();

      const res = await axios.get(`/api/roadmaps/${id}`);

      dispatch({
        type: GET_ROADMAP,
        payload: res.data
      });
    } catch (error) {
      dispatch({
        ROADMAP_ERROR,
        payload: error.response.data.error
      });
    }
  };

  // Get roadmap data by populate
  const getRoadmapByPopulate = async id => {
    try {
      setLoading();

      const res = await axios.get(`/api/roadmaps/${id}/all`);

      dispatch({
        type: GET_ROADMAP,
        payload: res.data
      });
    } catch (error) {
      dispatch({
        ROADMAP_ERROR,
        payload: error.response.data.error
      });
    }
  };

  // Fetch all roadmaps by query param regex
  const getRoadmapsByRegex = async (text, select) => {
    try {
      setLoading();

      const res = await axios.get(
        `/api/roadmaps?${select}[regex]=${text}&${select}[options]=i`
      );

      dispatch({
        type: GET_ROADMAPS,
        payload: res.data
      });
    } catch (error) {
      dispatch({
        ROADMAP_ERROR,
        payload: error.response.data.error
      });
    }
  };

  // Create a new roadmap
  const createRoadmap = async formData => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      setLoading();

      await axios.post("/api/roadmaps", formData, config);

      return true;
    } catch (error) {
      dispatch({
        type: ROADMAP_ERROR,
        payload: error.response.data.error
      });
    }
  };

  // Update roadmap
  const updateRoadmap = async (id, formData, history) => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      setLoading();

      await axios.put(`/api/roadmaps/${id}`, formData, config);

      history.goBack();
    } catch (error) {
      dispatch({
        type: ROADMAP_ERROR,
        payload: error.response.data.error
      });
    }
  };

  // Set loading
  const setLoading = async () => {
    dispatch({
      type: SET_LOADING_ROADMAP
    });
  };

  // Reset roadmaps
  const resetRoadmaps = async () => {
    dispatch({
      type: RESET_ROADMAPS
    });
  };

  return (
    <RoadmapContext.Provider
      value={{
        roadmaps: state.roadmaps,
        roadmap: state.roadmap,
        loading: state.loading,
        error: state.error,
        getRoadmaps,
        getRoadmap,
        getRoadmapByPopulate,
        createRoadmap,
        updateRoadmap,
        resetRoadmaps,
        getRoadmapsByRegex
      }}
    >
      {props.children}
    </RoadmapContext.Provider>
  );
};

export default RoadmapState;
