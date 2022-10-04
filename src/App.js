import React, { useReducer, useRef, useState } from 'react';
import Form from './components/Form/Form';
import TableData from './components/TableData/TableData';
import './App.css';

export const DataContext = React.createContext();
export const DataUpdateContext = React.createContext();

const ACTIONS = {
  NEW_STATE: 'new_state'
}

const newInitialState = { id: -1, name: '', age: 0, maritalStatus: 'Single' };

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.NEW_STATE: {
      const { updateIndex, selectedName, selectedAge, selectedMaritalStatus } = action.payload;
      return { ...state, id: updateIndex, name: selectedName, age: selectedAge, maritalStatus: selectedMaritalStatus};
    }
    default: {
      return { ...state }
    }
  }
}

function App() {
  const [data, setData] = useState([]);
  const formRef = useRef();

  const [newState, dispatch] = useReducer(reducer, newInitialState);

  const handleUpdate = (i, selectedName, selectedAge, selectedMaritalStatus) => {
    const updateIndex = i;
    dispatch({ type: ACTIONS.NEW_STATE, payload: { updateIndex, selectedName, selectedAge, selectedMaritalStatus } });
    formRef.current.name.focus();
    
  }

  console.log(newState);

  return (
      <div className="App">
        <h1>Records</h1>
        
        <DataContext.Provider value={data}>
          <DataUpdateContext.Provider value={setData}>
                <Form formRef={formRef} />
                <TableData handleUpdate={handleUpdate} />
          </DataUpdateContext.Provider>
        </DataContext.Provider>
      </div>
  );
}

export default App;
