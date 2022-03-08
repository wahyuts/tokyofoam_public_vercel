import React, { useEffect } from 'react';
import Dashboard from './dashboard';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
// import { getUserData } from '../../redux/actions/userActions';
export default function Admin() {
    const router = useRouter();
    const { authenticated } = useSelector((state) => state.user);

    // const { userData } = userLogin;
    const currentPath = router.pathname;
    const { credentials } = useSelector((state) => state.user);
    useEffect(() => {
        if (credentials.level_user !== 'admin') {
            alert('Anda bukan Admin!');
            router.push('/');
        } else {
            null;
        }
    }, [credentials.level_user, router]);

    // useEffect(() => {
    //     if (!authenticated) {
    //         alert('Maaf anda bukan admin!');
    //         router.push('/');
    //     } else if (authenticated) {
    //         router.push('/admin-login');
    //     }
    // }, []);
    return (
        <div>
            {credentials.level_user === 'admin' ? <Dashboard /> : null}
            {/* {authenticated ? <Dashboard /> : <div></div>} */}
            {/* <Dashboard /> */}
            {/* <Layout>{currentPath === '/admin/dashboard' ? <Dashboard /> : null}</Layout> */}
        </div>
    );
}
