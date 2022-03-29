import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../redux/actions/userActions';
import { deepOrange } from '@mui/material/colors';
import { makeStyles } from '@mui/styles';

import { useRouter } from 'next/router';
import { setMainURL } from '../../redux/actions/urlOnHeadnavActions';

//PopOver
import Popover from '@mui/material/Popover';
import AllButtonFunctions from '../../utils/re-useable-functions/AllButtonFunctions';

const useStyles = makeStyles((theme) => ({
    mainPopOver: {
        width: 250
    }
}));

export default function Avatars() {
    const { credentials } = useSelector((state) => state.user);

    const classes = useStyles();
    const router = useRouter();
    const currentPath = router.pathname;
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClickProfilePage = (e) => {
        dispatch(setMainURL('Profile'));
        e.preventDefault();
        router.push('/profile');
        setAnchorEl(null);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const klikLogout = () => {
        // setMenuOpen(!menuOpens);
        currentPath === '/profile' ? (dispatch(logoutUser()), router.push('/')) : dispatch(logoutUser());
    };

    return (
        <>
            <Stack direction="row" spacing={2}>
                <Avatar
                    // sx={{ bgcolor: deepOrange[500], width: 20, height: 20 }}
                    sx={{ backgroundColor: '#c0e9ed', width: 28, height: 28 }}
                    aria-describedby={id}
                    variant="contained"
                    onClick={handleClick}
                    alt={credentials.nama}
                    src="."
                />
                {/* <p style={{ fontSize: 13, color: 'white' }}>1</p> */}
                {/* </Avatar> */}
            </Stack>
            <Popover
                style={{ marginTop: 14 }}
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right'
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                }}
            >
                <div className={classes.mainPopOver}>
                    <div
                        style={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            height: 40,
                            alignItems: 'flex-start',
                            paddingTop: 10,
                            paddingBottom: 10,
                            backgroundColor: '#F7F7F7'
                        }}
                    >
                        <div>
                            <p style={{ fontSize: 12, marginLeft: 10, marginBottom: 4 }}>
                                <b>Welcome</b> {credentials.nama}
                            </p>
                        </div>
                        <div style={{ display: 'flex' }}>
                            <p style={{ fontSize: 12, fontWeight: 700, marginLeft: 10, marginRight: 10 }}>
                                Member Status :
                            </p>
                            <p style={{ fontSize: 12 }}> {credentials.level_user}</p>
                        </div>
                    </div>
                    <div className="boxProfile" onClick={handleClickProfilePage}>
                        Profile
                    </div>
                    <div className="boxProfile" onClick={klikLogout}>
                        Logout
                    </div>
                </div>
            </Popover>
        </>
    );
}
