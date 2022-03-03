import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import HorizontalSpacer from '../../components/HorizontalSpacer';
import { setProfile } from '../../redux/actions/urlOnProfileButtonTabAction';
import MainBlackButton from '../../utils/re-useable-components/buttons/MainBlackButton';

// import { ButtonTab, Dialog } from './component';
import ButtonTab from './component/ButtonTab';
import Dialog from './component/dialog';
import Address from './pages/profile-address';
import Dashboard from './pages/profile-dashboard';
import PromoAndSale from './pages/profile-promo-and-sale';
import Wishlist from './pages/profile-wishlist';
import {
    SET_PROFILE_ADDRESS,
    SET_PROFILE_DASHBOARD,
    SET_PROFILE_PROMO_AND_SALE,
    SET_PROFILE_WISHLIST
} from '../../types';
import TemporaryDrawer from './component/MobileMenuList';
import { setMainURL } from '../../redux/actions/urlOnHeadnavActions';
import { changeURL } from '../../redux/actions/urlChangeableActions';

const style = {
    btnSecondaryContained: {
        width: '100px',
        borderRadius: '20px',
        backgroundColor: '#FF7373'
    },
    btnPrimaryOutline: {
        width: '100px',
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
    desktopContainer: {
        [theme.breakpoints.down('mobile')]: {
            display: 'none'
        }
    },
    mobileContainer: {
        display: 'none',
        [theme.breakpoints.down('mobile')]: {
            display: 'flex',
            flexDirection: 'column'
        }
    },
    btnContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: '50px',
        marginBottom: '50px'
    }
}));

const ProfilePage = () => {
    const classes = useStyles();
    const router = useRouter();
    const dispatch = useDispatch();
    const currentPath = router.pathname;

    const [showModal, setShowModal] = useState(false);
    const { show_label_profile } = useSelector((state) => state.url_profile);

    const pages = () => {
        if (show_label_profile === SET_PROFILE_DASHBOARD) return <Dashboard />;
        else if (show_label_profile === SET_PROFILE_ADDRESS) return <Address />;
        else if (show_label_profile === SET_PROFILE_WISHLIST) return <Wishlist />;
        else if (show_label_profile === SET_PROFILE_PROMO_AND_SALE) return <PromoAndSale />;
    };
    useEffect(() => {
        dispatch(changeURL(currentPath));
        dispatch(setMainURL('Profile'));
    }, [dispatch, currentPath, show_label_profile]);
    return (
        <>
            <div className={classes.desktopContainer}>
                <ButtonTab />
                {pages()}
            </div>
            <div className={classes.mobileContainer}>
                <TemporaryDrawer />
                {pages()}
            </div>
            <Dialog open={showModal}>
                <p style={{ fontSize: '25px', fontWeight: '500' }}>Apakah Anda yakin ingin Logout?</p>
                <Box className={classes.btnContainer}>
                    <MainBlackButton className={'BlackButton'} innerContaunerStyle={style.btnSecondaryContained}>
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
        </>
    );
};

export default ProfilePage;
