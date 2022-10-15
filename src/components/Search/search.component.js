import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';

function Search({ searchQuery, handleSearchQuery }) {
	return (
		<TextField
			label='Search...'
			type='search'
			value={searchQuery}
			onChange={(e) => handleSearchQuery(e.target.value)}
			sx={{
				display: 'flex',
				width: '25%',
				margin: 'auto',
				marginTop: '3rem',
				marginBottom: '2rem'
			}}
		/>
	);
}

Search.propTypes = {
	searchQuery: PropTypes.string.isRequired,
	handleSearchQuery: PropTypes.func.isRequired
};

export default Search;
