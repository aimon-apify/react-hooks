import React, { lazy } from "react";
import { types } from "../App";
import Button from "@mui/material/Button";
import RadioGroup from "@mui/material/RadioGroup";
import FormLabel from "@mui/material/FormLabel";
import styles from "./style.module.css";
import { useFormik } from "formik";

const CustomTextField = lazy(() =>
  import("../form/CustomTextField").then((module) => ({ default: module.CustomTextField }))
);
const CustomFormControlLabel = lazy(() =>
  import("../form/CustomFormControlLabel").then((module) => ({ default: module.CustomFormControlLabel }))
);

const initialValues = {
  name: "",
  age: "",
  address: "",
  maritalStatus: "",
};

const onSubmit = (values) => {
  console.log("formdata", values);
};

const validate = (values) => {
  let errors = {};
  if (!values.name) {
    errors.name = "Required";
  }
  if (!values.age) {
    errors.age = "Required";
  }
  if (!values.address) {
    errors.address = "Required";
  }
  if (!values.maritalStatus) {
    errors.maritalStatus = "Required";
  }
  return errors;
};

// export const Form = ({ formik, formData, onSubmit, dispatch, editMode, isChanged }) => {
export const Form = () => {
  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });

  console.log(formik.errors);

  return (
    <div className={styles.formWrapper}>
      <form onSubmit={formik.handleSubmit} className={styles.submit}>
        <CustomTextField
          value={formik.values.name}
          onChange={formik.handleChange}
          label="Name"
          placeholder="Name"
          name="name"
        />
        <CustomTextField
          type="number"
          value={formik.values.age}
          onChange={formik.handleChange}
          label="Age"
          placeholder="Age"
          name="age"
        />
        <CustomTextField
          value={formik.values.address}
          onChange={formik.handleChange}
          label="Address"
          placeholder="Address"
          name="address"
        />

        <div className={styles.married}>
          <FormLabel>Are you single or married?</FormLabel>
          <RadioGroup name="maritalStatus">
            <div className={styles.gender}>
              <CustomFormControlLabel
                key="single"
                value="Single"
                label="Single"
                checked={formik.values.maritalStatus === "Single"}
                onChange={formik.handleChange}
              />
              <CustomFormControlLabel
                key="married"
                value="Married"
                label="Married"
                checked={formik.values.maritalStatus === "Married"}
                onChange={formik.handleChange}
              />
            </div>
          </RadioGroup>
        </div>
        <Button
          size="medium"
          type="submit"
          variant="contained"
          // disabled={!isChanged}
          className={styles.send}
          sx={{ display: "flex", justifyContent: "center", marginLeft: "31%" }}
        >
          Save
          {/* {editMode ? "Update" : "Save"} */}
        </Button>
      </form>

      {/* <form onSubmit={onSubmit} className={styles.submit}>
        <CustomTextField value={formData.name} onChange={formik.handleFormChange("name")} label="Name" placeholder="Name" />
        <CustomTextField type="number" value={formData.age} onChange={formik.handleFormChange("age")} label="Age" placeholder="Age" />
        <CustomTextField value={formData.address} onChange={formik.handleFormChange("address")} label="Address" placeholder="Address" />

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
      </form> */}
    </div>
  );
};
