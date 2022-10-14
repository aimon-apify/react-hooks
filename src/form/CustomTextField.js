import React from "react";
import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";

export const CustomTextField = ({ type, id, variant, color, placeholder, value, onChange, label, name }) => {
  return (
    <TextField
      type={type}
      id={id}
      variant={variant}
      color={color}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      label={label}
      name={name}
    />
  );
};

CustomTextField.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  variant: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  // value: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

CustomTextField.defaultProps = {
  type: "text",
  id: "standard-basic",
  variant: "standard",
  color: "secondary",
};
