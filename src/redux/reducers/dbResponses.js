import { DB_RESPONSE_STATUS } from '../../types';

const initialState = {
    statusResponse: {}
};

export default function dbResponses(state = initialState, action) {
    switch (action.type) {
        case DB_RESPONSE_STATUS:
            return {
                ...state,
                statusResponse: action.payload
            };

        default:
            return state;
    }
}
