import {
    SET_ADD_TO_BAG,
    LOADING_ON_BAG,
    DELETE_BAG,
    DELETE_ALL_BAG,
    TOTAL_PRICE,
    SET_SHIPPING_FEE,
    SET_TOTAL_PLUS_SHIPPING,
    SET_ADD_KURIR
} from '../type';

const initialState = {
    dataProductOnBag: [],
    totalPrice: 0,
    shippingFee: 0,
    totalPrice_plus_shipping_minus_benefit_member: 0,
    kurir: '',
    loading_on_bag: false
};

export default function dataProductReducer(state = initialState, action) {
    switch (action.type) {
        case SET_ADD_TO_BAG:
            return {
                // ...state,
                dataProductOnBag: action.payload
                // dataProductOnBag: arr
            };
        case LOADING_ON_BAG:
            return {
                ...state,
                loading_on_bag: true
            };
        case TOTAL_PRICE:
            return {
                ...state,
                totalPrice: action.payload
            };
        case SET_ADD_KURIR:
            return {
                ...state,
                kurir: action.payload
            };
        case SET_SHIPPING_FEE:
            return {
                ...state,
                shippingFee: action.payload
            };
        case SET_TOTAL_PLUS_SHIPPING:
            return {
                ...state,
                totalPrice_plus_shipping_minus_benefit_member: action.payload
            };

        case DELETE_BAG:
            // return {
            //     ...state,
            //     dataProductOnBag: action.payload
            // };

            let index3 = state.dataProductOnBag.findIndex((scream) => scream.id === action.payload);
            state.dataProductOnBag.splice(index3, 1);
            return {
                ...state
            };
        case DELETE_ALL_BAG:
            return {
                ...state,
                dataProductOnBag: action.payload
            };
        default:
            return state;
    }
}
