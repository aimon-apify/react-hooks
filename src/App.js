import React, { useEffect, lazy, Suspense, useRef, useMemo, useReducer, useState, useCallback } from "react";
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

const initialState = { id: "", name: "", age: "", address: "", maritalStatus: "" };

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
  const [data, setData] = useState([
    { name: "John", age: 34, address: "Karachi", maritalStatus: "Single" },
    { name: "Sara", age: 90, address: "USA", maritalStatus: "Married" },
    { name: "Farrukh", age: 50, address: "Nepal", maritalStatus: "Single" },
    { name: "Javed", age: 59, address: "Karachi", maritalStatus: "Single" },
  ]);
  const [filterRecords, setFilterRecords] = useState([]);
  const [form, dispatch] = useReducer(reducer, initialState);
  const [searchedData, setSearchedData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false);

  const searchText = useDebounce(searchQuery);

  const toggleOpen = () => setOpen((prev) => !prev);

  useEffect(() => {
    const filterRecords = [...data];
    const getRecords = filterRecords.filter((_record) => _record.name.toLowerCase().includes(searchText.toLowerCase()));
    setSearchedData(getRecords);
    setFilterRecords(getRecords);
  }, [searchText]);

  const handleSearchQuery = (query) => setSearchQuery(query);

  const editMode = useMemo(() => typeof ind === "number", [ind]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.age || !form.address || !form.maritalStatus) return alert("Form is not properly filled.");

    if (editMode) {
      setData((_data) => {
        _data[ind] = form;
        return [..._data];
      });
      setInd(null);
    } else {
      if (searchQuery !== "" && form.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        setFilterRecords((_record) => _record.concat.apply(_record, [form]));
        setData((_data) => _data.concat.apply(_data, [form]));
      } else {
        setData((_data) => _data.concat.apply(_data, [form]));
      }
    }
    dispatch({ type: types.RESET_FORM });
    setOpen(false);
  };

  const handleUpdate = (index) => {
    setInd(index);
    if (searchQuery === "") {
      const payload = data[index];
      prevFormData.current = payload;
      dispatch({ type: types.ON_EDIT_FORM, payload });
    } else {
      console.log("edit");
      // const payload = filterRecords[index];
      // prevFormData.current = payload;
      // dispatch({ type: types.ON_EDIT_FORM, payload });
    }
    setOpen(true);
  };

  const handleDelete = useCallback(
    (index) => {
      if (searchQuery !== "") {
        setFilterRecords((_record) => _record.filter((_, i) => index !== i));
        setData(data.filter((_data) => _data !== filterRecords[index]));
      } else {
        setData(data.filter((_data, i) => index !== i));
      }
    },
    [setData, setFilterRecords, searchQuery]
  );

  const isFormChanged = useMemo(() => {
    if (!editMode) return true;

    return !_.isEqual(prevFormData.current, form);
  }, [editMode, prevFormData.current, form]);

  return (
    <div className="App">
      <Search searchQuery={searchQuery} handleSearchQuery={handleSearchQuery} />
      <Suspense fallback={<div>Loading...</div>}>
        <TableData
          data={data}
          searchedData={searchedData}
          handleUpdate={handleUpdate}
          handleDelete={handleDelete}
          searchQuery={searchQuery}
          index={ind}
          filterRecords={filterRecords}
        />
        <AddCircleIcon onClick={() => setOpen(true)} sx={{ display: "flex", margin: "auto", marginTop: "2rem" }} />
        <CustomModal open={open} toggleOpen={toggleOpen}>
          <Form
            formData={form}
            onSubmit={handleSubmit}
            dispatch={dispatch}
            editMode={editMode}
            isChanged={isFormChanged}
          />
        </CustomModal>
      </Suspense>
    </div>
  );
}

export default App;
