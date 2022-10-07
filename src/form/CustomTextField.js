import React from "react";
import TextField from "@mui/material/TextField";

export const CustomTextField = ({ value, onChange, label, type }, props) => {
  return (
    <TextField
      type={type}
      id="standard-basic"
      variant="standard"
      color="secondary"
      value={value}
      onChange={onChange}
      label={label}
    />
  );
};

// CustomTextField.defaultProps = {
//   type: "text",
//   id: "standard-basic",
//   variant: "standard",
//   color: "secondary"
// };
