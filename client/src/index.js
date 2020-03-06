import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "./assets/scss/style.css";

import AuthLayout from "./layouts/AuthLayout";
import PrivateRoute from "./layouts/PrivateRoute";
import AdminLayout from "./layouts/AdminLayout";

// Data
import AuthState from "./context/auth/AuthState";
import ChauffeurState from "./context/chauffeur/ChauffeurState";
import VehicleState from "./context/vehicle/VehicleState";
import BusinessState from "./context/business/BusinessState";
import RoadmapState from "./context/roadmap/RoadmapState";

const App = () => {
  return (
    <RoadmapState>
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
    </RoadmapState>
  );
};

ReactDOM.render(<App></App>, document.getElementById("root"));
