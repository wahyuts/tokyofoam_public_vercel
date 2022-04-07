import React, { useEffect } from 'react';
import Styles from './Topbar.module.css';
import Image from 'next/image';
import avatar_logo from '../../../../public/assets/images/avatar-admin.png';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import {
    Avatar,
    Badge,
    Container,
    IconButton,
    Menu,
    MenuItem,
    Popover,
    Stack,
    Tooltip,
    Typography
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { logoutUser } from '../../../redux/actions/userActions';

// dummy data
const dataNotif = [
    {
        icon: 'bx bx-error',
        content: 'lorem ipsum dolor '
    },
    {
        icon: 'bx bx-package',
        content: 'This is just dummy '
    },
    {
        icon: 'bx bx-cart',
        content: 'dummy message'
    },
    {
        icon: 'bx bx-error',
        content: 'another dummy message'
    },
    {
        icon: 'bx bx-cart',
        content: 'this one too '
    }
];

const dataLogout = [
    {
        icon: 'bx bx-cog bx-sm',
        content: 'Account Settings',
        link: '/admin-account-settings'
    },
    {
        icon: 'bx bx-log-out-circle bx-rotate-180',
        content: 'Logout'
    }
];

export default function Topbar() {
    const { credentials, authenticated } = useSelector((state) => state.user);
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorUser, setAnchorUser] = React.useState(null);
    const [anchorLogout, setAnchorLogout] = React.useState(null);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const token = localStorage.getItem('blogToken');
    const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
    const isMenuOpen = Boolean(anchorEl);
    const Logout = dataLogout;
    const handleOpenUserMenu = (event) => {
        setAnchorUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorUser(null);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleOpenLogoutMenu = (event) => {
        setAnchorLogout(event.currentTarget);
    };
    const handleCloseLogout = () => {
        setAnchorLogout(null);
    };
    const handleMenuCloseLogout = () => {
        setAnchorLogout(null);
    };

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };
    const router = useRouter();
    const dispatch = useDispatch();
    const handleClickSettings = () => {
        router.push('/admin/account-settings');
    };
    const handleClickLogout = () => {
        dispatch(logoutUser());
        router.push('/');
    };

    const renderMenu = (
        <Menu
            sx={{ mt: '45px' }}
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
            }}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            {/* {
                dataNotif.map((setting, index) => (
                    <div style={{ display:" flex" , flexDirection: 'column', backgroundColor: 'blue'}}>
                        <i className={setting.icon}></i>
                        <span>{setting.content}</span>
                    </div>
                ))
            } */}
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        </Menu>
    );
    useEffect(() => {}, [credentials.nama]);
    return (
        <div className={Styles.TopNav}>
            {/* <div className={Styles.TopNavSearch}>
                <input type="text" placeholder="Search" />
                <i className="bx bx-search"></i>
            </div> */}
            <div className={Styles.WrapperTopNavRight}>
                {/* <div className={Styles.DropdownBell}>
                    <Tooltip title="">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            <Badge badgeContent={17} color="error">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                    </Tooltip>
                    <Menu
                        sx={{ mt: '45px' }}
                        id="menu-appbar"
                        anchorEl={anchorUser}
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
                        {dataNotif.map((setting, el) => {
                            return (
                                <div key={el} className={Styles.NotificationItem}>
                                    <i className={setting.icon}></i>
                                    <span>{setting.content}</span>
                                </div>
                            );
                        })}
                    </Menu>
                </div> */}
                <div className={Styles.DropdownBlueCog}>
                    {authenticated ? (
                        <Avatar src={credentials.nama} alt={credentials.nama} className={Styles.LogoAvatar} />
                    ) : (
                        <Image src={avatar_logo} alt="Avatar" className={Styles.LogoAvatar} />
                    )}
                    <Tooltip title="">
                        <IconButton onClick={handleOpenLogoutMenu} sx={{ p: 0 }}>
                            <i className="bx bx-cog bx-sm" style={{ color: 'white' }}></i>
                        </IconButton>
                    </Tooltip>
                    <Menu
                        sx={{ mt: '45px' }}
                        id="menu-appbar"
                        anchorEl={anchorLogout}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right'
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right'
                        }}
                        open={Boolean(anchorLogout)}
                        onClose={handleCloseLogout}
                    >
                        {/* <div className={Styles.NotificationItem}>
                            <i className="bx bx-cog bx-sm"></i>
                            <span>Account Settings</span>
                            <i className="bx bx-log-out-circle bx-rotate-180"></i>
                            <span>Logout</span>
                        </div> */}
                        <MenuItem onClick={() => {}}>
                            <i
                                className="bx bx-cog bx-sm"
                                style={{ fontSize: 16, color: '#898989', marginRight: 20 }}
                            ></i>
                            <span style={{ fontSize: 16, font: 'Poppins', color: '#898989' }}>Profile Settings</span>
                        </MenuItem>
                        <MenuItem onClick={handleClickLogout}>
                            <i
                                className="bx bx-log-out-circle bx-rotate-180"
                                style={{ fontSize: 24, color: '#898989', marginRight: 20 }}
                            ></i>
                            <span style={{ fontSize: 16, font: 'Poppins', color: '#898989' }}>Logout</span>
                        </MenuItem>
                    </Menu>
                    {/* <Image src={avatar_logo} alt="Avatar" className={Styles.LogoAvatar} />
                    <i className="bx bx-cog bx-sm" style={{ color: 'white' }}></i> */}
                </div>
                {/* {renderMenu} */}
            </div>
        </div>
    );
}
