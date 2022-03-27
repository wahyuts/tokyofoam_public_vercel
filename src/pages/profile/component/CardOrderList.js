import { useEffect, useState } from 'react';
import { Router, useRouter } from 'next/router';
import Image from 'next/image';

import { Accordion, AccordionDetails, AccordionSummary, Container, IconButton } from '@mui/material';
import { VisibilityOutlined, CreditCardOutlined, ChatOutlined, PhotoCamera, AvTimer } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import { Box, display } from '@mui/system';

import { LOCATION_PATH_DETAILS_ORDER, LOCATION_PATH_EDIT_REVIEW, LOCATION_PATH_MOBILE_PAYMENT } from '../../../types';
import Dialog from './dialog';
import MainBlackButton from '../../../utils/re-useable-components/buttons/MainBlackButton';
import HorizontalSpacer from '../../../components/HorizontalSpacer';
import { useDispatch, useSelector } from 'react-redux';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { deleteOrderById } from '../../../redux/actions/dataHistoryOrderAction';

const styles = {
    normalText: { fontWeight: 400, fontSize: '15px', color: '#474747' },
    normalTextStatusFailed: { fontWeight: 400, fontSize: '14px', color: '#FF7373' },
    normalTextStatusComplete: { fontWeight: 400, fontSize: '14px', color: '#6AB469' },
    normalTextStatusWaiting: { fontWeight: 400, fontSize: '14px', color: '#FFE18E' },
    normalTextDisable: { fontWeight: 400, fontSize: '14px', color: '#787878' },
    normalTextDisableBold: { fontWeight: 600, fontSize: '14px', color: '#787878' },
    boldTextStatus: { fontWeight: 600, fontSize: '16px', color: '#FF7373' },
    btnBoxPrimariContainer: {
        width: '140px',
        fontSize: '20px',
        fontWeight: '500',
        justifyContent: 'center'
    }
};

const useStyles = makeStyles((theme) => ({
    cardContainerDesktop: {
        padding: '20px 24px 24px 24px',
        marginBottom: 35,
        marginLeft: '10%',
        marginRight: '10%',
        [theme.breakpoints.down('mobile')]: {
            display: 'none'
        }
    },
    cardContainerMobile: {
        display: 'none',
        // padding: '20px 24px 24px 24px',

        [theme.breakpoints.down('mobile')]: {
            marginBottom: 35,
            display: 'flex'
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
        justifyContent: 'space-between'
    },
    dialogImageItem: {
        width: '18%'
    },
    dialogJNEIcon: {
        width: '28px',
        height: '14px'
    }
}));

const CardComponent = ({ dataToRender }) => {
    const classes = useStyles();
    const router = useRouter();
    const dispatch = useDispatch();

    const { listOrderUserInUserDashboard } = useSelector((state) => state.dataProduct);
    console.log('DAFTAR ORDER USER', listOrderUserInUserDashboard);

    const [showModalPayment, setShowModalPayment] = useState(false);
    const [statusPayment, setStatusPayment] = useState({});

    const showPaymentStatusLabel = (label) => {
        if (label === 'failed') return setStatusPayment({ className: 'OrangeButton', label: 'Buy Again' });
        if (label === 'complete') return setStatusPayment({ className: 'DisableButton', label });
        return setStatusPayment({ className: 'BlackButton', label: 'Confirm Order & Pay' });
    };

    useEffect(() => {}, [showModalPayment, listOrderUserInUserDashboard]);

    return (
        <Container>
            {dataToRender?.map((data, index) => {
                const total = new Intl.NumberFormat(['ban', 'id']).format(
                    parseInt(data.totalPrice_plus_shipping_minus_benefit_member, 10)
                );

                return (
                    <>
                        <div key={index} className={classes.cardContainerDesktop}>
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
                                            Status Pesanan:
                                            <text
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
                                            </text>
                                        </p>
                                    </div>
                                </AccordionSummary>
                                {data?.cart?.map((item) => {
                                    const price = item?.promo_price === 0 ? item?.price : item?.promo_price;
                                    const newPrice = new Intl.NumberFormat(['ban', 'id']).format(parseInt(price, 10));
                                    return (
                                        <AccordionDetails key={item?._id}>
                                            <div
                                                key={item?._id}
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
                                                        width: '45%'
                                                    }}
                                                >
                                                    <Image
                                                        src={item?.imageProduct}
                                                        alt="product image"
                                                        width={180}
                                                        height={180}
                                                        layout="fixed"
                                                        priority
                                                    />
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
                                                            <text style={styles.normalTextDisable}>
                                                                {' '}
                                                                {item?.id_manual_product}
                                                            </text>
                                                        </p>
                                                        <p style={styles.normalText}>
                                                            Qty:
                                                            <text style={styles.normalTextDisable}> {item.qty}</text>
                                                        </p>
                                                    </div>
                                                </div>
                                                <p style={{ textAlign: 'right' }}>
                                                    <p style={styles.normalTextDisableBold}>Rp {newPrice}</p>
                                                </p>
                                            </div>
                                        </AccordionDetails>
                                    );
                                })}
                            </Accordion>
                            <p style={{ textAlign: 'right', marginBottom: 15, marginTop: 15 }}>
                                <p style={styles.normalTextDisable}>
                                    Total Pesanan:
                                    <text style={styles.boldTextStatus}> Rp {total.toString()}</text>
                                </p>
                            </p>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <p style={styles.normalText}>
                                    Tanggal Pesanan:
                                    <text style={styles.normalTextDisable}> {data?.tanggal_pembelian}</text>
                                </p>
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
                                        <DeleteOutlinedIcon style={{ color: '#FF0000', marginRight: '10px' }} />
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
                            <div sx={{ display: 'grid', gridTemplateRows: 'repeat(3, 1fr)' }}>
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
                                                <text
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
                                                </text>
                                            </p>
                                        </div>
                                    </AccordionSummary>
                                    {data?.cart?.map((item) => {
                                        const price = item?.promo_price === 0 ? item?.price : item?.promo_price;
                                        const newPrice = new Intl.NumberFormat(['ban', 'id']).format(
                                            parseInt(price, 10)
                                        );
                                        return (
                                            <AccordionDetails key={item?._id}>
                                                <div
                                                    key={item?._id}
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
                                                        <Image
                                                            src={item?.imageProduct}
                                                            alt="product image"
                                                            width={60}
                                                            height={50}
                                                            layout="fixed"
                                                            priority
                                                        />
                                                        <div style={{ marginLeft: 20 }}>
                                                            <p
                                                                style={{
                                                                    fontWeight: 600,
                                                                    fontSize: '12px',
                                                                    color: '#474747'
                                                                }}
                                                            >
                                                                {item?.nameProduct}
                                                            </p>
                                                            <p style={styles.normalText}>
                                                                Type:
                                                                <text style={styles.normalTextDisable}>
                                                                    {' '}
                                                                    {item?.id_manual_product}
                                                                </text>
                                                            </p>
                                                            <p style={styles.normalText}>
                                                                Qty:
                                                                <text style={styles.normalTextDisable}>
                                                                    {' '}
                                                                    {item.qty}
                                                                </text>
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <p style={{ textAlign: 'right' }}>
                                                        <p style={styles.normalTextDisableBold}>Rp {newPrice}</p>
                                                    </p>
                                                </div>
                                            </AccordionDetails>
                                        );
                                    })}
                                </Accordion>
                                <p style={{ textAlign: 'right', marginBottom: 15, marginTop: 15 }}>
                                    <p style={styles.normalTextDisable}>
                                        Total Pesanan:
                                        <text style={styles.boldTextStatus}> Rp{total?.toString()}</text>
                                    </p>
                                </p>
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDiraction: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}
                                >
                                    <p style={styles.normalText}>
                                        Tanggal Pesanan:
                                        <text style={styles.normalTextDisable}> {data?.tanggal_pembelian}</text>
                                    </p>
                                    <div
                                        style={{
                                            display: 'flex',
                                            flexDiraction: 'row',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <CreditCardOutlined
                                            style={{ color: '#474747', marginRight: '10px' }}
                                            onClick={() => {
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
                                            <DeleteOutlinedIcon style={{ color: '#FF0000', marginRight: '10px' }} />
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

            <Dialog
                open={showModalPayment}
                onClose={() => setShowModalPayment(false)}
                innerContainerStyle={{ width: '798px' }}
            >
                <Box style={{ display: 'flex', alignItems: 'center', marginBottom: '30px', paddingTop: '20px' }}>
                    <p id="modal-modal-title" style={{ marginRight: '41px', fontSize: '25px', fontWeight: '500' }}>
                        Payment
                    </p>
                    <AvTimer style={{ color: '#FF7373' }} fontSize="small" />
                    <p style={{ color: '#FF7373', marginLeft: '12px', fontSize: '18px', fontWeight: '400' }}>
                        23.37 Remaining
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
                                fontWeight: '400'
                            }}
                        >
                            No
                        </p>
                        <p style={{ width: '65%', display: 'flex', fontSize: '20px', fontWeight: '400' }}>Product</p>
                        <p style={{ width: '10%', justifyContent: 'center', fontSize: '20px', fontWeight: '400' }}>
                            Qty
                        </p>
                        <p style={{ width: '20%', justifyContent: 'center', fontSize: '20px', fontWeight: '400' }}>
                            Price
                        </p>
                    </Box>
                    <Box style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', marginTop: '35px' }}>
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
                            1
                        </p>
                        <Box style={{ width: '65%', display: 'flex', flexDirection: 'row' }}>
                            <img
                                src={'/assets/images/Single-Pillow-1.png'}
                                className={classes.dialogImageItem}
                                alt="backgroudn-image"
                            />
                            <Box style={{ marginLeft: '20px' }}>
                                <p style={{ fontSize: '18px', fontWeight: '400' }}>Mulberry Silk Pillowcase</p>
                                <p style={{ fontSize: '18px', fontWeight: '400' }}>Yellow (1kg)</p>
                                <p style={{ fontSize: '18px', fontWeight: '400' }}>IDR 650.000</p>
                            </Box>
                        </Box>
                        <p style={{ width: '10%', justifyContent: 'center', fontSize: '18px', fontWeight: '400' }}>2</p>
                        <p style={{ width: '20%', justifyContent: 'center', fontSize: '18px', fontWeight: '400' }}>
                            IDR 650.000
                        </p>
                    </Box>
                </Box>
                <Box
                    style={{
                        marginTop: '18px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: '33px'
                    }}
                >
                    <Box style={{ width: '48%' }}>
                        <p style={{ fontWeight: '500', fontSize: '18px' }}>Delivery Address</p>
                        <p style={{ fontSize: '14px', fontWeight: '400', marginTop: '18px' }}>
                            Mia Artina , Jln. Gunung Saputan no.22X, Kecamatan Denpasar Barat, Kota Denpasar, Bali
                            80117, Indonesia No Hp 0821212121212
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
                            <p style={{ fontWeight: '400', fontSize: '18px', marginBottom: '16px' }}>
                                JNE OKE (2-3 Hari)
                            </p>
                            <img
                                src={'/assets/images/jneIcon.png'}
                                className={classes.dialogJNEIcon}
                                alt="backgroudn-image"
                            />
                            <p style={{ fontWeight: '400', fontSize: '18px', marginTop: '16px' }}>Assurance</p>
                            <p style={{ fontWeight: '600', fontSize: '18px', marginTop: '12px' }}>Total</p>
                        </Box>
                        <Box>
                            <p style={{ fontWeight: '400', fontSize: '18px' }}>IDR 50.000</p>
                            <p style={{ fontWeight: '400', fontSize: '18px', marginTop: '48px' }}>IDR 1.300</p>
                            <p style={{ fontWeight: '600', fontSize: '18px', marginTop: '12px' }}>IDR 701.300</p>
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
                    <MainBlackButton
                        onClick={() => setShowModalReview(false)}
                        innerContaunerStyle={{ width: '328px', fontSize: '20px' }}
                        className={statusPayment?.className}
                        variant="contained"
                        disable={statusPayment?.label === 'complete'}
                    >
                        {statusPayment?.label}
                    </MainBlackButton>
                </Box>
            </Dialog>
        </Container>
    );
};

export default CardComponent;
