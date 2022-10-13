import React, { lazy, Suspense, useRef, useMemo, useReducer, useState, useCallback } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CustomModal from "./components/modal.component";
import useDebounce from "./hooks/useDebounce";
import Search from "./components/Search";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
import "./index.css";

const Form = lazy(() => import("./components/Form").then((module) => ({ default: module.Form })));
const TableData = lazy(() => import("./components/TableData").then((module) => ({ default: module.TableData })));

export const types = {
  ON_EDIT_FORM: "ON_EDIT_FORM",
  HANDLE_FORM_CHANGE: "HANDLE_FORM_CHANGE",
  RESET_FORM: "RESET_FORM",
};

const initialState = { name: "", age: "", address: "", maritalStatus: "" };

function reducer(state, action) {
  switch (action.type) {
    case types.ON_EDIT_FORM: {
      return { ...state, ...action.payload };
    }
    case types.HANDLE_FORM_CHANGE: {
      const { name, value } = action.payload;
      return { ...state, id: uuidv4(), [name]: value };
    }
    case types.RESET_FORM: {
      return { ...initialState };
    }
    default: {
      return { ...state };
    }
  }
}

const initialData = [
  { id: uuidv4(), name: "John", age: 34, address: "Karachi", maritalStatus: "Single" },
  { id: uuidv4(), name: "Sara", age: 90, address: "USA", maritalStatus: "Married" },
  { id: uuidv4(), name: "Farrukh", age: 50, address: "Nepal", maritalStatus: "Single" },
  { id: uuidv4(), name: "Javed", age: 59, address: "Karachi", maritalStatus: "Single" },
];

function App() {
  const prevFormData = useRef({});
  const [dataId, setDataId] = useState(null);
  const [data, setData] = useState(initialData.slice(0));
  const [form, dispatch] = useReducer(reducer, initialState);
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false);

  const searchText = useDebounce(searchQuery);

  const toggleOpen = () => {
    setOpen((prev) => !prev);

    if (open) {
      setDataId(null);
      dispatch({ type: types.RESET_FORM });
    }
  };

  const filterRecords = useMemo(() => {
    if (!searchText) return data;

    return data.filter((_record) => _record.name.toLowerCase().includes(searchText.toLowerCase()));
  }, [data, searchText]);

  const handleSearchQuery = (query) => setSearchQuery(query);

  const editMode = useMemo(() => !!dataId, [dataId]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      if (!form.name || !form.age || !form.address || !form.maritalStatus) return alert("Form is not properly filled.");

      if (editMode) {
        const ind = data.findIndex((_data) => _data.id === dataId);

        setData((prev) => {
          const ele = prev[ind];
          prev[ind] = { ...ele, ...form };
          return prev.slice(0);
        });

        setDataId(null);
      } else {
        const newRecord = Object.assign({}, form, { id: uuidv4() });
        setData((_data) => _data.concat.apply(_data, [newRecord]));
      }
      dispatch({ type: types.RESET_FORM });
      setOpen(false);
    },
    [form, editMode, data, setData, setDataId, dataId]
  );

  const handleUpdate = useCallback(
    (id) => {
      setDataId(id);
      setOpen(true);

      const payload = data.find((d) => d.id === id);
      prevFormData.current = payload;
      dispatch({ type: types.ON_EDIT_FORM, payload });
    },
    [data]
  );

  const handleDelete = useCallback(
    (id) => {
      setData((prevData) => prevData.filter((_data) => _data.id !== id));
    },
    [setData]
  );

  const isFormChanged = useMemo(() => {
    if (!editMode) return true;

    return !_.isEqual(prevFormData.current, form);
  }, [editMode, form]);

  return (
    <div className="App">
      <Search searchQuery={searchQuery} handleSearchQuery={handleSearchQuery} />
      <Suspense fallback={<div>parent Loading...</div>}>
        <TableData dataId={dataId} data={filterRecords} handleUpdate={handleUpdate} handleDelete={handleDelete} />
        <AddCircleIcon onClick={() => setOpen(true)} sx={{ display: "flex", margin: "auto", marginTop: "2rem" }} />
        <CustomModal open={open} toggleOpen={toggleOpen}>
          <Suspense fallback={<div>modal Loading...</div>}>
            <Form
              formData={form}
              dispatch={dispatch}
              editMode={editMode}
              onSubmit={handleSubmit}
              isChanged={isFormChanged}
            />
          </Suspense>
        </CustomModal>
      </Suspense>
    </div>
  );
}

export default App;
