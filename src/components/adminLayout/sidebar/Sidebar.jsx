import React from 'react';
import Styles from './Sidebar.module.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faBookOpen, faCog, faHeart, faRocket, faSignOutAlt, faTachometerAlt } from '@fortawesome/free-solid-svg-icons';

import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';

import logo from '../../../../public/assets/images/tokyo-mini.png';
import sidebar_layout_items from '../../../../public/assets/JsonData/sidebar_routes.json';

export default function Sidebar() {
    const [clicked, setClicked] = React.useState(false);

    const handleClick = () => {
        setClicked(true);
    };
    return (
        <div className={Styles.Sidebar}>
            <div className={Styles.SidebarLogo}>
                {/* <img src="public/assets/images/tokyo-mini.png" alt="company logo" /> */}
                <Image src={logo} alt="company logo" className={Styles.LogoClick} />
            </div>
            <div className={Styles.SidebarItem}>
                <ul className={Styles.SidebarItemInner}>
                    <li className={`${Styles.NavLink} ${Styles.active}`}>
                        <i className="bx bxs-dashboard" />
                        <Link href="/admin/dashboard">
                            <a>Dashboard</a>
                        </Link>
                    </li>
                    <li className={`${Styles.NavLink} ${Styles.active}`}>
                        <i className="bx bx-cart"></i>
                        <Link href="/admin/pesanan">
                            <a>Pesanan</a>
                        </Link>
                    </li>
                    <li className={`${Styles.NavLink} ${Styles.active}`}>
                        <i className="bx bx-box"></i>
                        <Link href="/admin/produk">
                            <a>Produk</a>
                        </Link>
                    </li>
                    <li className={`${Styles.NavLink} ${Styles.active}`}>
                        <i className="bx bxs-box"></i>
                        <Link href="/admin/inventory">
                            <a>Inventory</a>
                        </Link>
                    </li>
                    <li className={`${Styles.NavLink} ${Styles.active}`}>
                        <i className="bx bx-user"></i>
                        <Link href="/admin/customer">
                            <a>Customer</a>
                        </Link>
                    </li>
                    <li className={`${Styles.NavLink} ${Styles.active}`}>
                        <i className="bx bx-palette"></i>
                        <Link href="/admin/warna">
                            <a>Warna</a>
                        </Link>
                    </li>
                    <li className={`${Styles.NavLink} ${Styles.active}`}>
                        <i className="bx bx-desktop"></i>
                        <Link href="/admin/situsku">
                            <a>Situsku</a>
                        </Link>
                    </li>
                    <li className={`${Styles.NavLink} ${Styles.active}`}>
                        <i className="bx bxs-report"></i>
                        <Link href="/admin/report">
                            <a>Report</a>
                        </Link>
                    </li>{' '}
                    <li className={`${Styles.NavLink} ${Styles.active}`}>
                        <i className="bx bx-cog"></i>
                        <Link href="/admin/settings">
                            <a>Settings</a>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}

// const SidebarItem = (props) => {
//     const active = props.active ? 'active' : '';

//     return (
//         <div className={Styles.SidebarItems}>
//             <div className={`${Styles.SidebarItemInner} ${active}`}>
//                 <i className={props.icon}></i>
//                 <span>{props.title}</span>
//             </div>
//         </div>
//     );
// };

// const Sidebar = () => {
//     const router = useRouter();
//     const activeItem = sidebar_layout_items.findIndex((item) => item.route);
//     return (
//         <div className={Styles.Sidebar}>
//             <Link href="#">
//                 <div className={Styles.SidebarLogo}>
//                     <Image src={logo} alt="company logo" />
//                 </div>
//             </Link>
//             {sidebar_layout_items.map((item, index) => (
//                 <Link href={item.route} key={index}>
//                     <SidebarItem title={item.display_name} icon={item.icon} active={index} />
//                 </Link>
//             ))}
//         </div>
//     );
// };
// export default Sidebar;
