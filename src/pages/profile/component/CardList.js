import { useState } from 'react';
import Image from 'next/image';
import { Card, Container, IconButton, Rating, Typography } from '@mui/material';
import { VisibilityOutlined, CreditCardOutlined, ChatOutlined, PhotoCamera, AvTimer } from '@mui/icons-material';
import { makeStyles, StylesContext } from '@mui/styles';
import { Box } from '@mui/system';
import Dialog from './dialog';
import MainBlackButton from '../../../utils/re-useable-components/buttons/MainBlackButton';
import HorizontalSpacer from '../../../components/HorizontalSpacer';
import { LOCATION_PATH_DETAILS_ORDER } from '../../../types';
import { useRouter } from 'next/router';

const styles = {
    normalText: { fontWeight: 400, fontSize: '15px', color: '#474747' },
    normalTextStatus: { fontWeight: 400, fontSize: '14px', color: '#FF7373' },
    normalTextDisable: { fontWeight: 400, fontSize: '14px', color: '#787878' },
    normalTextDisableBold: { fontWeight: 600, fontSize: '14px', color: '#787878' },
    boldTextStatus: { fontWeight: 600, fontSize: '16px', color: '#FF7373' }
};

const useStyles = makeStyles((theme) => ({
    cardContainer: { padding: '20px 24px 24px 24px', marginBottom: 35, marginLeft: '15%', marginRight: '15%' },
    btnIcon: {
        '&.MuiIconButton-root': {
            borderRadius: '0'
        },
        '&.MuiIconButton-root:hover': {
            background: 'none'
        }
    },
    dialogUploadWrapper: {
        display: 'flex',
        marginTop: '20px'
    },
    dialogIcWrapper: {
        background: '#D8D8D8',
        width: '50px',
        height: '50px',
        borderRadius: '5px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: '30px'
    },
    dialogIcCamera: {
        '&.MuiSvgIcon-root': {
            width: '35px',
            height: '35px'
        }
    },
    dialogFormWrapper: {
        marginTop: '20px',
        marginBottom: '15px'
    },
    dialogInput: {
        width: '93%',
        padding: '10px 10px',
        marginTop: '15px'
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

    const [showModalReview, setShowModalReview] = useState(false);
    const [showModalPayment, setShowModalPayment] = useState(false);
    const [rateValue, setRateValue] = useState(0);

    return (
        <Container>
            {dataToRender.map((data, index) => {
                const price = data.price.replace('.', '');
                // eslint-disable-next-line radix
                const total = new Intl.NumberFormat(['ban', 'id']).format(parseInt(price) * data.qty);

                return (
                    <Card variant="outlined" key={index} className={classes.cardContainer}>
                        <div
                            style={{
                                display: 'flex',
                                flexDiraction: 'row',
                                marginBottom: 20,
                                alignItems: 'center'
                            }}
                        >
                            <p style={{ fontWeight: 600, fontSize: '20px', color: '#474747', marginRight: 90 }}>
                                {data.id}
                            </p>
                            <p style={{ fontWeight: 400, fontSize: '15px', color: '#474747' }}>
                                Status Pesanan:
                                <text style={styles.normalTextStatus}> {data?.status.toUpperCase()}</text>
                            </p>
                        </div>
                        <hr
                            style={{
                                backgroundColor: '#D8D8D8',
                                height: 0.5,
                                marginBottom: 30
                            }}
                        />
                        <div
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
                                <Image src={data?.img} alt="product image" width={180} height={180} layout="fixed" />
                                <div style={{ marginLeft: 50 }}>
                                    <p style={{ fontWeight: 600, fontSize: '18px', color: '#474747' }}>{data.name}</p>
                                    <p style={styles.normalText}>
                                        Variant:<text style={styles.normalTextDisable}> {data?.variant}</text>
                                    </p>
                                    <p style={styles.normalText}>
                                        Qty:<text style={styles.normalTextDisable}> {data.qty}</text>
                                    </p>
                                </div>
                            </div>
                            <p style={{ textAlign: 'right' }}>
                                <p style={styles.normalTextDisableBold}>Rp {data.price}</p>
                            </p>
                        </div>
                        <hr
                            style={{
                                backgroundColor: '#D8D8D8',
                                height: 0.5,
                                marginBottom: 20
                            }}
                        />
                        <p style={{ textAlign: 'right', marginBottom: 15 }}>
                            <p style={styles.normalTextDisable}>
                                Total Pesanan:
                                <text style={styles.boldTextStatus}> Rp {total}</text>
                            </p>
                        </p>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <p style={styles.normalText}>
                                Tanggal Pesanan:
                                <text style={styles.normalTextDisable}> {data?.date}</text>
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
                                    onClick={() => setShowModalPayment(true)}
                                >
                                    <CreditCardOutlined style={{ color: '#D8D8D8', marginRight: '10px' }} />
                                </IconButton>

                                <IconButton
                                    aria-label="view"
                                    className={classes.btnIcon}
                                    onClick={() => router.push(LOCATION_PATH_DETAILS_ORDER)}
                                >
                                    <VisibilityOutlined />
                                </IconButton>

                                <IconButton
                                    aria-label="message"
                                    className={classes.btnIcon}
                                    onClick={() => setShowModalReview(true)}
                                >
                                    <ChatOutlined style={{ color: '#D8D8D8', marginLeft: '10px' }} />
                                </IconButton>
                            </div>
                        </div>
                    </Card>
                );
            })}

            <Dialog
                open={showModalReview}
                onClose={() => setShowModalReview(false)}
                innerContainerStyle={{ width: '460px', left: '50%' }}
            >
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Give Us Reviews
                </Typography>
                <Box style={{ display: 'flex', alignItems: 'center' }} sx={{ mt: 2 }}>
                    <Typography id="modal-modal-description" mr="30px">
                        Quality
                    </Typography>
                    <Rating
                        name="simple-controlled"
                        value={rateValue}
                        onChange={(event, newValue) => {
                            setRateValue(newValue);
                        }}
                    />
                </Box>
                <Box className={classes.dialogUploadWrapper}>
                    <Box className={classes.dialogIcWrapper}>
                        <PhotoCamera color="disabled" className={classes.dialogIcCamera} />
                    </Box>
                    <Box>
                        <Typography style={{ color: '#474747' }}>Upload Photos</Typography>
                        <Typography style={{ color: '#D8D8D8' }}>png, jpg, max 10mb each.</Typography>
                    </Box>
                </Box>
                <Box className={classes.dialogFormWrapper}>
                    <Typography style={{ color: '#474747' }}>*Judul Riview</Typography>
                    <input placeholder="Write Something" type="text" className={classes.dialogInput} />
                </Box>
                <Box className={classes.dialogFormWrapper}>
                    <Typography style={{ color: '#474747' }}>*Isi Riview</Typography>
                    <textarea
                        placeholder="Write Something"
                        type="text"
                        className={classes.dialogInput}
                        style={{ height: '190px' }}
                    />
                </Box>
                <Box className={classes.dialogBtnWrapper}>
                    <MainBlackButton
                        onClick={() => setShowModalReview(false)}
                        innerContaunerStyle={{ width: '186px', fontSize: '20px' }}
                        className="WhiteButton"
                        variant="outlined"
                    >
                        Back
                    </MainBlackButton>
                    <MainBlackButton
                        onClick={() => setShowModalReview(false)}
                        innerContaunerStyle={{ width: '186px', fontSize: '20px' }}
                        className="BlackButton"
                        variant="contained"
                    >
                        Submit
                    </MainBlackButton>
                </Box>
            </Dialog>
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
                        className="BlackButton"
                        variant="contained"
                    >
                        Confirm Order & Pay
                    </MainBlackButton>
                </Box>
            </Dialog>
        </Container>
    );
};

export default CardComponent;
