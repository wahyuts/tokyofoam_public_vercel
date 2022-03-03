import { useRouter } from 'next/router';

import { Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';

import { useDispatch, useSelector } from 'react-redux';

import { setProfile } from '../../../redux/actions/urlOnProfileButtonTabAction';
import {
    SET_PROFILE_ADDRESS,
    SET_PROFILE_DASHBOARD,
    SET_PROFILE_LOGOUT,
    SET_PROFILE_PROMO_AND_SALE,
    SET_PROFILE_WISHLIST
} from '../../../types';
import Dialog from './dialog';
import MainBlackButton from '../../../utils/re-useable-components/buttons/MainBlackButton';
import HorizontalSpacer from '../../../components/HorizontalSpacer';
import { useState } from 'react';

const style = {
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
    }
};

const useStyles = makeStyles((theme) => ({
    btnMenuContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '55px'
    },
    button: {
        '&.MuiButton-root': {
            backgroundColor: '#fff',
            marginRight: '67px'
        },
        '&.MuiButton-root.active': {
            backgroundColor: '#fff',
            padding: '5px 36px',
            borderRadius: '20px',
            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.13)'
        },
        '&.MuiButton-text': {
            color: '#939393',
            fontWeight: 'bold',
            textTransform: 'capitalize'
        },
        '&.MuiButton-text.active': {
            color: '#474747'
        },
        '&.MuiButton-text.btn-promo': {
            color: '#AAC6DB'
        },
        '&.MuiButton-text.btn-logout': {
            color: '#FF7373'
        }
    },
    buttonActive: {
        '&.MuiButton-root': {
            backgroundColor: 'red',
            borderRadius: '20px',
            padding: '5px 36px'
        },
        '&.MuiButton-text': {
            color: '#474747',
            textTransform: 'capitalize'
        }
    },
    btnContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: '100px',
        marginBottom: '100px',
        paddingLeft: '200px',
        paddingRight: '200px'
    }
}));

const ButtonTab = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const { show_label_profile, tab_menu_list } = useSelector((state) => state.url_profile);

    return (
        <Box className={classes.btnMenuContainer}>
            {tab_menu_list?.map((item, i) => (
                <Button
                    variant="text"
                    key={i}
                    // className={`${classes.button}  ${show_label_profile === item.label ? 'active' : ''}
                    // ${item.label === SET_PROFILE_PROMO_AND_SALE && 'btn-promo'}
                    // `}
                    className={`${classes.button}  ${show_label_profile === item.label ? 'active' : ''}`}
                    onClick={() => dispatch(setProfile(item.label))}
                >
                    {item.label}
                </Button>
            ))}
            <Button
                variant="text"
                className={`${classes.button} btn-logout ${show_label_profile === SET_PROFILE_LOGOUT ? 'active' : ''}`}
                onClick={() => setShowModal(true)}
            >
                Logout
            </Button>
            <Dialog open={showModal}>
                <p style={{ fontSize: '25px', fontWeight: '500' }}>Apakah Anda yakin ingin Logout?</p>
                <Box className={classes.btnContainer}>
                    <MainBlackButton
                        className={'BlackButton'}
                        // onClick={ async ()=> {
                        //     await dispatch(setAddressLabel(SET_HEADER_EDIT_ADDRESS))
                        //     setShowModal(true)}}
                        innerContaunerStyle={style.btnSecondaryContained}
                    >
                        Ya
                    </MainBlackButton>
                    <HorizontalSpacer widht={{ marginRight: '15px' }} />
                    <MainBlackButton
                        className={'WhiteButton'}
                        innerContaunerStyle={style.btnPrimaryOutline}
                        variant="outlined"
                        onClick={() => setShowModal(false)}
                    >
                        Tidak
                    </MainBlackButton>
                </Box>
            </Dialog>
        </Box>
    );
};
export default ButtonTab;
