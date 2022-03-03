import { StylesContext } from '@mui/styles';
import React from 'react';
import Styles from './Topbar.module.css';
import Image from 'next/image';
import Dropdown from '../../../utils/re-useable-components/admin-components/dropdown/Dropdown';
import avatar_logo from '../../../../public/assets/images/avatar-admin.png';
import Link from 'next/link';
// dummy data
let NOTIFICATIONS = [
    [
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
    ]
];

const renderNotificationsItem = (item, index) => (
    <div className={Styles.NotificationItem} key={index}>
        <i className={item.icon}></i>
        <span>{item.content}</span>
    </div>
);

const renderUserToggle = (user) => (
    <div className="topnav__right-user">
        <div className="topnav__right-user__image">
            <img src={user.image} alt="" />
        </div>
        <div className="topnav__right-user_name">
            <span className="topnav__right-user_name-main">
                <i className="bx bx-cog"></i>
            </span>
            {/* <span className="topnav__right-user_name-sub">{user.position}</span> */}
        </div>
    </div>
);

const renderUserMenu = (item, index) => (
    <Link to="/" key={index}>
        <div className="notification-item">
            <i className={item.icon}></i>
            <span>{item.content}</span>
        </div>
    </Link>
);

export default function Topbar() {
    return (
        <div className={Styles.TopNav}>
            <div className={Styles.TopNavSearch}>
                <input type="text" placeholder="Search" />
                <i className="bx bx-search"></i>
            </div>
            <div className={Styles.WrapperTopNavRight}>
                <div className={Styles.DropdownBell}>
                    {/* <i className="bx bx-bell bx-sm"></i> */}
                    <Dropdown
                        icon="bx bx-bell bx-sm"
                        badge="12"
                        contentData={NOTIFICATIONS}
                        renderItems={(item, index) => renderNotificationsItem(item, index)}
                        // renderFooter={() => <Link to="/">View All</Link>}
                    />
                </div>
                <div className={Styles.DropdownBlueCog}>
                    <Image src={avatar_logo} alt="Avatar" className={Styles.LogoAvatar} />
                    <i className="bx bx-cog bx-sm" style={{ color: 'white' }}></i>
                </div>
            </div>
        </div>
    );
}
