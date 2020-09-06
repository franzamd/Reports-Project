import React from "react";
import PropTypes from "prop-types";
import { FormGroup, Input } from "reactstrap";
import moment from "moment";
import "moment/locale/es";

moment.locale("es");

const DateFieldGroup = ({ label, name, value, onChange }) => {
  return (
    <FormGroup>
      <label className="form-control-label" htmlFor="input-name">
        {label}
      </label>
      <Input
        disabled={true}
        className="form-control-alternative"
        type="text"
        name={name}
        value={value ? moment(value).format("DD MMMM YYYY, h:mm:ss a") : ""}
        onChange={onChange}
      />
    </FormGroup>
  );
};

DateFieldGroup.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string])
    .isRequired,
  onChange: PropTypes.func.isRequired
};

DateFieldGroup.defaultProps = {
  value: "",
  onChange: e => e.preventDefault()
};

export default DateFieldGroup;
