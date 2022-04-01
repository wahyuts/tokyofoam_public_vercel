import Head from 'next/head';
import ReactResponsiveHook from '../../utils/ReactResponsiveHook';
import Image from 'next/image';
import { useRouter } from 'next/router';
import SiCepat from '../../../public/assets/images/sicepat.png';
import JNE from '../../../public/assets/images/jne.png';
import JNT from '../../../public/assets/images/jnt.png';
import React, { useState, useEffect } from 'react';

//MaT UI
import { makeStyles } from '@mui/styles';

import { CircularProgress } from '@mui/material';
import SliderSingleProduct from '../../utils/re-useable-components/slider-single-product';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';

import AllButtonFunctions from '../../utils/re-useable-functions/AllButtonFunctions';
import MainBlackButton from '../../utils/re-useable-components/buttons/MainBlackButton';
import AutoCompleteProvince from '../../utils/re-useable-components/dropdown/AutoComplete-Province';
import DropdownKabupaten from '../../utils/re-useable-components/dropdown/dropdown-kabupaten';

//RadioButton
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

//Redux
import { useDispatch, useSelector } from 'react-redux';
import OrangeButton from '../../utils/re-useable-components/buttons/OrangeButton';
import DropdownKecamatan from '../../utils/re-useable-components/dropdown/dropdown-kecamatan';
import {
    addTotalPlusShippingFee,
    addShippingFee,
    potonganMembership,
    postNewPesananPayLater,
    postNewPesananPayNow,
    deleteCartBEfromPayButton
} from '../../redux/actions/dataProductActions';
import { setMainURL } from '../../redux/actions/urlOnHeadnavActions';

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
            right: '10%'
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
        // marginBotom: 20,
        // height: 200,
        display: 'flex',
        [theme.breakpoints.down('mobile')]: {
            width: '100%',
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
        width: '28%',
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
            top: '15%',
            left: '5%',
            [theme.breakpoints.down('mobile')]: {
                top: '5%',
                left: '7%'
            }
        },
        '& .buttonDelPosition': {
            position: 'absolute',
            top: '35%',
            right: '5%',
            [theme.breakpoints.down('mobile')]: {
                top: '35%',
                right: 0
            }
        },
        '& .qtyTextPosition': {
            position: 'absolute',
            top: '45%',
            right: '29%',
            [theme.breakpoints.down('mobile')]: {
                top: '50%',
                right: '20%'
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
    shopping_condition_style: {
        width: '95%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 20,
        marginBottom: 20,
        [theme.breakpoints.down('mobile')]: {
            width: '80%',
            marginLeft: 'auto',
            marginRight: 'auto'
        }
    },
    innerCheckBox: {
        width: '60%',
        marginTop: 20,
        marginBottom: 20,
        // backgroundColor: 'green',
        [theme.breakpoints.down('mobile')]: {
            width: '100%',
            marginLeft: 'auto',
            marginRight: 'auto'
        }
    },
    theCheckBox: {
        width: '65%',
        marginRight: 'auto',
        marginLeft: 'auto',
        // backgroundColor: 'red',
        [theme.breakpoints.down('mobile')]: {
            width: '100%',
            marginLeft: 'auto',
            marginRight: 'auto'
        }
    },
    divButton: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        [theme.breakpoints.down('mobile')]: {
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        }
    },
    alamatOption: {
        display: 'flex',
        [theme.breakpoints.down('mobile')]: {
            flexDirection: 'column'

            // justifyContent: 'center',
            // alignItems: 'center'
        }
    },
    flexy: {
        display: 'flex',
        width: '89%',
        [theme.breakpoints.down('mobile')]: {
            width: '95%',
            flexDirection: 'column'
        }
    },
    textAreaFormCheckout: {
        paddingLeft: 10,
        paddingTop: 10,
        outline: 'none',
        fontSize: 15,
        fontWeight: 400,
        width: 719,
        // width: '60%',
        border: '1px solid #939393',
        [theme.breakpoints.down('mobile')]: {
            width: '100%'
        }
    },
    textAreaFormCheckout2: {
        paddingLeft: 10,
        paddingTop: 10,
        outline: 'none',
        fontSize: 15,
        fontWeight: 400,
        width: 400,
        // width: '60%',
        border: '1px solid #939393',
        [theme.breakpoints.down('mobile')]: {
            width: '100%'
        }
    },
    textAreaFormCheckout3: {
        paddingLeft: 10,
        paddingTop: 10,
        outline: 'none',
        fontSize: 15,
        fontWeight: 400,
        // width: 719,
        width: '60%',
        border: '1px solid #939393',
        [theme.breakpoints.down('mobile')]: {
            width: '95%'
        }
    },
    justMargin: {
        marginRight: 10,
        [theme.breakpoints.down('mobile')]: {
            marginRight: 0
        }
    },
    textAreaFormCheckoutKodePos: {
        paddingLeft: 10,
        outline: 'none',
        fontSize: 15,
        fontWeight: 400,
        width: '23%',
        height: 40,
        border: '1px solid #939393',
        [theme.breakpoints.down('mobile')]: {
            width: '95%'
        }
    },
    provKot: {
        width: '95%',
        display: 'flex',
        justifyContent: 'space-between',
        [theme.breakpoints.down('mobile')]: {
            flexDirection: 'column'
        }
    },
    eachBoxDropdown: {
        width: '25%',
        marginRight: 10,
        [theme.breakpoints.down('mobile')]: {
            width: '95%',
            marginRight: 0,
            marginBottom: 20
        }
    },
    pSizeTotalPlusShipping: {
        fontSize: 15,
        fontWeight: 700,
        [theme.breakpoints.down('mobile')]: {
            fontSize: 13
        }
    }
}));

const Checkout = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const router = useRouter();
    const { dataProductOnBag, totalPrice, shippingFee, kurir, totalPrice_plus_shipping_minus_benefit_member } =
        useSelector((state) => state.bag);
    const { stateKota, stateKecamatan } = useSelector((state) => state.shippingAddres);
    const { detailDataKurirForCheckout, kurirNameForCheckout } = useSelector((state) => state.detailOngkirForCheckout);

    const { authenticated } = useSelector((state) => state.user);
    const { credentials } = useSelector((state) => state.user);
    const { loading_button_paylatter, loading_button_paynow } = useSelector((state) => state.UI);

    const [value, setValue] = useState(shippingFee);
    const [aggree, setAgreeTC] = useState(false);

    const handleChangeAgreement = (e) => {
        setAgreeTC(e.target.checked);
    };

    // console.log('check or not', aggree);

    const [defaultAddress, setDefaultAdress] = useState('userAddress');

    // console.log('BAGGGING', dataProductOnBag);
    const { isMobile, isTablet, isDesktop } = ReactResponsiveHook();
    const [arrPrice, setArrPrice] = useState([]);

    //SETTING Error Jika Field Form Ada yang kosong
    const [errorEmptyFieldUserAddress, setErrorEmptyFieldUserAddress] = useState('');
    const [errorEmptyFieldOtherAddress, setErrorEmptyFieldOtherAddress] = useState('');

    useEffect(() => {
        if (authenticated === false) {
            alert('Anda belum login, silahkan login terlebih dahulu!');
            dispatch(setMainURL('Home'));
            router.push('/');
            // } else if (dataProductOnBag.length === 0) {
            //     alert('Keranjang belanja Anda masih kosong, silahkan berbelanja dahulu!');
            //     dispatch(setMainURL('Cart'));
            //     router.push('/cart');
        } else {
            let Arr = dataProductOnBag.map((bag) => ({
                id_Product: bag.id,
                price_x_qty: bag.price_x_qty
            }));
            setArrPrice(Arr);
        }

        dispatch(addTotalPlusShippingFee(TotalMustPay));

        // let Arr = dataProductOnBag.map((bag) => ({
        //     id_Product: bag.id,
        //     price_x_qty: bag.price_x_qty
        // }));
        // setArrPrice(Arr);
    }, [dataProductOnBag, authenticated, dispatch, router, TotalMustPay]);

    //initialState.authenticated, dispatch, router

    // console.log('ARR Khusus Harga', arrPrice);
    // Untuk menjumlahkan data array yang ada di arrPrice
    let sum = 0;
    // let sum = totalPrice;

    for (let i = 0; i < arrPrice.length; i++) {
        sum += arrPrice[i].price_x_qty;
    }
    // dispatch(addTotalPrice(sum));
    // console.log('TOTAL HARGA ', sum);

    const handleChange = (event) => {
        setValue(parseInt(event.target.value, 10));
        dispatch(addShippingFee(parseInt(event.target.value, 10)));
        dispatch(addTotalPlusShippingFee(TotalMustPay));
    };

    const handleDefaultAddress = (event) => {
        setDefaultAdress(event.target.value);
        setAgreeTC(false);
    };

    // STATE BUAT FORM MEMBER CHECKOUT
    const [nameMember, setNameMember] = useState(credentials.nama);
    const [addressMember, setAddressMember] = useState(credentials.alamat);
    const [noHandphoneMember, setNoHandphoneMember] = useState(credentials.no_telp);
    const [kodeposMember, setKodeposMember] = useState('');
    const [noted, setNoted] = useState('');

    // console.log('KodePos Member', kodeposMember);
    // console.log('Name Member', nameMember);

    const [otherNameMember, setOtherNameMember] = useState('');
    const [otherAddressMember, setOtherAddressMember] = useState('');
    const [otherNoHandphoneMember, setOtherNoHandphoneMember] = useState('');
    const [otherKodeposMember, setOtherKodeposMember] = useState('');
    // const [otherNoted, setOtherNoted] = useState('');

    //Fungsi buat onchange form text member
    const handleChangeNameMember = (e) => {
        setNameMember(e.target.value);
    };
    const handleChangeAddressMember = (e) => {
        setAddressMember(e.target.value);
    };
    const handleChangeNoHandphoneMember = (e) => {
        setNoHandphoneMember(e.target.value);
    };
    const handleChangeKodeposMember = (e) => {
        setKodeposMember(e.target.value);
        // setErrorEmptyFieldUserAddress('');
    };
    const handleChangeNoted = (e) => {
        setNoted(e.target.value);
    };

    //Fungsi buat onChange other address
    const handleChangeOtherNameMember = (e) => {
        setOtherNameMember(e.target.value);
        setErrorEmptyFieldOtherAddress('');
    };
    const handleChangeOtherAddressMember = (e) => {
        setOtherAddressMember(e.target.value);
        setErrorEmptyFieldOtherAddress('');
    };
    const handleChangeOtherNoHandphoneMember = (e) => {
        setOtherNoHandphoneMember(e.target.value);
        setErrorEmptyFieldOtherAddress('');
    };
    const handleChangeOtherKodeposMember = (e) => {
        setOtherKodeposMember(e.target.value);
        setErrorEmptyFieldOtherAddress('');
    };
    // console.log('NAMA USER', nameMember);
    // console.log('NAMA USER', otherNameMember);  TotalMustPay

    const handleClickConfirmOrderPayLater = () => {
        //fungsi buat post ke db pesanan
        if (defaultAddress === 'userAddress') {
            if (dataProductOnBag.length === 0) {
                alert('Keranjang belanja Anda masih kosong, silahkan berbelanja dahulu!');
                dispatch(setMainURL('Product'));
                router.push('/product-page');
            } else if (nameMember === '' || addressMember === '' || noHandphoneMember === '' || kodeposMember === '') {
                setErrorEmptyFieldUserAddress('Kodepos masih kosong!');
            } else {
                if (aggree === true) {
                    const dataPesanan = {
                        nama_pembeli: `${nameMember}`,
                        tanggal_pembelian: `${date}`, //ini tipe date
                        no_handphone: `${noHandphoneMember}`,
                        alamat_pengiriman: `${addressMember}`,
                        kodepos: `${kodeposMember}`,
                        catatan: `${noted}`,
                        expedisi: `${kurir}`,
                        shipping_fee: shippingFee,
                        total_exclude_shipping: totalPrice,
                        potongan_benefit_membership: benefitMembership, // ini bukan di ambil dari reducer melainkan hanya variable biasa
                        // totalPrice_plus_shipping_minus_benefit_member: totalPrice_plus_shipping_minus_benefit_member,
                        totalPrice_plus_shipping_minus_benefit_member: TotalMustPay,
                        status_payment: 'Belum Diterima',
                        no_resi: 'Belum Terinput',
                        tanggal_start_pengiriman: '',
                        cart: dataProductOnBag
                    };

                    dispatch(
                        postNewPesananPayLater(
                            dataPesanan,
                            router,
                            setKodeposMember,
                            setOtherNameMember,
                            setOtherAddressMember,
                            setOtherNoHandphoneMember,
                            setOtherKodeposMember,
                            setNoted
                        )
                    );
                    // dispatch(deleteCartBEfromPayButton(dataProductOnBag));
                    // abis const data diatas baru disini fungsi post api nya
                } else {
                    alert('Anda belum menyetujui agreement !');
                }
            }
        } else {
            if (dataProductOnBag.length === 0) {
                alert('Keranjang belanja Anda masih kosong, silahkan berbelanja dahulu!');
                dispatch(setMainURL('Product'));
                router.push('/product-page');
            } else if (
                otherNameMember === '' ||
                otherAddressMember === '' ||
                otherNoHandphoneMember === '' ||
                otherKodeposMember === ''
            ) {
                setErrorEmptyFieldOtherAddress('Form masih ada yang kosong!');
            } else {
                if (aggree === true) {
                    const dataPesananOtherAddress = {
                        nama_pembeli: `${otherNameMember}`,
                        tanggal_pembelian: `${date}`, // ini tipe date
                        no_handphone: `${otherNoHandphoneMember}`,
                        alamat_pengiriman: `${otherAddressMember}`,
                        kodepos: `${otherKodeposMember}`,
                        catatan: `${noted}`,
                        expedisi: `${kurir}`,
                        shipping_fee: shippingFee,
                        total_exclude_shipping: totalPrice,
                        potongan_benefit_membership: benefitMembership,
                        // totalPrice_plus_shipping_minus_benefit_member: totalPrice_plus_shipping_minus_benefit_member,
                        totalPrice_plus_shipping_minus_benefit_member: TotalMustPay,
                        status_payment: 'Belum Diterima',
                        no_resi: 'Belum Terinput',
                        tanggal_start_pengiriman: '',
                        cart: dataProductOnBag
                        // abis const data diatas baru disini fungsi post api nya
                    };

                    dispatch(
                        postNewPesananPayLater(
                            dataPesananOtherAddress,
                            router,
                            setKodeposMember,
                            setOtherNameMember,
                            setOtherAddressMember,
                            setOtherNoHandphoneMember,
                            setOtherKodeposMember,
                            setNoted
                        )
                    );
                    // dispatch(deleteCartBEfromPayButton(dataProductOnBag));
                } else {
                    alert('Anda belum menyetujui agreement !');
                }
            }
        }
    };

    const handleClickConfirmOrderPayNow = () => {
        //fungsi buat post ke db pesanan
        if (defaultAddress === 'userAddress') {
            if (dataProductOnBag.length === 0) {
                alert('Keranjang belanja Anda masih kosong, silahkan berbelanja dahulu!');
                dispatch(setMainURL('Product'));
                router.push('/product-page');
            } else if (nameMember === '' || addressMember === '' || noHandphoneMember === '' || kodeposMember === '') {
                setErrorEmptyFieldUserAddress('Kodepos masih kosong!');
            } else {
                if (aggree === true) {
                    const dataPesanan = {
                        nama_pembeli: `${nameMember}`,
                        tanggal_pembelian: `${date}`, //ini tipe date
                        no_handphone: `${noHandphoneMember}`,
                        alamat_pengiriman: `${addressMember}`,
                        kodepos: `${kodeposMember}`,
                        catatan: `${noted}`,
                        expedisi: `${kurir}`,
                        shipping_fee: shippingFee,
                        total_exclude_shipping: totalPrice,
                        potongan_benefit_membership: benefitMembership, // ini bukan di ambil dari reducer melainkan hanya variable biasa
                        totalPrice_plus_shipping_minus_benefit_member: TotalMustPay,
                        // totalPrice_plus_shipping_minus_benefit_member: totalPrice_plus_shipping_minus_benefit_member,
                        status_payment: 'Belum Diterima', // Aslinya Sudah Diterima
                        no_resi: 'Belum Terinput',
                        tanggal_start_pengiriman: '',
                        cart: dataProductOnBag
                    };

                    dispatch(
                        postNewPesananPayNow(
                            dataPesanan,
                            router,
                            setKodeposMember,
                            setOtherNameMember,
                            setOtherAddressMember,
                            setOtherNoHandphoneMember,
                            setOtherKodeposMember,
                            setNoted
                        )
                    );
                    // dispatch(deleteCartBEfromPayButton(dataProductOnBag));
                    // abis const data diatas baru disini fungsi post api nya
                } else {
                    alert('Anda belum menyetujui agreement !');
                }
            }
        } else {
            if (dataProductOnBag.length === 0) {
                alert('Keranjang belanja Anda masih kosong, silahkan berbelanja dahulu!');
                dispatch(setMainURL('Product'));
                router.push('/product-page');
            } else if (
                otherNameMember === '' ||
                otherAddressMember === '' ||
                otherNoHandphoneMember === '' ||
                otherKodeposMember === ''
            ) {
                setErrorEmptyFieldOtherAddress('Form masih ada yang kosong!');
            } else {
                if (aggree === true) {
                    const dataPesananOtherAddress = {
                        nama_pembeli: `${otherNameMember}`,
                        tanggal_pembelian: `${date}`, // ini tipe date
                        no_handphone: `${otherNoHandphoneMember}`,
                        alamat_pengiriman: `${otherAddressMember}`,
                        kodepos: `${otherKodeposMember}`,
                        catatan: `${noted}`,
                        expedisi: `${kurir}`,
                        shipping_fee: shippingFee,
                        total_exclude_shipping: totalPrice,
                        potongan_benefit_membership: benefitMembership,
                        totalPrice_plus_shipping_minus_benefit_member: TotalMustPay,
                        // totalPrice_plus_shipping_minus_benefit_member: totalPrice_plus_shipping_minus_benefit_member,
                        status_payment: 'Belum Diterima', // Aslinya Sudah Diterima
                        no_resi: 'Belum Terinput',
                        tanggal_start_pengiriman: '',
                        cart: dataProductOnBag
                        // abis const data diatas baru disini fungsi post api nya
                    };

                    dispatch(
                        postNewPesananPayNow(
                            dataPesananOtherAddress,
                            router,
                            setKodeposMember,
                            setOtherNameMember,
                            setOtherAddressMember,
                            setOtherNoHandphoneMember,
                            setOtherKodeposMember,
                            setNoted
                        )
                    );
                    // dispatch(deleteCartBEfromPayButton(dataProductOnBag));
                } else {
                    alert('Anda belum menyetujui agreement !');
                }
            }
        }
    };

    let today = new Date();

    // let onlyDateNow = today.getDate();
    // let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    // let date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
    let date = today.getMonth() + 1 + '/' + today.getDate() + '/' + today.getFullYear();

    // let TotalPlusShippingFee = sum + value;

    // console.log('CUMA TANGGAL AJA', today);
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
                        </div>
                    </div>
                );
            })
        );

    let boxUserAddress = (
        <div style={{ width: '100%' }}>
            <div className={classes.flexy}>
                <div className={classes.justMargin}>
                    <p className="textSubTitleFormCheckout">Nama</p>
                    <textarea
                        className={classes.textAreaFormCheckout}
                        name="nameMember"
                        cols="120"
                        rows="2"
                        value={nameMember}
                        // value={credentials.nama}
                        onChange={handleChangeNameMember}
                        disabled
                    ></textarea>
                </div>
                <div>
                    <p className="textSubTitleFormCheckout">Tanggal Pembelian (MM/DD/YYYY)</p>
                    <textarea
                        // style={{ width: '60%', border: '1px solid #939393' }}
                        className={classes.textAreaFormCheckout2}
                        name="date_buying"
                        rows="2"
                        value={date}
                        disabled
                    >
                        {/* {date} */}
                    </textarea>
                </div>
            </div>

            <hr style={{ border: 'none', marginBottom: 10 }} />

            <div className={classes.flexy}>
                <div className={classes.justMargin}>
                    <p className="textSubTitleFormCheckout">Alamat Lengkap (sesuai KTP)</p>
                    <textarea
                        className={classes.textAreaFormCheckout}
                        name="addressMember"
                        cols="120"
                        rows="2"
                        value={addressMember}
                        // value={credentials.alamat}
                        onChange={handleChangeAddressMember}
                        disabled
                    ></textarea>
                </div>
                <div>
                    <p className="textSubTitleFormCheckout">No Handphone</p>
                    <textarea
                        // style={{ width: '60%', border: '1px solid #939393' }}
                        className={classes.textAreaFormCheckout2}
                        name="noHandphoneMember"
                        rows="2"
                        value={noHandphoneMember}
                        // value={credentials.no_telp}
                        onChange={handleChangeNoHandphoneMember}
                        disabled
                    ></textarea>
                </div>
            </div>

            <p className="textSubTitleFormCheckout">* Kode Pos</p>

            <input
                type="text"
                name="kodeposMember"
                className={classes.textAreaFormCheckoutKodePos}
                // disabled
                value={kodeposMember}
                onChange={handleChangeKodeposMember}
            />

            <hr style={{ border: 'none', marginBottom: 10 }} />

            <p className="textSubTitleFormCheckout">Catatan (opsional)</p>
            <textarea
                style={{ width: '95%', border: '1px solid #939393' }}
                className="textAreaFormCheckout"
                name="catatan"
                cols="100"
                rows="5"
                value={noted}
                onChange={handleChangeNoted}
            ></textarea>

            <hr style={{ border: 'none', marginBottom: 10 }} />

            <p className="textSubTitleFormCheckout">Shopping Condition</p>

            <div
                style={{
                    width: '96%',
                    border: '1px solid #939393',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <div className={classes.shopping_condition_style}>
                    <li className={classes.pSize}>
                        Pastikan alamat yang Anda masukan lengkap, benar dan valid. Kami tidak bertanggung jawab atas
                        tidak sampainya pesanan Anda yang di sebabkan oleh kelalaian dalam menulis alamat lengkap.
                    </li>
                    <hr style={{ border: 'none', marginBottom: 10 }} />

                    <li className={classes.pSize}>
                        Order yang masuk akan langsung segera kami proses, jika pembayaran sudah kami terima. Pastikan
                        kembali pesanan Anda sudah benar karena pesanan tidak dapat dibatalkan atau di ubah ketika
                        pembayaran sudah kami terima
                    </li>
                    <hr style={{ border: 'none', marginBottom: 10 }} />

                    <li className={classes.pSize}>
                        Barang yang sudah dibeli tidak dapat dikembalikan atau ditukar dengan barang lain.
                    </li>
                    <hr style={{ border: 'none', marginBottom: 10 }} />

                    <li className={classes.pSize}>
                        Jika barang tidak tersedia maka CS kami akan segera menghubungi Anda untuk melakukan refund.
                    </li>
                    <hr style={{ border: 'none', marginBottom: 10 }} />

                    <li className={classes.pSize}>
                        Bila produk yang Anda terima dalam keadaan cacat atau rusak, silakan segera hubungi kami untuk
                        proses Garansi.
                    </li>
                </div>
            </div>

            <hr style={{ border: 'none', marginBottom: 10 }} />

            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div className={classes.innerCheckBox}>
                    <div className={classes.theCheckBox}>
                        <input
                            type="checkbox"
                            id="agree01"
                            name="agree_term"
                            value={aggree}
                            onChange={handleChangeAgreement}
                        />
                        <label className={classes.pSize} style={{ marginLeft: 10 }} htmlFor="agree01">
                            I Agree to the Terms & Conditions & Shopping Condition
                        </label>
                    </div>

                    <p style={{ textAlign: 'center', fontSize: 12, marginTop: 10, color: 'red' }}>
                        {errorEmptyFieldUserAddress}
                    </p>

                    <hr style={{ border: 'none', marginBottom: 5 }} />
                    <div className={classes.divButton}>
                        <div style={{ width: 328 }}>
                            {loading_button_paynow === true ? (
                                <MainBlackButton className={'BlackButton'}>
                                    <CircularProgress size={25} />
                                </MainBlackButton>
                            ) : (
                                <MainBlackButton className={'BlackButton'} onClick={handleClickConfirmOrderPayNow}>
                                    Confirm Order & Pay
                                </MainBlackButton>
                            )}
                            {/* <MainBlackButton className={'BlackButton'} onClick={handleClickConfirmOrderPayNow}>
                                Confirm Order & Pay
                            </MainBlackButton> */}
                        </div>
                        <div style={{ marginLeft: 10, marginRight: 10, marginTop: 10 }}>
                            <p className={classes.pSize}>Or</p>
                        </div>
                        <div style={{ width: 328 }}>
                            {loading_button_paylatter === true ? (
                                <MainBlackButton className={'BorderButton'}>
                                    <CircularProgress size={25} />
                                </MainBlackButton>
                            ) : (
                                <MainBlackButton className={'BorderButton'} onClick={handleClickConfirmOrderPayLater}>
                                    Confirm Order & Pay Later
                                </MainBlackButton>
                            )}
                            {/* <MainBlackButton className={'BorderButton'} onClick={handleClickConfirmOrderPayLater}>
                                Confirm Order & Pay Later
                            </MainBlackButton> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    let boxOtherAddress = (
        <div style={{ width: '100%' }}>
            <div className={classes.flexy}>
                <div className={classes.justMargin}>
                    <p className="textSubTitleFormCheckout">Nama</p>
                    <textarea
                        className={classes.textAreaFormCheckout}
                        name="otherNameMember"
                        cols="120"
                        rows="2"
                        value={otherNameMember}
                        onChange={handleChangeOtherNameMember}
                    ></textarea>
                </div>
                <div>
                    <p className="textSubTitleFormCheckout">Tanggal Pembelian (MM/DD/YYYY)</p>
                    <textarea
                        // style={{ width: '60%', border: '1px solid #939393' }}
                        className={classes.textAreaFormCheckout2}
                        name="date_buying"
                        rows="2"
                        disabled
                    ></textarea>
                </div>
            </div>

            <hr style={{ border: 'none', marginBottom: 10 }} />

            <div className={classes.flexy}>
                <div className={classes.justMargin}>
                    <p className="textSubTitleFormCheckout">Alamat Lengkap (Sesuai KTP)</p>
                    <textarea
                        className={classes.textAreaFormCheckout}
                        name="otherAddressMember"
                        cols="120"
                        rows="2"
                        value={otherAddressMember}
                        onChange={handleChangeOtherAddressMember}
                    ></textarea>
                </div>
                <div>
                    <p className="textSubTitleFormCheckout">No Handphone</p>
                    <textarea
                        // style={{ width: '60%', border: '1px solid #939393' }}
                        className={classes.textAreaFormCheckout2}
                        name="no_handphone"
                        rows="2"
                        value={otherNoHandphoneMember}
                        onChange={handleChangeOtherNoHandphoneMember}
                    ></textarea>
                </div>
            </div>

            <hr style={{ border: 'none', marginBottom: 10 }} />

            {/* <p className="textSubTitleFormCheckout">Provinsi / Kota / Kecamatan</p>
            <div className={classes.provKot}>
                <div className={classes.eachBoxDropdown}>
                    <AutoCompleteProvince />
                </div>

                <div className={classes.eachBoxDropdown}>
                    <DropdownKabupaten />
                </div>

                <div className={classes.eachBoxDropdown}>
                    <DropdownKecamatan />
                </div>
            </div>

            <hr style={{ border: 'none', marginBottom: 10 }} /> */}

            <p className="textSubTitleFormCheckout">* Kode Pos</p>

            <input
                type="text"
                name="kode_pos"
                className={classes.textAreaFormCheckoutKodePos}
                value={otherKodeposMember}
                onChange={handleChangeOtherKodeposMember}
            />

            <hr style={{ border: 'none', marginBottom: 20 }} />

            <p className="textSubTitleFormCheckout">Catatan (opsional)</p>
            <textarea
                style={{ width: '95%', border: '1px solid #939393' }}
                className="textAreaFormCheckout"
                name="Catatan"
                cols="100"
                rows="5"
                value={noted}
                onChange={handleChangeNoted}
            ></textarea>

            <hr style={{ border: 'none', marginBottom: 10 }} />

            <p className="textSubTitleFormCheckout">Shopping Condition</p>

            <div
                style={{
                    width: '96%',
                    border: '1px solid #939393',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <div className={classes.shopping_condition_style}>
                    <li className={classes.pSize}>
                        Pastikan alamat yang Anda masukan lengkap, benar dan valid. Kami tidak bertanggung jawab atas
                        tidak sampainya pesanan Anda yang di sebabkan oleh kelalaian dalam menulis alamat lengkap.
                    </li>
                    <hr style={{ border: 'none', marginBottom: 10 }} />

                    <li className={classes.pSize}>
                        Order yang masuk akan langsung segera kami proses, jika pembayaran sudah kami terima. Pastikan
                        kembali pesanan Anda sudah benar karena pesanan tidak dapat dibatalkan atau di ubah ketika
                        pembayaran sudah kami terima
                    </li>
                    <hr style={{ border: 'none', marginBottom: 10 }} />

                    <li className={classes.pSize}>
                        Barang yang sudah dibeli tidak dapat dikembalikan atau ditukar dengan barang lain.
                    </li>
                    <hr style={{ border: 'none', marginBottom: 10 }} />

                    <li className={classes.pSize}>
                        Jika barang tidak tersedia maka CS kami akan segera menghubungi Anda untuk melakukan refund.
                    </li>
                    <hr style={{ border: 'none', marginBottom: 10 }} />

                    <li className={classes.pSize}>
                        Bila produk yang Anda terima dalam keadaan cacat atau rusak, silakan segera hubungi kami untuk
                        proses Garansi.
                    </li>
                </div>
            </div>

            <hr style={{ border: 'none', marginBottom: 10 }} />

            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div className={classes.innerCheckBox}>
                    <div className={classes.theCheckBox}>
                        <input
                            type="checkbox"
                            id="agree01"
                            name="agree_term"
                            value={aggree}
                            onChange={handleChangeAgreement}
                        />
                        <label className={classes.pSize} style={{ marginLeft: 10 }} htmlFor="agree01">
                            I Agree to the Terms & Conditions & Shopping Condition
                        </label>
                    </div>

                    <p style={{ textAlign: 'center', fontSize: 12, marginTop: 10, color: 'red' }}>
                        {errorEmptyFieldOtherAddress}
                    </p>

                    <hr style={{ border: 'none', marginBottom: 5 }} />

                    <div className={classes.divButton}>
                        <div style={{ width: 328 }}>
                            {loading_button_paynow === true ? (
                                <MainBlackButton className={'BlackButton'}>
                                    <CircularProgress size={25} />
                                </MainBlackButton>
                            ) : (
                                <MainBlackButton className={'BlackButton'} onClick={handleClickConfirmOrderPayNow}>
                                    Confirm Order & Pay
                                </MainBlackButton>
                            )}
                            {/* <MainBlackButton className={'BlackButton'} onClick={handleClickConfirmOrderPayNow}>
                                Confirm Order & Pay
                            </MainBlackButton> */}
                        </div>
                        <div style={{ marginLeft: 10, marginRight: 10, marginTop: 10 }}>
                            <p className={classes.pSize}>Or</p>
                        </div>
                        <div style={{ width: 328 }}>
                            {loading_button_paylatter === true ? (
                                <MainBlackButton className={'BorderButton'}>
                                    <CircularProgress size={25} />
                                </MainBlackButton>
                            ) : (
                                <MainBlackButton className={'BorderButton'} onClick={handleClickConfirmOrderPayLater}>
                                    Confirm Order & Pay Later
                                </MainBlackButton>
                            )}
                            {/* <MainBlackButton className={'BorderButton'} onClick={handleClickConfirmOrderPayLater}>
                                Confirm Order & Pay Later
                            </MainBlackButton> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    let display_FormCheckoutDesktop = (
        <div>
            <div
                style={{
                    width: '89%',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    marginBottom: 0
                    // backgroundColor: 'yellow'
                }}
            >
                <p style={{ fontSize: 20, fontWeight: 700, color: '#474747' }}>Delivery Address</p>

                <hr style={{ border: 'none', marginBottom: 10 }} />

                <div>
                    <FormControl component="fieldset">
                        <RadioGroup
                            aria-label="gender"
                            name="controlled-radio-buttons-group"
                            value={defaultAddress}
                            onChange={handleDefaultAddress}
                        >
                            <div className={classes.alamatOption}>
                                <div style={{ display: 'flex', marginBottom: 5, marginRight: 20 }}>
                                    <FormControlLabel
                                        value={'userAddress'}
                                        control={<Radio />}
                                        style={{ fontSize: 15, marginRight: 50 }}
                                        label="Alamat sudah tercantum"
                                    />
                                </div>
                                <div style={{ display: 'flex', marginBottom: 5 }}>
                                    <FormControlLabel
                                        value={'otherAddress'}
                                        control={<Radio />}
                                        style={{ fontSize: 15, marginRight: 50 }}
                                        label="Pakai alamat lain"
                                    />
                                </div>
                            </div>
                        </RadioGroup>
                    </FormControl>
                </div>

                <hr style={{ border: 'none', marginBottom: 10 }} />

                {defaultAddress === 'userAddress' ? boxUserAddress : boxOtherAddress}
            </div>
        </div>
    );

    let descPromo = (
        <div className={classes.descPromoStyles}>
            <p style={{ color: '#7CD27F', fontSize: 15 }}>Term And Conditions</p>

            <hr style={{ marginBottom: 15, border: 'none' }} />

            <div style={{ display: 'flex', color: '#7CD27F' }}>
                <p style={{ marginRight: 10, color: '#7CD27F', fontSize: 15 }}>*</p>
                <p style={{ color: '#7CD27F', fontSize: 15 }}>
                    Lihat shopping condition pada bagian paling bawah checkout page untuk lebih jelas
                </p>
            </div>

            <hr style={{ marginBottom: 10, border: 'none' }} />
        </div>
    );

    let Result_estimation = (
        <>
            <div>
                <div style={{ display: 'flex', alignItems: 'center', fontSize: 15, marginBottom: 20 }}>
                    <AddLocationAltIcon style={{ marginRight: 10 }} /> {stateKota}, {stateKecamatan}
                </div>
                <div>
                    <FormControl component="fieldset">
                        <RadioGroup
                            aria-label="gender"
                            name="controlled-radio-buttons-group"
                            value={value}
                            onChange={handleChange}
                        >
                            {detailDataKurirForCheckout.map((ongkir, i) => {
                                return (
                                    <div key={i}>
                                        {kurirNameForCheckout === 'sicepat' ? (
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
                                                    {/* <p className={classes.pSize} style={{ marginLeft: 10 }}>
                                                {ongkir.costs[i].service}
                                            </p> */}
                                                </div>
                                                <p className={classes.pSize} style={{ marginLeft: 42 }}>
                                                    {`Estimasi Tiba ${ongkir.costs[i].cost[i].etd} hari`}
                                                </p>
                                            </div>
                                        ) : null}

                                        {kurirNameForCheckout === 'jne' ? (
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

                                        {kurirNameForCheckout === 'jnt' ? (
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

    let status_level_user = credentials.level_user;
    let benefitMembership;
    // console.log('LEVEL USER', status_level_user);

    if (status_level_user === 'Reseller') {
        benefitMembership = 25000;
        // console.log(benefitMembership);
    } else if (status_level_user === 'Distributor') {
        benefitMembership = 50000;
        // console.log(benefitMembership);
    } else {
        benefitMembership = 0;
        // console.log(benefitMembership);
    }

    let TotalMustPay = totalPrice + shippingFee - benefitMembership;
    // console.log('TotalMustPay', TotalMustPay);
    // console.log('Status User', status_level_user);
    // console.log('Level', benefitMembership);

    let Total_Plus_Shipping = (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p className={classes.pSize}>Shipping Fee</p>
                <p className={classes.pSize}>IDR {value}</p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 5 }}>
                <p className={classes.pSize}>Benefit Membership</p>
                <p className={classes.pSize}>IDR - {benefitMembership}</p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }}>
                <p className={classes.pSizeTotalPlusShipping}>Total + Shipping Fee</p>
                {/* <p className={classes.pSize}>IDR 1.350.000</p> */}
                <p className={classes.pSizeTotalPlusShipping}>{`IDR ${TotalMustPay}`}</p>
            </div>
        </>
    );

    return (
        <div className={classes.main}>
            <Head>
                <title>Tokyo Foam || Checkout</title>
            </Head>

            <div className={classes.mainContainer}>
                <div className={classes.textYourCart}>
                    <h1 className={classes.fontSubTitleOnHome}>Checkout</h1>
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

                            {Result_estimation}

                            <hr style={{ marginBottom: 15, border: 'none' }} />

                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                                <p className={classes.pSize}>Total</p>
                                <p className={classes.pSize}>{`IDR ${totalPrice}`}</p>
                            </div>

                            {Total_Plus_Shipping}

                            <hr style={{ marginBottom: 15, border: 'none' }} />
                        </div>
                    </div>
                    {isMobile ? (isTablet ? (isDesktop ? null : null) : null) : descPromo}
                </div>
            </div>

            <hr style={{ border: 'none', marginBottom: 50 }} />

            {display_FormCheckoutDesktop}

            <hr style={{ border: 'none', marginBottom: 100 }} />
        </div>
    );
};

export default Checkout;
