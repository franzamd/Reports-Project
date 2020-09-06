import React from "react";
import { Redirect } from "react-router-dom";

function withParamsState(WrappedComponent) {
  return class withParamsComponent extends React.Component {
    render() {
      return this.props.location.state ? (
        <WrappedComponent {...this.props} />
      ) : (
        <Redirect to="/" />
      );
    }
  };
}

export default withParamsState;
