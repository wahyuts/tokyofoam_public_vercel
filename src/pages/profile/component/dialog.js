import React from 'react';
import Modal from '@mui/material/Modal';
import { Box } from '@mui/system';
import { makeStyles } from '@mui/styles';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    p: 3,
    boxShadow: 24,
    borderRadius: '10px'
};

const useStyles = makeStyles((theme) => ({}));

export default function Dialog({ children, open, onClose, innerContainerStyle, className }) {
    const classes = useStyles();
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className={className}
        >
            <Box sx={style} style={innerContainerStyle}>
                {children}
            </Box>
        </Modal>
    );
}
