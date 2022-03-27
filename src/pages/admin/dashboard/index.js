import React from 'react';
import MainDashboard from '../../../components/admin-components/dashboard-components/MainDashboard';
import Layout from '../../../components/adminLayout/layout/Layout';

export default function Dashboard() {
    return (
        <div>
            <Layout>
                <MainDashboard />
            </Layout>
        </div>
    );
}
