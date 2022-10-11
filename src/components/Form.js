import React, { lazy } from "react";
import { types } from "../App";
import Button from "@mui/material/Button";
import RadioGroup from "@mui/material/RadioGroup";
import FormLabel from "@mui/material/FormLabel";
import styles from "./style.module.css";

const CustomTextField = lazy(() =>
  import("../form/CustomTextField").then((module) => ({ default: module.CustomTextField }))
);
const CustomFormControlLabel = lazy(() =>
  import("../form/CustomFormControlLabel").then((module) => ({ default: module.CustomFormControlLabel }))
);

export const Form = ({ formData, onSubmit, dispatch, editMode, isChanged }) => {
  const handleFormChange =
    (name) =>
    ({ target: { value } }) => {
      dispatch({ type: types.HANDLE_FORM_CHANGE, payload: { name, value } });
    };

  return (
    <div className={styles.formWrapper}>
      <form onSubmit={onSubmit} className={styles.submit}>
        <CustomTextField value={formData.name} onChange={handleFormChange("name")} label="Name" placeholder="Name" />
        <CustomTextField type="number" value={formData.age} onChange={handleFormChange("age")} label="Age" placeholder="Age" />
        <CustomTextField value={formData.address} onChange={handleFormChange("address")} label="Address" placeholder="Address" />

        <div className={styles.married}>
          <FormLabel>Are you single or married?</FormLabel>
          <RadioGroup name="gender">
            <div className={styles.gender}>
              <CustomFormControlLabel
                key="single"
                value="Single"
                label="Single"
                checked={formData.maritalStatus === "Single"}
                onChange={handleFormChange("maritalStatus")}
              />
              <CustomFormControlLabel
                key="married"
                value="Married"
                label="Married"
                checked={formData.maritalStatus === "Married"}
                onChange={handleFormChange("maritalStatus")}
              />
            </div>
          </RadioGroup>
        </div>

        <Button
          size="medium"
          type="submit"
          variant="contained"
          disabled={!isChanged}
          className={styles.send}
          sx={{ display: "flex", justifyContent: "center", marginLeft: "31%" }}
        >
          {editMode ? "Update" : "Save"}
        </Button>
      </form>
    </div>
  );
};
