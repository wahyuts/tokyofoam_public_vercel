import * as React from 'react';
// import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import Layout from '../../../components/adminLayout/layout/Layout';
import Pesanan from './pesanan';
import RincianPesanan from './rincian-pesanan';

export default function Pesnanan() {
    const router = useRouter();
    const { credentials } = useSelector((state) => state.user);
    const { pesanan } = useSelector((state) => state.uiPesanan);
    React.useEffect(() => {
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
                <Layout>{pesanan === 'listPesanan' ? <Pesanan /> : <RincianPesanan />}</Layout>
            )}
        </div>
    );
}
