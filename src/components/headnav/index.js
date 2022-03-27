import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import jwtDecode from 'jwt-decode';

import Logo from '../../../public/assets/images/logo-tokyofoam.png';
import MyIconButton from '../../utils/re-useable-components/buttons/MyIconButton';
import ReactResponsiveHook from '../../utils/ReactResponsiveHook';

import AllButtonFunctions from '../../utils/re-useable-functions/AllButtonFunctions';
import DesktopLoginDrawer from '../desktop-login-drawer';

//MaT UI
import AppBar from '@mui/material/AppBar';
import { makeStyles } from '@mui/styles';
import Toolbar from '@mui/material/Toolbar';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange } from '@mui/material/colors';

//Redux
import { useDispatch, useSelector } from 'react-redux';

//Icons
import BagIcon from '@mui/icons-material/LocalMall';
import WhistlistIcon from '@mui/icons-material/FavoriteBorder';
import AccountIcon from '@mui/icons-material/AccountCircle';
// import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CallIcon from '@mui/icons-material/WifiCalling3Outlined';
import MailIcon from '@mui/icons-material/MailOutlineOutlined';
// import AccountIcon from '@mui/icons-material/AccountCircle';
import MenuDrawer from '../mobile/menu-drawer';
import Avatars from '../avatars';
import { logoutUser, getAllCommentar } from '../../redux/actions/userActions';
import MyNotification from '../mynotification';
import { getAllNotificationFunction } from '../../redux/actions/dataProductActions';

const useStyles = makeStyles((theme) => ({
    navbar: {
        backgroundColor: '#FFFFFF',
        // boxShadow: 'none',
        '& a': {
            color: '#616161',
            marginLeft: 10
        }
    },
    theTopestHeadnav: {
        width: '100%',
        backgroundColor: '#F7F7F7'
    },
    slightlyBelowNavbar: {
        width: '100%',
        backgroundColor: '#F7F7F7'
    },
    phoneNumber: {
        width: '85%',
        height: 40,
        // backgroundColor: 'red',
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'flex',
        alignItems: 'center',
        [theme.breakpoints.down('mobile')]: {
            width: '90%'
        },
        '& .textURL': {
            fontSize: 14,
            marginRight: 15,
            [theme.breakpoints.down('mobile')]: {
                fontSize: 10
            }
        }
    },
    callIcon: {
        color: '#A6A6A6',
        marginRight: 20,
        [theme.breakpoints.down('mobile')]: {
            fontSize: 15,
            marginRight: 10
        }
    },
    pPhoneNumberEmail: {
        fontSize: 15,
        color: '#A6A6A6',
        [theme.breakpoints.down('tablet')]: {
            fontSize: 15
        },
        [theme.breakpoints.down('mobile')]: {
            fontSize: 11
        }
    },
    emailIcon: {
        color: '#A6A6A6',
        marginLeft: 20,
        marginRight: 20,
        [theme.breakpoints.down('mobile')]: {
            fontSize: 15,
            marginRight: 10
        }
    },
    contToolbar: {
        width: '89%',
        // backgroundColor: 'red',
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'flex',
        justifyContent: 'space-between'
    },
    contLiNav: {
        display: 'flex',
        listStyle: 'none',
        color: '#616161',

        // backgroundColor: 'purple',
        '& .eachLi': {
            marginLeft: 50,
            fontSize: 15,
            cursor: 'pointer',
            [theme.breakpoints.down('tablet')]: {
                fontSize: 12
            },
            '&:hover': {
                // color: '#AAC6DB'
                color: 'grey'
            },
            '&:active': {
                color: '#AAC6DB'
            },
            '&:focus': {
                color: '#AAC6DB'
            }
        },
        '& .eachLi:last-child': {
            marginRight: 50
        },
        '& .colorFirstTab': {
            color: '#AAC6DB'
        }
    },
    contIconButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: '15%',
        [theme.breakpoints.down('mobile')]: {
            width: '15%',
            justifyContent: 'space-evenly'
        }
    },
    menuIcon: {
        color: 'black'
    }
}));

const Headnav = () => {
    const { show_URL_Home, show_URL_Main, show_URL_DetailProduct } = useSelector((state) => state.url);
    // const { locationProvince } = useSelector((state) => state.shippingAddres);
    const token = localStorage.getItem('FBIdToken');
    const { authenticated } = useSelector((state) => state.user);
    const { dataProductOnBag } = useSelector((state) => state.bag);
    const { kurirName } = useSelector((state) => state.detailOngkir);

    const classes = useStyles();
    const router = useRouter();
    const dispatch = useDispatch();
    const currentPath = router.pathname;
    // const [open, setOpen] = useState(false);

    const { isMobile, isTablet, isDesktop } = ReactResponsiveHook();
    const {
        handleClickHome,
        handleClickAboutUs,
        handleClickProductPage,
        handleClickContactUs,
        handleClickHowToBuy,
        handleClickCart
        // handleClickTesting
    } = AllButtonFunctions();

    useEffect(() => {
        if (token) {
            //token adalah kode rahasia yang di encrypt jadi untuk mengetahui isi token diperlukan decode token
            // untuk decode token kita pake lib jwt-decode
            const decodedToken = jwtDecode(token);

            // Testing lihat hasil percobaan conver exp to date true/false
            // const datexx = decodedToken.exp * 1000 < Date.now();
            // console.log(decodedToken);
            // console.log('DATE?', datexx);

            //jika tanggal yang ada didalam token kurang dari hari ini, maka token expired dan otomatis log out
            // jika lebih dari tanggal hari ini maka tampilkan userData
            if (decodedToken.exp * 1000 < Date.now()) {
                dispatch(logoutUser());
                // window.loaction.href = '/login';
            } else {
                null;
            }
        }
    });

    useEffect(() => {
        dispatch(getAllCommentar());
        dispatch(getAllNotificationFunction());
    });

    const [menuOpens, setMenuOpen] = useState(false);
    let normalNav = (
        <div className={classes.contLiNav}>
            {show_URL_Main === 'Home' ? (
                <a className="eachLi colorFirstTab" tabIndex="0" onClick={handleClickHome}>
                    Home
                </a>
            ) : (
                <a className="eachLi" tabIndex="0" onClick={handleClickHome}>
                    Home
                </a>
            )}
            {show_URL_Main === 'About Us' ? (
                <a className="eachLi colorFirstTab" tabIndex="0" onClick={handleClickAboutUs}>
                    About Us
                </a>
            ) : (
                <a className="eachLi" tabIndex="0" onClick={handleClickAboutUs}>
                    About Us
                </a>
            )}
            {show_URL_Main === 'Product' ? (
                <a className="eachLi colorFirstTab" tabIndex="0" onClick={handleClickProductPage}>
                    Product
                </a>
            ) : (
                <a className="eachLi" tabIndex="0" onClick={handleClickProductPage}>
                    Product
                </a>
            )}
            {show_URL_Main === 'How To Buy' ? (
                <a className="eachLi colorFirstTab" tabIndex="0" onClick={handleClickHowToBuy}>
                    How To Buy
                </a>
            ) : (
                <a className="eachLi" tabIndex="0" onClick={handleClickHowToBuy}>
                    How To Buy
                </a>
            )}
            {show_URL_Main === 'Contact Us' ? (
                <a className="eachLi colorFirstTab" tabIndex="0" onClick={handleClickContactUs}>
                    Contact Us
                </a>
            ) : (
                <a className="eachLi" tabIndex="0" onClick={handleClickContactUs}>
                    Contact Us
                </a>
            )}
        </div>
    );

    let URL_DetailProduct =
        currentPath === '/product-page' || currentPath === '/how-to-buy' || currentPath === '/contact-us' ? null : (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <p style={{ marginRight: 15 }}>&gt;</p>
                <p className="textURL">{show_URL_DetailProduct}</p>
            </div>
        );

    let belowNav =
        currentPath === '/about-us' || currentPath === '/' ? null : currentPath === '/cart' ||
          currentPath === '/checkout' ||
          currentPath === '/profile' ||
          currentPath === '/reset-password' ||
          currentPath === '/change-password-user' ? (
            <div className={classes.slightlyBelowNavbar}>
                <div className={classes.phoneNumber}>
                    <p className="textURL" style={{ cursor: 'pointer' }} onClick={handleClickHome}>
                        {show_URL_Home}
                    </p>
                    <p style={{ marginRight: 15 }}>&gt;</p>
                    <p className="textURL">{show_URL_Main}</p>
                </div>
            </div>
        ) : (
            <div className={classes.slightlyBelowNavbar}>
                <div className={classes.phoneNumber}>
                    <p className="textURL" style={{ cursor: 'pointer' }} onClick={handleClickHome}>
                        {show_URL_Home}
                    </p>
                    <p style={{ marginRight: 15 }}>&gt;</p>
                    <p className="textURL">{show_URL_Main}</p>
                    {URL_DetailProduct}
                    {/* <p className="textURL">{show_URL_DetailProduct}</p> */}
                </div>
            </div>
        );

    let bagIcon = (
        <>
            <div style={{ position: 'relative' }}>
                <MyIconButton tip="Bag" onClick={handleClickCart}>
                    <BagIcon color="#545454" />
                </MyIconButton>

                {/**Untuk notifikasi icon number pada bag */}
                {dataProductOnBag.length === 0 ? null : (
                    <Stack direction="row" spacing={2}>
                        <Avatar
                            sx={{
                                bgcolor: deepOrange[500],
                                width: 20,
                                height: 20,
                                position: 'absolute',
                                top: 0,
                                right: 0
                            }}
                            variant="contained"
                        >
                            <p style={{ fontSize: 13, color: 'white' }}>{dataProductOnBag.length}</p>
                        </Avatar>
                    </Stack>
                )}
            </div>
        </>
    );

    let displayUIforMobile = (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                justifyContent: 'space-between'
            }}
        >
            {/* <MenuIcon className={classes.menuIcon} /> */}
            <MenuDrawer />
            <div>
                <Image src={Logo} alt="Logo" width={80} height={45} />
            </div>

            <div className={classes.contIconButton}>
                {bagIcon}
                {/* <MyIconButton tip="Bag" onClick={handleClickCart}>
                    <BagIcon color="#545454" />
                </MyIconButton> */}
                {/* <MyIconButton tip="Notification">
                    <NotificationsIcon color="#545454" />
                </MyIconButton> */}
                <MyNotification />
            </div>
        </div>
    );

    let displayUIforDesktop = (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                width: '95%',
                justifyContent: 'space-between',
                // backgroundColor: 'green',
                marginLeft: 'auto',
                marginRight: 'auto'
            }}
        >
            <div>
                <Image src={Logo} alt="Logo" width={80} height={45} onClick={handleClickHome} />
            </div>

            {normalNav}

            <div className={classes.contIconButton}>
                <MyNotification />
                {/* <MyIconButton tip="Notification">
                    <NotificationsIcon color="#545454" />
                </MyIconButton> */}
                {/* <MyIconButton tip="Whistlist">
                    <WhistlistIcon color="#545454" />
                </MyIconButton> */}
                {bagIcon}
                {/* <MyIconButton tip="Bag" onClick={handleClickCart}>
                    <BagIcon color="#545454" />
                </MyIconButton> */}
                {authenticated ? (
                    <Avatars />
                ) : (
                    <MyIconButton tip="Sign In" onClick={() => setMenuOpen(true)}>
                        <AccountIcon color="#545454" />
                    </MyIconButton>
                )}

                {/*ini tombol signin nya,..dibuat module terpisah karena berhubungan dengan drawer dan agar tidak koding disini*/}
                <DesktopLoginDrawer menuOpens={menuOpens} setMenuOpen={setMenuOpen} />
                {/* {console.log('true cuy', menuOpens)} */}
            </div>
        </div>
    );

    return (
        <div>
            <div className={classes.theTopestHeadnav}>
                <div className={classes.phoneNumber}>
                    <CallIcon className={classes.callIcon} /> <p className={classes.pPhoneNumberEmail}>085718565195</p>
                    <MailIcon className={classes.emailIcon} />{' '}
                    <p className={classes.pPhoneNumberEmail}>tokyofoam99@gmail.com</p>
                </div>
            </div>
            <AppBar position="static" className={classes.navbar} style={{ backgroundColor: '#FFFFFF' }}>
                <Toolbar className={classes.contToolbar}>
                    {isMobile
                        ? isTablet
                            ? isDesktop
                                ? displayUIforDesktop
                                : displayUIforDesktop
                            : displayUIforDesktop
                        : displayUIforMobile}
                </Toolbar>
            </AppBar>
            {belowNav}
        </div>
    );
};

export default Headnav;
