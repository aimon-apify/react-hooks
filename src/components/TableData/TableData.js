import { useContext } from 'react';
import { DataContext, DataUpdateContext } from '../../App';
import './tableData.css';

const TableData = ({handleUpdate}) => {
    const data = useContext(DataContext);
    const setData = useContext(DataUpdateContext);

    const handleDelete = (index) => {
        const filteredData = data.filter((item, i) => index !== i);
        setData(filteredData);
    }

    return (
       <div className='data-table'>
        {data.length === 0 && <span style={{color: 'gray'}}>No records in the DB.</span>}
        <table>
            {data.length > 0 && (
                <thead>
                    <tr>
                        <th>Serial No.</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Marital Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
            )}
            <tbody>
                {data.map((item, i) => (
                    <tr key={`${item.name}-${i}`}>
                        <td>{i + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.age}</td>
                        <td>{item.maritalStatus}</td>
                        <td><button onClick={() => handleUpdate(i, item.name, item.age, item.maritalStatus)}>Update</button>
                        <button onClick={() => handleDelete(i)}>Delete</button></td>
                    </tr>
                ))}
            </tbody>
        </table>        
        </div>
    );
}

export default TableData;
