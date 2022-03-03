import {
    GET_DETAIL_DATA_KURIR,
    SET_KURIR_NAME,
    SET_KURIR_NAME_FOR_CHECKOUT,
    GET_DETAIL_DATA_KURIR_FOR_CHECKOUT
} from '../type';

export const settingDetailDataKurir = (selected) => (dispatch) => {
    dispatch({
        type: GET_DETAIL_DATA_KURIR,
        payload: selected
    });
};

export const settingKurirName = (selected) => (dispatch) => {
    dispatch({
        type: SET_KURIR_NAME,
        payload: selected
    });
};

//Buat di checkoutpage (checkout page beda sendiri agar persist,..yang diatas di gunaiin buat validasi di cart)
// ini masuknya di reducer SeputarOngkirForCheckout.js
export const settingDetailDataKurirForCheckout = (selected) => (dispatch) => {
    dispatch({
        type: GET_DETAIL_DATA_KURIR_FOR_CHECKOUT,
        payload: selected
    });
};

export const settingKurirNameForCheckout = (selected) => (dispatch) => {
    dispatch({
        type: SET_KURIR_NAME_FOR_CHECKOUT,
        payload: selected
    });
};
