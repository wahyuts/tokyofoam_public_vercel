import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import { Typography, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';

import { setAddressLabel } from '../../../redux/actions/urlOnProfileButtonTabAction';
import {
    addKecamatanLogreg,
    addKotaLogreg,
    editUserAddress,
    setLocProvinceLogreg
} from '../../../redux/actions/userActions';

import HorizontalSpacer from '../../../components/HorizontalSpacer';
import MainBlackButton from '../../../utils/re-useable-components/buttons/MainBlackButton';
import Dialog from '../component/dialog';
import Wishlist from './profile-wishlist';

import {
    LOCATION_PATH_ADDRESS_ADD_NEW_ADDRESS,
    SET_HEADER_ADD_NEW_ADDRESS,
    SET_HEADER_EDIT_ADDRESS,
    SET_PROFILE_ADDRESS,
    SET_PROFILE_DASHBOARD,
    SET_PROFILE_PROMO_AND_SALE,
    SET_PROFILE_WISHLIST
} from '../../../types';

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
    profileContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        // paddingTop: '80px',
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
                marginBottom: '10px',
                fontSize: 13
            },
            '& .userAddressMobile': {
                fontSize: 13
            },
            '& .btnDesktop': {
                display: 'none'
            },
            '& .btnMobile': {
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 30
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
        marginTop: '20px',
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

    const { headerPage, show_label_profile } = useSelector((state) => state.url_profile);
    const { credentials } = useSelector((state) => state.user);

    const [showModal, setShowModal] = useState(false);
    const [dataAddress, setDataAddress] = useState({
        alamat: credentials?.alamat,
        no_telp: credentials?.no_telp

        // provinsi: credentials?.provinsi,
        // kota: credentials?.kota,
        // kecamatan: credentials?.kecamatan
    });

    const onChangeHandler = (e) => {
        setDataAddress({ ...dataAddress, alamat: e.target.value });
    };

    const onChangeHandlerNoHp = (e) => {
        setDataAddress({ ...dataAddress, no_telp: e.target.value });
    };

    useEffect(() => {}, [show_label_profile, dataAddress, credentials]);

    // console.log(credentials);
    // console.log(dataAddress);

    return (
        <div>
            <div className={classes.profileContainer}>
                {show_label_profile === SET_PROFILE_ADDRESS && (
                    <>
                        <p className={'title'}>{show_label_profile}</p>
                        <Box className={classes.addressContainer}>
                            <Box className={'information'}>
                                <p style={{ fontSize: '20px', fontWeight: '500' }}>Default Address</p>
                                <p className={'username'}>{`${credentials?.nama} (${dataAddress.no_telp})`}</p>
                                <p
                                    className={'userAddressMobile'}
                                    style={{ marginBottom: '10px', textAlign: 'center' }}
                                >
                                    {credentials?.alamat}
                                </p>
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
                                {/* <HorizontalSpacer widht={{ marginRight: '15px' }} />
                                <MainBlackButton
                                    className={'WhiteButton'}
                                    innerContaunerStyle={style.btnPrimaryOutline_mobile}
                                    variant="outlined"
                                >
                                    Delete
                                </MainBlackButton> */}
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
                            // placeholder={headerPage === 'Add New Address' ? '' : credentials?.nama}
                            label={headerPage === 'Add New Address' ? '' : credentials?.nama}
                            sx={{ color: 'red' }}
                            variant="outlined"
                            className={classes.dialogInput}
                            size="small"
                            disabled
                        />
                    </Box>
                    <Box className={classes.dialogFormWrapper}>
                        <Typography className={'lable'}>*Address</Typography>
                        <TextField
                            onChange={onChangeHandler}
                            value={headerPage === 'Add New Address' ? '' : dataAddress.alamat}
                            // value={headerPage === 'Add New Address' ? '' : credentials?.alamat}
                            id="outlined-basic"
                            className={classes.dialogInput}
                            size="small"
                            multiline
                        />
                    </Box>
                </Box>
                <Box className={'dialogInnerContainerTwiceForm'}>
                    <Box className={classes.dialogFormWrapper}>
                        <Typography className={'lable'}>*No Handphone</Typography>
                        <TextField
                            onChange={onChangeHandlerNoHp}
                            value={headerPage === 'Add New Address' ? '' : dataAddress.no_telp}
                            variant="outlined"
                            className={classes.dialogInput}
                            size="small"
                            type="number"
                        />
                    </Box>
                </Box>

                <Box className={classes.dialogBtnWrapper}>
                    <MainBlackButton
                        onClick={async () => {
                            setDataAddress({
                                ...dataAddress,
                                alamat: credentials?.alamat,
                                no_telp: credentials?.no_telp
                            });
                            setShowModal(false);
                        }}
                        innerContaunerStyle={style.btnBoxPrimaryOutline}
                        className="WhiteButton"
                        variant="outlined"
                    >
                        Back
                    </MainBlackButton>
                    <HorizontalSpacer widht={{ marginRight: '15px' }} />
                    <MainBlackButton
                        onClick={async () => {
                            try {
                                await dispatch(editUserAddress(dataAddress, setShowModal));
                                // setShowModal(false);
                            } catch (error) {
                                console.log(error);
                            }
                        }}
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
