import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import CircularProgress from '@mui/material/CircularProgress';
import { updateStatusPayment } from '../../redux/actions/dataProductActions';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    mainCont: {
        width: '100%',
        height: '100vh',
        backgroundColor: '#F7F7F7',
        // backgroundColor: 'red',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    divImage: {
        width: '100%',
        height: '100%',
        marginRight: 'auto',
        marginLeft: 'auto',
        marginBottom: 15,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        [theme.breakpoints.down('mobile')]: {
            width: '100%',
            height: '100%'
        }
    },
    textFont: {
        textAlign: 'center',
        [theme.breakpoints.down('mobile')]: {
            fontSize: 15,
            textAlign: 'center'
        }
    },
    cursorPointer: {
        cursor: 'pointer',
        color: 'blueviolet'
    }
}));

const PleaseWait = () => {
    const classes = useStyles();
    const router = useRouter();
    const dispatch = useDispatch();
    const { order_id } = useSelector((state) => state.orderUniq);

    useEffect(() => {
        dispatch(updateStatusPayment(order_id, router));
    }, [dispatch, order_id, router]);

    return (
        <div className={classes.mainCont}>
            <div style={{ width: '70%' }}>
                <div className={classes.divImage}>
                    <CircularProgress style={{ color: 'blue' }} />
                </div>
            </div>
        </div>
    );
};

export default PleaseWait;
