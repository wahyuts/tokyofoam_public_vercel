import { SET_ORDER_ID } from '../type';

const initialState = {
    order_id: ''
};

export default function UIReducer(state = initialState, action) {
    switch (action.type) {
        case SET_ORDER_ID:
            return {
                ...state,
                order_id: action.payload
            };
        default:
            return state;
    }
}
