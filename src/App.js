import React, { useRef, useState } from "react";
import Todo from './Todo'

function App() {
  const formRef = useRef(null);

  const [data, setData] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, age, maritalStatus } = formRef.current;

    setData([...data, { name: name.value, age: age.value, maritalStatus: maritalStatus.value }]);
    formRef.current.reset();
  }

  return (
    <div className="App">
      <h1>To Do App</h1>
      <form ref={formRef} onSubmit={handleSubmit}>
        <input type='text' placeholder='Name' name='name' />
        <input type='text' placeholder='Age' name='age' />
        <input type="radio" value="Married" name='maritalStatus' /> Married
        <input type="radio" value="Single" name='maritalStatus' /> Single
        <button type='submit'>Submit</button>
      </form>
      {data.map((item, i) => (
        <Todo key={`${item.name}-${i}`} item={item} />
      ))}
    </div> 
  );
}

export default App;
