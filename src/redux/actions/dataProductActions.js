import axios from 'axios';
import {
    GET_ALL_PRODUCT,
    GET_ALL_SINGLE_PRODUCT,
    GET_TRUE_ALL_SINGLE_PRODUCT,
    GET_ALL_SINGLE_PRODUCT_BY_PAGE,
    GET_ALL_BUNDLING_PRODUCT,
    GET_TRUE_ALL_BUNDLING_PRODUCT,
    GET_ALL_BUNDLING_PRODUCT_BY_PAGE,
    GET_PRODUCT_BY_NAME,
    GET_PRODUCT_BY_ID,
    SET_CHANGEABLE_PRODUCT_NAME,
    SET_GET_DATA_USER_ORDER_IN_USER_DASHBOARD,
    LOADING_UI,
    LOADING_BUTTON_PAYNOW,
    LOADING_BUTTON_PAYLATTER,
    STOP_LOADING_BUTTON_PAYNOW,
    STOP_LOADING_BUTTON_PAYLATTER,
    STOP_LOADING_UI,
    SET_ERRORS,
    CLEAR_ERRORS,
    SET_ADD_TO_BAG,
    DELETE_BAG,
    DELETE_ALL_BAG,
    TOTAL_PRICE,
    SET_SHIPPING_FEE,
    SET_TOTAL_PLUS_SHIPPING,
    SET_ADD_KURIR,
    SET_POTONGAN_MEMBERSHIP,
    SET_ID_UNIQ_CART_USER,
    SET_ORDER_ID,
    GET_ALL_NOTIFICATIONS,
    // SET_EMAIL,
    // SET_PASSWORD,
    SET_USER

    // TOTAL_PRICE
} from '../type';

// get ALL DATA PRODUCT
export const getAllDataProduct = () => async (dispatch) => {
    const API = 'https://tokyofoam.herokuapp.com/api/product/list';
    try {
        const res = await axios.get(API);
        dispatch({
            type: GET_ALL_PRODUCT,
            payload: res.data.List
        });
    } catch (error) {
        console.log(error);
    }
};

export const getAllDataProductSingle = () => async (dispatch) => {
    const API = 'https://tokyofoam.herokuapp.com/api/product/singleProduct';
    try {
        const res = await axios.get(API);
        dispatch({
            type: GET_TRUE_ALL_SINGLE_PRODUCT,
            // type: GET_ALL_SINGLE_PRODUCT,
            payload: res.data.List
        });
    } catch (error) {
        console.log(error);
    }
};

export const getAllSixDataProductSingle = () => async (dispatch) => {
    const API = 'https://tokyofoam.herokuapp.com/api/product/singleProduct?limit=6';
    try {
        const res = await axios.get(API);
        dispatch({
            type: GET_ALL_SINGLE_PRODUCT,
            payload: res.data.List
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

export const getAllProductSingleByPage = (selected) => async (dispatch) => {
    const API = `https://tokyofoam.herokuapp.com/api/product/singleProduct?limit=4&page=${selected}`;

    try {
        const res = await axios.get(API);

        dispatch({
            type: GET_ALL_SINGLE_PRODUCT_BY_PAGE,
            payload: res.data.List
            // payload: arr
        });
    } catch (error) {
        console.log(error);
    }
};

export const getAllDataProductBundling = () => async (dispatch) => {
    const API = 'https://tokyofoam.herokuapp.com/api/product/bundlingProduct';
    try {
        const res = await axios.get(API);
        dispatch({
            type: GET_TRUE_ALL_BUNDLING_PRODUCT,
            payload: res.data.List
        });
    } catch (error) {
        console.log(error);
    }
};

export const getAllSixDataProductBundling = () => async (dispatch) => {
    const API = 'https://tokyofoam.herokuapp.com/api/product/bundlingProduct?limit=6';
    try {
        const res = await axios.get(API);
        dispatch({
            type: GET_ALL_BUNDLING_PRODUCT,
            payload: res.data.List
        });
    } catch (error) {
        console.log(error);
    }
};

export const getAllProductBundlingByPage = (selected) => async (dispatch) => {
    const API = `https://tokyofoam.herokuapp.com/api/product/bundlingProduct?page=${selected}&limit=4`;

    try {
        const res = await axios.get(API);

        dispatch({
            type: GET_ALL_BUNDLING_PRODUCT_BY_PAGE,
            payload: res.data.List
            // payload: arr
        });
    } catch (error) {
        console.log(error);
    }
};

export const goToDetailProductPage = (selected) => (dispatch) => {
    dispatch({
        type: SET_CHANGEABLE_PRODUCT_NAME,
        payload: selected
    });
    dispatch(getProductByName(selected.id));
};

export const getProductByName = (selected) => async (dispatch) => {
    //selected disini berasalah dari fungsi goToDetailProductPage
    console.log('select222', selected);

    // const API = `https://fakestoreapi.com/products/${changeable_Product_Name.id}`;
    const API = `https://fakestoreapi.com/products/${selected}`;

    try {
        const res = await axios.get(API);
        dispatch({
            type: GET_PRODUCT_BY_NAME,
            payload: res.data
        });
    } catch (error) {
        console.log(error);
    }
};

// getProductId di gunakan di Admin dasboard bagian produk
export const getProductById = (selected) => async (dispatch) => {
    const API = `https://tokyofoam.herokuapp.com/api/product/list?_id=${selected}`;

    try {
        const res = await axios.get(API);
        dispatch({
            type: GET_PRODUCT_BY_ID,
            payload: res.data.List
        });
    } catch (error) {
        console.log(error);
    }
};

// Buat untuk data local single and bundling product (uji coba)
export const goToDetailProductPageLocal = (selected) => (dispatch) => {
    dispatch({
        type: GET_PRODUCT_BY_NAME,
        payload: selected
    });
};

//Buat Update Cart BE
export const updatePutCartBE = (dataProductOnBag) => async (dispatch) => {
    const API = `https://tokyofoam.herokuapp.com/api/cart/findByUserId`;
    const API_PUT = `https://tokyofoam.herokuapp.com/api/cart/update`;
    try {
        if (dataProductOnBag.length !== 0) {
            let Obj = {
                data_cart: dataProductOnBag.map((bag) => ({
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
            getAuthorizationHeaderToken();
            axios.put(API_PUT, Obj);
            const results = await axios.get(API);
            const idCartUniq = [results.data.cart[0]._id];
            dispatch(updateIdUniqCart(idCartUniq));
        } else {
            let Obj = {
                data_cart: []
            };
            getAuthorizationHeaderToken();
            axios.put(API_PUT, Obj);
        }
    } catch (error) {
        // dispatch({
        //     type: SET_ERRORS,
        //     payload: error.response.data.message
        // });
        console.log(error);
    }
};

//Buat Delete Cart BE dari cart page
export const deleteCartBE = (dataProductOnBag, idUniqCartUser) => async (dispatch) => {
    const API_DEL = `https://tokyofoam.herokuapp.com/api/cart/delete/${idUniqCartUser}`;
    const API_PUT = `https://tokyofoam.herokuapp.com/api/cart/update`;
    try {
        if (dataProductOnBag.length !== 0) {
            let Obj = {
                data_cart: dataProductOnBag.map((bag) => ({
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
            getAuthorizationHeaderToken();
            axios.put(API_PUT, Obj);
        } else {
            let Obj = {
                data_cart: []
            };
            getAuthorizationHeaderToken();
            axios.put(API_PUT, Obj);

            // axios.delete(API_DEL);
        }
    } catch (error) {
        // dispatch({
        //     type: SET_ERRORS,
        //     payload: error.response.data.message
        // });
        console.log(error);
    }
};

//Buat Delete Cart BE ketika PayNow or PayLatter di klik
export const deleteCartBEfromPayButton = (dataProductOnBag) => async (dispatch) => {
    const API_PUT = `https://tokyofoam.herokuapp.com/api/cart/update`;
    try {
        let Obj = {
            data_cart: []
        };
        getAuthorizationHeaderToken();
        axios.put(API_PUT, Obj);
    } catch (error) {
        // dispatch({
        //     type: SET_ERRORS,
        //     payload: error.response.data.message
        // });
        console.log(error);
    }
};

//Fungsi buat bisa upload image (hanya string url,..jadi kek update data biasa)
export const uploadImage = (formData, selected) => async (dispatch) => {
    const API = `https://tokyofoam.herokuapp.com/api/product/updatePhotoProduct/${selected}`;
    try {
        await dispatch({ type: LOADING_UI });
        const results = await axios.put(API, formData);

        if (results.data.message === 'Data berhasil dirubah') {
            dispatch({ type: STOP_LOADING_UI });
            dispatch({ type: CLEAR_ERRORS });
            dispatch(getProductById(selected));
            // alert('Informasi umum berhasil dirubah');
        }
    } catch (error) {
        dispatch({
            type: SET_ERRORS,
            payload: error.response.data.message
        });
        // console.log(error);
    }
};

export const postCreateNewProduct = (DataNewProduct) => async (dispatch) => {
    const API = `https://tokyofoam.herokuapp.com/api/product/create`;

    try {
        await dispatch({ type: LOADING_UI });
        const results = await axios.post(API, DataNewProduct);

        if (results.data.message === 'Data above successfull created') {
            dispatch({ type: STOP_LOADING_UI });
            dispatch({ type: CLEAR_ERRORS });
            alert('Product Baru berhasil ditambahkan');
            window.location.reload();
        }
    } catch (error) {
        if (error.request) {
            console.log(error.request);
            alert('Tidak Bisa Save! Terjadi Gangguan Pada Koneksi Anda! Atau Data Masih Ada Yang Kosong!');
            dispatch({ type: STOP_LOADING_UI });
        } else if (error.response.status === 400) {
            dispatch({ type: STOP_LOADING_UI });
            alert('Data Masih Ada Yang Kosong!');
        }

        // if (error.response.status === 400) {
        //     dispatch({ type: STOP_LOADING_UI });
        //     alert('Data Masih Ada Yang Kosong!');
        // }

        // console.log(error);
    }
};

export const postCreateNewProductBundling = (DataNewProduct) => async (dispatch) => {
    const API = `https://tokyofoam.herokuapp.com/api/product/create`;

    try {
        await dispatch({ type: LOADING_UI });
        const results = await axios.post(API, DataNewProduct);

        if (results.data.message === 'Data above successfull created') {
            dispatch({ type: STOP_LOADING_UI });
            dispatch({ type: CLEAR_ERRORS });
            alert('Product Baru berhasil ditambahkan');
            // window.location.reload();
        }
    } catch (error) {
        if (error.request) {
            console.log(error.request);
            alert('Tidak Bisa Save! Terjadi Gangguan Pada Koneksi Anda! Atau Data Masih Ada Yang Kosong!');
            dispatch({ type: STOP_LOADING_UI });
        } else if (error.response.status === 400) {
            dispatch({ type: STOP_LOADING_UI });
            alert('Data Masih Ada Yang Kosong!');
        }
        // console.log(error);
    }
};

//Fungsi buat Delete product
export const deleteProduct = (selected, router) => async (dispatch) => {
    const API = `https://tokyofoam.herokuapp.com/api/product/byId/${selected}`;
    try {
        await dispatch({ type: LOADING_UI });
        const results = await axios.delete(API);

        if (results.data.message === 'Product diatas berhasil di hapus') {
            dispatch({ type: STOP_LOADING_UI });
            dispatch({ type: CLEAR_ERRORS });
            alert('Product berhasil di hapus');
            router.push(`/admin/produk`);
        }
    } catch (error) {
        if (error.response.status === 500) {
            dispatch({ type: STOP_LOADING_UI });
            alert('Terjadi Gangguan Koneksi!');
        }
        // console.log(error);
    }
};

export const pushNotificationPost = (DataNotif, setOpen, setNotifNoted) => async (dispatch) => {
    const API = `https://tokyofoam.herokuapp.com/api/notification/create`;

    try {
        await dispatch({ type: LOADING_UI });
        getAuthorizationHeaderToken();
        const results = await axios.post(API, DataNotif);

        if (results.data.message === 'Notification berhasil dibuat') {
            dispatch({ type: STOP_LOADING_UI });
            dispatch({ type: CLEAR_ERRORS });
            alert('Notifikasi Sukses Dibuat');
            setNotifNoted('');
            setOpen(false);
        }
    } catch (error) {
        if (error.response) {
            // internet online, request made, tapi error karena data tidak match dengan BE
            console.log(error);
            // dispatch({
            //     type: SET_ERRORS,
            //     payload: error.response.data.message
            // });
        } else if (error.request) {
            // jiks internet offline / disconnect/ gangguan koneksi terjadi
            console.log(error.request);
            alert('Terjadi Gangguan Pada Koneksi Anda!');
        } else {
            console.log('Error', error.message);
        }
        // dispatch({
        //     type: SET_ERRORS,
        //     payload: error.response.data.message
        // });
        // console.log(error);
    }
};

export const updateDataInformasiUmum = (DataEditProduct, selected) => async (dispatch) => {
    const API = `https://tokyofoam.herokuapp.com/api/product/updateDataProduct/${selected}`;

    try {
        await dispatch({ type: LOADING_UI });
        const results = await axios.put(API, DataEditProduct);

        if (results.data.message === 'Data berhasil dirubah') {
            dispatch({ type: STOP_LOADING_UI });
            dispatch({ type: CLEAR_ERRORS });
            alert('Informasi umum berhasil dirubah');
        }
    } catch (error) {
        dispatch({
            type: SET_ERRORS,
            payload: error.response.data.message
        });
        // console.log(error);
    }
};

export const updateDeskripsiDataProduct = (DataEditProduct, selected) => async (dispatch) => {
    const API = `https://tokyofoam.herokuapp.com/api/product/updateDataProduct/${selected}`;

    try {
        await dispatch({ type: LOADING_UI });
        const results = await axios.put(API, DataEditProduct);

        if (results.data.message === 'Data berhasil dirubah') {
            dispatch({ type: STOP_LOADING_UI });
            dispatch({ type: CLEAR_ERRORS });
            alert('Deskripsi berhasil dirubah');
        }
    } catch (error) {
        dispatch({
            type: SET_ERRORS,
            payload: error.response.data.message
        });
        // console.log(error);
    }
};

export const updateDetailSpesifikasi = (DataEditProduct, selected) => async (dispatch) => {
    const API = `https://tokyofoam.herokuapp.com/api/product/updateDataProduct/${selected}`;

    try {
        await dispatch({ type: LOADING_UI });
        const results = await axios.put(API, DataEditProduct);

        if (results.data.message === 'Data berhasil dirubah') {
            dispatch({ type: STOP_LOADING_UI });
            dispatch({ type: CLEAR_ERRORS });
            alert('Detail spesifikasi berhasil dirubah');
        }
    } catch (error) {
        dispatch({
            type: SET_ERRORS,
            payload: error.response.data.message
        });
        // console.log(error);
    }
};

export const updateDetailSEO = (DataEditProduct, selected) => async (dispatch) => {
    const API = `https://tokyofoam.herokuapp.com/api/product/updateDataProduct/${selected}`;

    try {
        await dispatch({ type: LOADING_UI });
        const results = await axios.put(API, DataEditProduct);

        if (results.data.message === 'Data berhasil dirubah') {
            dispatch({ type: STOP_LOADING_UI });
            dispatch({ type: CLEAR_ERRORS });
            alert('SEO Keywords berhasil dirubah');
        }
    } catch (error) {
        dispatch({
            type: SET_ERRORS,
            payload: error.response.data.message
        });
        // console.log(error);
    }
};

export const filteringById = (selected) => async (dispatch) => {
    //selected disini berasalah dari fungsi goToDetailProductPage
    // console.log('select222', selected);

    // const API = `https://fakestoreapi.com/products/${changeable_Product_Name.id}`;
    // const API = `https://fakestoreapi.com/products/${selected}`;

    try {
        const res = await axios.get(API);
        dispatch({
            type: GET_PRODUCT_BY_NAME,
            payload: res.data
        });
    } catch (error) {
        console.log(error);
    }
};

//khusu fungction addToBag reducer yang dituju nya adalah bagReducer
//why berbeda dan bukan dataProductActions ?  karena untuk persist harus dibedaain supaya ga ga ganggu yang laen
export const addToBag = (selected) => (dispatch) => {
    // let arr = [];
    // arr.unshift(selected);
    dispatch({
        type: SET_ADD_TO_BAG,
        payload: selected
    });
};

export const addShippingFee = (selected) => (dispatch) => {
    // let arr = [];
    // arr.unshift(selected);
    dispatch({
        type: SET_SHIPPING_FEE,
        payload: selected
    });
};

export const updateIdUniqCart = (selected) => (dispatch) => {
    // let arr = [];
    // arr.unshift(selected);
    dispatch({
        type: SET_ID_UNIQ_CART_USER,
        payload: selected
    });
};

export const addKurir = (selected) => (dispatch) => {
    // let arr = [];
    // arr.unshift(selected);
    dispatch({
        type: SET_ADD_KURIR,
        payload: selected
    });
};

export const addTotalPlusShippingFee = (selected) => (dispatch) => {
    // let arr = [];
    // arr.unshift(selected);
    dispatch({
        type: SET_TOTAL_PLUS_SHIPPING,
        payload: selected
    });
};

export const deleteBag = (selected) => (dispatch) => {
    // let arr = [];
    // arr.unshift(selected);
    dispatch({
        type: DELETE_ALL_BAG,
        payload: selected
    });
};

export const deleteBagEach = (bagId) => (dispatch) => {
    // let arr = [];
    // arr.unshift(selected);
    dispatch({
        type: DELETE_BAG,
        payload: bagId
    });
};

export const addTotalPrice = (selected) => (dispatch) => {
    dispatch({
        type: TOTAL_PRICE,
        payload: selected
    });
};

export const potonganMembership = (selected) => (dispatch) => {
    dispatch({
        type: SET_POTONGAN_MEMBERSHIP,
        payload: selected
    });
};

export const getListOrderUserOnUserDashboard = () => async (dispatch) => {
    const API = `https://tokyofoam.herokuapp.com/api/order/byUserId/`;

    try {
        // await dispatch({ type: LOADING_UI });
        getAuthorizationHeaderToken();
        const results = await axios.get(API);
        // console.log('TESTING', results);

        // if (results.data.data.length !== 0) {
        //     dispatch({
        //         type: SET_GET_DATA_USER_ORDER_IN_USER_DASHBOARDS,
        //         payload: results.data.data
        //     });
        // }
        dispatch({
            type: SET_GET_DATA_USER_ORDER_IN_USER_DASHBOARD,
            payload: results.data.data
        });
    } catch (error) {
        if (error?.response?.status === 500) {
            dispatch({ type: STOP_LOADING_BUTTON_PAYLATTER });
            alert('Terjadi Gangguan Koneksi!');
        }
        console.log('ERROR', error);
        // console.log(error);
    }
};

export const postNewPesananPayLater =
    (
        selected,
        router,
        setKodeposMember,
        setNoted,
        setOtherNameMember,
        setOtherAddressMember,
        setOtherNoHandphoneMember,
        setOtherKodeposMember
    ) =>
    async (dispatch) => {
        const API = `https://tokyofoam.herokuapp.com/api/order/create`;

        try {
            await dispatch({ type: LOADING_BUTTON_PAYLATTER });
            getAuthorizationHeaderToken();
            const res = await axios.post(API, selected);

            if (res.data.message === 'Data berhasil disimpan') {
                dispatch({ type: CLEAR_ERRORS });

                dispatch(deleteBag([]));
                dispatch(deleteCartBEfromPayButton());
                setKodeposMember('');
                setNoted('');
                setOtherNameMember('');
                setOtherAddressMember('');
                setOtherNoHandphoneMember('');
                setOtherKodeposMember('');
                alert(
                    'Pesanan Anda Sudah Berhasil Dibuat, Silahkan Lakukan Pembayaran Melaui Akun Dashboard Anda Max 1 x 24 Jam!'
                );
                // dispatch({ type: STOP_LOADING_BUTTON_PAYLATTER });
                router.push('/pay-later');
            }
        } catch (error) {
            if (error.response.status === 500) {
                dispatch({ type: STOP_LOADING_BUTTON_PAYLATTER });
                alert('Terjadi Gangguan Koneksi!');
            }
            console.log('ERROR', error);
        }
    };

export const postNewPesananPayNow =
    (
        selected,
        router,
        setKodeposMember,
        setNoted,
        setOtherNameMember,
        setOtherAddressMember,
        setOtherNoHandphoneMember,
        setOtherKodeposMember
    ) =>
    async (dispatch) => {
        const API = `https://tokyofoam.herokuapp.com/api/order/create`;

        try {
            await dispatch({ type: LOADING_BUTTON_PAYNOW });
            getAuthorizationHeaderToken();
            const res = await axios.post(API, selected);
            const order_id = res.data.order_id;
            dispatch({
                type: SET_ORDER_ID,
                payload: order_id
            });
            // console.log('RESPONSE', order_id);

            if (res.data.message === 'Data berhasil disimpan') {
                // console.log('RESPONSE', res);

                getAuthorizationHeaderToken();
                const resp = await axios.get(`https://tokyofoam.herokuapp.com/api/payment/getToken/${order_id}`);
                console.log;
                if (resp.data.success === true) {
                    const midtrans_url = resp.data.url;
                    const token_mt = resp.data.token;
                    const IdTokenMT = `Bearer ${token_mt}`;
                    localStorage.setItem('TokenMT', IdTokenMT); // menyimpan IdToken di localStorage
                    dispatch({ type: CLEAR_ERRORS });
                    dispatch(deleteBag([]));
                    dispatch(deleteCartBEfromPayButton());
                    setKodeposMember('');
                    setNoted('');
                    setOtherNameMember('');
                    setOtherAddressMember('');
                    setOtherNoHandphoneMember('');
                    setOtherKodeposMember('');
                    // alert('Pesanan Anda Sudah Berhasil Dibuat, Pesanan Akan Segera Diproses dan Dikirim ke Tempat Anda!');
                    window.location.href = `${midtrans_url}`;
                }
            }
        } catch (error) {
            if (error.response.status === 500) {
                dispatch({ type: STOP_LOADING_BUTTON_PAYNOW });
                alert('Terjadi Gangguan Koneksi!');
            }
        }
    };

export const updateStatusPayment = (selected, router) => async (dispatch) => {
    try {
        getAuthorizationHeaderToken();
        const res = await axios.post(`https://tokyofoam.herokuapp.com/api/payment/success/${selected}`);
        if (res.data.message === 'Status pembayaran saat ini: Pending') {
            router.push('/payment-pending');
        } else if (res.data.message === 'Pesan pemberitahuan telah dikirim ke email') {
            router.push('/payment-success');
        }
    } catch (error) {
        if (error.response.status === 500) {
            dispatch({ type: STOP_LOADING_BUTTON_PAYNOW });
            alert('Terjadi Gangguan Koneksi!');
        }
        // console.log(error);
    }
};

//Fungsi buat get user data TANPA Embel2 cart keranjang, box drawer dll
export const getOnlyUserData2 = () => (dispatch) => {
    const API = 'https://tokyofoam.herokuapp.com/api/user/profile';
    // dispatch({ type: LOADING_USER });
    getAuthorizationHeaderToken();
    axios
        .get(API)
        .then((res) => {
            dispatch({
                type: SET_USER,
                payload: res.data.user
            });

            // dispatch({
            //     type: SET_EMAIL,
            //     payload: ''
            // });
            // dispatch({
            //     type: SET_PASSWORD,
            //     payload: ''
            // });

            // setTimeout(dispatch({ type: CLEAR_ERRORS }), 3000);
            // dispatch({ type: CLEAR_ERRORS });
        })
        .catch((err) => {
            console.log(err);
        });
};

// Untuk Notification Product
export const getAllNotificationFunction = () => async (dispatch) => {
    const API = 'https://tokyofoam.herokuapp.com/api/notification/getAll';
    try {
        getAuthorizationHeaderToken();
        const res = await axios.get(API);
        // console.log(res, 'cek res <<<')
        dispatch({
            type: GET_ALL_NOTIFICATIONS,
            payload: res.data.data
        });
    } catch (error) {
        console.log(error);
    }
};

// Untuk Delete Notification Product
export const deleteNotificationList = (id) => async (dispatch) => {
    const API = `https://tokyofoam.herokuapp.com/api/notification/delete/${id}`;
    try {
        getAuthorizationHeaderToken();
        const res = await axios.delete(API);
        // console.log(res, 'cek res <<<')
        if (res.data.message === 'Data above successfull deleted') {
            alert('Notifikasi Berhasil Dihapus!');
            dispatch(getAllNotificationFunction());
        }
    } catch (error) {
        console.log(error);
    }
};

//Fungsi buat get token dari local storage dan langsung pake
const getAuthorizationHeaderToken = () => {
    const IdToken = localStorage.getItem('FBIdToken');
    axios.defaults.headers.common['Authorization'] = IdToken; // code ini itu pengganti Authorization: Bearer token di postman
};
