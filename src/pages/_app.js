import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import '../../public/assets/css/globals.css';

//MuI Stuff
import { ThemeProvider } from '@mui/material/styles';
// import CssBaseline from '@mui/material/CssBaseline';

//Redux
import { Provider, useStore } from 'react-redux';
// import store from '../redux/store';

//Redux Persist
import { PersistGate } from 'redux-persist/integration/react';

//Import custom wrapper for persist
import { wrapper } from '../redux/store';

import GeneralLayout from '../components/general-layout';
import { useTheme } from '@mui/system';
import theme from '../utils/theme2';

function MyApp(props) {
    const store = useStore((state) => state);
    const { Component, pageProps } = props;
    const router = useRouter();
    const themes = useTheme(theme);
    const currentPath = router.pathname;
    // const token = JSON.parse(localStorage.getItem('FBIdToken'));
    // const token = localStorage.getItem('FBIdToken');

    // Remove the server-side injected CSS. (Agar Met Ui dapat bekerja di next)
    useEffect(() => {
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }

        // if (token) {
        //     const decodedToken = jwtDecode(token);
        //     console.log(decodedToken);
        // }
    }, []);

    //menyimpan token dari local strogae di variable token

    let trueComponent =
        currentPath === '/test-sign-in' ||
        currentPath === '/sign-up' ||
        currentPath === '/testing' ||
        currentPath === '/process-your-transaction' ||
        currentPath === '/pay-later' ||
        currentPath === '/success-verification-email' ||
        currentPath === '/payment-success' ||
        currentPath === '/payment-pending' ||
        currentPath === '/mobile-register-member' ||
        currentPath === '/admin-login' ||
        currentPath === '/admin' ||
        currentPath === '/admin/dashboard' ||
        currentPath === '/admin/customer' ||
        currentPath === '/admin/customer/customer-detail' ||
        currentPath === '/admin/customer/detail-ulasan' ||
        currentPath === '/admin/customer/detail-riwayat' ||
        currentPath === '/admin/pesanan' ||
        currentPath === '/admin/pesanan/rincian-pesanan' ||
        currentPath === '/admin/produk' ||
        currentPath === '/admin/notification' ||
        currentPath === '/admin/produk/EditProduct' ||
        currentPath === '/admin/produk/tambah-produk' ||
        currentPath === '/admin/profiles-settings' ||
        currentPath === '/admin/situsku' ? (
            <Component {...pageProps} />
        ) : (
            <GeneralLayout>
                <Component {...pageProps} />;
            </GeneralLayout>
        );

    return (
        <div>
            <Head>
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
            </Head>
            <ThemeProvider theme={themes}>
                {/* <Provider store={store}> */}
                <PersistGate persistor={store.__persistor} loading={null}>
                    {/* <CssBaseline /> */}
                    {trueComponent}
                </PersistGate>
                {/* </Provider> */}
            </ThemeProvider>
        </div>
    );
}

export default wrapper.withRedux(MyApp);
