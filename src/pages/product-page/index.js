import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeURL } from '../../redux/actions/urlChangeableActions';
import ReactResponsiveHook from '../../utils/ReactResponsiveHook';
import ProductBanner from '../../../public/assets/images/about-us.png';

//MaT UI
import { makeStyles } from '@mui/styles';
import SliderLocalSingleProduct from '../../utils/re-useable-components/slider-local-single-product';
import BannerPromotion from '../../utils/re-useable-components/banner-promotion';
import SliderBundlingProduct from '../../utils/re-useable-components/slider-bundling-product';
import HomeCardListProductLocal from '../../components/mobile/home-card-list-product-local';
import VideoProduct from '../../components/video-product';
import { setMainURL } from '../../redux/actions/urlOnHeadnavActions';
import CardlistProductSingle from '../../components/cardlist-product-single';
import CardlistProductBundling from '../../components/cardlist-product-bundling';
// import { setHttpAgentOptions } from 'next/dist/server/config';

const useStyles = makeStyles((theme) => ({
    main: {
        // minHeight: '80vh',
        backgroundColor: '#ffffff'
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
    contentProductAndPromo: {
        width: '89%',
        minHeight: '70vh',
        marginLeft: 'auto',
        marginRight: 'auto'
        // backgroundColor: 'red'
    },
    contInner: {
        width: '100%',
        marginTop: 10,
        marginBottom: 10,
        [theme.breakpoints.down('mobile')]: {
            width: '100%'
        }
    },
    parentOpsional: {
        width: '40%',
        height: 80,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
        // backgroundColor: 'blue',
        '& .opsional': {
            // border: '1px solid white',
            // borderRadius: 20,
            width: 130,
            paddingLeft: 20,
            paddingRight: 20,
            marginRight: 30,
            display: 'flex',
            justifyContent: 'center',
            cursor: 'pointer',
            [theme.breakpoints.down('mobile')]: {
                width: 90,
                paddingLeft: 10,
                paddingRight: 10
            },
            '&:hover': {
                // border: '2px solid black',
                // borderRadius: 20,
                color: '#AAC6DB'
            },
            '&:active': {
                border: '2px solid black',
                borderRadius: 20,
                color: '#AAC6DB'
            },
            '&:focus': {
                border: '2px solid #7DB3E2',
                borderRadius: 20,
                color: '#AAC6DB'
            }
        },
        '& :last-child': {
            marginRight: 0
        }
    },
    tabOnClick: {
        width: 130,
        paddingLeft: 20,
        paddingRight: 20,
        marginRight: 30,
        display: 'flex',
        justifyContent: 'center',
        cursor: 'pointer',
        border: '2px solid #7DB3E2',
        borderRadius: 20,
        color: '#AAC6DB',
        [theme.breakpoints.down('mobile')]: {
            width: 90,
            paddingLeft: 10,
            paddingRight: 10
        }
    },
    aButton: {
        display: 'block',
        width: 80,
        textAlign: 'center',
        [theme.breakpoints.down('mobile')]: {
            fontSize: 13,
            width: 70
        }
    },
    textContent: {
        width: '89%',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    onlyBckColor: {
        backgroundColor: '#F9F9F9',
        paddingTop: 50,
        paddingBottom: 50
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
    },
    spaceBottom: {
        border: 'none',
        marginBottom: 100,
        [theme.breakpoints.down('mobile')]: {
            marginBottom: 40
        }
    },
    spaceBottom2: {
        border: 'none',
        marginBottom: 100
    },
    [theme.breakpoints.down('mobile')]: {
        marginBottom: 40
    }
}));

const CatalogProductPage = ({ ninjas }) => {
    const { isMobile, isTablet, isDesktop } = ReactResponsiveHook();
    const classes = useStyles();

    const router = useRouter();
    const dispatch = useDispatch();
    const currentPath = router.pathname;

    const [pages, setPages] = React.useState('productsp');

    const SLIDE_COUNT_GAL = 3;
    const slidesGal = Array.from(Array(SLIDE_COUNT_GAL).keys());

    useEffect(() => {
        dispatch(changeURL(currentPath));
        dispatch(setMainURL('Product'));
    }, [dispatch, currentPath]);

    // console.log('coba test', pages);

    const sp = pages === 'productsp' ? <CardlistProductSingle /> : null;

    // const sp = pages === 'productsp' ? <SliderLocalSingleProduct /> : null;

    const bundlingPrdocutList = pages === 'bundling' ? <CardlistProductBundling /> : null;

    let displayProductForDesktop = (
        <div className={classes.contentProductAndPromo}>
            <div className={classes.contInner}>
                <div className={classes.parentOpsional}>
                    {pages === 'productsp' ? (
                        <div
                            tabIndex="0"
                            className={classes.tabOnClick}
                            onClick={() => {
                                setPages('productsp');
                            }}
                        >
                            <a className={classes.aButton}>Product</a>
                        </div>
                    ) : (
                        <div
                            tabIndex="0"
                            className="opsional"
                            onClick={() => {
                                setPages('productsp');
                            }}
                        >
                            <a className={classes.aButton}>Product</a>
                        </div>
                    )}

                    {pages === 'bundling' ? (
                        <div
                            tabIndex="0"
                            className={classes.tabOnClick}
                            onClick={() => {
                                setPages('bundling');
                            }}
                        >
                            <a className={classes.aButton}>Bundling</a>
                        </div>
                    ) : (
                        <div
                            tabIndex="0"
                            className="opsional"
                            onClick={() => {
                                setPages('bundling');
                            }}
                        >
                            <a className={classes.aButton}>Bundling</a>
                        </div>
                    )}
                </div>
            </div>

            {sp}
            {bundlingPrdocutList}
        </div>
    );

    return (
        <div className={classes.main}>
            <Head>
                <title>Tokyo Foam || Catalog Product</title>
                <meta
                    name="description"
                    content="Waktu tidur adalah waktu yang paling signifikan untuk memperbaiki metabolisme tubuh, dan
                            sangat berperan penting dalam kesehatan."
                />
                <meta property="og:title" content="Catalog Product" />
                <meta
                    property="og:description"
                    content="Waktu tidur adalah waktu yang paling signifikan untuk memperbaiki metabolisme tubuh, dan
                            sangat berperan penting dalam kesehatan."
                />
                <meta property="og:url" content="https://tokyofoam.com/product-page" />
            </Head>

            <div>
                <div className={classes.containerImage}>
                    <Image
                        src={ProductBanner}
                        alt="Our Product"
                        priority="true"
                        // width={1441}
                        // height={200}
                        layout="fill"
                        objectFit="cover"
                    />
                    <div className={classes.textHeadingWrapper}>
                        <h2 className={classes.textHeading} variant="h5" gutterbottom="true" component="div">
                            Our Product
                        </h2>
                    </div>
                </div>

                {isMobile ? (
                    isTablet ? (
                        isDesktop ? (
                            displayProductForDesktop
                        ) : (
                            displayProductForDesktop
                        )
                    ) : (
                        displayProductForDesktop
                    )
                ) : (
                    // untuk tampilan sementara
                    // <HomeCardListProduct />

                    <HomeCardListProductLocal />
                )}

                {
                    // div sliderLocalSingleProduct dibawah ini cuma untuk ngakalin doang agar empty space slider di page lain ilang
                    // selebihnya kita gak pake slider
                    <div style={{ display: 'none' }}>
                        <SliderLocalSingleProduct />
                    </div>
                }

                <hr className={classes.spaceBottom} />

                <div className={classes.onlyBckColor}>
                    <div className={classes.textContent}>
                        <h1 className={classes.textTitleDesktop} variant="h3" gutterbottom="true" component="div">
                            Benefits
                        </h1>
                        <div>
                            <VideoProduct />
                        </div>
                        <p className={classes.textIntro}>
                            Waktu tidur adalah waktu yang paling signifikan untuk memperbaiki metabolisme tubuh, dan
                            sangat berperan penting dalam kesehatan. Akan tetapi banyak orang yang menghadapi masalah
                            tidur sehingga akhirnya mengganggu kesehatan. Apakah anda salah satu yang mengalaminya ?
                        </p>
                        <p className={classes.textIntro}>
                            Kini anda tidak perlu khawatir. Tokyofoam hadir dengan menawarkan produk bantal kesehatan
                            dengan kualitas tinggi. Semua produk tokyofoam menggunakan 100% berbahan memory foam yang
                            nyaman dan lembut. Selain itu kami juga menyediakan bahan - bahan lainnya seperti latex dan
                            microfiber yang tidak kalah kualitasnya.
                        </p>
                        <p className={classes.textIntro}>Keunggulan produk tokyofoam lainnya adalah :</p>
                        <p>- Desain bantal ergonomis mengikuti lekuk tubuh</p>
                        <p>- Anti jamur, debu dan tungau dan aman buat penderita alergi</p>
                        <p>- Awet dan tahan lama</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CatalogProductPage;
