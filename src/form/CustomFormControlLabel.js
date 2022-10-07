import React from "react";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";

export const CustomFormControlLabel = ({ key, value, label, checked, onChange }) => {
  return (
    <FormControlLabel
      key={key}
      value={value}
      label={label}
      checked={checked}
      onChange={onChange}
      control={<Radio size="small" />}
    />
  );
};
