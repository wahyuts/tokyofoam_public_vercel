import {
    SET_GET_DATA_HOW_TO_BUY,
    SET_GET_DATA_MAIN_BANNER,
    SET_GET_DATA_SETTING_ABOUT_US,
    SET_GET_DATA_SUB_BANNER,
    SET_GET_DATA_TITLE_HOME
} from '../type';

const initialState = {
    dataSettingsMainBanner: {},
    dataSettingsHomeTitle: {},
    dataSettingsSubBanner: {},
    dataSettingsAboutUs: {},
    dataSettingsHowToBuy: {}
};

// DATA REDUCER DISINI DIPAKAI UNTUK GET DATA DAN UPDATE DATA SEKALIGUS
export default function dataAllSituskuReducer(state = initialState, action) {
    switch (action.type) {
        case SET_GET_DATA_MAIN_BANNER:
            return {
                ...state,
                dataSettingsMainBanner: action.payload
            };
        case SET_GET_DATA_TITLE_HOME:
            return {
                ...state,
                dataSettingsHomeTitle: action.payload
            };
        case SET_GET_DATA_SUB_BANNER:
            return {
                ...state,
                dataSettingsSubBanner: action.payload
            };
        case SET_GET_DATA_SETTING_ABOUT_US:
            return {
                ...state,
                dataSettingsAboutUs: action.payload
            };
        case SET_GET_DATA_HOW_TO_BUY:
            return {
                ...state,
                dataSettingsHowToBuy: action.payload
            };
        default:
            return state;
    }
}
