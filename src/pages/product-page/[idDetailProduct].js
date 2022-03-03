import Head from 'next/head';
import ReactResponsiveHook from '../../utils/ReactResponsiveHook';

//MaT UI
import { makeStyles } from '@mui/styles';

import ContentProductLayout from '../../components/content-product-layout';
import ShortDescriptionReview from '../../components/short-description-review';
import CardPrice from '../../components/card-price';

import AllButtonFunctions from '../../utils/re-useable-functions/AllButtonFunctions';
import MainBlackButton from '../../utils/re-useable-components/buttons/MainBlackButton';
import SliderLocalSingleProduct from '../../utils/re-useable-components/slider-local-single-product';
import HomeProductCardSixNewItemMobile from '../../components/mobile/home-product-card-six-new-item-mobile';
import SliderBundlingProduct from '../../utils/re-useable-components/slider-bundling-product';

const useStyles = makeStyles((theme) => ({
    main: {
        minHeight: '100vh'
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
    youMayAlsoLikeMobile: {
        width: '100%',
        textAlign: 'center',
        marginBottom: 40,
        [theme.breakpoints.down('mobile')]: {
            marginBottom: 10
        }
    }
}));

const DetailProductPage = () => {
    const classes = useStyles();
    const { isMobile, isTablet, isDesktop } = ReactResponsiveHook();
    const { handleClickProductPage } = AllButtonFunctions();

    let displayGalleryDesktop = (
        <div>
            <div style={{ width: '100%', textAlign: 'center', marginBottom: 40 }}>
                <h1 className={classes.fontSubTitleOnHome}>–—— You May Also Like –——</h1>
            </div>

            {/* <SliderLocalSingleProduct /> */}
            <SliderBundlingProduct />

            <div style={{ width: 186, marginTop: 30, marginLeft: 'auto', marginRight: 'auto' }}>
                <MainBlackButton className={'BlackButton'} onClick={handleClickProductPage}>
                    All Product
                </MainBlackButton>
            </div>
        </div>
    );

    let displayGalleryMobile = (
        <div>
            <div className={classes.youMayAlsoLikeMobile}>
                <h1 className={classes.fontSubTitleOnHome}>–—— You May Also Like –——</h1>
            </div>

            <HomeProductCardSixNewItemMobile />

            {/* <div style={{ width: 186, marginTop: 30, marginLeft: 'auto', marginRight: 'auto' }}>
                <MainBlackButton className={'BlackButton'} onClick={handleClickProductPage}>
                    All Product
                </MainBlackButton>
            </div> */}
        </div>
    );

    return (
        <div className={classes.main}>
            <Head>
                <title>Tokyo Foam || Detail Product</title>
            </Head>

            <ContentProductLayout>
                <CardPrice />
            </ContentProductLayout>

            {/* <ShortDescriptionReview /> */}

            <hr style={{ border: 'none', marginBottom: 100 }} />

            {isMobile
                ? isTablet
                    ? isDesktop
                        ? displayGalleryDesktop
                        : displayGalleryDesktop
                    : displayGalleryDesktop
                : displayGalleryMobile}

            <hr style={{ border: 'none', marginBottom: 100 }} />
        </div>
    );
};

export default DetailProductPage;
