import axios from 'axios';
import {
    CLEAR_ERRORS,
    SET_GET_DATA_MAIN_BANNER,
    SET_GET_DATA_SETTING_ABOUT_US,
    SET_GET_DATA_SUB_BANNER,
    SET_GET_DATA_TITLE_HOME,
    SET_PATCH_DATA_MAIN_BANNER
} from '../type';
import { setSnackbar } from './snackbarAction';

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

export const patchDataSettingsMainBanner = (data) => async (dispatch) => {
    const API = 'https://tokyofoam.herokuapp.com/api/setting/update/Setting_main_banner';
    getAuthorizationHeaderToken();
    try {
        const res = await axios.patch(API, data);
        dispatch({
            type: SET_GET_DATA_MAIN_BANNER,
            payload: res.data.Setting_main_banner
        });
        dispatch(
            setSnackbar({
                snackbarOpen: true,
                snackbarType: 'success',
                snackbarMessage: 'You have changed data at Main Banner'
            })
        );
        // alert('Data sudah di update!')
        // dispatch(getDataSettingsMainBanner)
    } catch (error) {
        console.log(error);
        dispatch(
            setSnackbar({
                snackbarOpen: true,
                snackbarType: 'error',
                snackbarMessage: res.data.message
            })
        );
    }
};

// HOME TITLE HOME
export const getDataSettingsTitleHome = (token) => async (dispatch) => {
    const API = 'https://tokyofoam.herokuapp.com/api/setting/get/Setting_title_in_home';
    getAuthorizationHeaderToken();
    try {
        const res = await axios.get(API, token);
        dispatch({
            type: SET_GET_DATA_TITLE_HOME,
            payload: res.data.Setting_title_in_home
        });
    } catch (error) {
        console.log(error);
    }
};

export const patchDataSettingsTitleHome = (data) => async (dispatch) => {
    const API = 'https://tokyofoam.herokuapp.com/api/setting/update/Setting_title_in_home';
    getAuthorizationHeaderToken();
    try {
        const res = await axios.patch(API, data);
        dispatch({
            type: SET_GET_DATA_TITLE_HOME,
            payload: res.data.Setting_title_in_home
        });
        dispatch(
            setSnackbar({
                snackbarOpen: true,
                snackbarType: 'success',
                snackbarMessage: 'You have changed at Title Home'
            })
        );
    } catch (error) {
        console.log(error);
        dispatch(
            setSnackbar({
                snackbarOpen: true,
                snackbarType: 'error',
                snackbarMessage: res.data.message
            })
        );
    }
};

// HOME SUB BANNER
export const getDataSettingsSubBanner = (token, setImageSubBanner1, setImage2) => async (dispatch) => {
    const API = 'https://tokyofoam.herokuapp.com/api/setting/get/Setting_sub_banner';
    getAuthorizationHeaderToken();
    try {
        const res = await axios.get(API, token);
        dispatch({
            type: SET_GET_DATA_SUB_BANNER,
            payload: res.data.Setting_sub_banner
        });
        // setImageSubBanner1(res.data.Setting_sub_banner.image_sub_banner1)
        // setImage2(res.data.Setting_sub_banner.image_sub_banner2)
        // setImage3(res.data.Setting_sub_banner.image_sub_banner3)
    } catch (error) {
        console.log(error);
    }
};

export const patchDataSettingsSubBanner = (data) => async (dispatch) => {
    const API = 'https://tokyofoam.herokuapp.com/api/setting/update/Setting_sub_banner';
    getAuthorizationHeaderToken();
    try {
        const res = await axios.patch(API, data);
        dispatch({
            type: SET_GET_DATA_SUB_BANNER,
            payload: res.data.Setting_sub_banner
        });
        dispatch(
            setSnackbar({
                snackbarOpen: true,
                snackbarType: 'success',
                snackbarMessage: 'You have changed data at Sub Banner'
            })
        );
    } catch (error) {
        console.log(error);
        dispatch(
            setSnackbar({
                snackbarOpen: true,
                snackbarType: 'error',
                snackbarMessage: res.data.message
            })
        );
    }
};

//Fungsi buat get token dari local storage dan langsung pake
const getAuthorizationHeaderToken = () => {
    const IdToken = localStorage.getItem('FBIdToken');
    axios.defaults.headers.common['Authorization'] = IdToken; // code ini itu pengganti Authorization: Bearer token di postman
};
