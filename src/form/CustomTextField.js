import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';

function CustomTextField({ autoFocus, type, id, variant, color, placeholder, value, onChange, label }) {
	return (
		<TextField
			autoFocus={autoFocus}
			type={type}
			id={id}
			variant={variant}
			color={color}
			placeholder={placeholder}
			value={value}
			onChange={onChange}
			label={label}
		/>
	);
}

CustomTextField.propTypes = {
	autoFocus: PropTypes.bool.isRequired,
	type: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	variant: PropTypes.string.isRequired,
	color: PropTypes.string.isRequired,
	placeholder: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	label: PropTypes.string.isRequired
};

CustomTextField.defaultProps = {
	autoFocus: false,
	type: 'text',
	id: 'standard-basic',
	variant: 'standard',
	color: 'secondary'
};

export default CustomTextField;
