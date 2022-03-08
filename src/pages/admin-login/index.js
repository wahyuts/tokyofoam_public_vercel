import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@mui/styles';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import { adminLogin, loginUser } from '../../redux/actions/userActions';
import { settingEmail, settingPassword } from '../../redux/actions/formLoginActions';
import CircularProgress from '@mui/material/CircularProgress';

const useStyles = makeStyles((theme) => ({
    ContainerAdmin: {
        width: '100%',
        height: '100vh',
        margin: 0,
        padding: 0,
        position: 'relative',
        display: 'flex',
        justifyContent: 'flex-start',
        paddingTop: 200
    },
    WrapperAdminLogin: {
        paddingLeft: 202,
        paddingRight: 202,
        width: '100%'
    },
    FormLogin: {
        width: '100%'
    },
    TextLogin: {
        fontSize: 35,
        fontWeight: 500,
        color: '#474747'
    },
    BoxFormLogin: {
        width: '100%',
        paddingTop: 35
    },
    BoxItemLeft: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    BoxItemEmail: {
        display: 'flex',
        flexDirection: 'column',
        rowGap: 15
    },
    TextEmail: {
        fontSize: 20,
        fontWeight: 400,
        color: '#474747'
    },
    InputEmail: {
        width: 450,
        height: 40,
        border: '1px solid #474747',
        borderRadius: 4,
        padingLeft: '25px'
    },
    BoxItemPassword: {
        display: 'flex',
        flexDirection: 'column',
        rowGap: 15
    },
    WrapperButton: {
        paddingTop: 40
    }
}));

export default function AdminLogin() {
    const classes = useStyles();
    const [emailAdmin, setEmailAdmin] = useState('');
    const [passwordAdmin, setPassowordAdmin] = useState('');
    const { loading } = useSelector((state) => state.UI);
    const { email, password } = useSelector((state) => state.formLoginData);
    const router = useRouter();
    const dispatch = useDispatch();

    // useEffect(() => {
    //     if()
    // })

    //onChange Buat Login
    const handleChangeEmail = (e) => {
        dispatch(settingEmail(e.target.value));
        // setEmail(e.target.value);
    };

    const handleChangePassword = (e) => {
        dispatch(settingPassword(e.target.value));
        // setPassword(e.target.value);
    };

    // const handleChangeEmailAdmin = (e) => {
    //     setEmailAdmin(e.target.value);
    // };

    // const handleChangePasswordAdmin = (e) => {
    //     setPassowordAdmin(e.target.value);
    // };

    const handleSubmitLogin = (e) => {
        e.preventDefault();
        const userData = {
            email: email,
            password: password
        };
        dispatch(adminLogin(userData, router));
    };

    return (
        <div className={classes.ContainerAdmin}>
            <div className={classes.WrapperAdminLogin}>
                <div className={classes.FormLogin}>
                    <span className={classes.TextLogin}>Login</span>
                </div>
                <form className={classes.BoxFormLogin} onSubmit={handleSubmitLogin}>
                    <div className={classes.BoxItemLeft}>
                        <div className={classes.BoxItemEmail}>
                            <span className={classes.TextEmail}>* Email</span>
                            <input
                                className={classes.InputEmail}
                                type="text"
                                placeholder="Masukan Email"
                                style={{ paddingLeft: 20 }}
                                value={email}
                                onChange={handleChangeEmail}
                            />
                        </div>
                        <div className={classes.BoxItemPassword}>
                            <span className={classes.TextEmail}>* Password</span>
                            <input
                                className={classes.InputEmail}
                                type="password"
                                placeholder="Masukan Password"
                                style={{ paddingLeft: 20 }}
                                value={password}
                                onChange={handleChangePassword}
                            />
                        </div>
                    </div>
                    <div className={classes.WrapperButton} to="/admin">
                        {loading ? (
                            <Button
                                className={classes.ButtonLogin}
                                style={{
                                    width: 304,
                                    height: 40,
                                    backgroundColor: '#2c2c2c',
                                    borderRadius: 5,
                                    textTransform: 'none'
                                }}
                            >
                                <span style={{ fontSize: 20, fontWeight: 500, color: 'white' }}>Loading</span>
                            </Button>
                        ) : (
                            <Button
                                type="submit"
                                className={classes.ButtonLogin}
                                style={{
                                    width: 304,
                                    height: 40,
                                    backgroundColor: '#2c2c2c',
                                    borderRadius: 5,
                                    textTransform: 'none'
                                }}
                            >
                                <span style={{ fontSize: 20, fontWeight: 500, color: 'white' }}>Login</span>
                            </Button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}
