import { Container, Grid } from '@mui/material';
import { Box } from '@mui/system';
import Head from 'next/head';
import Image from 'next/image';
import ProductBanner from '../../../public/assets/images/about-us.png';
import gal1 from '../../../public/assets/images/gal1.png';
import gal3 from '../../../public/assets/images/gal3.png';

import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeURL } from '../../redux/actions/urlChangeableActions';

//MaT UI
import { makeStyles } from '@mui/styles';
import HorizontalSpacer from '../../components/HorizontalSpacer';
import { setMainURL } from '../../redux/actions/urlOnHeadnavActions';

const useStyles = makeStyles((theme) => ({
    container: {
        backgroundColor: 'white'
    },
    containerImage: {
        width: '100%',
        height: 200,
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        [theme.breakpoints.down('mobile')]: {
            height: 100
        }
    },
    textHeadingWrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0
    },
    textHeading: {
        color: 'white'
    },
    imageBackground: {
        width: '100%',
        height: '100%',
        objectFit: 'cover'
    },
    containerContent: {
        width: '89%',
        marginTop: '100px',
        backgroundColor: 'white',
        [theme.breakpoints.down('mobile')]: {
            width: '90%',
            marginTop: '50px'
        }
    },
    firstGrid: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: '100px',
        [theme.breakpoints.down('mobile')]: {
            display: 'flex',
            flexDirection: 'column-reverse',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 0
        }
    },
    secondGrid: {
        marginBottom: '100px',
        [theme.breakpoints.down('mobile')]: {
            marginBottom: '60px'
        }
    },
    lastGrid: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: '100px',
        [theme.breakpoints.down('mobile')]: {
            display: 'flex',
            flexDirection: 'column-reverse',
            justifyContent: 'center',
            alignItems: 'center'
        }
    },

    firstGridImage: {
        width: '30%',
        [theme.breakpoints.down('mobile')]: {
            width: '60%',
            marginBottom: '60px'
        }
    },
    firstGridText: {
        width: '60%',
        [theme.breakpoints.down('mobile')]: {
            width: '100%',
            marginBottom: '60px',
            textAlign: 'justify'
        }
    },

    imgAbout: {
        width: '100%',
        height: '100%'
    },
    textTitle: {
        marginBottom: '20px',
        fontWeight: 'bold',
        [theme.breakpoints.down('mobile')]: {
            marginBottom: '20px',
            textAlign: 'center'
        }
    },
    textIntro: {
        lineHeight: '30px',
        textAlign: 'justify',
        [theme.breakpoints.down('mobile')]: {
            lineHeight: '30px',
            textAlign: 'left'
        }
    }
}));

const AboutUs = () => {
    const classes = useStyles();
    const router = useRouter();
    const dispatch = useDispatch();
    const currentPath = router.pathname;

    useEffect(() => {
        dispatch(changeURL(currentPath));
        dispatch(setMainURL('About Us'));
    }, [dispatch, currentPath]);

    return (
        <div className={classes.container}>
            <Head>
                <title>Tokyo Foam || About Us</title>
                <meta name="description" content="Ingin tahu tentang kami ? Kunjungi halaman about us kami" />
                <meta property="og:title" content="About Us" />
                <meta property="og:description" content="Ingin tahu tentang kami ? Kunjungi halaman about us kami" />
                <meta property="og:url" content="https://tokyofoam.com/about-us" />
            </Head>
            <div>
                <div className={classes.containerImage}>
                    <Image src={ProductBanner} alt="Our Product" layout="fill" objectFit="cover" />

                    {/* <img
                        src={'/assets/images/about-us.png'}
                        className={classes.imageBackground}
                        alt="backgroudn-image"
                    /> */}
                    <div className={classes.textHeadingWrapper}>
                        <h2 className={classes.textHeading} variant="h5" gutterbottom="true" component="div">
                            About Us
                        </h2>
                    </div>
                </div>
                <Container>
                    <Grid className={classes.containerContent} sx={{ mx: 'auto' }}>
                        <div className={classes.firstGrid}>
                            <Box className={classes.firstGridImage}>
                                <Image
                                    src={gal3}
                                    alt="Photo 3"
                                    priority="true"
                                    className={classes.imgAbout}
                                    placeholder="blur"
                                />
                            </Box>
                            <HorizontalSpacer widht={{ marginRight: '100px' }} />
                            <Box className={classes.firstGridText}>
                                <h1 className={classes.textTitle} variant="h3" gutterbottom="true" component="div">
                                    Siapa TokyoFoam ?
                                </h1>
                                <p className={classes.textIntro} mt={3}>
                                    Tokyo Foam sudah lebih dari setahun hadir dan kini kami menawarkan produk dengan
                                    kualitas premium. Tentu bukan tanpa alasan, Tokyo Foam hadir untuk memenuhi
                                    kebutuhan pasar, di mana kini banyak yang telah aware dengan kesehatan dan
                                    membutuhkan produk berkualitas dengan harga yang lebih terjangkau.
                                </p>
                            </Box>
                        </div>
                        <div className={classes.secondGrid}>
                            <p className={classes.textIntro} variant="body1" gutterbottom="true" component="div">
                                Tokyo Foam memiliki beraneka jenis bantal dan guling yang bisa kita pilih dan sesuaikan
                                dengan kebutuhan kita. Ada beberapa rekomendasi yang bisa kita beli dan coba sendiri di
                                rumah. Untuk pasangan yang ingin tidur berdampingan, bisa coba bantal couple dari Tokyo
                                Foam yang nyaman dipakai karena menggunakan bahan memory foam. Bantal couple berbentuk
                                huruf L ini memiliki desain lengkung yang bisa menyangga leher dengan baik dan desain
                                hollow yang menyisakan ruang untuk lengan. Bantal yang unik ini dibanderol dengan harga
                                Rp429.000. Selain itu, ada pula bantal countour alias bantal kesehatan yang telah
                                dirancang untuk menopang leher dan bahu dengan lebih baik. Menggunakan bahan fiber
                                silikon, bantal countour ini ekstra lembut, sirkulasi udara yang lebih baik, dan bisa
                                digunakan untuk terapi tulang leher. Cukup dengan Rp99.000 sudah mendapatkan bantal
                                jenis ini dari Tokyo Foam.
                            </p>
                        </div>
                        <div className={classes.lastGrid}>
                            <Box className={classes.firstGridText}>
                                <p className={classes.textIntro} mt={3} pr={25}>
                                    Selain itu Tokyo Foam punya koleksi bantal dan guling lainnya dengan harga mulai
                                    dari Rp60 ribuan hingga Rp400 ribuan. Kamu bisa cek di Shopee, Blibli, Lazada, dan
                                    Tokopedia. Bila kurang puas berbelanja online, bisa juga menyambangi offline store
                                    Tokyo Foam yang berlokasi di Jalan Cemara Raya, No 42E, Cibodas, Tangerang.
                                    Menariknya lagi, Tokyo Foam akan segera meluncurkan websitenya, tokyofoam.com yang
                                    juga akan dibarengi dengan aneka kejutan spesial seperti promo belanja yang sayang
                                    untuk dilewatkan.
                                </p>
                            </Box>
                            <HorizontalSpacer widht={{ marginRight: '100px' }} />
                            <Box className={classes.firstGridImage}>
                                <Image
                                    src={gal1}
                                    alt="Photo 1"
                                    priority="true"
                                    className={classes.imgAbout}
                                    placeholder="blur"
                                />
                            </Box>
                        </div>
                    </Grid>
                </Container>
            </div>
        </div>
    );
};

export default AboutUs;
