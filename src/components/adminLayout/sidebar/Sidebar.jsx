import React from 'react';
import Styles from './Sidebar.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import logo from '../../../../public/assets/images/tokyo-mini.png';
import { SidebarData } from './SidebarData';

export default function Sidebar(props) {
    const [clicked, setClicked] = React.useState(false);
    const router = useRouter();
    // const handleClick = (val) => {
    //     window.location.pathname = val.link
    // };
    const Sidebar = SidebarData.map((val, key) => {
        return (
            <li
                className={Styles.Row}
                key={key}
                onClick={() => {
                    window.location.pathname = val.link;
                }}
            >
                <div className={val.icon} id={Styles.icon} />
                <div id={Styles.title}>{val.title}</div>
            </li>
        );
    });
    // const [activeStyles, setActiveStyles] = {
    //     activeObject: null,
    // };

    // const handleClick = () => {
    //     setClicked(true);
    // };
    //     const activeItem = SidebarData.findIndex (
    //         (item) => item.link === props.location.pathname
    //     )
    //   console.log(activeItem, "active item ?");

    return (
        <div className={Styles.Sidebar}>
            <div className={Styles.SidebarLogo}>
                <Image src={logo} alt="company logo" className={Styles.LogoClick} onClick={() => router.push('/')} />
            </div>
            <div className={Styles.SidebarItem}>
                <ul className={Styles.SidebarList}>
                    {Sidebar}
                    {/* {SidebarData.map((val, key) => {
                        return (
                            <li className={Styles.Row} key={key} onClick={() => (window.location.pathname = val.link)}>
                                <div className={val.icon} id={Styles.icon} />
                                <div id={Styles.title}>{val.title}</div>
                            </li>
                        );
                    })} */}
                </ul>
            </div>
        </div>
    );
}
