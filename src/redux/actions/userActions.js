import axios from 'axios';
import {
    SET_USER,
    SET_ERRORS,
    SET_ERRORS_REGISTER,
    CLEAR_ERRORS,
    CLEAR_ERRORS_REGISTER,
    SET_ERRORS_CHECKOUT_BUTTON,
    CLEAR_ERRORS_CHECKOUT_BUTTON,
    SET_ERRORS_EMPTY_BAG,
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
    SET_GET_DATA_USER_ORDER
} from '../type';

// Login untuk DESKTOP And MOBILE Version
export const loginUser = (userData, setMenuOpen, keranjang, setIsOpenDrawer, setShowSI) => async (dispatch) => {
    // setMenuOpen itu buat drawer desktop
    // setIsOpenDrawer, setShowSI itu buat drawer mobile
    console.log('USER', userData);
    // console.log('keranjang', keranjang);
    const API = 'https://tokyofoam.herokuapp.com/api/auth/login';
    const URLCheckout = localStorage.getItem('URLCheckout');

    try {
        await dispatch({ type: LOADING_UI });
        const results = await axios.post(API, userData);
        setAuthorizationHeader(results.data.token);
        dispatch(getUserData(setMenuOpen, setIsOpenDrawer, setShowSI, keranjang)); // set authenticated nya ada didalam getUserData
        if (URLCheckout === '/cart') {
            dispatch(clearErrorCheckoutButton());
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
export const changePassword = (
    newUserData,
    setShowBoxEmailVerification,
    setRegister,
    setForgot,
    setBoxForgot
) => async (dispatch) => {
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
            dispatch({ type: CLEAR_ERRORS });
        }
    } catch (error) {
        dispatch({ type: SET_ERRORS, payload: error.response.data.message });
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
        dispatch({ type: SET_ERRORS, payload: error.response.data.message });
    }
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
export const getDataOrdersById = (id) => async (dispatch) => {
    const API = `https://tokyofoam.herokuapp.com/api/order/admin/${id}`;
    try {
        getAuthorizationHeaderTokenUser();
        const res = await axios.get(API);
        // console.log(res, 'cek res data orders <<<')
        dispatch({
            type: SET_GET_DATA_USER_ORDER,
            payload: res.data.data
        });
    } catch (error) {
        console.log(error);
    }
};

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
