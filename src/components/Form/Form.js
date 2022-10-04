import { useContext, useReducer } from "react";
import { DataContext, DataUpdateContext } from "../../App";
import './form.css';

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

const Form = ({formRef}) => {
    const [form, dispatch] = useReducer(reducer, initialState);
    
    const data = useContext(DataContext);
    const setData = useContext(DataUpdateContext);

    const handleFormChange = (name) => ({ target: { value } }) => {
        dispatch({ type: types.HANDLE_FORM_CHANGE, payload: { name, value } });
      }
    
      const handleSubmit = (e) => {
        e.preventDefault();
        {if (form.name !== '' && form.age > 0) {
            setData([...data, { name: form.name, age: form.age, maritalStatus: form.maritalStatus }]);
            dispatch({ type: types.RESET_FORM });
        }}
      }

    return (
      <div className="wrapper">
        <form ref={formRef} onSubmit={handleSubmit}>
            <input type='text' placeholder='Name' name='name' value={form.name} onChange={handleFormChange('name')} />
            <input type='text' placeholder='Age' value={form.age} onChange={handleFormChange('age')} />
            Married <input type="radio" value="Married" checked={form.maritalStatus === 'Married'} onChange={handleFormChange('maritalStatus')} /> 
            Single <input type="radio" value="Single" checked={form.maritalStatus === 'Single'} onChange={handleFormChange('maritalStatus')} /> 
            <button>Submit</button>
        </form>
      </div>
    );
}

export default Form;