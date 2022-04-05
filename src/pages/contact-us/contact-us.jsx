import Head from 'next/head';
import HorizontalSpacer from '../../components/HorizontalSpacer';

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
        marginBottom: '100px',
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
        width: '60%',
        [theme.breakpoints.down('mobile')]: {
            width: '100%',
            marginBottom: '60px'
        }
    },
    innerIconContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: '9px'
    },
    icon: {
        width: 18,
        height: 18,
        marginRight: '20px'
    },
    img: {
        width: '100%',
        height: '100%'
    },
    textTitle: {
        display: 'none',
        marginBottom: '20px',
        fontWeight: 'bold',
        [theme.breakpoints.down('mobile')]: {
            display: 'block',
            marginBottom: '20px'
        }
    },
    textTitleDesktop: {
        marginBottom: '20px',
        fontWeight: 'bold',
        [theme.breakpoints.down('mobile')]: {
            display: 'none',
            marginBottom: '20px',
            textAlign: 'center'
        }
    },
    textIntro: {
        lineHeight: '30px',
        marginTop: '30px'
    }
}));

const ContactUs = () => {
    const classes = useStyles();

    const router = useRouter();
    const dispatch = useDispatch();
    const currentPath = router.pathname;

    useEffect(() => {
        dispatch(changeURL(currentPath));
        dispatch(setMainURL('Contact Us'));
    }, [dispatch, currentPath]);
    return (
        <article>
            <Head>
                <title>Tokyo Foam || Contact Us</title>
                <meta
                    name="description"
                    content="Jika ada pertanyaan mengenai produk kami, Anda dapat menghubungi email kami di tokyofoam99@gmail.com"
                />
                <meta property="og:title" content="Hubungi Kami" />
                <meta
                    property="og:description"
                    content="Jika ada pertanyaan mengenai produk kami, Anda dapat menghubungi email kami di tokyofoam99@gmail.com"
                />
                <meta property="og:url" content="https://tokyofoam.com/contact-us" />
            </Head>
            <Container>
                <Grid className={classes.container} sx={{ mx: 'auto' }}>
                    <div className={classes.contentContainer}>
                        <Box className={classes.imageContent}>
                            <h1 className={classes.textTitle} variant="h3" gutterbottom="true" component="div">
                                Hii!
                            </h1>
                            <img src={'/assets/images/contact-us.png'} className={classes.img} alt="backgroudn-image" />
                        </Box>
                        <HorizontalSpacer widht={{ marginRight: '100px' }} />
                        <Box bgcolor="red"></Box>
                        <Box className={classes.textContent}>
                            <h1 className={classes.textTitleDesktop} variant="h3" gutterbottom="true" component="div">
                                Hii!
                            </h1>
                            <p className={classes.textIntro}>
                                Jika ada pertanyaan mengenai produk kami, Anda dapat menghubungi email kami di{' '}
                                <span style={{ fontWeight: 'bold' }}>tokyofoam99@gmail.com</span> dan kami akan sesegera
                                mungkin menghubungi anda!
                            </p>
                            <p className={classes.textIntro}>
                                Anda juga dapat mengikuti lini instagram kami di{' '}
                                <span style={{ fontWeight: 'bold' }}>@tokyofoam </span> untuk info promo serta update
                                terbaru tentang produk <span style={{ fontWeight: 'bold' }}>TokyoFoam</span>!
                            </p>
                            <p className={classes.textIntro}>Informasi lebih lanjut :</p>
                            <div style={{ marginTop: '30px' }}>
                                <div className={classes.innerIconContainer}>
                                    <i className={`fas fa-phone-alt ${classes.icon}`}></i>
                                    <p>+62852 9747 9292</p>
                                </div>
                                <div className={classes.innerIconContainer}>
                                    <i className={`far fa-envelope ${classes.icon}`}></i>
                                    <p>tokyofoam99@gmail.com</p>
                                </div>
                                <div className={classes.innerIconContainer} style={{ marginTop: '18px' }}>
                                    <i className={`fab fa-instagram ${classes.icon}`}></i>
                                    <i className={`fab fa-facebook-square ${classes.icon}`}></i>
                                    <i className={`fab fa-whatsapp ${classes.icon}`}></i>
                                    <i className={`fab fa-line ${classes.icon}`}></i>
                                    <i className={`fab fa-youtube ${classes.icon}`}></i>
                                </div>
                            </div>
                        </Box>
                    </div>
                </Grid>
            </Container>
        </article>
    );
};

export default ContactUs;
