const initialState = {
    pesanan: 'listPesanan'
};

export default function uiPesanan(state = initialState, action) {
    // console.log(action.type);
    switch (action.type) {
        case 'listPesanan':
            return {
                ...state,
                pesanan: action.type
            };
        case 'rincianPesanan':
            return {
                ...state,
                pesanan: action.type
            };

        default:
            return state;
    }
}
