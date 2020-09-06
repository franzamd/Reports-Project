import React, { useReducer } from "react";
import axios from "axios";

import userReducer from "./userReducer";
import UserContext from "./userContext";

import {
  GET_USERS,
  GET_USER,
  SET_LOADING_USER,
  USER_ERROR,
  RESET_USERS
} from "../types";

const UserState = props => {
  const initialState = {
    users: {},
    user: {},
    loading: false,
    error: null
  };

  const [state, dispatch] = useReducer(userReducer, initialState);

  // Get User
  const getUsers = async () => {
    try {
      setLoading();

      const res = await axios.get("/api/users");

      dispatch({
        type: GET_USERS,
        payload: res.data
      });
    } catch (error) {
      dispatch({
        USER_ERROR,
        payload: error.response.data.error
      });
    }
  };

  // Get User
  const getUser = async id => {
    try {
      setLoading();

      const res = await axios.get(`/api/users/${id}`);

      dispatch({
        type: GET_USER,
        payload: res.data
      });
    } catch (error) {
      dispatch({
        USER_ERROR,
        payload: error.response.data.error
      });
    }
  };

  // Fetch all users by query param regex
  const getUsersByRegex = async (text, select) => {
    try {
      setLoading();

      const res = await axios.get(
        `/api/users?${select}[regex]=${text}&${select}[options]=i`
      );

      dispatch({
        type: GET_USERS,
        payload: res.data
      });
    } catch (error) {
      dispatch({
        USER_ERROR,
        payload: error.response.data.error
      });
    }
  };

  // Create a new user
  const createUser = async (formData, history) => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      setLoading();

      await axios.post("/api/users", formData, config);

      history.goBack();
    } catch (error) {
      dispatch({
        type: USER_ERROR,
        payload: error.response.data.error
      });
    }
  };

  // Update user
  const updateUser = async (id, formData, history) => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      setLoading();

      await axios.put(`/api/users/${id}`, formData, config);

      history.goBack();
    } catch (error) {
      dispatch({
        type: USER_ERROR,
        payload: error.response.data.error
      });
    }
  };

  // Update auth user
  const updateAuthUser = async (id, formData, history) => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      setLoading();

      await axios.put(`/api/users/${id}/auth`, formData, config);

      history.goBack();
    } catch (error) {
      dispatch({
        type: USER_ERROR,
        payload: error.response.data.error
      });
    }
  };

  // Set loading
  const setLoading = async () => {
    dispatch({
      type: SET_LOADING_USER
    });
  };

  // Reset User
  const resetUsers = async => {
    dispatch({
      type: RESET_USERS
    });
  };

  return (
    <UserContext.Provider
      value={{
        users: state.users,
        user: state.user,
        loading: state.loading,
        error: state.error,
        getUsers,
        getUser,
        createUser,
        updateUser,
        updateAuthUser,
        resetUsers,
        getUsersByRegex
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
