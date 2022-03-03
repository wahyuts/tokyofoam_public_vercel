import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeURL } from '../../redux/actions/urlChangeableActions';

//MaT UI
import { makeStyles } from '@mui/styles';
import { Container, Grid } from '@mui/material';
import { Box } from '@mui/system';
import { setMainURL } from '../../redux/actions/urlOnHeadnavActions';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignSelf: 'center',
        width: '89%',
        marginTop: '100px',
        backgroundColor: 'white',
        [theme.breakpoints.down('mobile')]: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '90%',
            marginTop: '50px'
        }
    },
    contentContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: '50px',
        [theme.breakpoints.down('mobile')]: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 0
        }
    },
    imageContent: {
        width: '30%',
        [theme.breakpoints.down('mobile')]: {
            width: '100%',
            height: '90%',
            marginBottom: '60px'
        }
    },
    textContent: {
        width: '89%',
        [theme.breakpoints.down('mobile')]: {
            width: '100%',
            marginBottom: '60px'
        }
    },
    img: {
        width: '100%',
        height: '100%'
    },
    textTitleDesktop: {
        marginBottom: '20px',
        fontWeight: 'bold',
        [theme.breakpoints.down('mobile')]: {
            // display: 'none',
            marginBottom: '20px',
            textAlign: 'center'
        }
    },
    textIntro: {
        lineHeight: '30px',
        marginTop: '30px'
    }
}));

const HowToBuy = () => {
    const classes = useStyles();

    const router = useRouter();
    const dispatch = useDispatch();
    const currentPath = router.pathname;

    useEffect(() => {
        dispatch(changeURL(currentPath));
        dispatch(setMainURL('How To Buy'));
    }, [dispatch, currentPath]);

    return (
        <article>
            <Head>
                <title>Tokyo Foam || How To Buy</title>
                <meta name="description" content="Halaman ini masih dalam pengembangan" />
                <meta property="og:title" content="How To Buy" />
                <meta property="og:description" content="Halaman ini masih dalam pengembangan" />
                <meta property="og:url" content="https://tokyofoam.com/how-to-buy" />
            </Head>
            <Container>
                <Grid className={classes.container} sx={{ mx: 'auto' }}>
                    <div className={classes.contentContainer}>
                        <Box className={classes.textContent}>
                            <h1 className={classes.textTitleDesktop} variant="h3" gutterbottom="true" component="div">
                                How To Buy
                            </h1>
                            <p className={classes.textIntro}>Halaman ini masih dalam pengembangan</p>
                            <p>
                                Untuk mengetahui bagaimana cara melakukan transaksi pembelian silahkan hub contact
                                person kami
                            </p>
                            <p className={classes.textIntro}>
                                Info terbaru lebih lanjut cek lini instagram kami di @tokyofoam
                            </p>
                        </Box>
                    </div>
                </Grid>
            </Container>
        </article>
    );
};

export default HowToBuy;
