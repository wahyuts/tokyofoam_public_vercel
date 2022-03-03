import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { makeStyles } from '@mui/styles';
import MainBlackButton from '../../utils/re-useable-components/buttons/MainBlackButton';
import { useDispatch, useSelector } from 'react-redux';

// MUI stuff
import { TextField } from '@mui/material';
import { setMainURL } from '../../redux/actions/urlOnHeadnavActions';

import { resetPassword } from '../../redux/actions/userActions';

const useStyles = makeStyles((theme) => ({
    resetContainer: {},
    container: {
        width: '80%',
        margin: '100px auto 100px auto',
        [theme.breakpoints.down('mobile')]: {
            width: '100%',
            marginTop: theme.spacing(2)
        }
    },
    boxInsideContainer: {
        width: '90%',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    resetBox: {
        display: 'flex',
        alignItems: 'center',
        [theme.breakpoints.down('mobile')]: {
            display: 'block'
        }
    },
    textField: {
        [theme.breakpoints.down('mobile')]: {
            marginTop: theme.spacing(4),
            marginBottom: theme.spacing(1)
        }
    },
    buttonResetPassword: {
        [theme.breakpoints.down('mobile')]: {
            marginTop: theme.spacing(3),
            marginBottom: theme.spacing(10)
        },
        [theme.breakpoints.up('mobile')]: {
            width: '30%'
        }
    },
    textResetConfirm: {
        [theme.breakpoints.down('mobile')]: {
            fontSize: 12,
            fontWeight: 400,
            fontStyle: 'normal'
        }
    },
    boxReset: {
        marginRight: theme.spacing(6),
        [theme.breakpoints.down('mobile')]: {
            marginRight: 0,
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6)
        },
        [theme.breakpoints.up('mobile')]: {
            width: '40%'
        }
    },
    boxConfirm: {
        marginRight: theme.spacing(6),
        [theme.breakpoints.down('mobile')]: {
            marginRight: theme.spacing(0),
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6)
        },
        [theme.breakpoints.up('mobile')]: {
            width: '40%'
        }
    },
    boxText: {},
    textReset: {
        fontSize: 35,
        fontWeight: 600,
        [theme.breakpoints.down('mobile')]: {
            fontSize: 18,
            paddingBottom: theme.spacing(4)
        }
    }
}));

export default function ResetPassword() {
    const [changePassword, setChangePassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { loading, errors } = useSelector((state) => state.UI);
    const { password } = useSelector((state) => state.formLoginData);
    const classes = useStyles();
    const dispatch = useDispatch();
    const router = useRouter();
    const tokenData = localStorage.getItem('ResetToken');

    useEffect(() => {
        if (!tokenData) {
            alert('Anda belum mengakses lupa password!');
            router.push('/');
        }

        dispatch(setMainURL('Reset Password'));
    }, [dispatch, tokenData, router]);

    const handleChangePassword = (e) => {
        e.preventDefault();
        if (changePassword !== confirmPassword) {
            alert('Password harus sama');
        } else if (changePassword === '' && confirmPassword === '') {
            alert('Form password tidak boleh kosong');
        } else {
            const userData = {
                reset_password: changePassword,
                confirm_reset_password: confirmPassword
            };
            dispatch(resetPassword(userData, router));
            // alert('Password berhasil diubah');
            // router.push('/');
        }
    };
    return (
        <div className={classes.resetContainer}>
            <article>
                <Head>
                    <title>Tokyo Foam || Reset Password</title>
                </Head>
                {/* <p>Reset Password</p> */}
            </article>
            <div className={classes.container}>
                <div className={classes.boxInsideContainer}>
                    <div className={classes.boxText}>
                        <h1 className={classes.textReset}>Reset Password</h1>
                    </div>

                    <div className={classes.resetBox}>
                        {/* <div className={classes.resetPassword}> */}
                        <div className={classes.boxReset}>
                            <p className={classes.textResetConfirm}>*Reset Password </p>
                            <TextField
                                placeholder="Reset Password"
                                size="small"
                                type="password"
                                fullWidth
                                value={changePassword}
                                onChange={(e) => setChangePassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className={classes.boxConfirm}>
                            <p className={classes.textResetConfirm}>*Confirm Reset Password</p>
                            <TextField
                                placeholder="Confirm Reset Password"
                                size="small"
                                type="password"
                                fullWidth
                                vaue={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                        {/* </div> */}
                    </div>
                    <div className={classes.buttonResetPassword}>
                        {loading ? (
                            <MainBlackButton className={'BlackButton'}> Loading </MainBlackButton>
                        ) : (
                            <MainBlackButton className={'BlackButton'} onClick={handleChangePassword}>
                                {' '}
                                Save New Password{' '}
                            </MainBlackButton>
                        )}
                        {/* <MainBlackButton className="BlackButton" type="submit">
                            {' '}
                            Save New Password{' '}
                        </MainBlackButton> */}
                    </div>
                </div>
            </div>
        </div>
    );
}
