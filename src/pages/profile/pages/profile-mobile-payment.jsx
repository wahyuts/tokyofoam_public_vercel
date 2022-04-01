import { Card, Container, Grid } from '@mui/material';
import { Box } from '@mui/system';
import MainBlackButton from '../../../utils/re-useable-components/buttons/MainBlackButton';
import HorizontalSpacer from '../../../components/HorizontalSpacer';
import { useRouter } from 'next/router';
import { makeStyles } from '@mui/styles';
import { useState } from 'react';
import { SET_PROFILE_DASHBOARD } from '../../../types';
import { useDispatch, useSelector } from 'react-redux';
import { setProfile } from '../../../redux/actions/urlOnProfileButtonTabAction';

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

    const [statusPayment, setStatusPayment] = useState({});
    const showPaymentStatusLabel = (label) => {
        if (label === 'failed') return setStatusPayment({ className: 'OrangeButton', label: 'Buy Again' });
        if (label === 'complete') return setStatusPayment({ className: 'DisableButton', label });
        return setStatusPayment({ className: 'BlackButton', label: 'Confirm Order & Pay' });
    };
    return (
        <Container>
            <Box style={{ display: 'flex', alignItems: 'center', marginBottom: '30px', paddingTop: '20px' }}>
                <p id="modal-modal-title" style={{ marginRight: '41px', fontSize: '25px', fontWeight: '500' }}>
                    Payment
                </p>
            </Box>

            {/* <Box style={{ display: 'flex' }}>
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
                    </Box> */}
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
                                <p style={{ fontSize: '18px', fontWeight: '400' }}>{item?.nameProduct}</p>
                                <p style={{ fontSize: '18px', fontWeight: '400' }}>{item?.id_manual_product}</p>
                                <p style={{ fontSize: '18px', fontWeight: '400' }}>{price}</p>
                            </Box>
                        </Box>
                    </Card>
                );
            })}
            <Box style={{ width: '100%', marginTop: '50px' }}>
                <p style={{ fontWeight: '500', fontSize: '14px' }}>Delivery Address</p>
                <p style={{ fontSize: '14px', fontWeight: '400', marginTop: '10px' }}>
                    {`${dataOrderById?.nama_pembeli}, ${dataOrderById?.alamat_pengiriman}`}
                    <text>{`No Hp ${dataOrderById?.no_handphone}`}</text>
                </p>
            </Box>
            <Grid className={classes.container} sx={{ mx: 'auto' }} mt={'50px'}>
                <table style={{ width: '100%' }}>
                    {dataOrderById?.cart.map((item, index) => {
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
                                        <p style={{ textAlign: 'center' }}>{index + 1}</p>
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
                                        <p style={{ textAlign: 'left' }}>{`${item?.nameProduct} (${item?.qty})`} </p>
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
                                        <p style={{ textAlign: 'right' }}>{totalPrice}</p>
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
                            <p style={{ textAlign: 'right' }}>Total</p>
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
                            <p style={{ textAlign: 'right' }}>
                                {dataOrderById?.totalPrice_plus_shipping_minus_benefit_member}
                            </p>
                        </td>
                    </tr>
                </table>
            </Grid>

            <MainBlackButton
                onClick={() => setShowModalReview(false)}
                innerContaunerStyle={{ width: '328px', fontSize: '20px' }}
                className={statusPayment?.className}
                variant="contained"
                disable={statusPayment?.label === 'complete'}
            >
                {statusPayment?.label}
            </MainBlackButton>
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
