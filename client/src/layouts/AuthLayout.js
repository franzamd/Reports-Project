import React from "react";
import { Route, Switch } from "react-router-dom";
import ThemeRoutes from "../routes/authRouting";

const AuthLayout = () => {
  return (
    <React.Fragment>
      <Switch>
        {ThemeRoutes.map((prop, key) => {
          return (
            <Route
              exact
              path={prop.path}
              component={prop.component}
              key={key}
            />
          );
        })}
      </Switch>
    </React.Fragment>
  );
};

export default AuthLayout;
