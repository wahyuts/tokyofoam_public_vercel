import {
    SET_USER,
    SET_AUTHENTICATED,
    SET_UNAUTHENTICATED,
    LOADING_USER,
    SET_LOCATION_PROVINCE_LOGREG,
    SET_ADD_ID_KOTA_LOGREG,
    SET_ADD_KOTA_LOGREG,
    SET_ADD_KECAMATAN_LOGREG
} from '../type';

const initialState = {
    authenticated: false,
    // authenticated: true,
    loading: false,
    credentials: {},
    likes: [],
    notifications: [],
    locationProvinceLogreg: '*Pilih Provinsi',
    stateIdKotaLogreg: 'IDKota',
    stateKotaLogreg: 'Kota',
    stateKecamatanLogreg: 'Kecamatan'
};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case SET_AUTHENTICATED:
            return {
                ...state,
                authenticated: true
            };
        case SET_UNAUTHENTICATED: // UNTUK SIGN OUT
            return {
                ...state,
                authenticated: false,
                // initialState,
                credentials: {}
            };
        case SET_USER:
            return {
                authenticated: true,
                loading: false,
                credentials: { ...action.payload }
                // ...action.payload
            };
        case LOADING_USER:
            return {
                ...state,
                loading: true
            };
        case SET_LOCATION_PROVINCE_LOGREG:
            return {
                ...state,
                locationProvinceLogreg: action.payload
            };
        case SET_ADD_ID_KOTA_LOGREG:
            return {
                ...state,
                stateIdKotaLogreg: action.payload
            };
        case SET_ADD_KOTA_LOGREG:
            return {
                ...state,
                stateKotaLogreg: action.payload
            };
        case SET_ADD_KECAMATAN_LOGREG:
            return {
                ...state,
                stateKecamatanLogreg: action.payload
            };

        default:
            return state;
    }
}
