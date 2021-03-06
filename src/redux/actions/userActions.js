import axios from 'axios';
import { DB_RESPONSE_STATUS } from '../../types';
import {
    SET_USER,
    SET_ERRORS,
    SET_ERRORS_REGISTER,
    CLEAR_ERRORS,
    CLEAR_ERRORS_REGISTER,
    SET_ERRORS_CHECKOUT_BUTTON,
    CLEAR_ERRORS_CHECKOUT_BUTTON,
    SET_ERRORS_EMPTY_BAG,
    SET_ERRORS_FORGOT_PASSWORD_SUBMIT,
    CLEAR_ERRORS_FORGOT_PASSWORD_SUBMIT,
    CLEAR_ERRORS_EMPTY_BAG,
    LOADING_UI,
    STOP_LOADING_UI,
    SET_AUTHENTICATED,
    SET_UNAUTHENTICATED,
    SET_EMAIL,
    SET_PASSWORD,
    LOADING_USER,
    // MARK_NOTIFICATIONS_READ,
    RESET_LOCATION,
    SET_LOCATION_PROVINCE_LOGREG,
    SET_ADD_ID_KOTA_LOGREG,
    SET_ADD_KOTA_LOGREG,
    SET_ADD_KECAMATAN_LOGREG,
    SET_ADD_TO_BAG,
    SET_ID_UNIQ_CART_USER,
    SET_GET_ALL_DATA_USER,
    SET_GET_DATA_USER_ORDER,
    GET_COMMENT,
    SET_GET_DATA_USER_HISTORY_ORDER,
    DELETE_ALL_BAG
} from '../type';
import { dbResponseSuccess } from './dbResponses';

// Login untuk DESKTOP And MOBILE Version
export const loginUser = (userData, setMenuOpen, keranjang, setIsOpenDrawer, setShowSI) => async (dispatch) => {
    // setMenuOpen itu buat drawer desktop
    // setIsOpenDrawer, setShowSI itu buat drawer mobile
    // console.log('USER', userData);
    // console.log('keranjang', keranjang);
    const API = 'https://tokyofoam.herokuapp.com/api/auth/login';
    const URLCheckout = localStorage.getItem('URLCheckout');

    try {
        await dispatch({ type: LOADING_UI });
        const results = await axios.post(API, userData);
        if (results.data.success === true) {
            setAuthorizationHeader(results.data.token);
            dispatch(getUserData(setMenuOpen, setIsOpenDrawer, setShowSI, keranjang)); // set authenticated nya ada didalam getUserData
            alert('Login Berhasil ! Welcome To Tokyofoam !');
            if (URLCheckout === '/cart') {
                dispatch(clearErrorCheckoutButton());
            }
        }
    } catch (error) {
        if (error.response) {
            // internet online, request made, tapi error karena data tidak match dengan BE
            dispatch({
                type: SET_ERRORS,
                payload: error.response.data.message
            });
        } else if (error.request) {
            // jiks internet offline / disconnect/ gangguan koneksi terjadi
            console.log(error.request);
            alert('Terjadi Gangguan Pada Koneksi Anda!');
            dispatch({
                type: STOP_LOADING_UI
            });
        } else {
            console.log('Error', error.message);
        }
    }
};

//Admin-Login untuk DESKTOP And MOBILE Version
export const adminLogin = (userData, router) => async (dispatch) => {
    // setMenuOpen itu buat drawer desktop
    // setIsOpenDrawer, setShowSI itu buat drawer mobile
    // console.log('USER', userData);
    // console.log('keranjang', keranjang);
    const API = 'https://tokyofoam.herokuapp.com/api/auth/login';
    // const URLCheckout = localStorage.getItem('URLCheckout');

    try {
        await dispatch({ type: LOADING_UI });
        const results = await axios.post(API, userData);
        setAuthorizationHeader(results.data.token);
        if (results.data.token) {
            dispatch({
                type: STOP_LOADING_UI
            });
            dispatch({ type: SET_AUTHENTICATED });
            dispatch(getAdminData());
            router.push('/admin');
        }
        // set authenticated nya ada didalam getUserData
        // if (URLCheckout === '/cart') {
        //     dispatch(clearErrorCheckoutButton());
        // }
    } catch (error) {
        if (error.response) {
            // internet online, request made, tapi error karena data tidak match dengan BE
            alert('Email atau Password salah');
            dispatch({
                type: STOP_LOADING_UI
            });
            // dispatch({
            //     type: SET_ERRORS,
            //     payload: error.response.data.message
            // });
        } else if (error.request) {
            // jiks internet offline / disconnect/ gangguan koneksi terjadi
            console.log(error.request);
            alert('Terjadi Gangguan Pada Koneksi Anda!');
            dispatch({
                type: STOP_LOADING_UI
            });
        } else {
            console.log('Error', error.message);
        }
    }
};

//Buat Update Cart BE
export const updatePutCartBEFromLogin = (keranjang) => async (dispatch) => {
    const API = `https://tokyofoam.herokuapp.com/api/cart/findByUserId`;
    const API_PUT = `https://tokyofoam.herokuapp.com/api/cart/update`;
    try {
        getAuthorizationHeaderTokenUser();
        axios.get(API).then((res) => {
            // Jika baru pertama kali login (keranjang belanja nya di back end  BELUM ADA(bukan isinya ya tapi keranjangnya) )
            if (res.data.cart.length === 0) {
                if (keranjang.length !== 0) {
                    // jika keranjang diredux gak kosong
                    getAuthorizationHeaderTokenUser();

                    let Obj = {
                        data_cart: keranjang.map((bag) => ({
                            id: bag.id,
                            id_manual_product: bag.id_manual_product,
                            nameProduct: bag.nameProduct,
                            imageProduct: bag.imageProduct,
                            price: bag.price,
                            promo_price: bag.promo_price,
                            weight: bag.weight,
                            qty: bag.qty,
                            price_x_qty: bag.price_x_qty,
                            promo_price_x_qty: bag.promo_price_x_qty
                        }))
                    };

                    axios.put(API_PUT, Obj);
                    axios.get(API).then((res) => {
                        const idCartUniq = [res.data.cart[0]._id];
                        dispatch({
                            type: SET_ID_UNIQ_CART_USER,
                            payload: idCartUniq
                        });
                    });
                } else {
                    //jika keranjang redux ksong
                    null;
                }
            } else {
                //Jika Sudah pernah login (not first time) tetapi keranjang belanja di Back End kosong (keranjangnya ada tapi kosong di back end)
                if (res.data.cart[0].data_cart.length === 0) {
                    if (keranjang.length !== 0) {
                        getAuthorizationHeaderTokenUser();

                        let Obj = {
                            data_cart: keranjang.map((bag) => ({
                                id: bag.id,
                                id_manual_product: bag.id_manual_product,
                                nameProduct: bag.nameProduct,
                                imageProduct: bag.imageProduct,
                                price: bag.price,
                                promo_price: bag.promo_price,
                                weight: bag.weight,
                                qty: bag.qty,
                                price_x_qty: bag.price_x_qty,
                                promo_price_x_qty: bag.promo_price_x_qty
                            }))
                        };

                        axios.put(API_PUT, Obj);
                        axios.get(API).then((res) => {
                            const idCartUniq = [res.data.cart[0]._id];
                            dispatch({
                                type: SET_ID_UNIQ_CART_USER,
                                payload: idCartUniq
                            });
                        });
                    } else {
                        //jika keranjang redux ksong
                        null;
                    }
                } else {
                    if (keranjang.length === 0) {
                        const cartNonEmpty = res.data.cart[0].data_cart;
                        const idCartUniq = [res.data.cart[0]._id];
                        console.log('CartNonEmpty', cartNonEmpty);
                        dispatch({
                            type: SET_ADD_TO_BAG,
                            payload: cartNonEmpty
                            // payload: arr
                        });
                        dispatch({
                            type: SET_ID_UNIQ_CART_USER,
                            payload: idCartUniq
                        });
                    } else {
                        const cartNonEmpty = res.data.cart[0].data_cart; // keknya perlu dijabarin lagi
                        let xtra;
                        for (let i = 0; i < cartNonEmpty.length; i++) {
                            xtra = cartNonEmpty[i];
                        }
                        let arr = keranjang;
                        // arr.unshift(cartNonEmpty);
                        arr.unshift(xtra);
                        const idCartUniq = [res.data.cart[0]._id];
                        console.log('CartNonEmpty', cartNonEmpty);
                        console.log('xtra', xtra);
                        console.log('FINAL ARR', arr);
                        console.log('KERANJANG', keranjang);

                        dispatch({
                            type: SET_ADD_TO_BAG,
                            payload: arr
                        });
                        dispatch({
                            type: SET_ID_UNIQ_CART_USER,
                            payload: idCartUniq
                        });
                    }
                }
            }
        });
    } catch (error) {
        // dispatch({
        //     type: SET_ERRORS,
        //     payload: error.response.data.message
        // });
        console.log(error);
    }
};

// forgot password/ change password untuk DESKTOP version
export const changePassword =
    (newUserData, setShowBoxEmailVerification, setRegister, setForgot, setBoxForgot) => async (dispatch) => {
        const API = 'https://tokyofoam.herokuapp.com/api/auth/forgotPassword';
        try {
            await dispatch({ type: LOADING_UI }); // meanggil dispatch untuk membuar loading : true
            const results = await axios.post(API, newUserData);
            if (results.data.message === 'Link reset password sudah dikirim ke email') {
                const tokenReset = `Bearer ${results.data.token}`;
                localStorage.setItem('ResetToken', tokenReset); // menyimpan IdToken di localStorage
                dispatch({ type: STOP_LOADING_UI });
                setShowBoxEmailVerification(true);
                setRegister(false);
                setForgot(false);
                setBoxForgot(true);
                // dispatch({ type: CLEAR_ERRORS });
                dispatch({ type: CLEAR_ERRORS_FORGOT_PASSWORD_SUBMIT });
            }
        } catch (error) {
            // dispatch({ type: SET_ERRORS, payload: error.response.data.message });
            dispatch({ type: SET_ERRORS_FORGOT_PASSWORD_SUBMIT, payload: error.response.data.message });
        }
    };

// forgot password/ change password untuk MOBILE version
export const changePasswordMobileDrawer = (newUserData, setRegister, setForgot, setBoxForgot) => async (dispatch) => {
    const API = 'https://tokyofoam.herokuapp.com/api/auth/forgotPassword';
    try {
        await dispatch({ type: LOADING_UI }); // meanggil dispatch untuk membuar loading : true
        const results = await axios.post(API, newUserData);
        if (results.data.message === 'Link reset password sudah dikirim ke email') {
            const tokenReset = `Bearer ${results.data.token}`;
            localStorage.setItem('ResetToken', tokenReset); // menyimpan IdToken di localStorage
            dispatch({ type: STOP_LOADING_UI });
            setRegister(false);
            setForgot(false);
            setBoxForgot(true);
            // dispatch({ type: CLEAR_ERRORS });
            dispatch({ type: CLEAR_ERRORS_FORGOT_PASSWORD_SUBMIT });
        }
    } catch (error) {
        // dispatch({ type: SET_ERRORS, payload: error.response.data.message });
        dispatch({ type: SET_ERRORS_FORGOT_PASSWORD_SUBMIT, payload: error.response.data.message });
    }
};

// Reset password
export const resetPassword = (newUserData, router) => async (dispatch) => {
    const API = 'https://tokyofoam.herokuapp.com/api/auth/resetPassword';
    try {
        await dispatch({ type: LOADING_UI });
        getAuthorizationResetToken();
        const results = await axios.post(API, newUserData);
        if (results.data.message === 'Password sudah di perbaharui') {
            dispatch({ type: STOP_LOADING_UI });
            alert('Password sudah berhasil di perbaharui');
            router.push('/');
            localStorage.removeItem('ResetToken');
        }
    } catch (error) {
        // dispatch({ type: SET_ERRORS, payload: error.response.data.message });
        if (error.response.status === 400) {
            dispatch({ type: STOP_LOADING_UI });
            alert(`${error.response.data.message}`);
        }
        console.log('ERROR', error);
    }
};

//Change password khusus yang dari user dashboard
export const changePasswordSpecial = (newUserData, router) => async (dispatch) => {
    const API = 'https://tokyofoam.herokuapp.com/api/auth/resetPassword';
    try {
        await dispatch({ type: LOADING_UI });
        getAuthorizationHeaderTokenUser();
        const results = await axios.post(API, newUserData);
        if (results.data.message === 'Password sudah di perbaharui') {
            dispatch({ type: STOP_LOADING_UI });
            alert('Password sudah berhasil di perbaharui');
            dispatch({ type: STOP_LOADING_UI });
            router.push('/');
            localStorage.removeItem('ResetToken');
        }
    } catch (error) {
        // dispatch({ type: SET_ERRORS, payload: error.response.data.message });
        if (error.response.status === 400) {
            dispatch({ type: STOP_LOADING_UI });
            alert(`${error.response.data.message}`);
        }
        console.log('ERROR', error);
        // console.log(error);
    }
};

export const onlyForStopLoadingUI = () => async (dispatch) => {
    dispatch({ type: STOP_LOADING_UI });
};

// Sign Up untuk DESKTOP version
export const signupUser = (newUserData, setShowBoxEmailVerification) => async (dispatch) => {
    const API = 'https://tokyofoam.herokuapp.com/api/auth/register';
    try {
        await dispatch({ type: LOADING_UI });
        const results = await axios.post(API, newUserData);
        if (results.data.message === 'Email verifikasi sudah dikirimkan') {
            setShowBoxEmailVerification(true);
            dispatch({ type: STOP_LOADING_UI });
            dispatch({ type: CLEAR_ERRORS_REGISTER });
        }
    } catch (error) {
        dispatch({
            type: SET_ERRORS_REGISTER,
            payload: error.response.data.message
        });
    }
};

// Sign Up untuk MOBILE version
export const signupUserMobile = (newUserData, setIsOpenDrawer, setShowSI, regiterAlertSuccess) => async (dispatch) => {
    const API = 'https://tokyofoam.herokuapp.com/api/auth/register';
    try {
        await dispatch({ type: LOADING_UI });
        const results = await axios.post(API, newUserData);
        if (results.data.message === 'Email verifikasi sudah dikirimkan') {
            regiterAlertSuccess();
            setIsOpenDrawer(false);
            setShowSI(true);
            dispatch({ type: STOP_LOADING_UI });
            dispatch({ type: CLEAR_ERRORS_REGISTER });
        }
    } catch (error) {
        dispatch({
            type: SET_ERRORS_REGISTER,
            payload: error.response.data.message
        });
    }
};

export const logoutUser = () => (dispatch) => {
    localStorage.removeItem('FBIdToken');
    delete axios.defaults.headers.common['Authorization'];
    dispatch({ type: SET_UNAUTHENTICATED });
    dispatch({ type: CLEAR_ERRORS });
    dispatch(deleteBagReduxFromLogout());
    alert('Anda Baru Saja Logout !');
};

export const deleteBagReduxFromLogout = (selected) => (dispatch) => {
    // let arr = [];
    // arr.unshift(selected);
    dispatch({
        type: DELETE_ALL_BAG,
        payload: []
    });
};

//Fungsi mau dapetin data2 user (biasanya buat user profile atau mau cantumin nama di headnav)
export const getUserData = (setMenuOpen, setIsOpenDrawer, setShowSI, keranjang) => (dispatch) => {
    const API = 'https://tokyofoam.herokuapp.com/api/user/profile';
    dispatch({ type: LOADING_USER });
    axios
        .get(API)
        .then((res) => {
            dispatch({
                type: SET_USER,
                payload: res.data.user
            });

            dispatch({
                type: SET_EMAIL,
                payload: ''
            });
            dispatch({
                type: SET_PASSWORD,
                payload: ''
            });
            dispatch(updatePutCartBEFromLogin(keranjang));

            setMenuOpen(false);
            setIsOpenDrawer(false);
            setShowSI(true);

            // setTimeout(dispatch({ type: CLEAR_ERRORS }), 3000);
            dispatch({ type: CLEAR_ERRORS });
        })
        .catch((err) => {
            console.log(err);
        });
};

//Fungsi buat get user data TANPA Embel2 cart keranjang, box drawer dll
export const getOnlyUserData = () => (dispatch) => {
    const API = 'https://tokyofoam.herokuapp.com/api/user/profile';
    // dispatch({ type: LOADING_USER });
    getAuthorizationHeaderTokenUser();
    axios
        .get(API)
        .then((res) => {
            dispatch({
                type: SET_USER,
                payload: res.data.user
            });

            dispatch({
                type: SET_EMAIL,
                payload: ''
            });
            dispatch({
                type: SET_PASSWORD,
                payload: ''
            });

            // setTimeout(dispatch({ type: CLEAR_ERRORS }), 3000);
            // dispatch({ type: CLEAR_ERRORS });
        })
        .catch((err) => {
            console.log(err);
        });
};

//Fungsi mau dapetin data2 user (biasanya buat user profile atau mau cantumin nama di headnav)
export const getAdminData = () => (dispatch) => {
    const API = 'https://tokyofoam.herokuapp.com/api/user/profile';
    dispatch({ type: LOADING_USER });
    axios
        .get(API)
        .then((res) => {
            console.log(res, 'cek res');
            dispatch({
                type: SET_USER,
                payload: res.data.user
            });

            dispatch({
                type: SET_EMAIL,
                payload: ''
            });
            dispatch({
                type: SET_PASSWORD,
                payload: ''
            });
            // dispatch(updatePutCartBEFromLogin(keranjang));

            // setMenuOpen(false);
            // setIsOpenDrawer(false);
            // setShowSI(true);

            // setTimeout(dispatch({ type: CLEAR_ERRORS }), 3000);
            dispatch({ type: CLEAR_ERRORS });
        })
        .catch((err) => {
            console.log(err);
        });
};

// GET ALL USERS
export const getAllUsers = () => async (dispatch) => {
    const API = 'https://tokyofoam.herokuapp.com/api/user/allUser';
    try {
        getAuthorizationHeaderTokenUser();
        const res = await axios.get(API);
        // console.log(res, 'cek res <<<')
        dispatch({
            type: SET_GET_ALL_DATA_USER,
            payload: res.data.users
        });
    } catch (error) {
        console.log(error);
    }
};

// GET DATA ODER USERS
export const getDataOrdersById = (id, router) => async (dispatch) => {
    const API = `https://tokyofoam.herokuapp.com/api/order/admin/${id}`;
    try {
        getAuthorizationHeaderTokenUser();
        const res = await axios.get(API);
        // console.log(res, 'cek res data orders <<<')
        if (res.data.data.length === 0) {
            alert('Tidak ada detail transaksi pada Pelanggan ini!');
        } else {
            dispatch({
                type: SET_GET_DATA_USER_ORDER,
                payload: res.data.data
            });
            router.push('/admin/customer/detail-riwayat');
        }
    } catch (error) {
        console.log(error);
    }
};

// GET DATA ORDER USERS BY ID
export const getHistoryOrdersById = (id, router) => async (dispatch) => {
    const API = `https://tokyofoam.herokuapp.com/api/order/historyDetail/${id}`;
    try {
        getAuthorizationHeaderTokenUser();
        const res = await axios.get(API);
        // console.log(res, 'cek res data orders <<<')
        if (res.data.data.status_payment.length === 0) {
            alert('Pelanggan ini belum mempunyai daftar order!');
        } else {
            dispatch({
                type: SET_GET_DATA_USER_HISTORY_ORDER,
                payload: res.data.data
            });
            router.push('/admin/customer/customer-detail');
        }
    } catch (error) {
        console.log(error);
    }
};
// // GET DATA ODER USERS CUSTOMER DETAIL
// export const getDataOrdersByIdCustomerDetail = (id, router) => async (dispatch) => {
//     const API = `https://tokyofoam.herokuapp.com/api/order/admin/${id}`;
//     try {
//         getAuthorizationHeaderTokenUser();
//         const res = await axios.get(API);
//         dispatch({
//             type: SET_GET_DATA_USER_ORDER,
//             payload: res.data.data
//         });
//         router.push('/admin/customer/detail-riwayat');
//     } catch (error) {
//         console.log(error);
//     }
// };

//Fungsi buat set dan clear berbagai error
export const clearError = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};

export const clearErrorRegister = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS_REGISTER });
};

export const setErrorCheckoutButton = (selected) => (dispatch) => {
    dispatch({ type: SET_ERRORS_CHECKOUT_BUTTON, payload: selected });
};

export const clearErrorCheckoutButton = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS_CHECKOUT_BUTTON });
};

export const setErrorEmptyBag = (selected) => (dispatch) => {
    dispatch({ type: SET_ERRORS_EMPTY_BAG, payload: selected });
};

export const clearErrorEmptyBag = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS_EMPTY_BAG });
};

//********************************************************************** */

//Fungsi penampung value dropdown logreg address
export const setLocProvinceLogreg = (selected) => (dispatch) => {
    dispatch({
        type: SET_LOCATION_PROVINCE_LOGREG,
        payload: selected
    });
};

export const addIdKotaLogreg = (selected) => (dispatch) => {
    dispatch({
        type: SET_ADD_ID_KOTA_LOGREG,
        payload: selected
    });
};

export const addKotaLogreg = (selected) => (dispatch) => {
    dispatch({
        type: SET_ADD_KOTA_LOGREG,
        payload: selected
    });
};
//
export const addKecamatanLogreg = (selected) => (dispatch) => {
    dispatch({
        type: SET_ADD_KECAMATAN_LOGREG,
        payload: selected
    });
};

// Fungsi ga kepake (bisa diapus nanti)
export const loginUserTrial = () => (dispatch) => {
    dispatch({ type: SET_AUTHENTICATED });
};

// The Comment
export const getAllCommentar = () => async (dispatch) => {
    const API = 'https://tokyofoam.herokuapp.com/api/comment/getAll';
    try {
        const res = await axios.get(API);
        // console.log(res, 'cek res <<<')
        dispatch({
            type: GET_COMMENT,
            payload: res.data.data
        });
    } catch (error) {
        console.log(error);
    }
};
export const addComentar = (data, setReview, setReviewErrorMsg, setShowModal) => async (dispatch) => {
    const API = 'https://tokyofoam.herokuapp.com/api/comment/create';
    try {
        getAuthorizationHeaderTokenUser();
        const res = await axios.post(API, data);

        if (res.data.success === true) {
            alert('Terima Kasih Atas Komentar Anda, Masukan Anda Sangat Berarti Bagi Kami');
            setReview({ judul: '', comment: '' });
            setReviewErrorMsg('');
            setShowModal(false);
        }
    } catch (error) {
        console.log(error.request);
        alert('Terjadi Gangguan Pada Koneksi Anda!');
    }
};

export const addComentarMobile = (data, setReview, setReviewErrorMsg) => async (dispatch) => {
    const API = 'https://tokyofoam.herokuapp.com/api/comment/create';
    try {
        getAuthorizationHeaderTokenUser();
        const res = await axios.post(API, data);

        if (res.data.success === true) {
            alert('Terima Kasih Atas Komentar Anda, Masukan Anda Sangat Berarti Bagi Kami');
            setReview({ judul: '', comment: '' });
            setReviewErrorMsg('');
            // dispatch(setProfileMobile(SET_PROFILE_DASHBOARD));
        }
    } catch (error) {
        console.log(error.request);
        alert('Terjadi Gangguan Pada Koneksi Anda!');
    }
};

export const setProfileMobile = (label) => (dispatch) => {
    return dispatch({
        type: label
    });
};

//****************************************************************************** */

//Fungsi buat set otomatis token di local storage dan langsung pake di header
const setAuthorizationHeader = (token) => {
    const IdToken = `Bearer ${token}`; // token yang didapat dari respon login disimpan di variable IdToken
    localStorage.setItem('FBIdToken', IdToken); // menyimpan IdToken di localStorage
    axios.defaults.headers.common['Authorization'] = IdToken; // code ini itu pengganti Authorization: Bearer token di postman
};

const getAuthorizationHeaderTokenUser = () => {
    const IdToken = localStorage.getItem('FBIdToken');
    axios.defaults.headers.common['Authorization'] = IdToken; // code ini itu pengganti Authorization: Bearer token di postman
};

// resetPassword
const getAuthorizationResetToken = () => {
    const resetPassword = localStorage.getItem('ResetToken');
    axios.defaults.headers.common['Authorization'] = resetPassword; // code ini itu pengganti Authorization: Bearer token di postman
};

export const editUserAddress = (data, setShowModal) => async (dispatch) => {
    const API = 'https://tokyofoam.herokuapp.com/api/user/profile';
    // console.log('Dtanya AP sih', data);
    try {
        getAuthorizationHeaderTokenUser();
        const res = await axios.put(API, data);
        if (res.data.message === 'Data profile sudah di perbaharui') {
            alert('Data berhasil diperbaharui!');
            dispatch(getOnlyUserData());
            setShowModal(false);
        }
    } catch (error) {
        console.log(error.request);
        alert('Gangguan Koneksi Atau Ho Handphone Sudah Digunakan!');
    }
};

export const editUserAddressMobile = (data, setShowModal, router) => (dispatch) => {
    const API = 'https://tokyofoam.herokuapp.com/api/user/profile';
    getAuthorizationHeaderTokenUser();
    // console.log(data);
    axios
        .put(API, data)
        .then((res) => {
            // console.log(res);
            if (res.data.success === true) {
                alert('Data berhasil diperbaharui!');
                dispatch(getOnlyUserData());
                // dispatch(dbResponseSuccess({ response: res?.statusText, label: 'Change address' }));
                setShowModal(false);
                router.back();
            }
        })
        .catch((error) => {
            // console.log(error.response.data.code);
            if (error.request) {
                alert('Gangguan Koneksi Atau Ho Handphone Sudah Digunakan!');
            }

            // if (error.response.data.code === 400) {
            //     alert('No Handphone Sudah Digunakan!');
            // } else {
            //     if (error) {
            //         alert('Terjadi Gangguan Pada Koneksi Anda!');
            //     }
            // }
            // alert('Terjadi Gangguan Pada Koneksi Anda!');
        });
};
