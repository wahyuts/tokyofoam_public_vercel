import {
    GET_ALL_PRODUCT,
    GET_ALL_SINGLE_PRODUCT,
    GET_TRUE_ALL_SINGLE_PRODUCT,
    GET_ALL_SINGLE_PRODUCT_BY_PAGE,
    GET_ALL_BUNDLING_PRODUCT,
    GET_TRUE_ALL_BUNDLING_PRODUCT,
    GET_ALL_BUNDLING_PRODUCT_BY_PAGE,
    GET_PRODUCT_BY_NAME,
    GET_PRODUCT_BY_ID,
    LOADING_PRODUCT,
    SET_CHANGEABLE_PRODUCT_NAME,
    SET_POTONGAN_MEMBERSHIP
} from '../type';

const initialState = {
    dataProduct: [], // ini sebagai cth dulu
    dataProductSingle: [],
    dataSemuaProductSingle: [],
    dataProductSingleByPage: [],
    dataProductBundling: [],
    dataSemuaProductBundling: [],
    dataProductBundlingByPage: [],
    changeable_Product_Name: {},
    productByName: {},
    productById: {},
    potonganMembership: 0,
    loading_Product: false
};

export default function dataProductReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_PRODUCT:
            return {
                ...state,
                dataProduct: action.payload
            };
        case GET_ALL_SINGLE_PRODUCT:
            return {
                ...state,
                dataProductSingle: action.payload
            };
        case GET_TRUE_ALL_SINGLE_PRODUCT:
            return {
                ...state,
                dataSemuaProductSingle: action.payload
            };
        case GET_ALL_SINGLE_PRODUCT_BY_PAGE:
            return {
                ...state,
                dataProductSingleByPage: action.payload
            };
        case GET_ALL_BUNDLING_PRODUCT:
            return {
                ...state,
                dataProductBundling: action.payload
            };
        case GET_TRUE_ALL_BUNDLING_PRODUCT:
            return {
                ...state,
                dataSemuaProductBundling: action.payload
            };
        case GET_ALL_BUNDLING_PRODUCT_BY_PAGE:
            return {
                ...state,
                dataProductBundlingByPage: action.payload
            };
        case SET_CHANGEABLE_PRODUCT_NAME:
            return {
                ...state,
                changeable_Product_Name: action.payload
            };
        case GET_PRODUCT_BY_NAME:
            return {
                ...state,
                productByName: action.payload
            };
        case GET_PRODUCT_BY_ID:
            return {
                ...state,
                productById: action.payload
            };
        case SET_POTONGAN_MEMBERSHIP:
            return {
                ...state,
                potonganMembership: action.payload
            };
        case LOADING_PRODUCT:
            return {
                ...state,
                loading_Product: true
            };
        default:
            return state;
    }
}
