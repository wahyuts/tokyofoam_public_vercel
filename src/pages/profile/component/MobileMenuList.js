import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { useDispatch, useSelector } from 'react-redux';
import { setProfile } from '../../../redux/actions/urlOnProfileButtonTabAction';
import { SET_PROFILE_LOGOUT } from '../../../types';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';

function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.substr(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

function stringAvatar(name) {
    return {
        sx: {
            bgcolor: stringToColor(name)
        },
        // children: `${name?.split(' ')[0][0]}${name?.split(' ')[1]?[0] ? name?.split(' ')[1][0] : ''}
        children: `${name?.split(' ')[0][0]}`
    };
}

export default function AccountMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const { tab_menu_list } = useSelector((state) => state.url_profile);
    const { credentials } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <React.Fragment>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Tooltip title="Account settings">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Avatar {...stringAvatar(credentials?.nama ? credentials?.nama : 'user')} />
                    </IconButton>
                </Tooltip>
                <DoubleArrowIcon />
                <p style={{ marginLeft: 10, color: 'orange' }}>Klik Avatar For Menu</p>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={() => {
                    handleClose();
                }}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0
                        }
                    }
                }}
                // transformOrigin={{ horizontal: 'left', vertical: 'top' }}
                // anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                {tab_menu_list.map((item) => (
                    <MenuItem key={item.label} onClick={() => dispatch(setProfile(item.label))}>
                        {`${item.label}`}
                    </MenuItem>
                ))}
                <MenuItem onClick={() => dispatch(setProfile(SET_PROFILE_LOGOUT))}>{`${SET_PROFILE_LOGOUT}`}</MenuItem>
            </Menu>
        </React.Fragment>
    );
}
