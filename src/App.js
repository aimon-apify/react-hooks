import React, { lazy, Suspense, useRef, useMemo, useReducer, useState, useCallback } from 'react';
import _ from 'lodash';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { v4 as uuidv4 } from 'uuid';

import CustomModal from './components/Modal/modal.component';
import useDebounce from './hooks/useDebounce';
import Search from './components/Search/search.component';
import Loader from './components/Loader/loader.component';
import './index.css';

const Form = lazy(() => import('./components/Form/form.component'));
const TableData = lazy(() => import('./components/TableData/table-data.component'));

export const types = {
	ON_EDIT_FORM: 'ON_EDIT_FORM',
	HANDLE_FORM_CHANGE: 'HANDLE_FORM_CHANGE',
	RESET_FORM: 'RESET_FORM'
};

const initialState = { name: '', age: '', address: '', maritalStatus: 'Single' };

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
	{ id: uuidv4(), name: 'John', age: 34, address: 'Karachi', maritalStatus: 'Single' },
	{ id: uuidv4(), name: 'Sara', age: 90, address: 'USA', maritalStatus: 'Married' },
	{ id: uuidv4(), name: 'Farrukh', age: 50, address: 'Nepal', maritalStatus: 'Single' },
	{ id: uuidv4(), name: 'Javed', age: 59, address: 'Karachi', maritalStatus: 'Single' }
];

function App() {
	const prevFormData = useRef({});

	const [user, setUser] = useState(null);
	const [users, setUsers] = useState(initialData.slice(0));
	const [form, dispatch] = useReducer(reducer, initialState);
	const [searchQuery, setSearchQuery] = useState('');
	const [open, setOpen] = useState(false);

	const searchText = useDebounce(searchQuery);

	const toggleOpen = () => {
		setOpen((_open) => !_open);

		if (open) {
			setUser(null);
			dispatch({ type: types.RESET_FORM });
		}
	};

	const filterRecords = useMemo(() => {
		if (!searchText) return users;

		return users.filter((_user) => _user.name.toLowerCase().includes(searchText.toLowerCase()));
	}, [users, searchText]);

	const handleSearchQuery = (query) => setSearchQuery(query);

	const editMode = useMemo(() => !!user, [user]);

	const handleSubmit = useCallback(
		(e) => {
			e.preventDefault();

			if (!form.name || !form.age || !form.address || !form.maritalStatus)
				return alert('Form is not properly filled.');

			if (editMode) {
				const ind = users.findIndex((_user) => _user.id === user.id);

				setUsers((_users) => {
					const _user = _users[ind];
					_users[ind] = { ..._user, ...form };
					return _users.slice(0);
				});

				setUser(null);
			} else {
				const newRecord = Object.assign({}, form, { id: uuidv4() });
				setUsers((_users) => _users.concat([newRecord]));
			}

			dispatch({ type: types.RESET_FORM });
			setOpen(false);
		},
		[form, editMode, users, setUsers, setUser, user]
	);

	const handleUpdate = useCallback(
		(id) => {
			const user = users.find((d) => d.id === id);

			setUser(user);
			setOpen(true);

			prevFormData.current = user;
			dispatch({ type: types.ON_EDIT_FORM, payload: user });
		},
		[users]
	);

	const handleDelete = useCallback(
		(id) => {
			setUsers((_users) => _users.filter((_user) => _user.id !== id));
		},
		[setUsers]
	);

	const isFormChanged = useMemo(() => {
		if (!editMode) return true;

		return !_.isEqual(prevFormData.current, form);
	}, [editMode, form]);

	return (
		<div className='App'>
			<Search searchQuery={searchQuery} handleSearchQuery={handleSearchQuery} />
			<Suspense fallback={<Loader />}>
				<TableData
					data={filterRecords}
					handleUpdate={handleUpdate}
					handleDelete={handleDelete}
					user={user}
				/>
				<AddCircleIcon
					onClick={() => setOpen(true)}
					color='primary'
					fontSize='large'
					sx={{ display: 'flex', margin: 'auto', marginTop: '1rem' }}
				/>
				<CustomModal
					disabled={!isFormChanged}
					open={open}
					toggleOpen={toggleOpen}
					handleSubmit={handleSubmit}
					acceptText={!editMode ? 'Save' : 'Update'}
					declineText='Cancel'
					title={`${!editMode ? 'Create' : 'Update'} form`}
				>
					<Suspense fallback={<Loader />}>
						<Form formData={form} dispatch={dispatch} onSubmit={handleSubmit} />
					</Suspense>
				</CustomModal>
			</Suspense>
		</div>
	);
}

export default App;
