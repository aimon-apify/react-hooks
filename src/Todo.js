const Todo = ({item: {name, age, maritalStatus}}) => {
    return(
        <div>
            <p>My name is {name}. I am {age} years old. I am {maritalStatus}.</p>
        </div>
    );
}

export default Todo;