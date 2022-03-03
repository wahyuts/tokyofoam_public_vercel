export const setPesanan = (label) => (dispatch) => {
    console.log(label);
    return dispatch({
        type: label
    });
};

export default setPesanan;
