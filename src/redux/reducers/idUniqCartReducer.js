import { SET_ID_UNIQ_CART_USER } from '../type';

const initialState = {
    idUniqCartUser: ''
};

export default function idUniqCartReducer(state = initialState, action) {
    switch (action.type) {
        case SET_ID_UNIQ_CART_USER:
            return {
                // ...state,
                idUniqCartUser: action.payload
                // dataProductOnBag: arr
            };
        default:
            return state;
    }
}
