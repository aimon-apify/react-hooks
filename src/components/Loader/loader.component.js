import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';

import './loader.component.css';

function Loader({ size, color }) {
	return (
		<div className='container'>
			<CircularProgress color={color} size={size} />
		</div>
	);
}

Loader.propTypes = {
	size: PropTypes.number.isRequired,
	color: PropTypes.oneOf(['primary', 'secondary', 'error', 'info', 'success', 'warning', 'inherit'])
		.isRequired
};

Loader.defaultProps = {
	size: 40,
	color: 'primary'
};

export default Loader;
