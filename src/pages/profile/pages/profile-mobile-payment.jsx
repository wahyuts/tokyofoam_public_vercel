import { Card, Container, Grid } from '@mui/material';
import { AvTimer } from '@mui/icons-material';
import { Box } from '@mui/system';
import MainBlackButton from '../../../utils/re-useable-components/buttons/MainBlackButton';
import HorizontalSpacer from '../../../components/HorizontalSpacer';
import { useRouter } from 'next/router';
import { makeStyles } from '@mui/styles';
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
    dialogImageItem: {
        width: '18%'
    }
}));

const Payment = (params) => {
    const classes = useStyles();
    const router = useRouter();
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
            <Card style={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
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
            </Card>
            <Box style={{ width: '100%', marginTop: '50px' }}>
                <p style={{ fontWeight: '500', fontSize: '14px' }}>Delivery Address</p>
                <p style={{ fontSize: '14px', fontWeight: '400', marginTop: '10px' }}>
                    Mia Artina , Jln. Gunung Saputan no.22X, Kecamatan Denpasar Barat, Kota Denpasar, Bali 80117,
                    Indonesia No Hp 0821212121212
                </p>
            </Box>
            <Grid className={classes.container} sx={{ mx: 'auto' }} mt={'50px'}>
                <table style={{ width: '100%' }}>
                    <tr style={{ display: 'flex', width: '100%' }}>
                        <td
                            style={{
                                borderWidth: '1px',
                                borderColor: '#EBEBEB',
                                borderStyle: 'solid',
                                width: '10%'
                            }}
                        >
                            <p style={{ textAlign: 'center' }}>1 </p>
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
                            <p style={{ textAlign: 'left' }}>Mulberry Silk Pillowcase (1)</p>
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
                            <p style={{ textAlign: 'right' }}>IDR 650.000</p>
                        </td>
                    </tr>
                    <tr style={{ display: 'flex', width: '100%' }}>
                        <td
                            style={{
                                borderWidth: '1px',
                                borderColor: '#EBEBEB',
                                borderStyle: 'solid',
                                width: '10%'
                            }}
                        >
                            <p style={{ textAlign: 'center' }}>1 </p>
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
                            <p style={{ textAlign: 'left' }}>Mulberry Silk Pillowcase (1)</p>
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
                            <p style={{ textAlign: 'right' }}>IDR 650.000</p>
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
                            <p style={{ textAlign: 'right' }}>IDR 650.000</p>
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
                onClick={() => setShowModalPayment(false)}
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
