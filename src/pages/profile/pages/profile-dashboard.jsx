import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import { Container, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';

import MainBlackButton from '../../../utils/re-useable-components/buttons/MainBlackButton';
import CardComponent from '../component/CardOrderList';

const styles = {
    btnBoxPrimariContainer: {
        width: '140px',
        fontSize: '20px',
        fontWeight: '500',
        justifyContent: 'center'
    }
};

const useStyles = makeStyles((theme) => ({
    headContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '62px',
        width: '100%',
        marginTop: '100px',
        backgroundColor: 'white',
        '& .desktop': {
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column'
        },
        '& .username': {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center'
        },

        [theme.breakpoints.down('mobile')]: {
            display: 'flex',
            width: '100%',
            alignItems: '',
            flexDirection: 'center',
            marginBottom: '20px',
            marginTop: '20px',
            '& .desktop': {
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column'
            }
        }
    },
    mobileLabel: {
        display: 'none',
        [theme.breakpoints.down('mobile')]: {
            display: 'flex',
            alignItems: 'flex-start',
            marginTop: 55,
            marginBottom: '40px'
        }
    },
    icon: {
        width: '19px',
        height: '19px'
    },
    editIcon: {
        fontSize: '12px',
        marginLeft: '11px'
    }
}));

const postsPerPage = 3;
let arrayForHoldingPosts = [];

const Dashboard = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const router = useRouter();

    const [dataToShow, setDataToShow] = useState([]);
    const [next, setNext] = useState(3);
    const [countData, setCountData] = useState(3);

    const { credentials } = useSelector((state) => state.user);
    const { listOrderUserInUserDashboard } = useSelector((state) => state.dataProduct);

    const loopWithSlice = (start, end) => {
        const slicedPosts = listOrderUserInUserDashboard?.slice(start, end);
        arrayForHoldingPosts = [...arrayForHoldingPosts, ...slicedPosts];
        setDataToShow(arrayForHoldingPosts);
    };
    const handleShowMorePosts = () => {
        loopWithSlice(next, next + postsPerPage);
        setNext(next + postsPerPage);
        setCountData(countData + 3);
    };
    const handleClickChangePassword = () => {
        router.push('/change-password-user');
    };

    useEffect(() => {
        loopWithSlice(0, postsPerPage);
    }, []);

    useEffect(() => {}, [countData, arrayForHoldingPosts, listOrderUserInUserDashboard]);
    return (
        <article>
            <Head>
                <title>Tokyo Foam || Dashboard Profile</title>
            </Head>
            <Container>
                <Box className={classes.headContainer} sx={{ mx: 'auto' }}>
                    <div className={'desktop'}>
                        <div className={'username'}>
                            <Typography>
                                {' '}
                                Hello, <u>{credentials.nama}</u>
                            </Typography>
                            <i className={`far fa-edit ${classes.editIcon}`}></i>
                        </div>
                        <Typography mt={'10px'}>{credentials.email}</Typography>
                        <Typography
                            mt={'10px'}
                            color="#FF7373"
                            style={{ cursor: 'pointer' }}
                            onClick={handleClickChangePassword}
                        >
                            <u>Click to change password</u>
                        </Typography>
                    </div>
                </Box>
                <div className={classes.mobileLabel}>
                    <p style={{ fontSize: '18px', fontWeight: '600' }}>History</p>
                </div>
            </Container>

            <CardComponent dataToRender={listOrderUserInUserDashboard} />
            {/* <div style={{ display: 'flex', justifyContent: 'center' }}>
                {countData !== listOrderUserInUserDashboard?.length && listOrderUserInUserDashboard?.length > 3 && (
                    <MainBlackButton
                        onClick={() => handleShowMorePosts()}
                        innerContaunerStyle={styles.btnBoxPrimariContainer}
                        className="BlackButton"
                        variant="contained"
                    >
                        Load more
                    </MainBlackButton>
                )}
            </div> */}
        </article>
    );
};

export default Dashboard;
