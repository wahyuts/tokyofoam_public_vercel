import Head from 'next/head';
import Image from 'next/image';

import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeURL } from '../redux/actions/urlChangeableActions';
import { setMainURL } from '../redux/actions/urlOnHeadnavActions';

import BannerHomeMain from '../../public/assets/images/BannerHomeMain.webp';
import MainBlackButton from '../utils/re-useable-components/buttons/MainBlackButton';
import AllButtonFunctions from '../utils/re-useable-functions/AllButtonFunctions';
import ReactResponsiveHook from '../utils/ReactResponsiveHook';

//MaT UI
import { makeStyles } from '@mui/styles';
import BannerPromotion from '../utils/re-useable-components/banner-promotion';
import SliderLocalSingleProduct from '../utils/re-useable-components/slider-local-single-product';
import HomeProductCardSixNewItemMobile from '../components/mobile/home-product-card-six-new-item-mobile';
import WhyChooseUs from '../components/why-choose-us';
// import BannerPromo from '../components/banner-promo';

const useStyles = makeStyles((theme) => ({
    main: {
        minHeight: '80vh'
    },
    onlyImage: {
        width: '100%',
        height: 600
    },
    groupTitle: {
        position: 'absolute',
        top: '30%',
        left: '8%',
        [theme.breakpoints.down('mobile')]: {
            top: '20%'
        },
        '& .fontAtt': {
            fontSize: 40,
            fontWeight: 600,
            [theme.breakpoints.down('mobile')]: {
                fontSize: 14
            },
            [theme.breakpoints.down('tablet')]: {
                fontSize: 20
            }
            // [theme.breakpoints.down('desktopHD')]: {
            //     fontSize: 40
            // }
        },
        '& .fontPhome': {
            fontSize: 20,
            fontWeight: 400,
            [theme.breakpoints.down('mobile')]: {
                fontSize: 8
            },
            [theme.breakpoints.down('tablet')]: {
                fontSize: 10
            }
            // [theme.breakpoints.down('desktopHD')]: {
            //     fontSize: 20
            // }
        },
        '& .divButtonBanner': {
            width: 186,
            [theme.breakpoints.down('mobile')]: {
                width: 116,
                height: 25
            },
            [theme.breakpoints.down('tablet')]: {
                width: 116,
                height: 25
            }
        }
    },
    contBannerAndWelcoming: {
        width: '100%',
        position: 'relative',
        marginBottom: 100,
        [theme.breakpoints.down('mobile')]: {
            marginBottom: 50
        },
        [theme.breakpoints.down('tablet')]: {
            marginBottom: 50
        }
    },
    contTestimonyBanner: {
        width: '100%',
        position: 'relative',
        marginBottom: 50,
        [theme.breakpoints.down('mobile')]: {
            marginBottom: 0
        },
        [theme.breakpoints.down('tablet')]: {
            marginBottom: 0
        }
    },
    testimonyText: {
        position: 'absolute',
        top: '35%',
        left: '17%',
        '& .fontTestimony': {
            fontSize: 40,
            fontWeight: 600,
            [theme.breakpoints.down('mobile')]: {
                fontSize: 14
            },
            [theme.breakpoints.down('tablet')]: {
                fontSize: 14
            }
        }
    },
    fontSubTitleOnHome: {
        fontSize: 30,
        fontWeight: 600,
        color: '#474747',
        [theme.breakpoints.down('mobile')]: {
            fontSize: 20
        },
        [theme.breakpoints.down('tablet')]: {
            fontSize: 20
        }
    },
    hrStyle: {
        border: 'none',
        marginBottom: 100,
        [theme.breakpoints.down('mobile')]: {
            marginBottom: 50
        },
        [theme.breakpoints.down('tablet')]: {
            marginBottom: 50
        }
    },
    hrStyle2: {
        border: 'none',
        marginBottom: 10,
        [theme.breakpoints.down('mobile')]: {
            marginBottom: 10
        },
        [theme.breakpoints.down('tablet')]: {
            marginBottom: 10
        }
    }
}));

export default function Home() {
    const { isMobile, isTablet, isDesktop } = ReactResponsiveHook();
    const router = useRouter();
    const dispatch = useDispatch();
    const currentPath = router.pathname;

    const classes = useStyles();
    const SLIDE_COUNT_GAL = 3;
    const slidesGal = Array.from(Array(SLIDE_COUNT_GAL).keys());
    const { handleClickProductPage } = AllButtonFunctions();

    useEffect(() => {
        dispatch(changeURL(currentPath));
        dispatch(setMainURL('Home'));
    }, [dispatch, currentPath]);

    // console.log('API ONGKIR', process.env.NEXT_PUBLIC_ONGKIR_API_KEY);
    // console.log('API ONGKIR', process.env.NEXT_PUBLIC_ONGKIR_API_KEY);

    const displayForDesktop = (
        <div>
            {/* Bagian Our Product */}
            <div style={{ width: '100%', textAlign: 'center', marginBottom: 40 }}>
                <h1 className={classes.fontSubTitleOnHome}>–—— Our Product –——</h1>
            </div>

            {/* <SliderSingleProduct slidesBundling={slidesBundling} /> */}
            <SliderLocalSingleProduct />

            <div style={{ width: 186, marginTop: 30, marginLeft: 'auto', marginRight: 'auto' }}>
                <MainBlackButton className={'BlackButton'} onClick={handleClickProductPage}>
                    All Product
                </MainBlackButton>
            </div>
            <hr style={{ border: 'none', marginBottom: 10 }} />
        </div>
    );

    return (
        <div>
            <Head>
                <title>Tokyo Foam || Home</title>
                <meta
                    name="description"
                    content="Selamat datang di Tokyofoam. Kami hadir untuk menawarkan berbagai produk pillow dan bolster
                        berkualitas tinggi untuk memenuhi kebutuhan istirahat anda."
                />
                <meta property="og:title" content="Tokyofoam store" />
                <meta
                    property="og:description"
                    content="Selamat datang di Tokyofoam. Kami hadir untuk menawarkan berbagai produk pillow dan bolster
                        berkualitas tinggi untuk memenuhi kebutuhan istirahat anda."
                />
                <meta property="og:url" content="https://tokyofoam.com/" />
                <meta property="og:type" content="website" />
            </Head>

            <div className={classes.contBannerAndWelcoming}>
                <Image
                    src={`https://res.cloudinary.com/tokyofoam-com/image/upload/v1646287188/BannerHomeMain_y7xi70.webp`}
                    // src={BannerHomeMain}
                    alt="Our Healty Pillow"
                    width={1441}
                    height={600}
                    layout="responsive"
                    objectFit="contain"
                    // placeholder="blur"
                />
                <div className={classes.groupTitle}>
                    <h1 className="fontAtt">New Arrival Collection</h1>
                    <p className="fontPhome">We care with how you rest with our product.</p>
                    <div className="divButtonBanner">
                        <MainBlackButton className={'BlackButton'} onClick={handleClickProductPage}>
                            SHOP NOW
                        </MainBlackButton>
                    </div>
                </div>
            </div>

            <article className={classes.contBannerAndWelcoming}>
                <div style={{ width: '80%', marginLeft: 'auto', marginRight: 'auto' }}>
                    <h1 style={{ marginBottom: 30, textAlign: 'center' }}>Welcome to tokyofoam</h1>
                    <p style={{ textAlign: 'center' }}>
                        Selamat datang di Tokyofoam. Kami hadir untuk menawarkan berbagai produk pillow dan bolster
                        berkualitas tinggi untuk memenuhi kebutuhan istirahat anda. Didesain untuk kenyamanan Anda,
                        produk kami menggunakan bahan-bahan pilihan seperti High quality foam, latex, microfiber serta
                        masih banyak lagi. Kami juga menwarkan banyak pilihan produk, bundling serta promo-promo menarik
                        lainnya. Jadi tunggu apa lagi, segera belanja di tokyofoam.com.
                    </p>
                </div>
            </article>

            <WhyChooseUs />

            <hr className={classes.hrStyle} />

            {isMobile ? (
                isTablet ? (
                    isDesktop ? (
                        displayForDesktop
                    ) : (
                        displayForDesktop
                    )
                ) : (
                    displayForDesktop
                )
            ) : (
                <>
                    <div style={{ width: '100%', textAlign: 'center', marginBottom: 10 }}>
                        <h1 className={classes.fontSubTitleOnHome}>–—— Our Product –——</h1>
                    </div>
                    <HomeProductCardSixNewItemMobile />
                </>
            )}

            <hr className={classes.hrStyle} />

            <div style={{ width: '100%', textAlign: 'center', marginBottom: 40 }}>
                <h1 className={classes.fontSubTitleOnHome}>–—— Our Gallery –——</h1>
            </div>

            {/**disini banner promotion ada error di log tapi masih berfungsi */}
            <BannerPromotion slidesGal={slidesGal} />

            <hr className={classes.hrStyle2} />

            {/* <div className={classes.contTestimonyBanner}>
                <Image
                    src={TestimonyBanner}
                    alt="Testimony Banner"
                    width={1440}
                    height={500}
                    layout="responsive"
                    objectFit="contain"
                />
                <div className={classes.testimonyText}>
                    <h1 className="fontTestimony">Testimony</h1>
                </div>
            </div> */}
        </div>
    );
}
