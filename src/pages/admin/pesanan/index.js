import * as React from 'react';
import { useSelector } from 'react-redux';
import Layout from '../../../components/adminLayout/layout/Layout';
import Pesanan from './pesanan';
import RincianPesanan from './rincian-pesanan';

export default function Pesnanan() {
    const { pesanan } = useSelector((state) => state.uiPesanan);
    return (
        <div>
            <Layout>{pesanan === 'listPesanan' ? <Pesanan /> : <RincianPesanan />}</Layout>
        </div>
    );
}
