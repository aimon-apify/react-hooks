import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';
import useMediaQuery from '@mui/material/useMediaQuery';
import useTheme from '@mui/material/styles/useTheme';

function PaperComponent(props) {
	return (
		<Draggable handle='#draggable-dialog-title' cancel={'[class*="MuiDialogContent-root"]'}>
			<Paper {...props} />
		</Draggable>
	);
}

function CustomModal({
	disabled,
	open,
	toggleOpen,
	handleSubmit,
	title,
	acceptText,
	declineText,
	children
}) {
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

	return (
		<Dialog
			fullWidth
			fullScreen={fullScreen}
			open={open}
			PaperComponent={PaperComponent}
			onClose={toggleOpen}
			maxWidth='xs'
			aria-labelledby='draggable-dialog-title'
		>
			<DialogTitle>{title}</DialogTitle>
			{!children ? null : <DialogContent>{children}</DialogContent>}
			<DialogActions>
				<Button disabled={disabled} color='secondary' variant='contained' onClick={toggleOpen}>
					{declineText}
				</Button>
				<Button disabled={disabled} color='primary' variant='contained' onClick={handleSubmit}>
					{acceptText}
				</Button>
			</DialogActions>
		</Dialog>
	);
}

CustomModal.propTypes = {
	disabled: PropTypes.bool.isRequired,
	open: PropTypes.bool.isRequired,
	toggleOpen: PropTypes.func.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	title: PropTypes.string.isRequired,
	acceptText: PropTypes.string.isRequired,
	declineText: PropTypes.string.isRequired,
	children: PropTypes.element
};

CustomModal.defaultProps = {
	disabled: false,
	open: false,
	title: 'Are you sure?',
	acceptText: 'Yes',
	declineText: 'No'
};

export default CustomModal;
