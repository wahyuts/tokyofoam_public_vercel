// import { SET_HISTORY_ORDER } from '../../pages/profile/types';
import { SET_HISTORY_ORDER } from '../../types';

export const historyOrder = () => (dispatch) => {
    return dispatch({
        type: SET_HISTORY_ORDER,
        payload: ''
    });
};
