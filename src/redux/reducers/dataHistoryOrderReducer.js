// import { SET_HISTORY_ORDER } from '../../types';

import Img from '../../../public/assets/images/Single-Pillow-1.png';

import { SET_HISTORY_ORDER, GET_ALL_ORDER_FOR_ADMIN, GET_ORDER_BY_ID_ORDER, SET_DATA_ORDER_BY_ID } from '../../types';

const initialState = {
    dataOrderById: {},
    all_order_for_admin: [],
    single_order_by_id_order: {}
};

export default function dataHistoryOrder(state = initialState, action) {
    switch (action.type) {
        case SET_HISTORY_ORDER:
            return {
                ...state,
                data_history_order: action.payload
            };
        case SET_DATA_ORDER_BY_ID:
            return {
                ...state,
                dataOrderById: action.payload
            };
        case GET_ALL_ORDER_FOR_ADMIN:
            return {
                ...state,
                all_order_for_admin: action.payload
            };
        case GET_ORDER_BY_ID_ORDER:
            return {
                ...state,
                single_order_by_id_order: action.payload
            };
        default:
            return state;
    }
}
