import { SET_SNACKBAR } from '../type';

export const setSnackbar = (payload = {}) => {
    return (dispatch) => {
        dispatch({
            type: SET_SNACKBAR,
            payload
        });
    };
};
