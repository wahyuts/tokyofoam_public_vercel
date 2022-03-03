import {
    SET_HOME,
    SET_ABOUT_US,
    SET_PRODUCT_PAGE,
    SET_HOW_TO_BUY,
    SET_CONTACT_US,
    SET_MAIN_URL,
    SET_DETAIL_PRODUCT_URL
} from '../type';

export const setHome = (selected) => (dispatch) => {
    dispatch({
        type: SET_HOME,
        payload: selected
    });
};

export const setAboutUs = (selected) => (dispatch) => {
    dispatch({
        type: SET_ABOUT_US,
        payload: selected
    });
};

export const setProductPage = (selected) => (dispatch) => {
    dispatch({
        type: SET_PRODUCT_PAGE,
        payload: selected
    });
};

export const setHowToBuy = (selected) => (dispatch) => {
    dispatch({
        type: SET_HOW_TO_BUY,
        payload: selected
    });
};

export const setContactUs = (selected) => (dispatch) => {
    dispatch({
        type: SET_CONTACT_US,
        payload: selected
    });
};

export const setMainURL = (selected) => (dispatch) => {
    dispatch({
        type: SET_MAIN_URL,
        payload: selected
    });
};

export const setDetailProductURL = (selected) => (dispatch) => {
    dispatch({
        type: SET_DETAIL_PRODUCT_URL,
        payload: selected
    });
};
