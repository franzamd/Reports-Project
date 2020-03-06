import React from "react";
import PropTypes from "prop-types";
import { FormGroup, Input } from "reactstrap";

const SelectListGroup = ({
  options,
  label,
  multiple,
  disabled,
  name,
  value,
  onChange,
  error
}) => {
  const selectOptions = options.map(option => (
    <option key={option._id} value={option.value}>
      {option.label}
    </option>
  ));

  return (
    <FormGroup>
      <label className="form-control-label" htmlFor="input-name">
        {label}
      </label>
      <Input
        multiple={multiple}
        disabled={disabled}
        className="form-control-alternative"
        type="select"
        name={name}
        value={value}
        onChange={onChange}
      >
        {selectOptions}
      </Input>
      {error && (
        <div className="text-muted font-italic">
          <small className="text-danger">{error}</small>
        </div>
      )}
    </FormGroup>
  );
};

SelectListGroup.propTypes = {
  options: PropTypes.array.isRequired,
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.array,
  ]),
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string
};

SelectListGroup.defaultProps = {
  options: [],
  disabled: false,
  multiple: false,
  value: ''
};

export default SelectListGroup;
