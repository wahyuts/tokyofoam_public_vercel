import { GET_COMMENT } from '../type';

const initialState = {
    review_comment: []
};

export default function commentReducer(state = initialState, action) {
    switch (action.type) {
        case GET_COMMENT:
            return {
                // ...state,
                review_comment: action.payload
                // dataProductOnBag: arr
            };
        default:
            return state;
    }
}
