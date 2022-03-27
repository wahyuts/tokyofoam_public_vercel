// import { SET_HISTORY_ORDER } from '../../pages/profile/types';
import axios from 'axios';
import { GET_ALL_ORDER_FOR_ADMIN, SET_HISTORY_ORDER } from '../../types';
import { getListOrderUserOnUserDashboard } from './dataProductActions';

export const historyOrder = () => (dispatch) => {
    return dispatch({
        type: SET_HISTORY_ORDER,
        payload: ''
    });
};

export const deleteOrderById = (id) => async (dispatch) => {
    const API = `https://tokyofoam.herokuapp.com/api/order/delete/${id}`;
    try {
        const response = await axios({
            method: 'delete',
            url: API
        });
        dispatch(getListOrderUserOnUserDashboard());
    } catch (error) {
        console.log(error);
    }
};

export const getAllOrderForAdminDashboard = () => async (dispatch) => {
    const API = `https://tokyofoam.herokuapp.com/api/order/getAll`;
    try {
        const results = await axios.get(API);
        dispatch({
            type: GET_ALL_ORDER_FOR_ADMIN,
            payload: results.data.data
        });
    } catch (error) {
        if (error.response) {
            // internet online, request made, tapi error karena data tidak match dengan BE
            console.log(error);
        } else if (error.request) {
            // jiks internet offline / disconnect/ gangguan koneksi terjadi
            console.log(error.request);
            alert('Terjadi Gangguan Pada Koneksi Anda!');
        } else {
            console.log('Error', error.message);
        }
    }
};
