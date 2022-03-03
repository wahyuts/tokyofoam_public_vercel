import {
    SET_ERRORS,
    SET_ERRORS_REGISTER,
    CLEAR_ERRORS,
    CLEAR_ERRORS_REGISTER,
    SET_ERRORS_CHECKOUT_BUTTON,
    CLEAR_ERRORS_CHECKOUT_BUTTON,
    SET_ERRORS_EMPTY_BAG,
    CLEAR_ERRORS_EMPTY_BAG,
    LOADING_UI,
    LOADING_BUTTON_PAYNOW,
    LOADING_BUTTON_PAYLATTER,
    STOP_LOADING_BUTTON_PAYNOW,
    STOP_LOADING_BUTTON_PAYLATTER,
    STOP_LOADING_UI
} from '../type';

const initialState = {
    loading: false,
    loading_button_paynow: false,
    loading_button_paylatter: false,
    errors: null,
    errors_register: null,
    errors_auth_checkout_button: null,
    errors_empty_bag: null
};

export default function UIReducer(state = initialState, action) {
    switch (action.type) {
        case SET_ERRORS:
            return {
                ...state,
                loading: false,
                errors: action.payload
            };
        case SET_ERRORS_REGISTER:
            return {
                ...state,
                loading: false,
                errors_register: action.payload
            };
        case SET_ERRORS_EMPTY_BAG:
            return {
                ...state,
                loading: false,
                errors_empty_bag: action.payload
            };
        case SET_ERRORS_CHECKOUT_BUTTON:
            return {
                ...state,
                // loading: false,
                errors_auth_checkout_button: action.payload
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                loading: false,
                errors: null
            };
        case CLEAR_ERRORS_REGISTER:
            return {
                ...state,
                loading: false,
                errors_register: null
            };
        case CLEAR_ERRORS_EMPTY_BAG:
            return {
                ...state,
                loading: false,
                errors_empty_bag: null
            };
        case CLEAR_ERRORS_CHECKOUT_BUTTON:
            return {
                ...state,
                loading: false,
                errors_auth_checkout_button: null
            };
        case LOADING_UI:
            return {
                ...state,
                loading: true
            };
        case LOADING_BUTTON_PAYNOW:
            return {
                ...state,
                loading_button_paynow: true
            };
        case LOADING_BUTTON_PAYLATTER:
            return {
                ...state,
                loading_button_paylatter: true
            };
        case STOP_LOADING_UI:
            return {
                ...state,
                loading: false
            };
        case STOP_LOADING_BUTTON_PAYNOW:
            return {
                ...state,
                loading_button_paynow: false
            };
        case STOP_LOADING_BUTTON_PAYLATTER:
            return {
                ...state,
                loading_button_paylatter: false
            };
        default:
            return state;
    }
}
