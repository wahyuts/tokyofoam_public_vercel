import Head from 'next/head';
import Image from 'next/image';
import ReactResponsiveHook from '../../utils/ReactResponsiveHook';
import { useRouter } from 'next/router';
import SiCepat from '../../../public/assets/images/sicepat.png';
import JNE from '../../../public/assets/images/jne.png';
import JNT from '../../../public/assets/images/jnt.png';
import React, { useState, useEffect } from 'react';

//MaT UI
import { makeStyles } from '@mui/styles';

import SliderSingleProduct from '../../utils/re-useable-components/slider-single-product';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import { CircularProgress } from '@mui/material';

import AllButtonFunctions from '../../utils/re-useable-functions/AllButtonFunctions';
import MainBlackButton from '../../utils/re-useable-components/buttons/MainBlackButton';
import AutoCompleteProvince from '../../utils/re-useable-components/dropdown/AutoComplete-Province';
import DropdownKabupaten from '../../utils/re-useable-components/dropdown/dropdown-kabupaten';

//RadioButton
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
// import FormLabel from '@mui/material/FormLabel';

//Redux
import { useDispatch, useSelector } from 'react-redux';
import OrangeButton from '../../utils/re-useable-components/buttons/OrangeButton';
import DropdownKecamatan from '../../utils/re-useable-components/dropdown/dropdown-kecamatan';
import {
    deleteBagEach,
    addTotalPrice,
    addTotalPlusShippingFee,
    addShippingFee,
    addKurir,
    updatePutCartBE,
    updateIdUniqCart
} from '../../redux/actions/dataProductActions';
import {
    settingDetailDataKurir,
    settingDetailDataKurirForCheckout,
    settingKurirName,
    settingKurirNameForCheckout
} from '../../redux/actions/seputarOngkirAction';
import DeleteCartItem from '../../components/delete-cart-item';
import DisabledButton from '../../utils/re-useable-components/buttons/DisabledButton';
import SliderLocalSingleProduct from '../../utils/re-useable-components/slider-local-single-product';
import { setMainURL } from '../../redux/actions/urlOnHeadnavActions';
import { changeURL } from '../../redux/actions/urlChangeableActions';
import axios from 'axios';
import {
    setErrorCheckoutButton,
    clearErrorCheckoutButton,
    setErrorEmptyBag,
    clearErrorEmptyBag
} from '../../redux/actions/userActions';
import HomeProductCardSixNewItemMobile from '../../components/mobile/home-product-card-six-new-item-mobile';
import { SET_ID_UNIQ_CART_USER } from '../../redux/type';

const useStyles = makeStyles((theme) => ({
    main: {
        minHeight: '100vh'
    },
    textYourCart: {
        width: '100%',
        marginTop: 20,
        marginBottom: 20,
        [theme.breakpoints.down('mobile')]: {
            width: '89%',
            marginLeft: 'auto',
            marginRight: 'auto'
        }
    },
    textYourProductQty: {
        width: '100%',
        marginTop: 20,
        marginBottom: 20,
        position: 'relative'
    },
    textSizeh2Qty: {
        position: 'absolute',
        fontSize: 15,
        top: 0,
        right: '25%',
        [theme.breakpoints.down('mobile')]: {
            right: '20%'
        }
    },
    mainContainer: {
        // height: '50vh',
        width: '89%',
        // display: 'flex',
        marginLeft: 'auto',
        marginRight: 'auto'

        // backgroundColor: 'red'
    },
    contCardItem: {
        display: 'flex',
        [theme.breakpoints.down('mobile')]: {
            display: 'flex',
            flexDirection: 'column'
        }
    },
    innerContCardItem: {
        width: '65%',
        [theme.breakpoints.down('mobile')]: {
            width: '89%',
            marginLeft: 'auto',
            marginRight: 'auto'
        }
    },
    cardItem: {
        width: '95%',
        // backgroundColor: 'pink',
        marginTop: 15,
        // height: 200,
        display: 'flex',
        // alignItems: 'center',
        [theme.breakpoints.down('mobile')]: {
            width: '100%',
            marginTop: 15,
            minHeight: 100
        }
    },
    contShipping: {
        width: '35%',
        // backgroundColor: 'red',
        [theme.breakpoints.down('mobile')]: {
            width: '89%',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginBottom: 50
        }
    },
    contInnerShipping: {
        width: '75%',
        minHeight: 400,
        // backgroundColor: 'yellowgreen',
        marginTop: 25,
        marginLeft: 'auto',
        marginRight: 'auto',
        [theme.breakpoints.down('mobile')]: {
            width: '100%',
            marginLeft: 'auto',
            marginRight: 'auto'
        }
    },
    parentContImage: {
        width: '30%',
        display: 'flex',
        alignItems: 'center',
        [theme.breakpoints.down('mobile')]: {
            width: '38%'
        }
    },
    contImage: {
        width: 300,
        // height: 150,
        // minHeight: 100,
        // backgroundColor: 'orangered',
        marginLeft: 'auto',
        marginRight: 'auto'

        // padding: '10%'
    },
    cardDesc: {
        width: '70%',
        // backgroundColor: 'yellowgreen',
        position: 'relative',
        '& .innerCardDesc': {
            position: 'absolute',
            top: '20%',
            left: '5%',
            [theme.breakpoints.down('mobile')]: {
                top: '1%'
            }
        },
        '& .buttonDelPosition': {
            position: 'absolute',
            top: '33.5%',
            right: '5%',
            [theme.breakpoints.down('mobile')]: {
                top: '35%',
                right: 0
            }
        },
        '& .qtyTextPosition': {
            position: 'absolute',
            top: '40%',
            right: '32%',
            [theme.breakpoints.down('mobile')]: {
                top: '50%',
                right: '35%'
            }
        }
    },
    textSizeh2: {
        fontSize: 20,
        marginBottom: 15,
        [theme.breakpoints.down('mobile')]: {
            fontSize: 14,
            marginBottom: 5
        }
    },
    textSizeh2Logic: {
        fontSize: 18,
        marginBottom: 15,
        [theme.breakpoints.down('mobile')]: {
            fontSize: 14,
            marginBottom: 5
        }
    },
    pSize: {
        fontSize: 15,
        [theme.breakpoints.down('mobile')]: {
            fontSize: 13
        }
    },

    pSizeTotalPlusShipping: {
        fontSize: 15,
        fontWeight: 700,
        [theme.breakpoints.down('mobile')]: {
            fontSize: 13
        }
    },
    pSizeShipping: {
        fontSize: 15,
        [theme.breakpoints.down('mobile')]: {
            fontSize: 20,
            fontWeight: 600
        }
    },
    circleColor: {
        border: '1px solid black',
        borderRadius: '50%',
        backgroundColor: 'white',
        width: 20,
        height: 20,
        fontSize: 12,
        color: 'white',
        marginRight: 8,
        [theme.breakpoints.down('mobile')]: {
            width: 15,
            height: 15
        }
    },
    fontSubTitleOnHome: {
        fontSize: 30,
        fontWeight: 600,
        color: '#474747',
        [theme.breakpoints.down('mobile')]: {
            fontSize: 20
        },
        [theme.breakpoints.down('tablet')]: {
            fontSize: 20
        }
    },
    descPromoStyles: {
        [theme.breakpoints.down('mobile')]: {
            width: '89%',
            marginLeft: 'auto',
            marginRight: 'auto'
        }
    },
    youMayAlsoLikeMobile: {
        width: '100%',
        textAlign: 'center',
        marginBottom: 40,
        [theme.breakpoints.down('mobile')]: {
            marginBottom: 10
        }
    }
}));

const Cart = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const router = useRouter();
    const currentPath = router.pathname;

    const [statusShippingEstimation, setStatusShippingEstimation] = useState('inputField');
    const { authenticated } = useSelector((state) => state.user);
    const { credentials } = useSelector((state) => state.user);

    const { dataProductOnBag, kurir, shippingFee, totalPrice } = useSelector((state) => state.bag);
    const { locationProvince, stateIdKecamatan, stateKecamatan, stateKota } = useSelector(
        (state) => state.shippingAddres
    );
    const { idUniqCartUser } = useSelector((state) => state.idUniqCart);

    // const { stateKota,locationProvince } = useSelector((state) => state.shippingAddres);
    // const { locationProvince } = useSelector((state) => state.shippingAddres);
    const { kurirName } = useSelector((state) => state.detailOngkir);
    const { errors_auth_checkout_button, errors_empty_bag } = useSelector((state) => state.UI);

    const [value, setValue] = useState(0);
    const [valueKurir, setValueKurir] = useState('');
    const [cekOngkirData, setCekOngkirData] = useState([]);

    const [resAPI, setResAPI] = useState(true);
    const [uiLoading, setUiLoading] = useState(false);
    const [uiLoadingButtonCheckout, setUiLoadingButtonCheckout] = useState(false);

    const [errorProvinsi, setErrorProvinsi] = useState('');
    const [errorKecamatan, setErrorKecamatan] = useState('');
    const [errorKurirname, setErrorKurirname] = useState('');
    const [errorPiilihTypeService, setErrorPilihTypeService] = useState('');

    // console.log('BAGGGING', dataProductOnBag);
    const { isMobile, isTablet, isDesktop } = ReactResponsiveHook();
    const { handleClickProductPage } = AllButtonFunctions();
    const [arrPrice, setArrPrice] = useState([]);

    useEffect(() => {
        //CATATAN bukan untuk useEffect disini, TAPI UNTUK tombol login
        // nanti di tombol login selain dispatch fungsi loginUser
        // buat juga dispatch fungsi untuk POST cart ke BE, JIKA dataPrroductOnBag ada isinya
        // kalo ga ada null
        // fungsi POST cart BE nya dijalankan setelah getUserInfo dapet alias di dalam fungsi getUserInfo
        // setalah dapet respon dari POST cart ke BE nanti responnya disimpen di state redux dengan mapping by id user

        if (dataProductOnBag !== 0) {
            dispatch(clearErrorEmptyBag());
        }

        dispatch(updateIdUniqCart(idUniqCartUser));

        let Arr = dataProductOnBag.map((bag) => {
            if (bag.promo_price_x_qty === 0) {
                return {
                    id_Product: bag.id,
                    price_x_qty: bag.price_x_qty
                };
            } else {
                return {
                    id_Product: bag.id,
                    price_x_qty: bag.promo_price_x_qty
                };
            }
        });
        setArrPrice(Arr);

        if (!resAPI) {
            setStatusShippingEstimation('result');
        }

        //untuk mengkopi url ke redux agar bisa digunakan di page sukses verifikasi
        dispatch(changeURL(currentPath));
        localStorage.setItem('URLCheckout', currentPath);
    }, [dataProductOnBag, resAPI, dispatch, currentPath, idUniqCartUser]);

    // console.log('ARR Khusus Harga', arrPrice);
    // Untuk menjumlahkan data array yang ada di arrPrice
    let sum = 0;
    // let sum = totalPrice;

    for (let i = 0; i < arrPrice.length; i++) {
        sum += arrPrice[i].price_x_qty;
    }
    // console.log('TOTAL HARGA ', sum);

    const handleClickCalculate = () => {
        const kumpulData = {
            origin: '6299', // id cibodas
            originType: 'subdistrict',
            destination: `${stateIdKecamatan}`,
            destinationType: 'subdistrict',
            weight: 1700,
            courier: `${kurir}`
        };

        // disini juga akan menirimkan data cart ke BE cart

        const cekOngkir = async () => {
            const data = await axios.post('/api/postCekOngkir', kumpulData);
            setResAPI(data.data.finishedLoadResponse);
            setUiLoading(data.data.munculin_LoadingButton);
            setCekOngkirData(data.data.data);
            dispatch(settingDetailDataKurir(data.data.data));
            //Buat di checkout page agar tidak hilang pas direfresh
            dispatch(settingDetailDataKurirForCheckout(data.data.data));
        };

        if (dataProductOnBag.length === 0) {
            dispatch(setErrorEmptyBag('Keranjang belanja masih kosong!'));
        } else if (stateKecamatan === '' || locationProvince === '') {
            setErrorKecamatan('Kecamatan masih kosong!');
            setErrorProvinsi('Provinsi masih kosong!');
        } else if (kurirName === '') {
            setErrorKurirname('Anda belum memilih kurir!');
        } else {
            setUiLoading(true);
            cekOngkir();
        }
    };

    // console.log('ONGKIRRRRR ', cekOngkirData);

    const handleClickCheckout = (e) => {
        if (shippingFee === 0) {
            setErrorPilihTypeService('Anda belum memilih jenis service');
        } else {
            setUiLoadingButtonCheckout(true);
            dispatch(setMainURL('Checkout'));
            dispatch(addTotalPrice(sum));
            dispatch(addTotalPlusShippingFee(TotalPlusShippingFee));

            dispatch(updatePutCartBE(dataProductOnBag));
            // disini nanti dikasih logi tambahan untuk PUT dataProductOnBag ke cart database
            e.preventDefault();
            router.push('/checkout');
        }
    };
    const handleClickCheckoutNoAccess = () => {
        dispatch(setErrorCheckoutButton('Anda harus login terlebih dahulu'));
    };

    const handleClickBack = () => {
        setStatusShippingEstimation('inputField');
        setValue(0);
        dispatch(addShippingFee(0));
        dispatch(clearErrorCheckoutButton());
        // dispatch(addKurir(''));
        // dispatch(settingKurirName(''));
        setUiLoading(false);
        setResAPI(true);
    };

    const handleChange = (event) => {
        setValue(parseInt(event.target.value, 10));
        // let integerShippingFee = parseInt(event.target.value, 10);
        dispatch(addShippingFee(parseInt(event.target.value, 10)));
        // addTotalPlusShippingFee
    };

    const handleChangeKurir = (event) => {
        setValueKurir(event.target.value);
        dispatch(addKurir(event.target.value));
        dispatch(settingKurirName(event.target.value));
        //Buat di checkout page agar tidak hilang pas direfresh
        dispatch(settingKurirNameForCheckout(event.target.value));

        // addTotalPlusShippingFee
    };

    const list_cost = cekOngkirData.map((ongkir) => {
        return ongkir.costs;
    });

    // console.log('TRUE ONGKIR', list_cost);

    let TotalPlusShippingFee = sum + value;

    let cardItem =
        dataProductOnBag.length === 0 ? (
            <div>
                <p style={{ fontSize: 15 }}>Your bag is empty</p>
            </div>
        ) : (
            dataProductOnBag.map((bag, i) => {
                return (
                    <div className={classes.cardItem} key={i}>
                        <div className={classes.parentContImage}>
                            <div className={classes.contImage}>
                                <Image
                                    src={`${bag.imageProduct}`}
                                    alt="Single Product"
                                    width={300}
                                    height={300}
                                    layout="responsive"
                                    objectFit="fill"
                                />
                            </div>
                            {/* <p>ini buat gambar</p> */}
                        </div>
                        <div className={classes.cardDesc}>
                            <div className="innerCardDesc">
                                {bag.nameProduct.length > 28 ? (
                                    <h2 className={classes.textSizeh2Logic}>{bag.nameProduct}</h2>
                                ) : (
                                    <h2 className={classes.textSizeh2}>{bag.nameProduct}</h2>
                                )}
                                {/* <h2 className={classes.textSizeh2} style={{ marginBottom: 5 }}>
                                    {bag.nameProduct}
                                </h2> */}
                                <div style={{ display: 'flex', marginBottom: 5 }}>
                                    <span className={classes.circleColor}></span>
                                    <p className={classes.pSize}>{`(1500 gr)`}</p>
                                </div>
                                {bag.promo_price ? (
                                    <div>
                                        <p className={classes.pSize}>{`IDR ${bag.promo_price}`} </p>
                                        <p className={classes.pSize}>
                                            <b style={{ color: '#FF7373' }}>(Promo Price!)</b>
                                        </p>
                                    </div>
                                ) : (
                                    <p className={classes.pSize}>{`IDR ${bag.price}`}</p>
                                )}
                            </div>
                            <div className="qtyTextPosition">
                                <p className={classes.pSize}>{bag.qty}</p>
                            </div>
                            <div className="buttonDelPosition">
                                <DeleteCartItem
                                    bagId={bag.id}
                                    arrPrice={arrPrice}
                                    idUniqCartUser={idUniqCartUser}
                                    authenticated={authenticated}
                                />
                            </div>
                        </div>
                    </div>
                );
            })
        );

    let displayGalleryDesktop = (
        <div>
            <div style={{ width: '100%', textAlign: 'center', marginBottom: 40 }}>
                <h1 className={classes.fontSubTitleOnHome}>–—— You May Also Like –——</h1>
            </div>

            {/* <SliderSingleProduct /> */}
            <SliderLocalSingleProduct />

            <div style={{ width: 186, marginTop: 30, marginLeft: 'auto', marginRight: 'auto' }}>
                <MainBlackButton className={'BlackButton'} onClick={handleClickProductPage}>
                    All Product
                </MainBlackButton>
            </div>
        </div>
    );

    let displayGalleryMobile = (
        <div>
            <div className={classes.youMayAlsoLikeMobile}>
                <h1 className={classes.fontSubTitleOnHome}>–—— You May Also Like –——</h1>
            </div>

            <HomeProductCardSixNewItemMobile />
        </div>
    );

    let descPromo = (
        <div className={classes.descPromoStyles}>
            <div style={{ display: 'flex', color: '#7CD27F' }}>
                <p style={{ marginRight: 10, color: '#7CD27F', fontSize: 15 }}>*</p>
                <p style={{ color: '#7CD27F', fontSize: 15 }}>
                    Min belanja IDR 300.000, keuntungan reseller, dapet potongan harga IDR 25.000
                </p>
            </div>

            <hr style={{ marginBottom: 15, border: 'none' }} />

            <div style={{ display: 'flex', color: '#7CD27F' }}>
                <p style={{ marginRight: 10, color: '#7CD27F', fontSize: 15 }}>*</p>
                <p style={{ color: '#7CD27F', fontSize: 15 }}>
                    Min belanja IDR 2.000.000, keuntungan distributor dapet potongan harga IDR 50.000
                </p>
            </div>
        </div>
    );

    let list_kurir = (
        <>
            <div>
                {kurirName === '' ? (
                    <>
                        <div style={{ display: 'flex', alignItems: 'center', fontSize: 15, marginBottom: 20 }}>
                            <p className={classes.pSizeShipping}>List Coureer</p>
                        </div>
                        <p className={classes.pSize} style={{ color: 'red' }}>
                            {errorKurirname}
                        </p>
                    </>
                ) : (
                    <div style={{ display: 'flex', alignItems: 'center', fontSize: 15, marginBottom: 20 }}>
                        <p className={classes.pSizeShipping}>List Coureer</p>
                    </div>
                )}
                <div>
                    <FormControl component="fieldset">
                        <RadioGroup
                            aria-label="gender"
                            name="controlled-radio-buttons-group"
                            value={valueKurir}
                            onChange={handleChangeKurir}
                        >
                            <div style={{ display: 'flex' }}>
                                <div
                                    style={{ display: 'flex', alignItems: 'center', marginBottom: 10, marginRight: 10 }}
                                >
                                    <FormControlLabel
                                        value={`sicepat`}
                                        control={<Radio />}
                                        style={{ fontSize: 15, marginRight: 0 }}
                                        label=""
                                    />
                                    <Image src={SiCepat} alt="sicepat" width={75} height={27} />
                                </div>
                                <div
                                    style={{ display: 'flex', alignItems: 'center', marginBottom: 10, marginRight: 10 }}
                                >
                                    <FormControlLabel
                                        value={`jne`}
                                        control={<Radio />}
                                        style={{ fontSize: 15, marginRight: 0 }}
                                        label=""
                                    />
                                    <Image src={JNE} alt="JNE" width={75} height={20} />
                                </div>
                                <div
                                    style={{ display: 'flex', alignItems: 'center', marginBottom: 10, marginRight: 0 }}
                                >
                                    <FormControlLabel
                                        value={`jnt`}
                                        control={<Radio />}
                                        style={{ fontSize: 15, marginRight: 0 }}
                                        label=""
                                    />
                                    <Image src={JNT} alt="JNT" width={75} height={20} />
                                </div>
                            </div>
                        </RadioGroup>
                    </FormControl>
                </div>
            </div>
        </>
    );

    let shipping_estimation_input = (
        <>
            {locationProvince !== '' ? (
                <div>
                    <AutoCompleteProvince />
                </div>
            ) : (
                <div>
                    <AutoCompleteProvince />
                    <p className={classes.pSize} style={{ color: 'red' }}>
                        {errorProvinsi}
                    </p>
                </div>
            )}

            <hr style={{ marginBottom: 15, border: 'none' }} />

            <div>
                <DropdownKabupaten />
            </div>

            <hr style={{ marginBottom: 15, border: 'none' }} />

            {stateKecamatan !== '' ? (
                <div>
                    <DropdownKecamatan />
                </div>
            ) : (
                <div>
                    <DropdownKecamatan />
                    <p className={classes.pSize} style={{ color: 'red' }}>
                        {errorKecamatan}
                    </p>
                </div>
            )}

            <hr style={{ marginBottom: 15, border: 'none' }} />

            {list_kurir}
        </>
    );

    let Result_estimation = (
        <>
            <div>
                {shippingFee === 0 ? (
                    <>
                        <div style={{ display: 'flex', alignItems: 'center', fontSize: 15, marginBottom: 20 }}>
                            <AddLocationAltIcon style={{ marginRight: 10 }} /> {stateKota}, {stateKecamatan}
                        </div>
                        <p className={classes.pSize} style={{ color: 'red' }}>
                            {errorPiilihTypeService}
                        </p>
                    </>
                ) : (
                    <div style={{ display: 'flex', alignItems: 'center', fontSize: 15, marginBottom: 20 }}>
                        <AddLocationAltIcon style={{ marginRight: 10 }} /> {stateKota}, {stateKecamatan}
                    </div>
                )}
                {/* <div style={{ display: 'flex', alignItems: 'center', fontSize: 15, marginBottom: 20 }}>
                    <AddLocationAltIcon style={{ marginRight: 10 }} /> {stateKota}, {stateKecamatan}
                </div> */}
                <div>
                    <FormControl component="fieldset">
                        <RadioGroup
                            aria-label="gender"
                            name="controlled-radio-buttons-group"
                            value={value}
                            onChange={handleChange}
                        >
                            {cekOngkirData.map((ongkir, i) => {
                                return (
                                    <div key={i}>
                                        {ongkir.name === 'SiCepat Express' ? (
                                            <div style={{ marginBottom: 10 }} key={i}>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <FormControlLabel
                                                        value={ongkir.costs[i].cost[i].value}
                                                        // value={cekOngkirData.costs[0].cost.value}
                                                        control={<Radio />}
                                                        style={{ fontSize: 15, marginRight: 5 }}
                                                        label=""
                                                        // checked={true}
                                                    />
                                                    <Image src={SiCepat} alt="sicepat" width={75} height={27} />
                                                    <div style={{ display: 'flex', marginLeft: 10 }}>
                                                        <div style={{ display: 'none' }}>
                                                            <p className={classes.pSize}>{ongkir.name}</p>
                                                        </div>
                                                        <div>
                                                            <p className={classes.pSize} style={{ marginLeft: 10 }}>
                                                                {/* {ongkir.name} */}
                                                                {ongkir.costs[i].service}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <p className={classes.pSize} style={{ marginLeft: 42 }}>
                                                    {`Estimasi Tiba ${ongkir.costs[i].cost[i].etd} hari`}
                                                </p>
                                            </div>
                                        ) : null}

                                        {ongkir.name === 'Jalur Nugraha Ekakurir (JNE)' ? (
                                            <div style={{ marginBottom: 10 }} key={i}>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <FormControlLabel
                                                        value={ongkir.costs[i].cost[i].value}
                                                        // value={cekOngkirData.costs[0].cost.value}
                                                        control={<Radio />}
                                                        style={{ fontSize: 15, marginRight: 5 }}
                                                        label=""
                                                        // checked={true}
                                                    />
                                                    <Image src={JNE} alt="JNE" width={75} height={27} />
                                                    <div style={{ display: 'flex', marginLeft: 10 }}>
                                                        <div style={{ display: 'none' }}>
                                                            <p className={classes.pSize}>{ongkir.name}</p>
                                                        </div>
                                                        <div>
                                                            <p className={classes.pSize} style={{ marginLeft: 10 }}>
                                                                {/* {ongkir.name} */}
                                                                {ongkir.costs[i].service}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    {/* <p className={classes.pSize} style={{ marginLeft: 10 }}>
                                                {ongkir.costs[i].service}
                                            </p> */}
                                                </div>
                                                <p className={classes.pSize} style={{ marginLeft: 42 }}>
                                                    {`Estimasi Tiba ${ongkir.costs[i].cost[i].etd} hari`}
                                                </p>
                                            </div>
                                        ) : null}

                                        {ongkir.name === 'J&T Express' ? (
                                            <div style={{ marginBottom: 10 }} key={i}>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <FormControlLabel
                                                        value={ongkir.costs[i].cost[i].value}
                                                        // value={cekOngkirData.costs[0].cost.value}
                                                        control={<Radio />}
                                                        style={{ fontSize: 15, marginRight: 5 }}
                                                        label=""
                                                        // checked={true}
                                                    />
                                                    <Image src={JNT} alt="JNT" width={75} height={27} />
                                                    <div style={{ display: 'flex', marginLeft: 10 }}>
                                                        <div>
                                                            <p className={classes.pSize}>{ongkir.name}</p>
                                                        </div>
                                                        <div>
                                                            <p className={classes.pSize} style={{ marginLeft: 10 }}>
                                                                {/* {ongkir.name} */}
                                                                {ongkir.costs[i].service}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    {/* <p className={classes.pSize} style={{ marginLeft: 10 }}>
                                                {ongkir.costs[i].service}
                                            </p> */}
                                                </div>
                                                {ongkir.costs[i].cost[i].etd !== '' ? (
                                                    <p className={classes.pSize} style={{ marginLeft: 42 }}>
                                                        {`Estimasi Tiba ${ongkir.costs[i].cost[i].etd} hari`}
                                                    </p>
                                                ) : null}
                                            </div>
                                        ) : null}
                                    </div>
                                );
                            })}
                        </RadioGroup>
                    </FormControl>
                </div>
            </div>
        </>
    );

    let total_harga_normal = (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p className={classes.pSize}>Total</p>
                <p className={classes.pSize}>IDR {sum}</p>
            </div>
            <p className={classes.pSize} style={{ color: 'red' }}>
                (Belum termasuk shipping fee)
            </p>
        </>
    );

    let Total_Plus_Shipping = (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p className={classes.pSize}>Shipping Fee</p>
                <p className={classes.pSize}>IDR {value}</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }}>
                <p className={classes.pSizeTotalPlusShipping}>Total + Shipping Fee</p>
                <p className={classes.pSizeTotalPlusShipping}>{`IDR ${TotalPlusShippingFee}`}</p>
            </div>
        </>
    );

    let calculate_button = uiLoading ? (
        <div style={{ width: '50%', marginLeft: 'auto' }}>
            <MainBlackButton className={'BlackButton'}>
                <CircularProgress size={25} />
            </MainBlackButton>
        </div>
    ) : (
        <div style={{ width: '50%', marginLeft: 'auto' }}>
            <MainBlackButton className={'BlackButton'} onClick={handleClickCalculate}>
                Calculate
            </MainBlackButton>
        </div>
    );

    let back_button = (
        <div style={{ width: '50%', marginLeft: 'auto' }}>
            <MainBlackButton className={'BlackButton'} onClick={handleClickBack}>
                Back
            </MainBlackButton>
        </div>
    );

    let checkout_button = authenticated ? (
        uiLoadingButtonCheckout === true ? (
            <OrangeButton>
                <CircularProgress size={25} />
            </OrangeButton>
        ) : (
            <div onClick={handleClickCheckout}>
                <OrangeButton>
                    Checkout
                    {/* {uiLoadingButtonCheckout === true ? <CircularProgress size={25} /> : 'Checkout'} */}
                </OrangeButton>
            </div>
        )
    ) : (
        <div onClick={handleClickCheckoutNoAccess}>
            <OrangeButton>Checkout</OrangeButton>
        </div>
    );

    let disable_checkout_button = (
        <div>
            <DisabledButton>Checkout</DisabledButton>
        </div>
    );

    return (
        <div className={classes.main}>
            <Head>
                <title>Tokyo Foam || Cart</title>
            </Head>

            <div className={classes.mainContainer}>
                <div className={classes.textYourCart}>
                    <h1 className={classes.fontSubTitleOnHome}>Your Cart</h1>
                </div>
                <div className={classes.contCardItem}>
                    <div className={classes.innerContCardItem}>
                        {/* <div style={{ width: '65%', backgroundColor: 'brown' }}> */}
                        <div className={classes.textYourProductQty}>
                            <p className={classes.pSize}>Product</p>
                            <p className={classes.textSizeh2Qty}>Qty</p>
                        </div>
                        {cardItem}

                        <hr style={{ marginBottom: 30, border: 'none' }} />

                        {isMobile ? (isTablet ? (isDesktop ? descPromo : descPromo) : descPromo) : null}
                    </div>
                    <div className={classes.contShipping}>
                        {/* <div style={{ width: '35%', backgroundColor: 'green' }}> */}
                        <div className={classes.contInnerShipping}>
                            <p className={classes.pSizeShipping}>Shipping</p>

                            <hr style={{ marginBottom: 15, border: 'none' }} />

                            {dataProductOnBag.map((bag, i) => {
                                return (
                                    <div
                                        key={i}
                                        style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}
                                    >
                                        <div style={{ width: 350 }}>
                                            {/* <div style={{ maxWidth: 250, backgroundColor: 'green' }}> */}
                                            <p className={classes.pSize}>{`${bag.nameProduct}`}</p>
                                            <p className={classes.pSize}>{`(${bag.qty}) Item`}</p>
                                        </div>
                                        <div style={{ width: 200, textAlign: 'right' }}>
                                            {bag.promo_price_x_qty !== 0 ? (
                                                <p className={classes.pSize}>{`IDR ${bag.promo_price_x_qty}`}</p>
                                            ) : (
                                                <p className={classes.pSize}>{`IDR ${bag.price_x_qty}`}</p>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}

                            <hr style={{ marginBottom: 15, border: 'none' }} />

                            <p className={classes.pSize}>Shipping Estimation</p>

                            <hr style={{ marginBottom: 15, border: 'none' }} />

                            {statusShippingEstimation === 'inputField' ? shipping_estimation_input : Result_estimation}

                            <hr style={{ marginBottom: 15, border: 'none' }} />

                            {/**Tampilan Error jika keranjang belanja kosong pas button calculate di click */}
                            <p className={classes.pSize} style={{ color: 'red' }}>
                                {errors_empty_bag}
                            </p>

                            {statusShippingEstimation !== 'inputField' ? back_button : calculate_button}

                            <hr style={{ marginBottom: 15, border: 'none' }} />

                            {statusShippingEstimation !== 'inputField' ? Total_Plus_Shipping : total_harga_normal}

                            <hr style={{ marginBottom: 15, border: 'none' }} />

                            {/**Tampilan Error pas checkout jika belum login */}
                            <p className={classes.pSize} style={{ color: 'red' }}>
                                {errors_auth_checkout_button}
                            </p>

                            {statusShippingEstimation !== 'inputField' ? checkout_button : disable_checkout_button}
                        </div>
                    </div>
                    {isMobile ? (isTablet ? (isDesktop ? null : null) : null) : descPromo}
                </div>
            </div>

            <hr style={{ border: 'none', marginBottom: 100 }} />

            {isMobile
                ? isTablet
                    ? isDesktop
                        ? displayGalleryDesktop
                        : displayGalleryDesktop
                    : displayGalleryDesktop
                : displayGalleryMobile}
            <hr style={{ border: 'none', marginBottom: 100 }} />
        </div>
    );
};

export default Cart;
