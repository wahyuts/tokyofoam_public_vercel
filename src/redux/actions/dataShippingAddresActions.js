// import axios from 'axios';
import {
    SET_ID_PROV,
    SET_LOCATION_PROVINCE,
    SET_ADD_ID_KOTA,
    SET_ADD_KOTA,
    SET_ADD_ID_KECAMATAN,
    SET_ADD_KECAMATAN
} from '../type';

export const settingIdProvince = (provinces, locationProvince) => (dispatch) => {
    provinces.filter((prov) => {
        // return prov.province === locationProvince ? prov.province_id : null;
        if (prov.province === locationProvince) {
            // return prov.province_id;
            return dispatch(setIdProvince(prov.province_id));
        } else {
            return null;
        }
    });
};

export const settingIdKabupaten = (provinces, locationProvince) => (dispatch) => {
    provinces.filter((prov) => {
        // return prov.province === locationProvince ? prov.province_id : null;
        if (prov.province === locationProvince) {
            // return prov.province_id;
            return dispatch(setIdProvince(prov.province_id));
        } else {
            return null;
        }
    });
};

export const setIdProvince = (selected) => (dispatch) => {
    dispatch({
        type: SET_ID_PROV,
        payload: selected
    });
};

export const setLocProvince = (selected) => (dispatch) => {
    dispatch({
        type: SET_LOCATION_PROVINCE,
        payload: selected
    });
};

export const addIdKota = (selected) => (dispatch) => {
    dispatch({
        type: SET_ADD_ID_KOTA,
        payload: selected
    });
};

export const addKota = (selected) => (dispatch) => {
    dispatch({
        type: SET_ADD_KOTA,
        payload: selected
    });
};

export const addIdKecamatan = (selected) => (dispatch) => {
    dispatch({
        type: SET_ADD_ID_KECAMATAN,
        payload: selected
    });
};
//
export const addKecamatan = (selected) => (dispatch) => {
    dispatch({
        type: SET_ADD_KECAMATAN,
        payload: selected
    });
};
