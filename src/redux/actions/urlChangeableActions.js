import { SET_CHANGEABLE_URL } from '../type';

export const changeURL = (selected) => (dispatch) => {
    dispatch({
        type: SET_CHANGEABLE_URL,
        payload: selected
    });
};
