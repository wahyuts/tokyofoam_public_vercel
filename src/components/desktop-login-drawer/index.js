import AllButtonFunctions from '../../utils/re-useable-functions/AllButtonFunctions';
import MyIconButton from '../../utils/re-useable-components/buttons/MyIconButton';
import { makeStyles } from '@mui/styles';
import { Drawer, List, ListItemText, ListItem, Box, TextField, Button } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import ClearIcon from '@mui/icons-material/Clear';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { loginUserTrial } from '../../redux/actions/userActions';
import {
    loginUser,
    signupUser,
    clearError,
    clearErrorRegister,
    setLocProvinceLogreg,
    addKotaLogreg,
    addKecamatanLogreg,
    addIdKotaLogreg,
    changePassword
} from '../../redux/actions/userActions';

//Icon
import MainBlackButton from '../../utils/re-useable-components/buttons/MainBlackButton';
import DropdownKabupaten from '../../utils/re-useable-components/dropdown/dropdown-kabupaten';
import AutoCompleteProvince from '../../utils/re-useable-components/dropdown/AutoComplete-Province';
import AutoCompleteProvinceLogreg from '../../utils/re-useable-components/dropdown-log-reg/AutoComplete-Province-Logreg';
import DropdownKabupatenLogreg from '../../utils/re-useable-components/dropdown-log-reg/dropdown-kabupaten-logreg';
import DropdownKecamatanLogreg from '../../utils/re-useable-components/dropdown-log-reg/dropdown-kecamatan-logreg';
import { settingEmail, settingPassword } from '../../redux/actions/formLoginActions';

const useStyles = makeStyles((theme) => ({
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
        width: '88%',
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

const DesktopLoginDrawer = ({ menuOpens, setMenuOpen }) => {
    const { loading, errors, errors_register } = useSelector((state) => state.UI);
    const { locationProvinceLogreg, stateKotaLogreg, stateKecamatanLogreg } = useSelector((state) => state.user);
    const { email, password } = useSelector((state) => state.formLoginData);

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

    // setKeranjang(arr_bag);

    const dispatch = useDispatch();

    //Buat logic true false di komponen drawer (bukan componen)
    const [register, setRegister] = useState(false);
    const [forgot, setForgot] = useState(false);
    const [boxForgot, setBoxForgot] = useState(false);
    const [showBoxEmailVerification, setShowBoxEmailVerification] = useState(false);

    //Buat login
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    //Buat Register
    const [namaUser, setNamaUser] = useState('');
    const [regEmail, setRegEmail] = useState('');
    const [regPassword, setRegPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [regAlamat, setRegAlamat] = useState('');
    const [regNoHandphone, setRegNoHandphone] = useState('');

    // Buat forgot password
    const [forgotPassword, setForgotPassword] = useState('');

    //onChange Buat Login
    const handleChangeEmail = (e) => {
        dispatch(settingEmail(e.target.value));
        // setEmail(e.target.value);
    };

    const handleChangePassword = (e) => {
        dispatch(settingPassword(e.target.value));
        // setPassword(e.target.value);
    };

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

    // onchange buat forgot password
    const handleForgotPassword = (e) => {
        setForgotPassword(e.target.value);
    };

    //******************************************** */

    // console.log('register', register);
    // console.log('forgot', forgot);

    const onForgotPass = () => {
        setForgot(true);
        setRegister(true);
    };

    const onBackLoginRegister = () => {
        setForgot(false);
        setRegister(false);
    };

    const OnBackRegister = () => {
        setShowBoxEmailVerification(false);
        setForgot(false);
        setRegister(true);
    };

    const OnToEmailVerification = () => {
        // setRegister(false);
        setShowBoxEmailVerification(true);
    };

    const OnToForgotBox = () => {
        setRegister(false);
        setForgot(false);
        setBoxForgot(true);
    };

    const ClickIconClose = () => {
        setMenuOpen(!menuOpens);
        setRegister(false);
        setForgot(false);
        setBoxForgot(false);
        // Clear Errors
        dispatch(clearError());
        dispatch(clearErrorRegister());
        //Clear form login
        dispatch(settingEmail(''));
        dispatch(settingPassword(''));
        // setEmail('');
        // setPassword('');
        //Clear form signup
        setNamaUser('');
        setRegAlamat('');
        setRegEmail('');
        setRegPassword('');
        setConfirmPassword('');
        setRegNoHandphone('');
        dispatch(setLocProvinceLogreg(''));
        dispatch(addKotaLogreg(''));
        dispatch(addKecamatanLogreg(''));
        dispatch(addIdKotaLogreg(''));
    };

    const onRegisterClick = () => {
        setShowBoxEmailVerification(false);
        setRegister(true);
    };

    const onForgorClick = () => {
        setForgot(true);
    };
    const classes = useStyles();

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const { handleClickSignIn } = AllButtonFunctions();

    const klikLogin = () => {
        const userData = {
            email: email,
            password: password
        };

        // setMenuOpen(false); // ini ud dikirim ke loginUser function
        // fungsi pengubah authenticated jadi true sudah ada di loginUser
        dispatch(loginUser(userData, setMenuOpen, keranjang));
    };

    const klikRegister = () => {
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
        dispatch(signupUser(userData, setShowBoxEmailVerification));
    };

    // function change password
    const klikForgotPassword = (e) => {
        e.preventDefault();
        const userData = {
            email: forgotPassword
        };
        dispatch(changePassword(userData, setShowBoxEmailVerification, setRegister, setForgot, setBoxForgot));
    };

    let LoginForm = (
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
                <TextField
                    label="Masukan Password Anda"
                    size="small"
                    type="password"
                    value={password}
                    onChange={handleChangePassword}
                    fullWidth
                    style={{ marginBottom: 15 }}
                />
            </div>

            <div className={classes.checkbox}>
                <Checkbox style={{ color: '#111' }} />
                <p> Remember Me</p>
            </div>
            <div>
                <p style={{ fontSize: 15, color: '#FF7373', marginLeft: 20, marginTop: 10 }}>{errors}</p>
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
                        <a className="textColorRed" onClick={onRegisterClick}>
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
    );

    let RegisterForm = (
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
                    label="Alamat"
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
                <p style={{ fontSize: 15, color: '#FF7373', marginLeft: 20, marginTop: 10 }}>{errors_register}</p>
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

            {/* <div className={classes.loginButton}>
                {' '}
                <MainBlackButton className={'BlackButton'} onClick={klikRegister}>
                    {' '}
                    REGISTER{' '}
                </MainBlackButton>
            </div> */}
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
    );

    let ChangePassword = (
        <form onSubmit={klikForgotPassword}>
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
            <div className={classes.loginButton}>
                {loading ? (
                    <div className={classes.loginButton}>
                        {' '}
                        <MainBlackButton className={'BlackButton'}> Loading </MainBlackButton>
                    </div>
                ) : (
                    <div className={classes.loginButton}>
                        {' '}
                        <Button
                            style={{
                                backgroundColor: '#2C2C2C',
                                color: '#FFFFFF',
                                width: '100%',
                                fontWeight: 600,
                                textTransform: 'none',
                                marginTop: 15,
                                borderRadius: 5
                            }}
                            type="submit"
                        >
                            Submit
                        </Button>
                        {/* <MainBlackButton className={'BlackButton'}> SUBMIT </MainBlackButton> */}
                    </div>
                )}
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
        </form>
    );

    // let ChangePassword = (
    //     <div>
    //         <List>
    //             <ListItem className={classes.containerChangePassword}>
    //                 <p className={classes.textChangePassword}>Change Password</p>
    //             </ListItem>
    //         </List>
    //         <div className={classes.EmailPassword}>
    //             <TextField label="Email" size="small" type="text" fullWidth style={{ marginBottom: 15 }} />
    //         </div>
    //         <div className={classes.loginButton}>
    //             {' '}
    //             <MainBlackButton className={'BlackButton'} onClick={OnToForgotBox}>
    //                 {' '}
    //                 SUBMIT{' '}
    //             </MainBlackButton>
    //         </div>
    //         <div className={classes.textAcc}>
    //             <p>
    //                 {' '}
    //                 Have an account ?
    //                 <span>
    //                     <a className="textColorRed" onClick={onBackLoginRegister}>
    //                         {' '}
    //                         <u>Login</u>{' '}
    //                     </a>
    //                 </span>{' '}
    //             </p>
    //             <p>
    //                 {' '}
    //                 or
    //                 <span>
    //                     <a className="textColorRed" onClick={OnBackRegister}>
    //                         {' '}
    //                         <u>Register</u>{' '}
    //                     </a>
    //                 </span>{' '}
    //             </p>
    //         </div>
    //     </div>
    // );

    let BoxEmailVerification = (
        <div>
            <List>
                <ListItem className={classes.containerChangePassword}>
                    <p className={classes.ChangePassword}>Change Password</p>
                </ListItem>
                <div className={classes.boxForgot}>
                    <p>Link email verification has been sent to your email. Please kindly check your email!</p>
                </div>
            </List>
        </div>
    );

    let BoxForgot = (
        <div>
            <List>
                <ListItem className={classes.containerChangePassword}>
                    <p className={classes.ChangePassword}>Change Password</p>
                </ListItem>
                <div className={classes.boxForgot}>
                    <p>Link reset password has been sent to your email. Please kindly check your email!</p>
                </div>
            </List>
        </div>
    );

    return (
        <div>
            <Drawer anchor="right" open={menuOpens}>
                <Box sx={{ width: 350 }} role="presentation" className={classes.box}>
                    {/* {forgot ? ChangePassword : register ? RegisterForm : boxForgot ? BoxForgot : LoginForm} */}
                    {forgot
                        ? ChangePassword
                        : register
                        ? showBoxEmailVerification
                            ? BoxEmailVerification
                            : RegisterForm
                        : boxForgot
                        ? BoxForgot
                        : LoginForm}

                    <ClearIcon onClick={ClickIconClose} className={classes.icon} />
                </Box>
            </Drawer>
        </div>
    );
};

export default DesktopLoginDrawer;
