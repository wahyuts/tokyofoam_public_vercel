import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Typography, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';

import HorizontalSpacer from '../../../components/HorizontalSpacer';
import MainBlackButton from '../../../utils/re-useable-components/buttons/MainBlackButton';
// import { ButtonTab, Dialog } from '../component';
import ButtonTab from '../component/ButtonTab';
import Dialog from '../component/dialog';
import DropdownKabupaten from '../../../utils/re-useable-components/dropdown/dropdown-kabupaten';
import {
    LOCATION_PATH_ADDRESS_ADD_NEW_ADDRESS,
    SET_HEADER_ADD_NEW_ADDRESS,
    SET_HEADER_EDIT_ADDRESS,
    SET_PROFILE_ADDRESS,
    SET_PROFILE_DASHBOARD,
    SET_PROFILE_PROMO_AND_SALE,
    SET_PROFILE_WISHLIST
} from '../../../types';
import { setAddressLabel } from '../../../redux/actions/urlOnProfileButtonTabAction';
import Dashboard from './profile-dashboard';
import Wishlist from './profile-wishlist';
import PromoAndSale from './profile-promo-and-sale';
import DropdownKecamatan from '../../../utils/re-useable-components/dropdown/dropdown-kecamatan';
import DropdownProvinsi from '../../../utils/re-useable-components/dropdown/dropdown-provinsi';

const style = {
    btnPrimaryContained: {
        borderRadius: '30px',
        paddingLeft: '80px',
        paddingRight: '80px',
        width: '320px'
    },
    btnSecondaryContained: {
        width: '186px',
        borderRadius: '20px',
        backgroundColor: '#FF7373'
    },
    btnPrimaryOutline: {
        width: '186px',
        borderRadius: '20px'
    },
    btnPrimaryContained_mobile: {
        width: '126px',
        borderRadius: '20px',
        backgroundColor: '#FF7373'
    },
    btnPrimaryOutline_mobile: {
        width: '126px',
        borderRadius: '20px'
    },
    btnBoxPrimariContainer: {
        width: '186px',
        fontSize: '20px',
        fontWeight: '500'
    },
    btnBoxPrimaryOutline: {
        width: '186px',
        fontSize: '20px',
        fontWeight: '500'
    }
};

const useStyles = makeStyles((theme) => ({
    desktopContainer: {
        marginBottom: '97px',
        [theme.breakpoints.down('mobile')]: {
            display: 'none'
        }
    },
    profileContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '102px',
        marginBottom: '100px',
        '& .title': {
            display: 'none'
        },
        '& .blackButton-desktop': {
            display: 'flex'
        },
        '& .blackButton-mobile': {
            display: 'none'
        },
        [theme.breakpoints.down('mobile')]: {
            display: 'flex',
            flexDirection: 'column',
            paddingTop: '20px',
            marginBottom: '50px',
            '& .title': {
                paddingLeft: '24px',
                marginBottom: '20px',
                display: 'flex',
                fontSize: '18px',
                fontWeight: '600',
                alignSelf: 'flex-start'
            },
            '& .blackButton-desktop': {
                display: 'none'
            },
            '& .blackButton-mobile': {
                display: 'flex'
            }
        }
    },
    addressContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '100px',
        '& .information': {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: '35px'
        },
        '& .username': {
            marginTop: '35px',
            marginBottom: '10px'
        },
        '& .btnDesktop': {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center'
        },
        '& .btnMobile': {
            display: 'none'
        },
        [theme.breakpoints.down('mobile')]: {
            display: 'flex',
            marginTop: '50px',
            flexDirection: 'column',
            '& .information': {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginBottom: '20px'
            },
            '& .username': {
                marginTop: '20px',
                marginBottom: '10px'
            },
            '& .btnDesktop': {
                display: 'none'
            },
            '& .btnMobile': {
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center'
            }
        }
    },

    dialogContainer: {
        '& .dialogInnerContainerSingleForm': {
            display: 'flex',
            flexDirection: 'column'
        },
        '& .dialogInnerContainerTwiceForm': {
            display: 'flex',
            flexDirection: 'row'
        },
        '& .title': {
            fontSize: '25px',
            fontWeight: '500'
        },
        '& .label': {
            color: '#474747',
            marginBottom: '15px'
        }
    },
    dialogFormWrapper: {
        width: '100%',
        marginTop: '30px',
        marginBottom: '15px'
    },
    dialogInput: {
        width: '100%',
        padding: '10px 10px 10px 10px',
        marginTop: '15px'
    },
    dialogBtnWrapper: {
        display: 'flex',
        justifyContent: 'flex-start',
        marginBottom: '44px'
    }
}));

const Address = (params) => {
    const classes = useStyles();
    const router = useRouter();
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const [age, setAge] = useState('');
    const { headerPage, show_label_profile } = useSelector((state) => state.url_profile);

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    useEffect(() => {}, [show_label_profile]);
    return (
        <div>
            <div className={classes.profileContainer}>
                {show_label_profile === SET_PROFILE_ADDRESS && (
                    <>
                        <p className={'title'}>{show_label_profile}</p>
                        <div className={'blackButton-desktop'}>
                            <MainBlackButton
                                className={'BlackButton'}
                                innerContaunerStyle={style.btnPrimaryContained}
                                onClick={async () => {
                                    await dispatch(setAddressLabel(SET_HEADER_ADD_NEW_ADDRESS));
                                    setShowModal(true);
                                }}
                            >
                                Add New Address
                            </MainBlackButton>
                        </div>
                        <div className={'blackButton-mobile'}>
                            <MainBlackButton
                                className={'BlackButton'}
                                innerContaunerStyle={style.btnPrimaryContained}
                                onClick={async () => {
                                    await dispatch(setAddressLabel(SET_HEADER_ADD_NEW_ADDRESS));
                                    router.push(LOCATION_PATH_ADDRESS_ADD_NEW_ADDRESS);
                                }}
                            >
                                Add New Address
                            </MainBlackButton>
                        </div>
                        <Box className={classes.addressContainer}>
                            <Box className={'information'}>
                                <p style={{ fontSize: '20px', fontWeight: '500' }}>Default Address</p>
                                <p className={'username'}>Mia Artina</p>
                                <p style={{ marginBottom: '10px', textAlign: 'center' }}>
                                    Jln. Gunung Saputan no.22X, Kecamatan Denpasar Barat
                                </p>
                                <p>Denpasar</p>
                            </Box>
                            <Box className={'btnDesktop'}>
                                <MainBlackButton
                                    className={'BlackButton'}
                                    onClick={async () => {
                                        await dispatch(setAddressLabel(SET_HEADER_EDIT_ADDRESS));
                                        setShowModal(true);
                                    }}
                                    innerContaunerStyle={style.btnSecondaryContained}
                                >
                                    Edit
                                </MainBlackButton>
                                <HorizontalSpacer widht={{ marginRight: '15px' }} />
                                <MainBlackButton
                                    className={'WhiteButton'}
                                    innerContaunerStyle={style.btnPrimaryOutline}
                                    variant="outlined"
                                >
                                    Delete
                                </MainBlackButton>
                            </Box>
                            <Box className={'btnMobile'}>
                                <MainBlackButton
                                    className={'BlackButton'}
                                    onClick={async () => {
                                        await dispatch(setAddressLabel(SET_HEADER_EDIT_ADDRESS));
                                        router.push(LOCATION_PATH_ADDRESS_ADD_NEW_ADDRESS);
                                    }}
                                    innerContaunerStyle={style.btnPrimaryContained_mobile}
                                >
                                    Edit
                                </MainBlackButton>
                                <HorizontalSpacer widht={{ marginRight: '15px' }} />
                                <MainBlackButton
                                    className={'WhiteButton'}
                                    innerContaunerStyle={style.btnPrimaryOutline_mobile}
                                    variant="outlined"
                                >
                                    Delete
                                </MainBlackButton>
                            </Box>
                        </Box>
                        <Box className={classes.addressContainer}>
                            <Box className={'information'}>
                                <p>Address 2</p>
                                <p style={{ marginTop: '35px', marginBottom: '10px' }}>Mia Artina</p>
                                <p style={{ marginBottom: '10px', textAlign: 'center' }}>
                                    Jln. Gunung Saputan no.22X, Kecamatan Denpasar Barat
                                </p>
                                <p>Denpasar</p>
                            </Box>
                            <Box className={'btnDesktop'}>
                                <MainBlackButton
                                    className={'WhiteButton'}
                                    onClick={async () => {
                                        await dispatch(setAddressLabel(SET_HEADER_EDIT_ADDRESS));
                                        setShowModal(true);
                                    }}
                                    innerContaunerStyle={style.btnPrimaryOutline}
                                    variant="outlined"
                                >
                                    Edit
                                </MainBlackButton>
                                <HorizontalSpacer widht={{ marginRight: '15px' }} />
                                <MainBlackButton
                                    className={'WhiteButton'}
                                    innerContaunerStyle={style.btnPrimaryOutline}
                                    variant="outlined"
                                >
                                    Delete
                                </MainBlackButton>
                            </Box>
                            <Box className={'btnMobile'}>
                                <MainBlackButton
                                    className={'WhiteButton'}
                                    onClick={async () => {
                                        await dispatch(setAddressLabel(SET_HEADER_EDIT_ADDRESS));
                                        router.push(LOCATION_PATH_ADDRESS_ADD_NEW_ADDRESS);
                                    }}
                                    innerContaunerStyle={style.btnPrimaryOutline_mobile}
                                    variant="outlined"
                                >
                                    Edit
                                </MainBlackButton>
                                <HorizontalSpacer widht={{ marginRight: '15px' }} />
                                <MainBlackButton
                                    className={'WhiteButton'}
                                    innerContaunerStyle={style.btnPrimaryOutline_mobile}
                                    variant="outlined"
                                >
                                    Delete
                                </MainBlackButton>
                            </Box>
                        </Box>
                    </>
                )}
            </div>
            <Dialog
                open={showModal}
                innerContainerStyle={{ width: '798px', left: '50%' }}
                className={classes.dialogContainer}
            >
                <Typography id="modal-modal-title" className={'title'}>
                    {headerPage}
                </Typography>
                <Box className={'dialogInnerContainerSigleForm'}>
                    <Box className={classes.dialogFormWrapper}>
                        <Typography className={'lable'}>*Name</Typography>
                        <TextField
                            id="outlined-basic"
                            placeholder={headerPage === 'Add New Address' ? '' : 'Mia Artina'}
                            variant="outlined"
                            r
                            className={classes.dialogInput}
                            size="small"
                        />
                    </Box>
                    <Box className={classes.dialogFormWrapper}>
                        <Typography className={'lable'}>*Address</Typography>
                        <TextField
                            placeholder={
                                headerPage === 'Add New Address'
                                    ? ''
                                    : 'Jln. Gunung Saputan no.22X, Kecamatan Denpasar Barat'
                            }
                            id="outlined-basic"
                            className={classes.dialogInput}
                            size="small"
                            multiline
                        />
                    </Box>
                </Box>
                <Box className={'dialogInnerContainerTwiceForm'}>
                    <Box className={classes.dialogFormWrapper}>
                        <Typography className={'lable'}>*Provinsi</Typography>
                        <DropdownProvinsi />
                    </Box>
                    <HorizontalSpacer widht={{ marginRight: '31px' }} />
                    <Box className={classes.dialogFormWrapper}>
                        <Typography className={'lable'}>*Kode Pos</Typography>
                        <TextField
                            placeholder={headerPage === 'Add New Address' ? '' : 'Kode Pos'}
                            variant="outlined"
                            className={classes.dialogInput}
                            size="small"
                        />
                    </Box>
                </Box>
                <Box className={'dialogInnerContainerTwiceForm'}>
                    <Box className={classes.dialogFormWrapper}>
                        <Typography className={'lable'}>*Kota / Kabupaten</Typography>
                        <DropdownKabupaten />
                    </Box>
                    <HorizontalSpacer widht={{ marginRight: '31px' }} />
                    <Box className={classes.dialogFormWrapper}>
                        <Typography className={'lable'}>*No Telp</Typography>
                        <TextField
                            placeholder={headerPage === 'Add New Address' ? '' : 'Your number'}
                            variant="outlined"
                            className={classes.dialogInput}
                            size="small"
                        />
                    </Box>
                </Box>
                <Box className={'dialogInnerContainerTwiceForm'}>
                    <Box className={classes.dialogFormWrapper}>
                        <Typography className={'lable'}>*Kecamatan</Typography>
                        <DropdownKecamatan />
                    </Box>
                    <HorizontalSpacer widht={{ marginRight: '31px' }} />
                    <Box className={classes.dialogFormWrapper}></Box>
                </Box>
                <Box className={classes.dialogBtnWrapper}>
                    <MainBlackButton
                        onClick={() => setShowModal(false)}
                        innerContaunerStyle={style.btnBoxPrimaryOutline}
                        className="WhiteButton"
                        variant="outlined"
                    >
                        Back
                    </MainBlackButton>
                    <HorizontalSpacer widht={{ marginRight: '15px' }} />
                    <MainBlackButton
                        onClick={() => {}}
                        innerContaunerStyle={style.btnBoxPrimariContainer}
                        className="BlackButton"
                        variant="contained"
                    >
                        Submit
                    </MainBlackButton>
                </Box>
            </Dialog>
        </div>
    );
};
export default Address;
