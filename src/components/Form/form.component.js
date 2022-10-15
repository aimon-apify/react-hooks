import React, { lazy } from 'react';
import PropTypes from 'prop-types';
import RadioGroup from '@mui/material/RadioGroup';
import FormLabel from '@mui/material/FormLabel';

import { types } from '../../App';
import styles from './style.module.css';

const CustomTextField = lazy(() => import('../../form/CustomTextField'));
const CustomFormControlLabel = lazy(() => import('../../form/CustomFormControlLabel'));

function Form({ formData, onSubmit, dispatch }) {
	const handleFormChange =
		(name) =>
		({ target: { value } }) => {
			dispatch({ type: types.HANDLE_FORM_CHANGE, payload: { name, value } });
		};

	return (
		<div className={styles.formWrapper}>
			<form onSubmit={onSubmit} className={styles.submit}>
				<CustomTextField
					autoFocus={true}
					value={formData.name}
					onChange={handleFormChange('name')}
					label='Name'
					placeholder='Name'
				/>
				<CustomTextField
					type='number'
					value={formData.age}
					onChange={handleFormChange('age')}
					label='Age'
					placeholder='Age'
				/>
				<CustomTextField
					value={formData.address}
					onChange={handleFormChange('address')}
					label='Address'
					placeholder='Address'
				/>

				<div className={styles.married}>
					<FormLabel>Are you single or married?</FormLabel>
					<RadioGroup name='gender'>
						<div className={styles.gender}>
							<CustomFormControlLabel
								key='single'
								value='Single'
								label='Single'
								checked={formData.maritalStatus === 'Single'}
								onChange={handleFormChange('maritalStatus')}
							/>
							<CustomFormControlLabel
								key='married'
								value='Married'
								label='Married'
								checked={formData.maritalStatus === 'Married'}
								onChange={handleFormChange('maritalStatus')}
							/>
						</div>
					</RadioGroup>
				</div>
			</form>
		</div>
	);
}

Form.propTypes = {
	formData: PropTypes.shape({
		name: PropTypes.string.isRequired,
		age: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
		address: PropTypes.string.isRequired,
		maritalStatus: PropTypes.oneOf(['Single', 'Married']).isRequired
	}).isRequired,
	onSubmit: PropTypes.func.isRequired,
	dispatch: PropTypes.func.isRequired
};

export default Form;
