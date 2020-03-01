import React from "react";
import { Route } from "react-router-dom";
import indexRoutes from "../routes/index.jsx";

const Admin = props => {
  return (
    <React.Fragment>
      {indexRoutes.map((prop, key) => {
        return <Route path={prop.path} key={key} component={prop.component} />;
      })}
    </React.Fragment>
  );
};

export default Admin;
