import React, { useReducer } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import AuthContext from "./authContext";
import authReducer from "./authReducer";

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
  CLEAR_ERRORS,
  LOGIN_FAIL,
  LOGOUT
} from "../types";

const cookie = new Cookies();

const AuthState = props => {
  const initialState = {
    token: cookie.get("token"),
    isAuthenticated: null,
    loading: true,
    user: null,
    info: null,
    error: null
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // Login User
  const login = async formData => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      const res = await axios.post("/api/auth/login", formData, config);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });

      loadUser();
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.error
      });
    }
  };

  // Register User
  const register = async formData => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      const res = await axios.post("/api/auth/register", formData, config);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });

      loadUser();
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.error
      });
    }
  };

  // Load User
  const loadUser = async () => {
    try {
      const res = await axios.get("/api/auth/me");

      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    } catch (err) {
      dispatch({ type: AUTH_ERROR });
    }
  };

  // Logout
  const logout = async () => {
    try {
      await axios.get("/api/auth/logout");

      dispatch({
        type: LOGOUT
      });
    } catch (err) {
      dispatch({
        type: LOGOUT,
        payload: err.response.data.error
      });
    }
  };

  // Clear all errors
  const clearErrors = async () => {
    dispatch({
      type: CLEAR_ERRORS
    });
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        info: state.info,
        register,
        loadUser,
        clearErrors,
        login,
        logout
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
