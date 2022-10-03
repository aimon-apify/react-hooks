import React, { useReducer, useState } from 'react';
import Todo from './Todo'

const types = {
  HANDLE_FORM_CHANGE: 'HANDLE_FORM_CHANGE',
  RESET_FORM: 'RESET_FORM'
}

const initialState = { name: '', age: 0, maritalStatus: 'Single' };

function reducer(state, action) {
  switch (action.type) {
    case types.HANDLE_FORM_CHANGE: {
      const { name, value } = action.payload;
      return { ...state, [name]: value }
    }
    case types.RESET_FORM: {
      return { ...initialState }
    }
    default: {
      return { ...state }
    }
  }
}


function App() {
  const [data, setData] = useState([]);
  const [form, dispatch] = useReducer(reducer, initialState);

  const handleFormChange = (name) => ({ target: { value } }) => {
    dispatch({ type: types.HANDLE_FORM_CHANGE, payload: { name, value } });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setData([...data, { name: form.name, age: form.age, maritalStatus: form.maritalStatus }]);
    dispatch({ type: types.RESET_FORM });
  }

  console.log('initialState...', initialState)
  return (

    <div className="App">
      <h1>To Do App</h1>
      <form onSubmit={handleSubmit}>
        <input type='text' placeholder='Name' value={form.name} onChange={handleFormChange('name')} />
        <input type='text' placeholder='Age' value={form.age} onChange={handleFormChange('age')} />
        <input type="radio" value="Married" checked={form.maritalStatus === 'Married'} onChange={handleFormChange('maritalStatus')} /> Married
        <input type="radio" value="Single" checked={form.maritalStatus === 'Single'} onChange={handleFormChange('maritalStatus')} /> Single
        <button>Submit</button>
      </form>

      {data.map((item, i) => (
        <Todo key={`${item.name}-${i}`} item={item} />
      ))}
    </div>
  );
}

export default App;
