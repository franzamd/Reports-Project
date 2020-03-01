import React, { useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";

import AuthContext from "../context/auth/authContext";

import AdminLayout from "./AdminLayout";

const FullLayout = props => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, loading, user } = authContext;

  useEffect(() => {
    authContext.loadUser();
  }, []);

  useEffect(() => {
    // Check if user are blocked
    if (!loading) {
      if (user && user.data && !user.data.state) {
        authContext.logout();
      }
    }
  }, [loading]);

  if (!isAuthenticated && !loading) {
    return <Redirect to="/auth/login"></Redirect>;
  }

  return (
    <React.Fragment>
      {isAuthenticated && !loading && <AdminLayout {...props} />}
    </React.Fragment>
  );
};

export default FullLayout;
