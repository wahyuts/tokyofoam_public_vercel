import {
    SET_HOME,
    SET_ABOUT_US,
    SET_PRODUCT_PAGE,
    SET_HOW_TO_BUY,
    SET_CONTACT_US,
    SET_MAIN_URL,
    SET_DETAIL_PRODUCT_URL,
    SET_CHANGEABLE_URL
} from '../type';

const initialState = {
    show_URL_Home: 'Home',
    show_URL_AboutUs: '',
    show_URL_ProductPage: '',
    show_URL_HowToBuy: '',
    show_URL_ContactUs: '',
    show_URL_Main: '',
    show_URL_DetailProduct: '',
    changeable_URL: ''
};

export default function urlHeadnavReducer(state = initialState, action) {
    switch (action.type) {
        case SET_HOME:
            return {
                ...state,
                show_URL_Home: action.payload
            };
        case SET_ABOUT_US:
            return {
                ...state,
                show_URL_AboutUs: action.payload
            };
        case SET_PRODUCT_PAGE:
            return {
                ...state,
                show_URL_ProductPage: action.payload
            };
        case SET_HOW_TO_BUY:
            return {
                ...state,
                show_URL_AboutUs: action.payload
            };
        case SET_CONTACT_US:
            return {
                ...state,
                show_URL_AboutUs: action.payload
            };
        case SET_MAIN_URL:
            return {
                ...state,
                show_URL_Main: action.payload
            };
        case SET_DETAIL_PRODUCT_URL:
            return {
                ...state,
                show_URL_DetailProduct: action.payload
            };
        case SET_CHANGEABLE_URL:
            return {
                ...state,
                changeable_URL: action.payload
            };
        default:
            return state;
    }
}
