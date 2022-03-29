import { SET_GET_DATA_MAIN_BANNER, SET_GET_DATA_SETTING_ABOUT_US } from '../type';

const initialState = {
    dataSettingsAboutUs: {},
    dataSettingsMainBanner: {}
};

export default function dataAllSituskuReducer(state = initialState, action) {
    switch (action.type) {
        case SET_GET_DATA_SETTING_ABOUT_US:
            return {
                ...state,
                dataSettingsAboutUs: action.payload
            };
        case SET_GET_DATA_MAIN_BANNER:
            return {
                ...state,
                dataSettingsMainBanner: action.payload
            };
        default:
            return state;
    }
}
