import React, { lazy, Suspense, useRef, useMemo, useReducer, useState, useCallback } from "react";
import Typography from "@mui/material/Typography";
import _ from "lodash";

const Form = lazy(() => import('./components/Form').then((module) => ({ default: module.Form })));
const TableData = lazy(() => import('./components/TableData').then((module) => ({ default: module.TableData })));

export const types = {
  ON_EDIT_FORM: "ON_EDIT_FORM",
  HANDLE_FORM_CHANGE: "HANDLE_FORM_CHANGE",
  RESET_FORM: "RESET_FORM",
};

const initialState = { name: "", age: "", maritalStatus: "" };

function reducer(state, action) {
  switch (action.type) {
    case types.ON_EDIT_FORM: {
      return { ...state, ...action.payload };
    }
    case types.HANDLE_FORM_CHANGE: {
      const { name, value } = action.payload;
      return { ...state, [name]: value };
    }
    case types.RESET_FORM: {
      return { ...initialState };
    }
    default: {
      return { ...state };
    }
  }
}

function App() {
  const prevFormData = useRef({});
  const [ind, setInd] = useState(null);
  const [data, setData] = useState([{ name: "John", age: 34, maritalStatus: "Single" }]);
  const [form, dispatch] = useReducer(reducer, initialState);

  const editMode = useMemo(() => typeof ind === "number", [ind]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.age || !form.maritalStatus) return alert(`Form is not properly filled.`);

    if (editMode) {
      setData((_data) => {
        _data[ind] = form;
        return [..._data];
      });
      setInd(null);
    } else {
      setData((_data) => _data.concat.apply(_data, [form]));
    }

    dispatch({ type: types.RESET_FORM });
  };

  const handleUpdate = (index) => {
    setInd(index);
    const payload = data[index];
    prevFormData.current = payload;
    dispatch({ type: types.ON_EDIT_FORM, payload });
  };

  const handleDelete = useCallback((index) => setData((_data) => _data.filter((_, i) => index !== i)), [setData]);

  const isFormChanged = useMemo(() => {
    if (!editMode) return true;

    return !_.isEqual(prevFormData.current, form);
  }, [editMode, prevFormData.current, form]);

  return (
    <div className="App">
      <Typography variant="h2" component="h2" sx={{ marginTop: "2.5rem", textAlign: "center" }}>
        Records
      </Typography>
      <Suspense fallback={<div>loading...</div>}>
        <Form formData={form} onSubmit={handleSubmit} dispatch={dispatch} editMode={editMode} isChanged={isFormChanged} />
        <TableData data={data} handleUpdate={handleUpdate} handleDelete={handleDelete} index={ind} />
      </Suspense>
    </div>
  );
}

export default App;
