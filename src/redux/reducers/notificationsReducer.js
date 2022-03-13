import { GET_ALL_NOTIFICATIONS } from '../type';

const initialState = {
    all_notifications: []
};

export default function commentReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_NOTIFICATIONS:
            return {
                // ...state,
                all_notifications: action.payload
                // dataProductOnBag: arr
            };
        default:
            return state;
    }
}
