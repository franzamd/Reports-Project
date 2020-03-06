import React from "react";
import PropTypes from "prop-types";
import { FormGroup, Input } from "reactstrap";

const InputGroup = ({
  label,
  disabled,
  placeholder,
  type,
  rows,
  name,
  value,
  onChange,
  error
}) => {
  return (
    <FormGroup>
      <label className="form-control-label" htmlFor="input-name">
        {label}
      </label>
      <Input
        disabled={disabled}
        className="form-control-alternative"
        placeholder={placeholder}
        type={type}
        rows={rows}
        name={name}
        value={value}
        onChange={onChange}
      />
      {error && (
        <div className="text-muted font-italic">
          <small className="text-danger">{error}</small>
        </div>
      )}
    </FormGroup>
  );
};

InputGroup.propTypes = {
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string
};

InputGroup.defaultProps = {
  type: "text",
  value: "",
  disabled: false,
  rows: 0,
  placeholder: "",
  onChange: e => e.preventDefault()
};

export default InputGroup;
