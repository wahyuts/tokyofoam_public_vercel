import React, { useEffect } from 'react';
import Styles from './Layout.module.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar';
import { useDispatch } from 'react-redux';

import Topbar from '../topNav/Topbar';
import { getAllDataProduct } from '../../../redux/actions/dataProductActions';
import Appbar from '../appBar/Appbar';
// import RoutesLink from '../../RoutesLink';
export default function Layout({ children }) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllDataProduct());
    }, [dispatch]);

    return (
        <div className={Styles.Layout}>
            <Sidebar />
            {/* <SidebarNew /> */}
            <div className={Styles.LayoutContent}>
                <Topbar />
                {/* <Appbar /> */}
                <div className={Styles.LayoutContentMain}>{children}</div>
            </div>
        </div>
    );
}
