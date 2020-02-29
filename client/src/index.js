import React from "react";
import ReactDOM from "react-dom";
import indexRoutes from "./routes/index.jsx";
import { Route, Switch } from "react-router-dom";
import { HashRouter } from "react-router-dom";

import "./assets/scss/style.css";

// Data
import AuthState from "./context/auth/AuthState";
import ChauffeurState from "./context/chauffeur/ChauffeurState";
import VehicleState from "./context/vehicle/VehicleState";
import BusinessState from "./context/business/BusinessState";

const App = () => {
  return (
    <BusinessState>
      <VehicleState>
        <ChauffeurState>
          <AuthState>
            <HashRouter>
              <Switch>
                {indexRoutes.map((prop, key) => {
                  return (
                    <Route
                      path={prop.path}
                      key={key}
                      component={prop.component}
                    />
                  );
                })}
              </Switch>
            </HashRouter>
          </AuthState>
        </ChauffeurState>
      </VehicleState>
    </BusinessState>
  );
};

ReactDOM.render(<App></App>, document.getElementById("root"));
