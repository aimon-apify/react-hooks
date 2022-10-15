import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Icon from '@mui/material/Icon';
import Typography from '@mui/material/Typography';

import CustomModal from '../Modal/modal.component';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14
	}
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	'&:nth-of-type(odd)': {
		backgroundColor: theme.palette.action.hover
	},
	'&:last-child td, &:last-child th': {
		border: 0
	}
}));

const tableColumns = [
	{ name: 'Serial No.', align: 'center' },
	{ name: 'Name', align: 'left' },
	{ name: 'Age', align: 'right' },
	{ name: 'Address', align: 'left' },
	{ name: 'Marital Status', align: 'left' },
	{ name: 'Actions', align: 'right' }
];

function TableData({ handleDelete, data, handleUpdate }) {
	const [userId, setUserId] = useState(null);

	const preHandleDelete = () => {
		handleDelete(userId);
		setUserId(null);
	};

	if (!data.length)
		return (
			<Typography color='GrayText' variant='h5'>
				No records found
			</Typography>
		);
	return (
		<Fragment>
			<TableContainer component={Paper} sx={{ width: '90%', margin: 'auto' }}>
				<Table sx={{ minWidth: 700 }} aria-label='customized table'>
					{!data.length ? null : (
						<TableHead>
							<TableRow>
								{tableColumns.map((c, i) => (
									<StyledTableCell key={`${c.name}-${c.align}-${i}`} align={c.align}>
										{c.name}
									</StyledTableCell>
								))}
							</TableRow>
						</TableHead>
					)}
					<TableBody>
						{data.map((item, i) => {
							const isDisabled = userId === item.id;
							return (
								<StyledTableRow key={`${item.name}-${i}`}>
									<StyledTableCell align='center' component='th' scope='row'>
										{i + 1}
									</StyledTableCell>
									<StyledTableCell align='left'>{item.name}</StyledTableCell>
									<StyledTableCell align='right'>{item.age}</StyledTableCell>
									<StyledTableCell align='left'>{item.address}</StyledTableCell>
									<StyledTableCell align='left'>{item.maritalStatus}</StyledTableCell>
									<StyledTableCell align='right'>
										<Icon
											color={isDisabled ? 'disabled' : 'primary'}
											className='cursor-pointer'
											onClick={() => handleUpdate(item.id)}
											disabled={isDisabled}
											fontSize='medium'
										>
											edit_circle
										</Icon>
										<Icon
											color={isDisabled ? 'disabled' : 'error'}
											className='cursor-pointer ml-12'
											onClick={() => setUserId(item.id)}
											disabled={isDisabled}
											fontSize='medium'
										>
											delete_circle
										</Icon>
									</StyledTableCell>
								</StyledTableRow>
							);
						})}
					</TableBody>
				</Table>
			</TableContainer>
			<CustomModal
				open={!!userId}
				handleSubmit={preHandleDelete}
				toggleOpen={() => setUserId(null)}
			/>
		</Fragment>
	);
}

TableData.propTypes = {
	handleDelete: PropTypes.func.isRequired,
	data: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string.isRequired,
			age: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
			address: PropTypes.string.isRequired,
			maritalStatus: PropTypes.oneOf(['Single', 'Married']).isRequired
		})
	).isRequired,
	handleUpdate: PropTypes.func.isRequired
};

export default TableData;
