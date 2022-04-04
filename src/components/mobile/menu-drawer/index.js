import Image from 'next/image';
import Logo from '../../../../public/assets/images/logo-tokyofoam.png';
import * as React from 'react';
import AllButtonFunctions from '../../../utils/re-useable-functions/AllButtonFunctions';
import MyIconButton from '../../../utils/re-useable-components/buttons/MyIconButton';
import MainBlackButton from '../../../utils/re-useable-components/buttons/MainBlackButton';

//Mat UI For Drawerr
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
// import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

//Redux
import { useDispatch, useSelector } from 'react-redux';
import {
    loginUserTrial,
    loginUser,
    logoutUser,
    signupUserMobile,
    changePasswordMobileDrawer
} from '../../../redux/actions/userActions';

//Icon
import WhistlistIcon from '@mui/icons-material/FavoriteBorder';
import ProfileIcon from '@mui/icons-material/PersonOutline';
import LoginIcon from '@mui/icons-material/Login';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';

import { makeStyles } from '@mui/styles';
import { Checkbox, TextField } from '@mui/material';
import AutoCompleteProvinceLogreg from '../../../utils/re-useable-components/dropdown-log-reg/AutoComplete-Province-Logreg';
import DropdownKabupatenLogreg from '../../../utils/re-useable-components/dropdown-log-reg/dropdown-kabupaten-logreg';
import DropdownKecamatanLogreg from '../../../utils/re-useable-components/dropdown-log-reg/dropdown-kecamatan-logreg';
import { useRouter } from 'next/router';

const useStyles = makeStyles((theme) => ({
    menuIcon: {
        color: 'black'
    },

    mainLogin: {
        backgroundColor: 'white',
        width: 500,
        height: '100%',
        position: 'fixed',
        zIndex: 2,
        top: 0,
        right: -300,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
    box: {
        position: 'relative',
        [theme.breakpoints.down('mobile')]: {
            width: 280
        }
    },
    options: {
        marginTop: 23,
        display: 'flex',
        padding: '0px 20px 0px 20px',
        alignItems: 'center',
        width: 200,
        justifyContent: 'space-between',
        [theme.breakpoints.up('mobile')]: {
            width: '100%'
        },

        '& li': {
            cursor: 'pointer',
            fontWeight: 500,
            fontSize: 18,
            listStyleType: 'none',
            transition: 'all .2s ease'
        },
        '&:hover': {
            opacity: '1'
        },
        '&.active': {
            opacity: '1'
        },
        '&:nth-of-type(2)': {
            marginRight: 20
        },
        '&:last-of-type': {
            marginLeft: 'auto'
        }
    },
    containerLogin: {
        marginTop: 23
    },
    containerChangePassword: {
        marginTop: 23
    },
    EmailPassword: {
        width: '88%',
        marginLeft: theme.spacing(2),
        marginTop: theme.spacing(3)
    },
    text: {
        fontSize: 25,
        fontWeight: 500
    },
    textEmail: {
        fontSize: 14,
        fontWeight: 400
    },
    textChangePassword: {
        fontSize: 25,
        fontWeight: 500,

        [theme.breakpoints.down('mobile')]: {
            fontSize: 23
        }
    },
    icon: {
        position: 'absolute',
        top: 45,
        right: 20
    },
    checkbox: {
        display: 'flex',
        alignItems: 'center',
        marginLeft: theme.spacing(1),

        '& p': {
            fontSize: 15,
            fontWeight: 400
        }
    },
    loginButton: {
        width: '88%',
        marginLeft: theme.spacing(2),
        marginBottom: theme.spacing(3)
    },
    textAcc: {
        marginLeft: theme.spacing(2),
        cursor: 'pointer',
        '& p': {
            fontSize: 15,
            fontWeight: 400,
            [theme.breakpoints.down('mobile')]: {
                fontSize: 13
            }
        },
        '& .textColorRed': {
            color: '#FF7373',
            [theme.breakpoints.down('mobile')]: {
                fontSize: 13,
                color: '#FF7373'
            }
        }
    },
    boxForgot: {
        border: '2px solid #7CD27F',
        background: 'white',
        width: '86%',
        marginLeft: theme.spacing(1),
        marginTop: theme.spacing(3),
        padding: '10px 10px',
        '& p': {
            fontSize: 16,
            fontWeight: 400,
            letterSpacing: 0.5
        }
    }
}));

export default function MenuDrawer() {
    const { authenticated } = useSelector((state) => state.user);
    const { credentials } = useSelector((state) => state.user);
    const { loading, errors, errors_register, errors_forgot_password_submit } = useSelector((state) => state.UI);
    const { locationProvinceLogreg, stateKotaLogreg, stateKecamatanLogreg } = useSelector((state) => state.user);

    const classes = useStyles();
    const router = useRouter();
    const currentPath = router.pathname;
    const dispatch = useDispatch();
    const {
        handleClickHome,
        handleClickAboutUs,
        handleClickProductPage,
        handleClickHowToBuy,
        handleClickContactUs,
        handleClickProfilePage,
        handleClickWishlistPage,
        handleClickGoToRegisterPage
    } = AllButtonFunctions();
    const [isOpenDrawer, setIsOpenDrawer] = React.useState(false);
    const [auth, setAuth] = React.useState(true);
    const [showSI, setShowSI] = React.useState(false);
    const [register, setRegister] = React.useState(false);
    const [forgot, setForgot] = React.useState(false);
    const [boxForgot, setBoxForgot] = React.useState(false);
    // const [showPage, setShowPage] = React.useState('sidebarMenuMobileNotLogin');

    //Buat login
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    //Buat Register
    const [namaUser, setNamaUser] = React.useState('');
    const [regEmail, setRegEmail] = React.useState('');
    const [regPassword, setRegPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [regAlamat, setRegAlamat] = React.useState('');
    const [regNoHandphone, setRegNoHandphone] = React.useState('');
    const [forgotPassword, setForgotPassword] = React.useState('');
    const [checked, setChecked] = React.useState(false);

    const handleChangeChecked = (event) => {
        setChecked(event.target.checked);
    };

    const { dataProductOnBag } = useSelector((state) => state.bag);
    // const keranjang = dataProductOnBag;
    const keranjang = dataProductOnBag.map((bag) => ({
        id: bag.id,
        id_manual_product: bag.id_manual_product,
        nameProduct: bag.nameProduct,
        imageProduct: bag.imageProduct,
        price: bag.price,
        promo_price: bag.promo_price,
        qty: bag.qty,
        price_x_qty: bag.price_x_qty,
        promo_price_x_qty: bag.promo_price_x_qty
    }));

    // console.log('KERANJANG', keranjang);

    //onChange Buat Login
    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    };

    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    };

    //***************************************************** */

    // onChange Buat Register
    const handleChangeNamaUser = (e) => {
        setNamaUser(e.target.value);
    };

    const handleChangeRegEmail = (e) => {
        setRegEmail(e.target.value);
    };

    const handleChangeRegPassword = (e) => {
        setRegPassword(e.target.value);
    };

    const handleChangeConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleChangeRegAlamat = (e) => {
        setRegAlamat(e.target.value);
    };

    const handleChangeRegNoHandphone = (e) => {
        setRegNoHandphone(e.target.value);
    };

    //*************************************************** */

    const regiterAlertSuccess = () => {
        alert('Link email verification has been sent to your email. Please kindly check your email!');
    };

    const goToSignInLeftDrawer = () => {
        setShowSI(!showSI);
        setBoxForgot(false);
        setRegister(false);
        setForgot(false);
        // setShowPage('formLogin');
    };

    const toggleDrawer = (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setIsOpenDrawer(!isOpenDrawer);
        setShowSI(false);
    };

    const klikLogin = () => {
        const userData = {
            email: email,
            password: password
        };
        // setMenuOpen(false); // ini ud dikirim ke loginUser function
        // fungsi pengubah authenticated jadi true sudah ada di loginUser
        dispatch(loginUser(userData, setIsOpenDrawer, keranjang, setShowSI));
    };

    const klikRegister = () => {
        // setMenuOpen(!menuOpens);
        // setMenuOpen(false);

        // dispatch(loginUserTrial());
        // setIsOpenDrawer(!isOpenDrawer);
        // setShowSI(true);

        const userData = {
            nama: namaUser,
            email: regEmail,
            password: regPassword,
            confirm_password: confirmPassword,
            alamat: regAlamat,
            no_telp: regNoHandphone,
            provinsi: locationProvinceLogreg, // di ambil dari state di reducer user
            kota: stateKotaLogreg, // di ambil dari state di reducer user
            kecamatan: stateKecamatanLogreg // di ambil dari state di reducer user
        };
        // setMenuOpen(false); // ini ud dikirim ke loginUser function
        // fungsi pengubah authenticated jadi true sudah ada di loginUser
        dispatch(signupUserMobile(userData, setIsOpenDrawer, setShowSI, regiterAlertSuccess));
    };

    const klikLogout = () => {
        currentPath === '/profile'
            ? (dispatch(logoutUser()), router.push('/'), setIsOpenDrawer(!isOpenDrawer), setShowSI(true))
            : (dispatch(logoutUser()), setIsOpenDrawer(!isOpenDrawer), setShowSI(true));
        // setMenuOpen(!menuOpens);

        // dispatch(logoutUser());
        // setIsOpenDrawer(!isOpenDrawer);
        // setShowSI(true);
    };

    const onForgotPass = () => {
        setForgot(true);
        setRegister(false);
    };

    const onBackLoginRegister = () => {
        setForgot(false);
        setRegister(false);
    };

    const OnBackRegister = () => {
        setForgot(false);
        setRegister(true);
    };

    const GoToRegisterFromHome = () => {
        setShowSI(true);
        setForgot(false);
        setRegister(true);
    };

    const handleForgotPassword = (e) => {
        setForgotPassword(e.target.value);
    };

    const OnToForgotBox = (e) => {
        // setRegister(false);
        // setForgot(false);
        // setBoxForgot(true);
        e.preventDefault();
        const userData = {
            email: forgotPassword
        };
        dispatch(changePasswordMobileDrawer(userData, setRegister, setForgot, setBoxForgot));
    };

    const listWhenNotLogin = (
        <Box sx={{ width: 280 }} role="presentation">
            <div style={{ width: '100%' }}>
                <div style={{ width: '80%', marginLeft: 'auto', marginRight: 'auto', marginTop: 50 }}>
                    <Image src={Logo} alt="Logo" width={80} height={45} />
                </div>
            </div>
            <List style={{ width: '100%' }} onClick={toggleDrawer} onKeyDown={toggleDrawer}>
                <div>
                    <ListItem button onClick={handleClickHome}>
                        <ListItemText style={{ marginLeft: 13 }}>Home</ListItemText>
                    </ListItem>
                    <ListItem button onClick={handleClickAboutUs}>
                        <ListItemText style={{ marginLeft: 13 }}>About Us</ListItemText>
                    </ListItem>
                    <ListItem button onClick={handleClickProductPage}>
                        <ListItemText style={{ marginLeft: 13 }}>Product</ListItemText>
                    </ListItem>
                    <ListItem button onClick={handleClickHowToBuy}>
                        <ListItemText style={{ marginLeft: 13 }}>How To Buy</ListItemText>
                    </ListItem>
                    <ListItem button onClick={handleClickContactUs}>
                        <ListItemText style={{ marginLeft: 13 }}>Contact Us</ListItemText>
                    </ListItem>
                </div>
                {/* <div style={{ marginTop: '30%' }}>
                    <ListItem button onClick={handleClickWishlistPage}>
                        <div style={{ display: 'flex', alignItems: 'center', marginLeft: 13 }}>
                            <WhistlistIcon style={{ marginRight: 10 }} />
                            <ListItemText style={{ marginTop: 6 }}>Whislist</ListItemText>
                        </div>
                    </ListItem>
                </div> */}
            </List>
            <ListItem button onClick={goToSignInLeftDrawer}>
                <div style={{ display: 'flex', alignItems: 'center', marginLeft: 13 }}>
                    <LoginIcon style={{ marginRight: 10 }} />
                    <ListItemText style={{ marginTop: 6 }}>Sign In</ListItemText>
                </div>
            </ListItem>
            <p style={{ fontSize: 13, marginLeft: 32, marginTop: 10 }}>
                Dont have an account ?<br />
                <span onClick={GoToRegisterFromHome}>
                    <a style={{ fontSize: 13, color: 'red', textDecoration: 'underline' }}>register</a>
                </span>{' '}
                here
            </p>
        </Box>
    );

    const listWhenLogin = (
        <Box sx={{ width: 280 }} role="presentation">
            <div style={{ width: '100%' }}>
                <div style={{ width: '80%', marginLeft: 'auto', marginRight: 'auto', marginTop: 50 }}>
                    <Image src={Logo} alt="Logo" width={110} height={60} />
                </div>
            </div>
            <List style={{ width: '100%' }} onClick={toggleDrawer} onKeyDown={toggleDrawer}>
                <div>
                    <ListItem>
                        <ListItemText
                            style={{ marginLeft: 13, color: '#FF7373' }}
                        >{`Welcome ${credentials.nama}`}</ListItemText>
                    </ListItem>
                    <ListItem button onClick={handleClickHome}>
                        <ListItemText style={{ marginLeft: 13 }}>Home</ListItemText>
                    </ListItem>
                    <ListItem button onClick={handleClickAboutUs}>
                        <ListItemText style={{ marginLeft: 13 }}>About Us</ListItemText>
                    </ListItem>
                    <ListItem button onClick={handleClickProductPage}>
                        <ListItemText style={{ marginLeft: 13 }}>Product</ListItemText>
                    </ListItem>
                    <ListItem button onClick={handleClickHowToBuy}>
                        <ListItemText style={{ marginLeft: 13 }}>How To Buy</ListItemText>
                    </ListItem>
                    <ListItem button onClick={handleClickContactUs}>
                        <ListItemText style={{ marginLeft: 13 }}>Contact Us</ListItemText>
                    </ListItem>
                </div>
                <div style={{ marginTop: '30%' }}>
                    {/* <ListItem button onClick={handleClickWishlistPage}>
                        <div style={{ display: 'flex', alignItems: 'center', marginLeft: 13 }}>
                            <WhistlistIcon style={{ marginRight: 10 }} />
                            <ListItemText style={{ marginTop: 6 }}>Whislist</ListItemText>
                        </div>
                    </ListItem> */}
                    <ListItem button onClick={handleClickProfilePage}>
                        <div style={{ display: 'flex', alignItems: 'center', marginLeft: 13 }}>
                            <ProfileIcon style={{ marginRight: 10 }} />
                            <ListItemText style={{ marginTop: 6 }}>Profile</ListItemText>
                        </div>
                    </ListItem>
                </div>
            </List>
            <ListItem button>
                <div style={{ display: 'flex', alignItems: 'center', marginLeft: 13 }} onClick={klikLogout}>
                    <LogoutIcon style={{ marginRight: 10 }} />
                    <ListItemText style={{ marginTop: 6 }}>Sign Out</ListItemText>
                </div>
            </ListItem>
        </Box>
    );

    let LoginForm = (
        <Box sx={{ width: 280 }} role="presentation">
            <List>
                <ListItem className={classes.containerLogin}>
                    <p className={classes.text}>Login</p>
                </ListItem>

                <div className={classes.EmailPassword}>
                    <TextField
                        label="Email Anda"
                        size="small"
                        value={email}
                        onChange={handleChangeEmail}
                        fullWidth
                        style={{ marginBottom: 15 }}
                    />
                    {checked === true ? (
                        <TextField
                            label="Masukan Password Anda"
                            size="small"
                            type="text"
                            fullWidth
                            value={password}
                            onChange={handleChangePassword}
                            style={{ marginBottom: 15 }}
                        />
                    ) : (
                        <TextField
                            label="Masukan Password Anda"
                            size="small"
                            type="password"
                            fullWidth
                            value={password}
                            onChange={handleChangePassword}
                            style={{ marginBottom: 15 }}
                        />
                    )}
                </div>
                <div className={classes.checkbox}>
                    <Checkbox style={{ color: '#111' }} checked={checked} onChange={handleChangeChecked} />
                    <p> Show Password</p>
                </div>
                <div>
                    <p style={{ fontSize: 12, color: '#FF7373', marginLeft: 20, marginTop: 10 }}>{errors}</p>
                </div>
                {loading ? (
                    <div className={classes.loginButton}>
                        {' '}
                        <MainBlackButton className={'BlackButton'}> Loading </MainBlackButton>
                    </div>
                ) : (
                    <div className={classes.loginButton}>
                        {' '}
                        <MainBlackButton className={'BlackButton'} onClick={klikLogin}>
                            {' '}
                            LOGIN{' '}
                        </MainBlackButton>
                    </div>
                )}

                <div className={classes.textAcc}>
                    <p>
                        Dont have account ?
                        <span>
                            <a className="textColorRed" onClick={() => setRegister(true)}>
                                {' '}
                                <u>Register </u>{' '}
                            </a>
                        </span>{' '}
                    </p>
                    <p>
                        {' '}
                        Forgot Password?{' '}
                        <span>
                            <a className="textColorRed" onClick={onForgotPass}>
                                <u> Click</u>
                            </a>
                        </span>
                    </p>
                </div>
            </List>
        </Box>
    );

    let RegisterForm = (
        <Box sx={{ width: 280 }} role="presentation">
            <List>
                <ListItem className={classes.containerLogin}>
                    <p className={classes.text}>Register</p>
                </ListItem>
                <div className={classes.EmailPassword}>
                    <TextField
                        label="Nama"
                        size="small"
                        type="text"
                        value={namaUser}
                        onChange={handleChangeNamaUser}
                        fullWidth
                        style={{ marginBottom: 15 }}
                    />
                    <TextField
                        label="Alamat lengkap (Sesuai KTP)"
                        size="small"
                        type="text"
                        value={regAlamat}
                        onChange={handleChangeRegAlamat}
                        fullWidth
                        style={{ marginBottom: 15 }}
                    />
                    <TextField
                        label="No Telp"
                        size="small"
                        type="number"
                        value={regNoHandphone}
                        onChange={handleChangeRegNoHandphone}
                        fullWidth
                        style={{ marginBottom: 15 }}
                    />
                    <div style={{ marginBottom: 15 }}>
                        {/* <AutoCompleteProvince /> */}
                        <AutoCompleteProvinceLogreg />
                    </div>
                    <div style={{ marginBottom: 15 }}>
                        {/* <DropdownKabupaten /> */}
                        <DropdownKabupatenLogreg />
                    </div>
                    <div style={{ marginBottom: 15 }}>
                        <DropdownKecamatanLogreg />
                    </div>
                    <TextField
                        label="Email"
                        size="small"
                        type="text"
                        value={regEmail}
                        onChange={handleChangeRegEmail}
                        fullWidth
                        style={{ marginBottom: 15 }}
                    />
                    <TextField
                        label="Password"
                        size="small"
                        type="password"
                        value={regPassword}
                        onChange={handleChangeRegPassword}
                        fullWidth
                        style={{ marginBottom: 15 }}
                    />
                    <TextField
                        label="Confirm Password"
                        size="small"
                        type="password"
                        value={confirmPassword}
                        onChange={handleChangeConfirmPassword}
                        fullWidth
                        style={{ marginBottom: 15 }}
                    />
                </div>
                <div>
                    <p style={{ fontSize: 12, color: '#FF7373', marginLeft: 20, marginTop: 10 }}>{errors_register}</p>
                </div>

                {loading ? (
                    <div className={classes.loginButton}>
                        {' '}
                        <MainBlackButton className={'BlackButton'}> Loading </MainBlackButton>
                    </div>
                ) : (
                    <div className={classes.loginButton}>
                        {' '}
                        <MainBlackButton className={'BlackButton'} onClick={klikRegister}>
                            {' '}
                            REGISTER{' '}
                        </MainBlackButton>
                    </div>
                )}

                <div className={classes.textAcc}>
                    <p>
                        {' '}
                        Have an account ?
                        <span>
                            <a className="textColorRed" onClick={() => setRegister(false)}>
                                {' '}
                                <u>Login</u>{' '}
                            </a>
                        </span>{' '}
                    </p>
                </div>
            </List>
        </Box>
    );

    let ChangePassword = (
        <Box sx={{ width: 280 }} role="presentation">
            <List>
                <ListItem className={classes.containerChangePassword}>
                    <p className={classes.textChangePassword}>Change Password</p>
                </ListItem>
            </List>
            <div className={classes.EmailPassword}>
                <TextField
                    label="Email"
                    size="small"
                    type="text"
                    fullWidth
                    style={{ marginBottom: 15 }}
                    value={forgotPassword}
                    onChange={handleForgotPassword}
                />
            </div>
            <div>
                <p style={{ fontSize: 12, color: '#FF7373', marginLeft: 20, marginTop: 10 }}>
                    {errors_forgot_password_submit}
                </p>
            </div>
            <div className={classes.loginButton}>
                {' '}
                <MainBlackButton className={'BlackButton'} onClick={OnToForgotBox}>
                    {' '}
                    SUBMIT{' '}
                </MainBlackButton>
            </div>
            <div className={classes.textAcc}>
                <p>
                    {' '}
                    Have an account ?
                    <span>
                        <a className="textColorRed" onClick={onBackLoginRegister}>
                            {' '}
                            <u>Login</u>{' '}
                        </a>
                    </span>{' '}
                </p>
                <p>
                    {' '}
                    or
                    <span>
                        <a className="textColorRed" onClick={OnBackRegister}>
                            {' '}
                            <u>Register</u>{' '}
                        </a>
                    </span>{' '}
                </p>
            </div>
        </Box>
    );

    let BoxForgot = (
        <Box sx={{ width: 280 }} role="presentation">
            <List>
                <ListItem className={classes.containerChangePassword}>
                    <p className={classes.textChangePassword}>Change Password</p>
                </ListItem>
                <div className={classes.boxForgot}>
                    <p>Link reset password has been sent to your email. Please kindly check your email!</p>
                </div>
            </List>
        </Box>
    );

    return (
        <div>
            <React.Fragment>
                <MyIconButton onClick={toggleDrawer} tip="Menu">
                    <MenuIcon className={classes.menuIcon} />
                </MyIconButton>
                <Drawer anchor={'left'} open={isOpenDrawer} onClose={toggleDrawer}>
                    {/* {authenticated ? listWhenLogin : showSI ? (register ? RegisterForm : LoginForm) : listWhenNotLogin} */}
                    {/* {authenticated
                        ? listWhenLogin
                        : showSI
                        ? register
                            ? RegisterForm
                            : forgot
                            ? boxForgot
                                ? BoxForgot
                                : ChangePassword
                            : LoginForm
                        : listWhenNotLogin} */}

                    {authenticated
                        ? listWhenLogin
                        : showSI
                        ? forgot
                            ? ChangePassword
                            : register
                            ? RegisterForm
                            : boxForgot
                            ? BoxForgot
                            : LoginForm
                        : listWhenNotLogin}

                    {/* {authenticated
                        ? listWhenLogin
                        : showSI
                        ? register
                            ? RegisterForm
                            : forgot
                            ? ChangePassword
                            : LoginForm
                        : listWhenNotLogin} */}

                    {/* {authenticated ? listWhenLogin : page} */}
                    {/* {formLogin} */}
                </Drawer>
            </React.Fragment>
        </div>
    );
}
