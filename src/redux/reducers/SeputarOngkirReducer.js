import { GET_DETAIL_DATA_KURIR, SET_KURIR_NAME } from '../type';

const initialState = {
    detailDataKurir: [], // ini sebagai cth dulu
    kurirName: ''
};

export default function seputarOngkirReducer(state = initialState, action) {
    switch (action.type) {
        case GET_DETAIL_DATA_KURIR:
            return {
                ...state,
                detailDataKurir: action.payload
            };
        case SET_KURIR_NAME:
            return {
                ...state,
                kurirName: action.payload
            };
        default:
            return state;
    }
}
