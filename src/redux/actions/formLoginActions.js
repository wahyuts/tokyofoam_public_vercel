import { SET_EMAIL, SET_PASSWORD } from '../type';

export const settingEmail = (selected) => (dispatch) => {
    dispatch({
        type: SET_EMAIL,
        payload: selected
    });
};

export const settingPassword = (selected) => (dispatch) => {
    dispatch({
        type: SET_PASSWORD,
        payload: selected
    });
};
