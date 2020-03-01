import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "./assets/scss/style.css";

// Data
import AuthState from "./context/auth/AuthState";
import ChauffeurState from "./context/chauffeur/ChauffeurState";
import VehicleState from "./context/vehicle/VehicleState";
import BusinessState from "./context/business/BusinessState";
import AdminLayout from "./layouts/AdminLayout";
import AuthLayout from "./layouts/AuthLayout";
import PrivateRoute from "./layouts/PrivateRoute";

const App = () => {
  return (
    <BusinessState>
      <VehicleState>
        <ChauffeurState>
          <AuthState>
            <BrowserRouter>
              <Switch>
                <Route
                  path="/auth"
                  render={props => <AuthLayout {...props} />}
                />
                <PrivateRoute path="/" component={AdminLayout} />
              </Switch>
            </BrowserRouter>
          </AuthState>
        </ChauffeurState>
      </VehicleState>
    </BusinessState>
  );
};

ReactDOM.render(<App></App>, document.getElementById("root"));
