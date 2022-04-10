import { DB_RESPONSE_STATUS } from '../../types';

export const dbResponseSuccess = (response) => async (dispatch) => {
    // console.log('response', response);
    return dispatch({
        type: DB_RESPONSE_STATUS,
        payload: response
    });
};
