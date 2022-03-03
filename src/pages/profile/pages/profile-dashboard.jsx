import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import { Container, Typography } from '@mui/material';
import { makeStyles, withStyles } from '@mui/styles';
import { Box } from '@mui/system';

import MainBlackButton from '../../../utils/re-useable-components/buttons/MainBlackButton';
import CardComponent from '../component/CardList';

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
        '& .mobile': {
            display: 'none'
        },
        '& .username': {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center'
        },

        [theme.breakpoints.down('mobile')]: {
            display: 'flex',
            width: '100%',
            flexDirection: 'column',
            alignItems: 'flex-start',
            marginBottom: '30px',
            marginTop: '20px',
            backgroundColor: 'white',
            '& .desktop': {
                display: 'none'
            },
            '& .mobile': {
                display: 'flex'
            }
        }
    },
    icon: {
        width: '19px',
        height: '19px'
    },
    editIcon: {
        fontSize: '12px',
        marginLeft: '11px'
    },
    btnIcon: {
        '&.MuiIconButton-root': {
            borderRadius: '0'
        },
        '&.MuiIconButton-root:hover': {
            background: 'none'
        }
    },
    dialogUploadWrapper: {
        display: 'flex',
        marginTop: '20px'
    },
    dialogIcWrapper: {
        background: '#D8D8D8',
        width: '50px',
        height: '50px',
        borderRadius: '5px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: '30px'
    },
    dialogIcCamera: {
        '&.MuiSvgIcon-root': {
            width: '35px',
            height: '35px'
        }
    },
    dialogFormWrapper: {
        marginTop: '20px',
        marginBottom: '15px'
    },
    dialogInput: {
        width: '93%',
        padding: '10px 10px',
        marginTop: '15px'
    },
    dialogBtnWrapper: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    dialogImageItem: {
        width: '18%'
    },
    dialogJNEIcon: {
        width: '28px',
        height: '14px'
    }
}));

const postsPerPage = 3;
let arrayForHoldingPosts = [];

const Dashboard = () => {
    const classes = useStyles();
    const { data_history_order } = useSelector((state) => state.data_history_order);

    const [dataToShow, setDataToShow] = useState([]);
    const [next, setNext] = useState(3);
    const [countData, setCountData] = useState(3);

    const loopWithSlice = (start, end) => {
        const slicedPosts = data_history_order?.slice(start, end);
        arrayForHoldingPosts = [...arrayForHoldingPosts, ...slicedPosts];
        setDataToShow(arrayForHoldingPosts);
    };

    useEffect(() => {
        loopWithSlice(0, postsPerPage);
    }, []);

    const handleShowMorePosts = () => {
        loopWithSlice(next, next + postsPerPage);
        setNext(next + postsPerPage);
        setCountData(countData + 3);
    };

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
                                Hello, <u>Mia Artina</u>
                            </Typography>
                            <i className={`far fa-edit ${classes.editIcon}`}></i>
                        </div>
                        <Typography mt={'22px'}>mia.artina@gmail.com</Typography>
                        <Typography mt={'22px'} color="#FF7373">
                            <u>Click to change password</u>
                        </Typography>
                    </div>
                    <div className={'mobile'}>
                        <p style={{ fontSize: '18px', fontWeight: '600' }}>History</p>
                    </div>
                </Box>
            </Container>

            <CardComponent dataToRender={dataToShow} />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                {countData !== data_history_order.length - 1 && (
                    <MainBlackButton
                        onClick={() => handleShowMorePosts()}
                        innerContaunerStyle={styles.btnBoxPrimariContainer}
                        className="BlackButton"
                        variant="contained"
                    >
                        Load more
                    </MainBlackButton>
                )}
            </div>
        </article>
    );
};

export default Dashboard;
