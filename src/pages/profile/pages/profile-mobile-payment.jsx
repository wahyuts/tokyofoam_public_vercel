import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import { Card, Container, Grid } from '@mui/material';
import { Box } from '@mui/system';
import { makeStyles } from '@mui/styles';

import { setProfile } from '../../../redux/actions/urlOnProfileButtonTabAction';

import MainBlackButton from '../../../utils/re-useable-components/buttons/MainBlackButton';
import HorizontalSpacer from '../../../components/HorizontalSpacer';

import { SET_PROFILE_DASHBOARD } from '../../../types';

const useStyles = makeStyles((theme) => ({
    dialogImageItem: {
        width: '30%',
        height: '35%'
    }
}));

const Payment = (params) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const router = useRouter();

    const { dataOrderById } = useSelector((state) => state.data_history_order);
    const { label_status_payment } = useSelector((state) => state.url_profile);

    const [statusPayment, setStatusPayment] = useState({});
    const currencyFormat = (currency) => {
        const newCurrency = new Intl.NumberFormat(['ban', 'id']).format(parseInt(currency, 10));
        return newCurrency;
    };

    const shipping_fee = currencyFormat(dataOrderById?.shipping_fee);
    const total_exclude_shipping = currencyFormat(dataOrderById?.total_exclude_shipping);
    const potongan_benefit_membership = currencyFormat(dataOrderById?.potongan_benefit_membership);
    const expedisi = dataOrderById?.expedisi;

    const showPaymentStatusLabel = (label) => {
        if (label === 'expire') return setStatusPayment({ className: 'OrangeButton', label: 'Buy Again' });
        if (label === 'Telah dibayar') return setStatusPayment({ className: 'DisableButton', label });
        if (label === 'Pending') return setStatusPayment({ className: '', label: 'Pending' });
        return setStatusPayment({ className: 'BlackButton', label: 'Confirm Order & Pay' });
    };

    useEffect(() => {
        showPaymentStatusLabel(label_status_payment);
    }, [label_status_payment]);

    return (
        <Container>
            <Box style={{ display: 'flex', alignItems: 'center', marginBottom: '30px', paddingTop: '20px' }}>
                <p id="modal-modal-title" style={{ marginRight: '41px', fontSize: '25px', fontWeight: '500' }}>
                    Payment
                </p>
            </Box>
            {dataOrderById?.cart?.map((item) => {
                const price = item?.promo_price === 0 ? item?.price : item?.promo_price;
                return (
                    <Card
                        key={item._id}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            flexDirection: 'row',
                            marginTop: '35px',
                            padding: '10px'
                        }}
                    >
                        <Box style={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
                            <img src={item?.imageProduct} className={classes.dialogImageItem} alt="backgroudn-image" />
                            <Box style={{ marginLeft: '20px' }}>
                                <p style={{ fontSize: '14px', fontWeight: '400' }}>{item?.nameProduct}</p>
                                <p style={{ fontSize: '14px', fontWeight: '400' }}>{item?.id_manual_product}</p>
                                <p style={{ fontSize: '14px', fontWeight: '400' }}>IDR {currencyFormat(price)}</p>
                            </Box>
                        </Box>
                    </Card>
                );
            })}
            <Box style={{ width: '100%', marginTop: '50px' }}>
                <p style={{ fontWeight: '500', fontSize: '14px', fontWeight: 700 }}>Delivery Address</p>
                <p style={{ fontSize: '14px', fontWeight: '400', marginTop: '10px' }}>
                    {`${dataOrderById?.nama_pembeli}, ${dataOrderById?.alamat_pengiriman}`}
                    {`No Hp ${dataOrderById?.no_handphone}`}
                </p>
                <p style={{ fontSize: '14px', fontWeight: '400', marginTop: '10px', fontWeight: 700 }}>
                    By Kurir: {expedisi}
                </p>
            </Box>
            <Grid className={classes.container} sx={{ mx: 'auto' }} mt={'50px'}>
                <table style={{ width: '100%' }}>
                    {dataOrderById?.cart?.map((item, index) => {
                        const totalPrice = item?.promo_price_x_qty === 0 ? item?.price_x_qty : item?.promo_price_x_qty;

                        return (
                            <>
                                <tr style={{ display: 'flex', width: '100%' }}>
                                    <td
                                        style={{
                                            borderWidth: '1px',
                                            borderColor: '#EBEBEB',
                                            borderStyle: 'solid',
                                            width: '10%'
                                        }}
                                    >
                                        <p style={{ textAlign: 'center', fontSize: 12 }}>{index + 1}</p>
                                    </td>
                                    <td
                                        style={{
                                            borderWidth: '1px',
                                            borderColor: '#EBEBEB',
                                            borderStyle: 'solid',
                                            width: '60%',
                                            paddingLeft: '11px'
                                        }}
                                    >
                                        <p style={{ textAlign: 'left', fontSize: 12 }}>
                                            {`${item?.nameProduct} (${item?.qty})`}{' '}
                                        </p>
                                    </td>
                                    <td
                                        style={{
                                            borderWidth: '1px',
                                            borderColor: '#EBEBEB',
                                            borderStyle: 'solid',
                                            width: '30%',
                                            paddingRight: '14px'
                                        }}
                                    >
                                        <p style={{ textAlign: 'right', fontSize: 12 }}>
                                            IDR {currencyFormat(totalPrice)}
                                        </p>
                                    </td>
                                </tr>
                            </>
                        );
                    })}

                    <tr style={{ display: 'flex' }}>
                        <td
                            style={{
                                borderWidth: '1px',
                                width: '40%'
                            }}
                        ></td>
                        <td
                            style={{
                                borderWidth: '1px',
                                borderColor: '#EBEBEB',
                                borderStyle: 'solid',
                                paddingRight: '14px',
                                width: '30%'
                            }}
                        >
                            <p style={{ textAlign: 'right', fontSize: 12 }}>Total</p>
                        </td>
                        <td
                            style={{
                                borderWidth: '1px',
                                borderColor: '#EBEBEB',
                                borderStyle: 'solid',
                                paddingRight: '14px',
                                width: '30%'
                            }}
                        >
                            {/* <p style={{ textAlign: 'right', fontSize: 12 }}>
                                IDR {dataOrderById?.totalPrice_plus_shipping_minus_benefit_member}
                            </p> */}
                            <p style={{ textAlign: 'right', fontSize: 12 }}>IDR {total_exclude_shipping}</p>
                        </td>
                    </tr>

                    <tr style={{ display: 'flex' }}>
                        <td
                            style={{
                                borderWidth: '1px',
                                width: '40%'
                            }}
                        ></td>
                        <td
                            style={{
                                borderWidth: '1px',
                                borderColor: '#EBEBEB',
                                borderStyle: 'solid',
                                paddingRight: '14px',
                                width: '30%'
                            }}
                        >
                            <p style={{ textAlign: 'right', fontSize: 12 }}>Shipping Fee </p>
                        </td>
                        <td
                            style={{
                                borderWidth: '1px',
                                borderColor: '#EBEBEB',
                                borderStyle: 'solid',
                                paddingRight: '14px',
                                width: '30%'
                            }}
                        >
                            <p style={{ textAlign: 'right', fontSize: 12 }}>IDR {shipping_fee}</p>
                        </td>
                    </tr>

                    <tr style={{ display: 'flex' }}>
                        <td
                            style={{
                                borderWidth: '1px',
                                width: '40%'
                            }}
                        ></td>
                        <td
                            style={{
                                borderWidth: '1px',
                                borderColor: '#EBEBEB',
                                borderStyle: 'solid',
                                paddingRight: '14px',
                                width: '30%'
                            }}
                        >
                            <p style={{ textAlign: 'right', fontSize: 12 }}>Membership</p>
                        </td>
                        <td
                            style={{
                                borderWidth: '1px',
                                borderColor: '#EBEBEB',
                                borderStyle: 'solid',
                                paddingRight: '14px',
                                width: '30%'
                            }}
                        >
                            <p style={{ textAlign: 'right', fontSize: 12 }}>- IDR {potongan_benefit_membership}</p>
                        </td>
                    </tr>

                    <tr style={{ display: 'flex' }}>
                        <td
                            style={{
                                borderWidth: '1px',
                                width: '40%'
                            }}
                        ></td>
                        <td
                            style={{
                                borderWidth: '1px',
                                borderColor: '#EBEBEB',
                                borderStyle: 'solid',
                                paddingRight: '14px',
                                width: '30%'
                            }}
                        >
                            <p style={{ textAlign: 'right', fontSize: 12, fontWeight: 700 }}>Grand Total</p>
                        </td>
                        <td
                            style={{
                                borderWidth: '1px',
                                borderColor: '#EBEBEB',
                                borderStyle: 'solid',
                                paddingRight: '14px',
                                width: '30%'
                            }}
                        >
                            <p style={{ textAlign: 'right', fontSize: 12, fontWeight: 700 }}>
                                IDR {currencyFormat(dataOrderById?.totalPrice_plus_shipping_minus_benefit_member)}
                            </p>
                        </td>
                    </tr>
                </table>
            </Grid>

            {statusPayment.label === 'Pending' ? (
                <p style={{ textAlign: 'left', fontSize: 12, fontWeight: 700, marginTop: 10 }}>
                    Check your email to confirm and pay
                </p>
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
            <HorizontalSpacer widht={{ marginRight: '15px' }} />
            <MainBlackButton
                onClick={() => {
                    dispatch(setProfile(SET_PROFILE_DASHBOARD));
                    router.push('/profile');
                }}
                innerContaunerStyle={{ width: '186px', fontSize: '20px' }}
                className="WhiteButton"
                variant="outlined"
            >
                Back
            </MainBlackButton>
        </Container>
    );
};

export default Payment;
