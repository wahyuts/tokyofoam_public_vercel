import { LABEL_STATUS_PAYMENT } from '../../types';

export const setProfile = (label) => (dispatch) => {
    return dispatch({
        type: label
    });
};

export const setLabelStatusPayment = (label) => (dispatch) => {
    return dispatch({
        type: LABEL_STATUS_PAYMENT,
        payload: label
    });
};

export const setAddressLabel = (label) => (dispatch) => {
    return dispatch({
        type: label
    });
};
