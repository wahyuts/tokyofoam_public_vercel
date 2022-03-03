import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@mui/styles';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';

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
    const router = useRouter();
    const handleChangeEmailAdmin = (e) => {
        setEmailAdmin(e.target.value);
    };
    const handleChangePasswordAdmin = (e) => {
        setPassowordAdmin(e.target.value);
    };
    const handleClickLogin = (e) => {
        e.preventDefault();
        router.push('/admin');
    };
    return (
        <div className={classes.ContainerAdmin}>
            <div className={classes.WrapperAdminLogin}>
                <div className={classes.FormLogin}>
                    <span className={classes.TextLogin}>Login</span>
                </div>
                <div className={classes.BoxFormLogin}>
                    <div className={classes.BoxItemLeft}>
                        <div className={classes.BoxItemEmail}>
                            <span className={classes.TextEmail}>* Email</span>
                            <input
                                className={classes.InputEmail}
                                type="text"
                                placeholder="Masukan Email"
                                style={{ paddingLeft: 20 }}
                                value={emailAdmin}
                                onChange={handleChangeEmailAdmin}
                            />
                        </div>
                        <div className={classes.BoxItemPassword}>
                            <span className={classes.TextEmail}>* Password</span>
                            <input
                                className={classes.InputEmail}
                                type="password"
                                placeholder="Masukan Password"
                                style={{ paddingLeft: 20 }}
                                value={passwordAdmin}
                                onChange={handleChangePasswordAdmin}
                            />
                        </div>
                    </div>
                    <div className={classes.WrapperButton} to="/admin">
                        <Button
                            className={classes.ButtonLogin}
                            onClick={handleClickLogin}
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
                    </div>
                </div>
            </div>
        </div>
    );
}
