import {
    SET_ID_PROV,
    SET_LOCATION_PROVINCE,
    SET_ADD_ID_KOTA,
    SET_ADD_KOTA,
    SET_ADD_ID_KECAMATAN,
    SET_ADD_KECAMATAN
} from '../type';

const initialState = {
    // stateIdProv: 'IDProv',
    // locationProvince: '*Pilih Provinsi',
    // stateIdKota: 'IDKota',
    // stateKota: 'Kota',
    // stateIdKecamatan: 'IDKecamatan',
    // stateKecamatan: 'Kecamatan'

    stateIdProv: '',
    locationProvince: '',
    stateIdKota: '',
    stateKota: '',
    stateIdKecamatan: '',
    stateKecamatan: ''
};

export default function shippingAddresReducer(state = initialState, action) {
    switch (action.type) {
        case SET_ID_PROV:
            return {
                ...state,
                stateIdProv: action.payload
            };
        case SET_LOCATION_PROVINCE:
            return {
                ...state,
                locationProvince: action.payload
            };
        case SET_ADD_ID_KOTA:
            return {
                ...state,
                stateIdKota: action.payload
            };
        case SET_ADD_KOTA:
            return {
                ...state,
                stateKota: action.payload
            };
        case SET_ADD_ID_KECAMATAN:
            return {
                ...state,
                stateIdKecamatan: action.payload
            };
        case SET_ADD_KECAMATAN:
            return {
                ...state,
                stateKecamatan: action.payload
            };
        default:
            return state;
    }
}
