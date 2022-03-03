import React from 'react';
import Layout from '../../components/adminLayout/layout/Layout';
import Dashboard from './dashboard';
import { useRouter } from 'next/router';
import Pesnanan from './pesanan';

export default function Admin() {
    const router = useRouter();

    const currentPath = router.pathname;

    return (
        <div>
            <Dashboard />
            {/* <Layout>{currentPath === '/admin/dashboard' ? <Dashboard /> : null}</Layout> */}
        </div>
    );
}
