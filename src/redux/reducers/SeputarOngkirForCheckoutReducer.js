import { SET_KURIR_NAME_FOR_CHECKOUT, GET_DETAIL_DATA_KURIR_FOR_CHECKOUT } from '../type';

const initialState = {
    detailDataKurirForCheckout: [], // ini sebagai cth dulu
    kurirNameForCheckout: ''
};

export default function seputarOngkirForCheckoutReducer(state = initialState, action) {
    switch (action.type) {
        case GET_DETAIL_DATA_KURIR_FOR_CHECKOUT:
            return {
                ...state,
                detailDataKurirForCheckout: action.payload
            };
        case SET_KURIR_NAME_FOR_CHECKOUT:
            return {
                ...state,
                kurirNameForCheckout: action.payload
            };
        default:
            return state;
    }
}
