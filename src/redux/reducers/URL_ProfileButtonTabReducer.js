import {
    LABEL_STATUS_PAYMENT,
    LOCATION_PATH_ADDRESS,
    LOCATION_PATH_DASHBOARD,
    LOCATION_PATH_EDIT_REVIEW,
    LOCATION_PATH_PROMO_AND_SALE,
    LOCATION_PATH_WISHLIST,
    SET_HEADER_ADD_NEW_ADDRESS,
    SET_HEADER_EDIT_ADDRESS,
    SET_PROFILE_ADDRESS,
    SET_PROFILE_DASHBOARD,
    SET_PROFILE_LOGOUT,
    SET_PROFILE_PROMO_AND_SALE,
    SET_PROFILE_WISHLIST
} from '../../types';

const initialState = {
    show_label_profile: SET_PROFILE_DASHBOARD,
    tab_menu_list: [
        {
            label: SET_PROFILE_DASHBOARD,
            path: LOCATION_PATH_DASHBOARD
        },
        {
            label: SET_PROFILE_ADDRESS,
            path: LOCATION_PATH_ADDRESS
        }

        // {
        //     label: SET_PROFILE_WISHLIST,
        //     path: LOCATION_PATH_WISHLIST
        // }

        // {
        //     label: SET_PROFILE_PROMO_AND_SALE,
        //     path: LOCATION_PATH_PROMO_AND_SALE
        // }
    ],
    headerPage: '',
    label_status_payment: ''
};

export default function urlProfileReducer(state = initialState, action) {
    switch (action.type) {
        case SET_PROFILE_DASHBOARD:
            return {
                ...state,
                show_label_profile: action.type
            };
        case SET_PROFILE_ADDRESS:
            return {
                ...state,
                show_label_profile: action.type
            };
        case SET_PROFILE_WISHLIST:
            return {
                ...state,
                show_label_profile: action.type
            };
        case SET_PROFILE_PROMO_AND_SALE:
            return {
                ...state,
                show_label_profile: action.type
            };
        case SET_PROFILE_LOGOUT:
            return {
                ...state,
                show_label_profile: action.type
            };

        case SET_HEADER_ADD_NEW_ADDRESS:
            return {
                ...state,
                headerPage: SET_HEADER_ADD_NEW_ADDRESS
            };
        case SET_HEADER_EDIT_ADDRESS:
            return {
                ...state,
                headerPage: SET_HEADER_EDIT_ADDRESS
            };
        case LABEL_STATUS_PAYMENT:
            return {
                ...state,
                label_status_payment: action.payload
            };

        default:
            return state;
    }
}
