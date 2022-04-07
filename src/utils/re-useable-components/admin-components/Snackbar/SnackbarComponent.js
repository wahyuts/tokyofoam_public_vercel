import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { makeStyles } from '@mui/styles';
import { setSnackbar } from '../../../../redux/actions/snackbarAction';

const useStyles = makeStyles((theme) => ({
    notif: {
        top: 120,
        left: '50%',
        bottom: 'auto'
    }
    // root: {
    //   width: "100%",
    //   "& > * + *": {
    //     marginTop: 16
    //   }
    // }
}));

const SnackbarComponent = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const snackbarOpen = useSelector((state) => state.snackbar.snackbarOpen);
    const snackbarType = useSelector((state) => state.snackbar.snackbarType);
    const snackbarMessage = useSelector((state) => state.snackbar.snackbarMessage);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(setSnackbar({ snackbarOpen: false }));
    };

    return (
        // <div className={classes.root}>
        <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleClose} className={classes.notif}>
            <MuiAlert
                elevation={6}
                // variant="filled"
                onClose={handleClose}
                color={snackbarType}
            >
                {snackbarMessage}
            </MuiAlert>
        </Snackbar>
        // </div>
    );
};

export default SnackbarComponent;
