import * as React from 'react';
import Stack from '@mui/material/Stack';
import { useDispatch, useSelector } from 'react-redux';
import { deepOrange, orange } from '@mui/material/colors';
import { makeStyles } from '@mui/styles';

import { useRouter } from 'next/router';
import { setMainURL } from '../../redux/actions/urlOnHeadnavActions';

//PopOver
import Popover from '@mui/material/Popover';
import AllButtonFunctions from '../../utils/re-useable-functions/AllButtonFunctions';
import MyIconButton from '../../utils/re-useable-components/buttons/MyIconButton';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useEffect } from 'react';
import { Hidden } from '@mui/material';
import Scroll from '../../utils/re-useable-components/scroll';

const useStyles = makeStyles((theme) => ({
    mainPopOver: {
        width: 250,
        minHeight: 100,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    mainPopOverShowNotif: {
        width: 350,
        Height: 180,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
        // paddingTop: 10,
        // paddingBottom: 10
    },
    innerDivContNoNotif: {
        width: '80%',
        // backgroundColor: 'orange',
        minHeight: 80,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    innerDivContNotif: {
        width: '100%',
        // backgroundColor: 'orange',
        Height: 200,
        marginLeft: 'auto',
        marginRight: 'auto',
        overflowX: 'hidden',
        '& .eachDivNotif': {
            width: '95%',
            minHeight: 30,
            paddingTop: 10,
            paddingBottom: 10,
            paddingLeft: 10,
            paddingRight: 10,
            borderBottom: '1px dotted green'
        }
    }
}));

export default function MyNotification() {
    const classes = useStyles();
    const router = useRouter();
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const { all_notifications } = useSelector((state) => state.theNotifications);
    const reverseNotif = all_notifications.reverse();
    console.log('rerer', reverseNotif);

    // const handleClickProfilePage = (e) => {
    //     dispatch(setMainURL('Profile'));
    //     e.preventDefault();
    //     router.push('/profile');
    //     setAnchorEl(null);
    // };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    let emptyNotification = (
        <>
            <div className={classes.mainPopOver}>
                <div className={classes.innerDivContNoNotif}>
                    <p style={{ fontSize: 15, color: 'red' }}>Belum ada notifikasi</p>
                </div>
            </div>
        </>
    );

    let showAllNotification = (
        <>
            <div className={classes.mainPopOverShowNotif}>
                <div className={classes.innerDivContNotif}>
                    <Scroll>
                        {reverseNotif.map((notify, i) => {
                            return (
                                <div key={i} className="eachDivNotif">
                                    {/* <p style={{ fontSize: 15, color: 'green' }}>{notify.note}</p> */}
                                    <p style={{ fontSize: 12, color: 'RED' }}>
                                        {`Promo baru ! ${notify.nama_product} sekarang Hanya seharga ${notify.promo_price}! Yuk buruan beli`}
                                        <br />
                                        {`Berlaku mulai ${notify.tanggal_start_promo} s/d ${notify.tanggal_end_promo}`}
                                    </p>
                                </div>
                            );
                        })}
                        {/* <p style={{ fontSize: 15, color: 'red' }}>Ada notifikasi</p> */}
                    </Scroll>
                </div>
            </div>
        </>
    );

    return (
        <>
            <Stack direction="row" spacing={2}>
                <MyIconButton tip="Notification" onClick={handleClick}>
                    <NotificationsIcon color="#545454" />
                </MyIconButton>
            </Stack>
            <Popover
                style={{ marginTop: 8 }}
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center'
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                }}
            >
                {all_notifications.length === 0 ? emptyNotification : showAllNotification}
                {/* <div className={classes.innerDivContNoNotif}>
                        <p style={{ fontSize: 15, color: 'red' }}>Belum ada notifikasi</p>
                    </div> */}
            </Popover>
        </>
    );
}
