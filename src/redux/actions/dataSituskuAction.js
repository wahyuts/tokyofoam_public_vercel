import axios from 'axios';
import { SET_GET_DATA_MAIN_BANNER, SET_GET_DATA_SETTING_ABOUT_US, SET_PATCH_DATA_MAIN_BANNER } from '../type';

// GET DATA SETTINGS ABOUT US
export const getDataSettingsAboutUs = () => async (dispatch) => {
    const API = 'https://tokyofoam.herokuapp.com/api/setting/update/Setting_about_us';
    getAuthorizationHeaderToken();
    try {
        const res = await axios.patch(API);
        dispatch({
            type: SET_GET_DATA_SETTING_ABOUT_US,
            payload: res.data.Setting_about_us
        });
    } catch (error) {
        console.log(error);
    }
};

// MAIN BANNER
export const patchDataSettingsMainBanner = (data) => async (dispatch) => {
    const API = 'https://tokyofoam.herokuapp.com/api/setting/update/Setting_main_banner';
    getAuthorizationHeaderToken();
    try {
        const res = await axios.patch(API, data);
        dispatch({
            type: SET_GET_DATA_MAIN_BANNER,
            payload: res.data.Setting_main_banner
        });
        alert('Data sudah di update!');
        // dispatch(getDataSettingsMainBanner)
    } catch (error) {
        console.log(error);
    }
};

export const getDataSettingsMainBanner = (token, setImage) => async (dispatch) => {
    const API = 'https://tokyofoam.herokuapp.com/api/setting/get/Setting_main_banner';
    getAuthorizationHeaderToken();
    try {
        const res = await axios.get(API, token);
        dispatch({
            type: SET_GET_DATA_MAIN_BANNER,
            payload: res.data.Setting_main_banner
        });
        setImage(res.data.Setting_main_banner.image_main_banner);
    } catch (error) {
        console.log(error);
    }
};

//Fungsi buat get token dari local storage dan langsung pake
const getAuthorizationHeaderToken = () => {
    const IdToken = localStorage.getItem('FBIdToken');
    axios.defaults.headers.common['Authorization'] = IdToken; // code ini itu pengganti Authorization: Bearer token di postman
};
