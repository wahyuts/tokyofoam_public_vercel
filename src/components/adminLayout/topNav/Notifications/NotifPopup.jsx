import React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import { Box } from '@mui/system';

const NotifPopup = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorUser, setAnchorUser] = React.useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorUser(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <Tooltip>
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <i className="bx bx-bell bx-sm"></i>
                    </IconButton>
                </Tooltip>
                <Menu
                    style={{ marginTop: 50, marginRight: 200 }}
                    anchorUser={anchorUser}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                    }}
                    open={Boolean(anchorUser)}
                    onClose={handleCloseUserMenu}
                >
                    {settings.map((setting) => (
                        <MenuItem key={setting} onClick={handleCloseUserMenu}>
                            <span style={{ textAlign: 'center' }}>{setting}</span>
                        </MenuItem>
                    ))}
                </Menu>
            </Box>
        </>
    );
};

export default NotifPopup;
