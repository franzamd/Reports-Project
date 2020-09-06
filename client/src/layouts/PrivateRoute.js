import React, { useContext, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";

import AuthContext from "../context/auth/authContext";
import LadingPage from "../views/starter/LandingPage";

const PrivateRoute = ({ component: Component, ...rest }, props) => {
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

  return (
    <React.Fragment>
      {/* Landing Page */}
      {!isAuthenticated && !loading && (
        <React.Fragment>
          {/* Load first Landing Page */}
          <Route path="/" exact render={props => <LadingPage {...props} />} />

          {/* Once loaded return Landing Page */}
          <Redirect to="/"></Redirect>
        </React.Fragment>
      )}
      {
        <Route
          {...rest}
          render={props =>
            isAuthenticated && !loading && <Component {...props} user={user} />
          }
        />
      }
    </React.Fragment>
  );
};

export default PrivateRoute;
