import { forwardRef, useEffect, useState } from 'react';
import { Router, useRouter } from 'next/router';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import { Accordion, AccordionDetails, AccordionSummary, Container, IconButton, Snackbar, Stack } from '@mui/material';
import { VisibilityOutlined, CreditCardOutlined, DeleteOutlined } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MuiAlert from '@mui/material/Alert';

import { deleteOrderById, getOrderById } from '../../../redux/actions/dataHistoryOrderAction';
import { setLabelStatusPayment } from '../../../redux/actions/urlOnProfileButtonTabAction';

import MainBlackButton from '../../../utils/re-useable-components/buttons/MainBlackButton';
import HorizontalSpacer from '../../../components/HorizontalSpacer';
import ScrollForModal from '../../../utils/re-useable-components/scroll-for-modal';
import Dialog from './dialog';
import dayjs from 'dayjs';

import { LOCATION_PATH_DETAILS_ORDER, LOCATION_PATH_MOBILE_PAYMENT } from '../../../types';

const styles = {
    normalText: { fontWeight: 400, fontSize: '14px', marginLeft: 15, color: '#474747' },
    normalTextStatusFailed: { fontWeight: 400, fontSize: '14px', color: '#FF7373' },
    normalTextStatusComplete: { fontWeight: 400, fontSize: '14px', color: '#6AB469' },
    normalTextStatusWaiting: { fontWeight: 400, fontSize: '14px', color: '#FFE18E' },
    normalTextDisable: { fontWeight: 400, fontSize: '14px', color: '#787878' },
    normalTextDisableBold: { fontWeight: 600, fontSize: '14px', color: '#787878' },

    boldTextStatus: { fontWeight: 600, fontSize: '16px', color: '#FF7373' },

    smallTextDisable: { fontWeight: 400, fontSize: '12px', color: '#787878' }
};

const useStyles = makeStyles((theme) => ({
    cardContainerDesktop: {
        padding: '20px 24px 24px 24px',
        marginBottom: 35,
        marginLeft: '10%',
        marginRight: '10%',
        // width: '80%',
        [theme.breakpoints.down('mobile')]: {
            display: 'none'
        }
    },
    cardContainerMobile: {
        display: 'none',
        width: '100%',
        // backgroundColor: 'red',
        [theme.breakpoints.down('mobile')]: {
            marginBottom: 35,
            display: 'flex',
            marginLeft: 'auto',
            marginRight: 'auto'
        }
    },
    btnIcon: {
        '&.MuiIconButton-root': {
            borderRadius: '0'
        },
        '&.MuiIconButton-root:hover': {
            background: 'none'
        }
    },

    dialogBtnWrapper: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    dialogImageItem: {
        width: '18%'
    }
}));

// eslint-disable-next-line react/display-name
const Alert = forwardRef((props, ref) => {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CardComponent = ({ dataToRender }) => {
    const classes = useStyles();
    const router = useRouter();
    const dispatch = useDispatch();
    // const reverseData = dataToRender.reverse();
    // console.log('reverseDATA', reverseData);

    const { listOrderUserInUserDashboard } = useSelector((state) => state.dataProduct);
    const { statusResponse } = useSelector((state) => state.dbResponses);
    // console.log('DAFTAR ORDER USER', listOrderUserInUserDashboard);

    const [showModalPayment, setShowModalPayment] = useState(false);
    const [statusPayment, setStatusPayment] = useState({});
    const [dataOrder, setDataOrder] = useState({});
    const [dataCart, setDataCart] = useState([]);
    const [open, setOpen] = useState(false);

    const showPaymentStatusLabel = (label) => {
        if (label === 'expire') return setStatusPayment({ className: 'OrangeButton', label: 'Buy Again' });
        if (label === 'Telah dibayar') return setStatusPayment({ className: 'DisableButton', label });
        if (label === 'Pending') return setStatusPayment({ className: '', label: 'Pending' });
        return setStatusPayment({ className: 'BlackButton', label: 'Confirm Order & Pay' });
    };

    const currencyFormat = (currency) => {
        const newCurrency = new Intl.NumberFormat(['ban', 'id']).format(parseInt(currency, 10));
        return newCurrency;
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    useEffect(() => {}, [showModalPayment, listOrderUserInUserDashboard, statusPayment]);

    useEffect(() => {
        statusResponse?.response === 'OK' && setOpen(true);
    }, [statusResponse]);

    // console.log('dataRender', dataToRender);
    // console.log(statusResponse);

    return (
        <Container>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    {`${statusResponse.label} has been success`}
                </Alert>
            </Snackbar>

            {dataToRender.length === 0 ? (
                <p style={{ fontSize: '14px', textAlign: 'center' }}>Anda belum memiliki pesanan</p>
            ) : (
                <>
                    {dataToRender?.reverse().map((data, index) => {
                        const total = currencyFormat(data?.totalPrice_plus_shipping_minus_benefit_member);
                        const shipping_fee = currencyFormat(data?.shipping_fee);
                        const total_exclude_shipping = currencyFormat(data?.total_exclude_shipping);
                        const potongan_benefit_membership = currencyFormat(data?.potongan_benefit_membership);
                        const expedisi = data?.expedisi;

                        return (
                            <>
                                <div key={`${index}478398`} className={classes.cardContainerDesktop}>
                                    <Accordion disableGutters>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                        >
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    flexDiraction: 'row',
                                                    marginBottom: 20,
                                                    alignItems: 'center'
                                                }}
                                            >
                                                <p
                                                    style={{
                                                        fontWeight: 600,
                                                        fontSize: '20px',
                                                        color: '#474747',
                                                        marginRight: 90
                                                    }}
                                                >
                                                    ID Pesanan {data?._id}
                                                </p>
                                                <p style={{ fontWeight: 400, fontSize: '15px', color: '#474747' }}>
                                                    Status Payment:
                                                    <span
                                                        style={
                                                            data?.status_payment === 'Telah dibayar'
                                                                ? styles.normalTextStatusComplete
                                                                : data.status_payment === 'expire'
                                                                ? styles.normalTextStatusFailed
                                                                : styles.normalTextStatusWaiting
                                                        }
                                                    >
                                                        {' '}
                                                        {data?.status_payment.toUpperCase()}
                                                    </span>
                                                </p>
                                            </div>
                                        </AccordionSummary>
                                        {data?.cart?.map((item) => {
                                            const price =
                                                item?.promo_price === 0 ? item?.price : item?.promo_price_x_qty;
                                            const newPrice = currencyFormat(price);

                                            return (
                                                <AccordionDetails key={item?._id}>
                                                    <div
                                                        // key={item?._id}
                                                        style={{
                                                            display: 'flex',
                                                            flexDiraction: 'row',
                                                            justifyContent: 'space-between',
                                                            alignItems: 'center',
                                                            marginBottom: 30
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                display: 'flex',
                                                                flexDiraction: 'row',
                                                                width: '80%'

                                                                // backgroundColor: 'red'
                                                            }}
                                                        >
                                                            <div style={{ width: 180 }}>
                                                                <Image
                                                                    src={item?.imageProduct}
                                                                    alt="product image"
                                                                    width={180}
                                                                    height={180}
                                                                    layout="fixed"
                                                                    objectFit="contain"
                                                                    priority
                                                                />
                                                            </div>
                                                            <div style={{ marginLeft: 50 }}>
                                                                <p
                                                                    style={{
                                                                        fontWeight: 600,
                                                                        fontSize: '18px',
                                                                        color: '#474747'
                                                                    }}
                                                                >
                                                                    {item?.nameProduct}
                                                                </p>
                                                                <p style={styles.normalText}>
                                                                    Type:
                                                                    <span style={styles.normalTextDisable}>
                                                                        {' '}
                                                                        {item?.id_manual_product}
                                                                    </span>
                                                                </p>
                                                                <p style={styles.normalText}>
                                                                    Qty:
                                                                    <span style={styles.normalTextDisable}>
                                                                        {' '}
                                                                        {item.qty}
                                                                    </span>
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <p style={{ textAlign: 'right' }}>
                                                            <span style={styles.normalTextDisableBold}>
                                                                Rp {newPrice}
                                                            </span>
                                                        </p>
                                                    </div>
                                                </AccordionDetails>
                                            );
                                        })}
                                    </Accordion>
                                    <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'flex-end',
                                            marginBottom: 15,
                                            marginTop: 15
                                        }}
                                    >
                                        <div>
                                            <p style={styles.smallTextDisable}>Shipping Fee {`(${expedisi})`}:</p>
                                            <p style={styles.smallTextDisable}>Total Exclude Shipping:</p>
                                            <p style={styles.smallTextDisable}>Potongan Benefit Member:</p>
                                            <div style={{ marginTop: 20 }}>
                                                <p style={styles.normalTextDisable}>Total Pesanan:</p>
                                            </div>
                                        </div>
                                        <div
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'flex-end',
                                                marginLeft: 20
                                            }}
                                        >
                                            <p style={styles.smallTextDisable}>{shipping_fee.toString()}</p>
                                            <p style={styles.smallTextDisable}>{total_exclude_shipping.toString()}</p>
                                            <p style={styles.smallTextDisable}>
                                                {potongan_benefit_membership.toString()}
                                            </p>
                                            <div style={{ marginTop: 20 }}>
                                                <p style={styles.boldTextStatus}> Rp {total.toString()}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <div>
                                            <p style={styles.normalText}>
                                                No Resi/Tracking:
                                                <span style={styles.normalTextDisable}> {data?.no_resi}</span>
                                            </p>
                                            <p style={styles.normalText}>
                                                Tanggal Pesanan:
                                                {/* <span style={styles.normalTextDisable}> {data?.tanggal_pembelian}</span> */}
                                                <span style={styles.normalTextDisable}>
                                                    {' '}
                                                    {dayjs(data?.tanggal_pembelian).format('DD MMMM YYYY')}
                                                </span>
                                            </p>
                                        </div>
                                        <div
                                            style={{
                                                display: 'flex',
                                                flexDiraction: 'row',
                                                justifyContent: 'space-between',
                                                alignItems: 'center'
                                            }}
                                        >
                                            <IconButton
                                                aria-label="credit-card"
                                                className={classes.btnIcon}
                                                onClick={() => {
                                                    setShowModalPayment(true);
                                                    showPaymentStatusLabel(data?.status_payment);
                                                    setDataCart(data?.cart);
                                                    setDataOrder(data);
                                                }}
                                            >
                                                <CreditCardOutlined style={{ color: '#474747', marginRight: '10px' }} />
                                            </IconButton>

                                            {/* <IconButton
                                        aria-label="view"
                                        className={classes.btnIcon}
                                        onClick={() => router.push(LOCATION_PATH_DETAILS_ORDER)}
                                    >
                                        <VisibilityOutlined />
                                    </IconButton> */}
                                            <IconButton
                                                aria-label="delete"
                                                className={classes.btnIcon}
                                                onClick={async () => {
                                                    await dispatch(deleteOrderById(data?._id));
                                                }}
                                            >
                                                <DeleteOutlined style={{ color: '#FF0000', marginRight: '10px' }} />
                                            </IconButton>
                                        </div>
                                    </div>
                                    <hr
                                        style={{
                                            backgroundColor: '#D8D8D8',
                                            height: 0.5,
                                            marginBottom: 30
                                        }}
                                    />
                                </div>

                                <div key={index} className={classes.cardContainerMobile}>
                                    {/* <div sx={{ display: 'grid', gridTemplateRows: 'repeat(3, 1fr)' }}> */}
                                    <div style={{ width: '100%' }}>
                                        <Accordion sx={{ width: '100%' }}>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel1a-content"
                                                id="panel1a-header"
                                            >
                                                <div sx={{ display: 'grid', gridTemplateRows: 'repeat(3, 1fr)' }}>
                                                    <p style={{ fontWeight: 600, fontSize: '16px', color: '#474747' }}>
                                                        ID Pesanan {data._id}
                                                    </p>
                                                    <p style={{ fontWeight: 400, fontSize: '15px', color: '#474747' }}>
                                                        Status Pesanan:
                                                        <span
                                                            style={
                                                                data?.status_payment === 'Telah dibayar'
                                                                    ? styles.normalTextStatusComplete
                                                                    : data?.status_payment === 'expire'
                                                                    ? styles.normalTextStatusFailed
                                                                    : styles.normalTextStatusWaiting
                                                            }
                                                        >
                                                            {' '}
                                                            {data?.status_payment.toUpperCase()}
                                                        </span>
                                                    </p>
                                                </div>
                                            </AccordionSummary>
                                            {data?.cart?.map((item) => {
                                                const price =
                                                    item?.promo_price === 0 ? item?.price : item?.promo_price_x_qty;
                                                const newPrice = currencyFormat(price);

                                                return (
                                                    <AccordionDetails key={item?._id}>
                                                        <div
                                                            // key={item?._id}
                                                            style={{
                                                                display: 'flex',
                                                                flexDiraction: 'row',
                                                                justifyContent: 'space-between',
                                                                alignItems: 'center',
                                                                marginBottom: 30
                                                            }}
                                                        >
                                                            <div
                                                                style={{
                                                                    display: 'flex',
                                                                    flexDiraction: 'row',
                                                                    width: '70%'
                                                                }}
                                                            >
                                                                <div style={{ width: 60 }}>
                                                                    <Image
                                                                        src={item?.imageProduct}
                                                                        alt="product image"
                                                                        width={60}
                                                                        height={60}
                                                                        layout="fixed"
                                                                        objectFit="contain"
                                                                        priority
                                                                    />
                                                                </div>
                                                                <div style={{ marginLeft: 20 }}>
                                                                    <p
                                                                        style={{
                                                                            fontWeight: 600,
                                                                            fontSize: '13px',
                                                                            color: '#474747'
                                                                        }}
                                                                    >
                                                                        {item?.nameProduct}
                                                                    </p>
                                                                    <p style={styles.normalText}>
                                                                        Type:
                                                                        <span style={styles.normalTextDisable}>
                                                                            {' '}
                                                                            {item?.id_manual_product}
                                                                        </span>
                                                                    </p>
                                                                    <p style={styles.normalText}>
                                                                        Qty:
                                                                        <span style={styles.normalTextDisable}>
                                                                            {' '}
                                                                            {item.qty}
                                                                        </span>
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <p style={{ textAlign: 'right' }}>
                                                                <span style={styles.normalTextDisableBold}>
                                                                    Rp {newPrice}
                                                                </span>
                                                            </p>
                                                        </div>
                                                    </AccordionDetails>
                                                );
                                            })}
                                        </Accordion>
                                        <div
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                justifyContent: 'flex-end',
                                                marginBottom: 15,
                                                marginTop: 15
                                            }}
                                        >
                                            <div>
                                                <p style={styles.smallTextDisable}>Shipping Fee {`(${expedisi})`}:</p>
                                                <p style={styles.smallTextDisable}>Total Exclude Shipping:</p>
                                                <p style={styles.smallTextDisable}>Potongan Benefit Member:</p>
                                                <div style={{ marginTop: 20 }}>
                                                    <p style={styles.normalTextDisable}>Total Pesanan:</p>
                                                </div>
                                            </div>
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: 'flex-end',
                                                    marginLeft: 20
                                                }}
                                            >
                                                <p style={styles.smallTextDisable}>{shipping_fee.toString()}</p>
                                                <p style={styles.smallTextDisable}>
                                                    {total_exclude_shipping.toString()}
                                                </p>
                                                <p style={styles.smallTextDisable}>
                                                    {potongan_benefit_membership.toString()}
                                                </p>
                                                <div style={{ marginTop: 20 }}>
                                                    <p style={styles.boldTextStatus}> Rp {total.toString()}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            style={{
                                                display: 'flex',
                                                flexDiraction: 'row',
                                                justifyContent: 'space-between',
                                                alignItems: 'center'
                                            }}
                                        >
                                            <div>
                                                <p style={styles.normalText}>
                                                    No Tracking:
                                                    <span style={styles.normalTextDisable}> {data?.no_resi}</span>
                                                </p>
                                                <p style={styles.normalText}>
                                                    Tanggal Pesanan:
                                                    {/* <span style={styles.normalTextDisable}>
                                                        {' '}
                                                        {data?.tanggal_pembelian}
                                                    </span> */}
                                                    <span style={styles.normalTextDisable}>
                                                        {' '}
                                                        {dayjs(data?.tanggal_pembelian).format('DD MMMM YYYY')}
                                                    </span>
                                                </p>
                                            </div>
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    flexDiraction: 'row',
                                                    alignItems: 'center'
                                                }}
                                            >
                                                <CreditCardOutlined
                                                    style={{ color: '#474747', marginRight: '10px' }}
                                                    onClick={async () => {
                                                        await dispatch(getOrderById(data?._id));
                                                        await dispatch(setLabelStatusPayment(data?.status_payment));
                                                        router.push(LOCATION_PATH_MOBILE_PAYMENT);
                                                    }}
                                                />

                                                {/* <VisibilityOutlined onClick={() => router.push(LOCATION_PATH_DETAILS_ORDER)}/> */}
                                                <IconButton
                                                    aria-label="delete"
                                                    className={classes.btnIcon}
                                                    onClick={async () => {
                                                        await dispatch(deleteOrderById(data?._id));
                                                    }}
                                                >
                                                    <DeleteOutlined style={{ color: '#FF0000', marginRight: '10px' }} />
                                                </IconButton>
                                            </div>
                                        </div>
                                        <hr
                                            style={{
                                                backgroundColor: '#D8D8D8',
                                                height: 0.5,
                                                marginBottom: 30,
                                                marginTop: 10
                                            }}
                                        />
                                    </div>
                                </div>
                            </>
                        );
                    })}
                </>
            )}

            <Dialog
                open={showModalPayment}
                onClose={() => setShowModalPayment(false)}
                innerContainerStyle={{ width: '798px' }}
            >
                <Box style={{ display: 'flex', alignItems: 'center', marginBottom: '30px', paddingTop: '20px' }}>
                    <p id="modal-modal-title" style={{ marginRight: '41px', fontSize: '25px', fontWeight: '500' }}>
                        Payment
                    </p>
                </Box>

                <Box style={{ display: 'flex', flexDirection: 'column' }}>
                    <Box style={{ display: 'flex' }}>
                        <p
                            style={{
                                display: 'flex',
                                width: '5%',
                                alignItems: 'center',
                                fontSize: '20px',
                                fontWeight: '600'
                            }}
                        >
                            No
                        </p>
                        <p style={{ width: '65%', display: 'flex', fontSize: '20px', fontWeight: '600' }}>Product</p>
                        <p style={{ width: '20%', justifyContent: 'center', fontSize: '20px', fontWeight: '600' }}>
                            Price
                        </p>
                    </Box>
                    {dataCart.length <= 2 ? (
                        dataCart?.map((item, index) => {
                            const price = item?.promo_price === 0 ? item?.price : item?.promo_price;
                            const totalPrice =
                                item?.promo_price_x_qty === 0 ? item?.price_x_qty : item?.promo_price_x_qty;
                            return (
                                <Box
                                    key={item._id}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        flexDirection: 'row',
                                        marginTop: '35px'
                                    }}
                                >
                                    <p
                                        style={{
                                            display: 'flex',
                                            width: '5%',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            fontSize: '18px',
                                            fontWeight: '400'
                                        }}
                                    >
                                        {index + 1}
                                    </p>
                                    <Box style={{ width: '65%', display: 'flex', flexDirection: 'row' }}>
                                        <img
                                            src={item?.imageProduct}
                                            className={classes.dialogImageItem}
                                            alt="backgroudn-image"
                                        />
                                        <Box style={{ marginLeft: '20px' }}>
                                            <p style={{ fontSize: '18px', fontWeight: '400' }}>{item?.nameProduct}</p>
                                            <p style={{ fontSize: '18px', fontWeight: '400' }}>
                                                {item?.id_manual_product}
                                            </p>
                                            <p style={{ fontSize: '18px', fontWeight: '400' }}>
                                                IDR {currencyFormat(price)} x {item?.qty}
                                            </p>
                                        </Box>
                                    </Box>
                                    <p
                                        style={{
                                            width: '20%',
                                            justifyContent: 'center',
                                            fontSize: '18px',
                                            fontWeight: '400'
                                        }}
                                    >
                                        IDR {currencyFormat(totalPrice)}
                                    </p>
                                </Box>
                            );
                        })
                    ) : (
                        <ScrollForModal>
                            {dataCart?.map((item, index) => {
                                const price = item?.promo_price === 0 ? item?.price : item?.promo_price;
                                const totalPrice =
                                    item?.promo_price_x_qty === 0 ? item?.price_x_qty : item?.promo_price_x_qty;
                                return (
                                    <Box
                                        key={item._id}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            flexDirection: 'row',
                                            marginTop: '35px'
                                        }}
                                    >
                                        <p
                                            style={{
                                                display: 'flex',
                                                width: '5%',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                fontSize: '18px',
                                                fontWeight: '400'
                                            }}
                                        >
                                            {index + 1}
                                        </p>
                                        <Box style={{ width: '65%', display: 'flex', flexDirection: 'row' }}>
                                            <img
                                                src={item?.imageProduct}
                                                className={classes.dialogImageItem}
                                                alt="backgroudn-image"
                                            />
                                            <Box style={{ marginLeft: '20px' }}>
                                                <p style={{ fontSize: '18px', fontWeight: '400' }}>
                                                    {item?.nameProduct}
                                                </p>
                                                <p style={{ fontSize: '18px', fontWeight: '400' }}>
                                                    {item?.id_manual_product}
                                                </p>
                                                <p style={{ fontSize: '18px', fontWeight: '400' }}>
                                                    IDR {currencyFormat(price)} x {item?.qty}
                                                </p>
                                            </Box>
                                        </Box>
                                        <p
                                            style={{
                                                width: '20%',
                                                justifyContent: 'center',
                                                fontSize: '18px',
                                                fontWeight: '400'
                                            }}
                                        >
                                            IDR {currencyFormat(totalPrice)}
                                        </p>
                                    </Box>
                                );
                            })}
                        </ScrollForModal>
                    )}
                </Box>

                <Box
                    style={{
                        marginTop: '34px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: '33px'
                    }}
                >
                    <Box style={{ width: '48%' }}>
                        <p style={{ fontWeight: '500', fontSize: '18px' }}>Delivery Address</p>
                        <p style={{ fontSize: '14px', fontWeight: '400', marginTop: '18px' }}>
                            {`${dataOrder?.nama_pembeli}, ${dataOrder?.alamat_pengiriman}`}
                        </p>
                    </Box>
                    <Box
                        style={{
                            width: '47%',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-evenly'
                        }}
                    >
                        <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                            <p style={{ fontWeight: '400', fontSize: '18px' }}>{dataOrder?.expedisi?.toUpperCase()}</p>

                            <p style={{ fontWeight: '400', fontSize: '18px', marginTop: '16px' }}>Diskon Membership</p>
                            <p style={{ fontWeight: '600', fontSize: '18px', marginTop: '12px' }}>Total</p>
                        </Box>
                        <Box>
                            <p style={{ fontWeight: '400', fontSize: '18px' }}>
                                IDR {currencyFormat(dataOrder?.shipping_fee)}
                            </p>
                            <p style={{ fontWeight: '400', fontSize: '18px', marginTop: '16px' }}>
                                IDR {currencyFormat(dataOrder?.potongan_benefit_membership)}
                            </p>
                            <p style={{ fontWeight: '600', fontSize: '18px', marginTop: '12px' }}>
                                IDR {currencyFormat(dataOrder?.totalPrice_plus_shipping_minus_benefit_member)}
                            </p>
                        </Box>
                    </Box>
                </Box>
                <Box className={classes.dialogBtnWrapper} style={{ justifyContent: 'flex-start' }}>
                    <MainBlackButton
                        onClick={() => setShowModalPayment(false)}
                        innerContaunerStyle={{ width: '186px', fontSize: '20px' }}
                        className="WhiteButton"
                        variant="outlined"
                    >
                        Back
                    </MainBlackButton>
                    <HorizontalSpacer widht={{ marginRight: '15px' }} />
                    {statusPayment.label === 'Pending' ? (
                        <p>Check your email to confirm</p>
                    ) : (
                        <MainBlackButton
                            onClick={async () => {
                                if (statusPayment?.label === 'Buy Again') {
                                    router.push('/product-page');
                                } else {
                                    const resp = await axios.get(
                                        ` https://tokyofoam.herokuapp.com/api/payment/getToken/${dataOrder?._id}`
                                    );
                                    const midtrans_url = resp?.data?.url;
                                    try {
                                        window.location.href = `${midtrans_url}`;
                                    } catch (error) {
                                        console.log(error);
                                    }
                                }
                            }}
                            innerContaunerStyle={{ width: '328px', fontSize: '20px' }}
                            className={statusPayment?.className}
                            variant="contained"
                            disable={statusPayment?.label === 'Telah dibayar'}
                        >
                            {statusPayment?.label}
                        </MainBlackButton>
                    )}
                </Box>
            </Dialog>
        </Container>
    );
};

export default CardComponent;
