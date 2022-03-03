import React from 'react';
import CustomerDetailComponent from '../../../../components/admin-components/customer-components/CustomerDetailComponent';
import Layout from '../../../../components/adminLayout/layout/Layout';

export default function CustomerDetail() {
    return (
        <div>
            <Layout>
                <CustomerDetailComponent />
            </Layout>
        </div>
    );
}
