import Head from 'next/head';
import { Container, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';

import MainBlackButton from '../../../utils/re-useable-components/buttons/MainBlackButton';
import HorizontalSpacer from '../../../components/HorizontalSpacer';
import VerticalSpacer from '../../../components/VerticalSpacer';
import { useRouter } from 'next/router';

const useStyles = makeStyles((theme) => ({
    container: {
        alignSelf: 'center',
        width: '89%',
        marginTop: '100px',
        backgroundColor: 'white',
        [theme.breakpoints.down('mobile')]: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '90%',
            marginTop: '100px'
        }
    },
    icon: {
        width: '38px',
        height: '20px%'
    },
    btnWrapper: {
        display: 'flex',
        justifyContent: 'space-between'
    }
}));

const DetailOrder = () => {
    const classes = useStyles();
    const router = useRouter();
    return (
        <article>
            <Head>
                <title>Tokyo Foam || Details Order</title>
            </Head>
            <Container>
                <Grid className={classes.container} sx={{ mx: 'auto' }}>
                    <h1>Info Pembelian</h1>
                    <VerticalSpacer height="30px" />
                    <table style={{ width: '100%' }}>
                        <tr
                            style={{
                                display: 'flex',
                                borderWidth: '1px',
                                borderColor: '#EBEBEB',
                                borderStyle: 'solid',
                                paddingLeft: '15px'
                            }}
                        >
                            <p>Rincian Pesanan</p>
                        </tr>
                        <tr style={{ display: 'flex' }}>
                            <td
                                style={{
                                    borderWidth: '1px',
                                    borderColor: '#EBEBEB',
                                    borderStyle: 'solid',
                                    flex: 1,
                                    paddingLeft: '15px',
                                    paddingTop: '29px',
                                    paddingBottom: '29px'
                                }}
                            >
                                <p>ID Pesanan: #33</p>
                                <p>Tanggal Beli: 24/10/2021 12.00 AM</p>
                            </td>
                            <td
                                style={{
                                    borderWidth: '1px',
                                    borderColor: '#EBEBEB',
                                    borderStyle: 'solid',
                                    flex: 1,
                                    paddingLeft: '15px',
                                    paddingTop: '29px',
                                    paddingBottom: '29px'
                                }}
                            >
                                <p>Metode Pembayaran: Midtrans BCA</p>
                                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                    <p>Metode Pengiriman: JNE OKE (2-3 hari)</p>
                                    <img
                                        src={'/assets/icons/jne-oke.png'}
                                        className={classes.icon}
                                        alt="backgroudn-image"
                                    />
                                </div>
                            </td>
                        </tr>
                    </table>
                    <VerticalSpacer height="10px" />
                    <table style={{ width: '100%' }}>
                        <tr
                            style={{
                                display: 'flex',
                                borderWidth: '1px',
                                borderColor: '#EBEBEB',
                                borderStyle: 'solid',
                                paddingLeft: '15px',
                                paddingTop: '5px',
                                paddingBottom: '5px'
                            }}
                        >
                            <p>Alamat Pengiriman</p>
                        </tr>
                        <tr
                            style={{
                                display: 'flex',
                                borderWidth: '1px',
                                borderColor: '#EBEBEB',
                                borderStyle: 'solid',
                                paddingLeft: '15px',
                                paddingRight: '15px',
                                paddingTop: '26px',
                                paddingBottom: '26px'
                            }}
                        >
                            <p>
                                Mia Artina, Jln. Gunung Saputan, Kecamatan Denpasar Barat, Kota Denpasar, Bali 80117,
                                Indonesia No Hp 0821212121212
                            </p>
                        </tr>
                    </table>
                    <VerticalSpacer height="10px" />
                    <table style={{ width: '100%' }}>
                        <tr style={{ display: 'flex' }}>
                            <td
                                style={{
                                    borderWidth: '1px',
                                    borderColor: '#EBEBEB',
                                    borderStyle: 'solid',
                                    flex: 1,
                                    paddingLeft: '15px',
                                    paddingRight: '15px',
                                    paddingTop: '5px',
                                    paddingBottom: '5px'
                                }}
                            >
                                <p>Nama Produk</p>
                            </td>
                            <td
                                style={{
                                    borderWidth: '1px',
                                    borderColor: '#EBEBEB',
                                    borderStyle: 'solid',
                                    flex: 1,
                                    paddingLeft: '15px',
                                    paddingRight: '15px',
                                    paddingTop: '5px',
                                    paddingBottom: '5px',
                                    textAlign: 'right'
                                }}
                            >
                                <p>Qty</p>
                            </td>
                            <td
                                style={{
                                    borderWidth: '1px',
                                    borderColor: '#EBEBEB',
                                    borderStyle: 'solid',
                                    flex: 1,
                                    paddingLeft: '15px',
                                    paddingRight: '15px',
                                    paddingTop: '5px',
                                    paddingBottom: '5px',
                                    textAlign: 'left'
                                }}
                            >
                                <p>Harga</p>
                            </td>
                        </tr>
                        <tr style={{ display: 'flex' }}>
                            <td
                                style={{
                                    borderWidth: '1px',
                                    borderColor: '#EBEBEB',
                                    borderStyle: 'solid',
                                    flex: 1,
                                    paddingLeft: '15px',
                                    paddingRight: '15px',
                                    paddingTop: '5px',
                                    paddingBottom: '5px'
                                }}
                            >
                                <p>Mulberry Silk Pillowcase, Yellow, 1Kg</p>
                            </td>
                            <td
                                style={{
                                    borderWidth: '1px',
                                    borderColor: '#EBEBEB',
                                    borderStyle: 'solid',
                                    flex: 1,
                                    paddingLeft: '15px',
                                    paddingRight: '15px',
                                    paddingTop: '5px',
                                    paddingBottom: '5px',
                                    textAlign: 'right'
                                }}
                            >
                                <p>1</p>
                            </td>
                            <td
                                style={{
                                    borderWidth: '1px',
                                    borderColor: '#EBEBEB',
                                    borderStyle: 'solid',
                                    flex: 1,
                                    paddingLeft: '15px',
                                    paddingRight: '15px',
                                    paddingTop: '5px',
                                    paddingBottom: '5px',
                                    textAlign: 'left'
                                }}
                            >
                                <p>IDR 650.000 (Disc 10%)</p>
                            </td>
                        </tr>
                        <tr style={{ display: 'flex' }}>
                            <td
                                style={{
                                    borderWidth: '1px',
                                    borderColor: '#EBEBEB',
                                    borderStyle: 'solid',
                                    flex: 1,
                                    paddingLeft: '15px',
                                    paddingRight: '15px',
                                    paddingTop: '5px',
                                    paddingBottom: '5px'
                                }}
                            ></td>
                            <td
                                style={{
                                    borderWidth: '1px',
                                    borderColor: '#EBEBEB',
                                    borderStyle: 'solid',
                                    flex: 1,
                                    paddingLeft: '15px',
                                    paddingRight: '15px',
                                    paddingTop: '5px',
                                    paddingBottom: '5px',
                                    textAlign: 'right'
                                }}
                            >
                                <p>Sub-total</p>
                            </td>
                            <td
                                style={{
                                    borderWidth: '1px',
                                    borderColor: '#EBEBEB',
                                    borderStyle: 'solid',
                                    flex: 1,
                                    paddingLeft: '15px',
                                    paddingRight: '15px',
                                    paddingTop: '5px',
                                    paddingBottom: '5px',
                                    textAlign: 'left'
                                }}
                            >
                                <p>IDR 650.000</p>
                            </td>
                        </tr>
                        <tr style={{ display: 'flex' }}>
                            <td
                                style={{
                                    borderWidth: '1px',
                                    borderColor: '#EBEBEB',
                                    borderStyle: 'solid',
                                    flex: 1,
                                    paddingLeft: '15px',
                                    paddingRight: '15px',
                                    paddingTop: '5px',
                                    paddingBottom: '5px'
                                }}
                            ></td>
                            <td
                                style={{
                                    borderWidth: '1px',
                                    borderColor: '#EBEBEB',
                                    borderStyle: 'solid',
                                    flex: 1,
                                    paddingLeft: '15px',
                                    paddingRight: '15px',
                                    paddingTop: '5px',
                                    paddingBottom: '5px',
                                    flexDirection: 'row'
                                }}
                            >
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'flex-end'
                                    }}
                                >
                                    <p>JNE OKE (2-3 Hari)</p>
                                    <img
                                        src={'/assets/icons/jne-oke.png'}
                                        className={classes.icon}
                                        alt="backgroudn-image"
                                    />
                                </div>
                            </td>
                            <td
                                style={{
                                    borderWidth: '1px',
                                    borderColor: '#EBEBEB',
                                    borderStyle: 'solid',
                                    flex: 1,
                                    paddingLeft: '15px',
                                    paddingRight: '15px',
                                    paddingTop: '5px',
                                    paddingBottom: '5px',
                                    textAlign: 'left'
                                }}
                            >
                                <p>IDR 50.000</p>
                            </td>
                        </tr>
                        <tr style={{ display: 'flex' }}>
                            <td
                                style={{
                                    borderWidth: '1px',
                                    borderColor: '#EBEBEB',
                                    borderStyle: 'solid',
                                    flex: 1,
                                    paddingLeft: '15px',
                                    paddingRight: '15px',
                                    paddingTop: '5px',
                                    paddingBottom: '5px'
                                }}
                            ></td>
                            <td
                                style={{
                                    borderWidth: '1px',
                                    borderColor: '#EBEBEB',
                                    borderStyle: 'solid',
                                    flex: 1,
                                    paddingLeft: '15px',
                                    paddingRight: '15px',
                                    paddingTop: '5px',
                                    paddingBottom: '5px',
                                    textAlign: 'right'
                                }}
                            >
                                <p>Assurance</p>
                            </td>
                            <td
                                style={{
                                    borderWidth: '1px',
                                    borderColor: '#EBEBEB',
                                    borderStyle: 'solid',
                                    flex: 1,
                                    paddingLeft: '15px',
                                    paddingRight: '15px',
                                    paddingTop: '5px',
                                    paddingBottom: '5px',
                                    textAlign: 'left'
                                }}
                            >
                                <p>IDR 1.300</p>
                            </td>
                        </tr>
                        <tr style={{ display: 'flex' }}>
                            <td
                                style={{
                                    borderWidth: '1px',
                                    borderColor: '#EBEBEB',
                                    borderStyle: 'solid',
                                    flex: 1,
                                    paddingLeft: '15px',
                                    paddingRight: '15px',
                                    paddingTop: '5px',
                                    paddingBottom: '5px'
                                }}
                            ></td>
                            <td
                                style={{
                                    borderWidth: '1px',
                                    borderColor: '#EBEBEB',
                                    borderStyle: 'solid',
                                    flex: 1,
                                    paddingLeft: '15px',
                                    paddingRight: '15px',
                                    paddingTop: '5px',
                                    paddingBottom: '5px',
                                    textAlign: 'right'
                                }}
                            >
                                <p>Total</p>
                            </td>
                            <td
                                style={{
                                    borderWidth: '1px',
                                    borderColor: '#EBEBEB',
                                    borderStyle: 'solid',
                                    flex: 1,
                                    paddingLeft: '15px',
                                    paddingRight: '15px',
                                    paddingTop: '5px',
                                    paddingBottom: '5px',
                                    textAlign: 'left'
                                }}
                            >
                                <p>IDR 701.300</p>
                            </td>
                        </tr>
                    </table>
                    <VerticalSpacer height="38px" />
                    <table style={{ width: '100%' }}>
                        <tr style={{ display: 'flex' }}>
                            <td
                                style={{
                                    borderWidth: '1px',
                                    borderColor: '#EBEBEB',
                                    borderStyle: 'solid',
                                    flex: 1,
                                    paddingLeft: '15px',
                                    paddingRight: '15px',
                                    paddingTop: '5px',
                                    paddingBottom: '5px'
                                }}
                            >
                                <p>Order Status</p>
                            </td>
                            <td
                                style={{
                                    borderWidth: '1px',
                                    borderColor: '#EBEBEB',
                                    borderStyle: 'solid',
                                    flex: 1,
                                    paddingLeft: '15px',
                                    paddingRight: '15px',
                                    paddingTop: '5px',
                                    paddingBottom: '5px'
                                }}
                            >
                                <p>Completed</p>
                            </td>
                        </tr>
                    </table>

                    <Box className={classes.btnWrapper} style={{ justifyContent: 'flex-end' }}>
                        <MainBlackButton
                            onClick={() => router.back()}
                            innerContaunerStyle={{ width: '186px', fontSize: '20px' }}
                            className="WhiteButton"
                            variant="outlined"
                        >
                            Back
                        </MainBlackButton>
                        <HorizontalSpacer widht={{ marginRight: '15px' }} />
                        <MainBlackButton
                            onClick={() => setShowModalReview(false)}
                            innerContaunerStyle={{ width: '186px', fontSize: '20px' }}
                            className="BlackButton"
                            variant="contained"
                        >
                            Print
                            <HorizontalSpacer widht={{ marginRight: '10px' }} />
                            <PrintOutlinedIcon />
                        </MainBlackButton>
                    </Box>
                </Grid>
            </Container>
        </article>
    );
};

export default DetailOrder;
