import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import NotificationListTable from '../../../components/admin-components/notification-components/NotificationListTable';
import Layout from '../../../components/adminLayout/layout/Layout';
import { useSelector } from 'react-redux';

export default function Produk() {
    const router = useRouter();
    const { credentials } = useSelector((state) => state.user);
    useEffect(() => {
        if (credentials.level_user !== 'admin') {
            alert('Anda bukan Admin!');
            router.push('/');
        } else {
            null;
        }
    }, [credentials.level_user, router]);
    return (
        <div>
            {credentials.level_user !== 'admin' ? null : (
                <Layout>
                    <NotificationListTable />
                </Layout>
            )}
        </div>
    );
}
