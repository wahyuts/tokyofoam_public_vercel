// import { SET_HISTORY_ORDER } from '../../pages/profile/types';
import axios from 'axios';
import { GET_ALL_ORDER_FOR_ADMIN, SET_HISTORY_ORDER, GET_ORDER_BY_ID_ORDER, SET_DATA_ORDER_BY_ID } from '../../types';
import { getListOrderUserOnUserDashboard } from './dataProductActions';

export const historyOrder = () => (dispatch) => {
    return dispatch({
        type: SET_HISTORY_ORDER,
        payload: ''
    });
};

export const deleteOrderById = (id) => async (dispatch) => {
    const API = `https://tokyofoam.herokuapp.com/api/order/delete/${id}`;
    try {
        const response = await axios({
            method: 'delete',
            url: API
        });
        await dispatch(getListOrderUserOnUserDashboard());
        return response?.statusText;
    } catch (error) {
        console.log(error);
    }
};
export const getOrderById = (id) => async (dispatch) => {
    const API = `https://tokyofoam.herokuapp.com/api/order/byId/${id}`;
    try {
        const response = await axios({
            method: 'get',
            url: API
        });
        return dispatch({
            type: SET_DATA_ORDER_BY_ID,
            payload: response?.data?.data
        });
    } catch (error) {
        console.log(error);
    }
};

export const getAllOrderForAdminDashboard = () => async (dispatch) => {
    const API = `https://tokyofoam.herokuapp.com/api/order/getAll`;
    try {
        const results = await axios.get(API);
        dispatch({
            type: GET_ALL_ORDER_FOR_ADMIN,
            payload: results.data.data
        });
    } catch (error) {
        if (error.response) {
            // internet online, request made, tapi error karena data tidak match dengan BE
            console.log(error);
        } else if (error.request) {
            // jiks internet offline / disconnect/ gangguan koneksi terjadi
            console.log(error.request);
            alert('Terjadi Gangguan Pada Koneksi Anda!');
        } else {
            console.log('Error', error.message);
        }
    }
};

export const getSingleOrderByIdOrder = (id) => async (dispatch) => {
    const API = `https://tokyofoam.herokuapp.com/api/order/byId/${id}`;
    try {
        const results = await axios.get(API);
        dispatch({
            type: GET_ORDER_BY_ID_ORDER,
            payload: results.data.data
        });
        dispatch(setPesanan('rincianPesanan'));
    } catch (error) {
        if (error.response) {
            // internet online, request made, tapi error karena data tidak match dengan BE
            console.log(error);
        } else if (error.request) {
            // jiks internet offline / disconnect/ gangguan koneksi terjadi
            console.log(error.request);
            alert('Terjadi Gangguan Pada Koneksi Anda!');
        } else {
            console.log('Error', error.message);
        }
    }
};

export const saveStatusPengiriman =
    (id, setIsEditStatusPengiriman, isEditStatusPengiriman, dataStatusKirim) => async (dispatch) => {
        const API = `https://tokyofoam.herokuapp.com/api/order/byId/${id}`;
        try {
            const results = await axios.put(API, dataStatusKirim);
            if (results.data.message === 'Data berhasil di perbaharui') {
                alert('Status Pengiriman Berhasil Di Update !');
                setIsEditStatusPengiriman({
                    ...isEditStatusPengiriman,
                    status: !isEditStatusPengiriman.status,
                    label: isEditStatusPengiriman.label === 'Edit' ? 'Save' : 'Edit'
                });
            } else {
                alert('Tidak Dapat Update! Gangguan Koneksi!');
            }
        } catch (error) {
            if (error.response) {
                // internet online, request made, tapi error karena data tidak match dengan BE
                console.log(error);
            } else if (error.request) {
                // jiks internet offline / disconnect/ gangguan koneksi terjadi
                console.log(error.request);
                alert('Terjadi Gangguan Pada Koneksi Anda!');
            } else {
                console.log('Error', error.message);
            }
        }
    };

export const saveTujuanPengiriman =
    (id, setIsEditTujuanPengiriman, isEditTujuanPengiriman, dataTujuanKirim) => async (dispatch) => {
        const API = `https://tokyofoam.herokuapp.com/api/order/byId/${id}`;
        try {
            const results = await axios.put(API, dataTujuanKirim);
            if (results.data.message === 'Data berhasil di perbaharui') {
                alert('Tujuan Pengiriman Berhasil Di Update !');
                setIsEditTujuanPengiriman({
                    ...isEditTujuanPengiriman,
                    status: !isEditTujuanPengiriman.status,
                    label: isEditTujuanPengiriman.label === 'Edit' ? 'Save' : 'Edit'
                });
            } else {
                alert('Tidak Dapat Update! Gangguan Koneksi!');
            }
        } catch (error) {
            if (error.response) {
                // internet online, request made, tapi error karena data tidak match dengan BE
                console.log(error);
            } else if (error.request) {
                // jiks internet offline / disconnect/ gangguan koneksi terjadi
                console.log(error.request);
                alert('Terjadi Gangguan Pada Koneksi Anda!');
            } else {
                console.log('Error', error.message);
            }
        }
    };

export const savePelangganButton = (id, setIsEditPelanggan, isEditPelanggan, dataPelanggans) => async (dispatch) => {
    const API = `https://tokyofoam.herokuapp.com/api/order/byId/${id}`;
    try {
        const results = await axios.put(API, dataPelanggans);
        if (results.data.message === 'Data berhasil di perbaharui') {
            alert('Data Pelanggan Berhasil Di Update !');
            setIsEditPelanggan({
                ...isEditPelanggan,
                status: !isEditPelanggan.status,
                label: isEditPelanggan.label === 'Edit' ? 'Save' : 'Edit'
            });
        } else {
            alert('Tidak Dapat Update! Gangguan Koneksi!');
        }
    } catch (error) {
        if (error.response) {
            // internet online, request made, tapi error karena data tidak match dengan BE
            console.log(error);
        } else if (error.request) {
            // jiks internet offline / disconnect/ gangguan koneksi terjadi
            console.log(error.request);
            alert('Terjadi Gangguan Pada Koneksi Anda!');
        } else {
            console.log('Error', error.message);
        }
    }
};

export const saveNotedCatatan = (id, setIsEditNote, isEditNote, dataCatatan) => async (dispatch) => {
    const API = `https://tokyofoam.herokuapp.com/api/order/byId/${id}`;
    try {
        // alert('Coba dulu jajal!');
        // console.log('LIHAT API NYA', API);
        // setIsEditStatusPengiriman({
        //     ...isEditStatusPengiriman,
        //     status: !isEditStatusPengiriman.status,
        //     label: isEditStatusPengiriman.label === 'Edit' ? 'Save' : 'Edit'
        // });
        const results = await axios.put(API, dataCatatan);
        if (results.data.message === 'Data berhasil di perbaharui') {
            alert('Catatan Berhasil Di Update !');
            setIsEditNote({
                ...isEditNote,
                status: !isEditNote.status,
                label: isEditNote.label === 'Edit' ? 'Save' : 'Edit'
            });
        } else {
            alert('Tidak Dapat Update! Gangguan Koneksi!');
        }
    } catch (error) {
        if (error.response) {
            // internet online, request made, tapi error karena data tidak match dengan BE
            console.log(error);
        } else if (error.request) {
            // jiks internet offline / disconnect/ gangguan koneksi terjadi
            console.log(error.request);
            alert('Terjadi Gangguan Pada Koneksi Anda!');
        } else {
            console.log('Error', error.message);
        }
    }
};

export const deleteOrderByIdOnAdmin = (id) => async (dispatch) => {
    const API = `https://tokyofoam.herokuapp.com/api/order/delete/${id}`;
    try {
        const results = await axios.delete(API);
        // if (results.data.message === 'Data berhasil di perbaharui') {
        //     alert('Status Pengiriman Berhasil Di Update !');
        // } else {
        //     alert('Tidak Dapat Update! Gangguan Koneksi!');
        // }
    } catch (error) {
        if (error.response) {
            // internet online, request made, tapi error karena data tidak match dengan BE
            console.log(error);
        } else if (error.request) {
            // jiks internet offline / disconnect/ gangguan koneksi terjadi
            console.log(error.request);
            alert('Terjadi Gangguan Pada Koneksi Anda!');
        } else {
            console.log('Error', error.message);
        }
    }
};

export const setPesanan = (label) => (dispatch) => {
    // console.log(label);
    return dispatch({
        type: label
    });
};
