import React from "react";
import { Route, Switch } from "react-router-dom";
import ThemeRoutes from "../routes/authRouting";

const LayoutAuth = props => {
  return (
    <div>
      {ThemeRoutes.map((prop, key) => {
        return (
          <Switch>
            <Route
              exact
              path={prop.path}
              component={prop.component}
              key={key}
            />
          </Switch>
        );
      })}
    </div>
  );
};

export default LayoutAuth;
