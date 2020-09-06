import React from "react";
import PropTypes from "prop-types";
import { SyncLoader } from "react-spinners";
import { Button } from "reactstrap";

const ConfirmButton = ({
  onClick,
  loading,
  color,
  size,
  className,
  type,
  message
}) => {
  return (
    <Button
      disabled={loading}
      color={color}
      type={type}
      onClick={onClick}
      size={size}
      className={className}
    >
      {loading ? (
        <SyncLoader size={5} margin={2} color="white" />
      ) : message ? (
        message
      ) : (
        "Guardar"
      )}
    </Button>
  );
};

ConfirmButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  size: PropTypes.string.isRequired
};

ConfirmButton.defaultProps = {
  color: "primary",
  className: "m-1",
  size: "sm",
  type: "submit"
};

export default ConfirmButton;
