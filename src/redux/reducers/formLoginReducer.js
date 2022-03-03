import { SET_EMAIL, SET_PASSWORD } from '../type';

const initialState = {
    email: '', // ini sebagai cth dulu
    password: ''
};

export default function seputarOngkirForCheckoutReducer(state = initialState, action) {
    switch (action.type) {
        case SET_EMAIL:
            return {
                ...state,
                email: action.payload
            };
        case SET_PASSWORD:
            return {
                ...state,
                password: action.payload
            };
        default:
            return state;
    }
}
