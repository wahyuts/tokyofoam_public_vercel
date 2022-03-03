import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    getAllSixDataProductBundling,
    getAllSixDataProductSingle,
    goToDetailProductPageLocal
} from '../../../redux/actions/dataProductActions';
import { setDetailProductURL, setMainURL } from '../../../redux/actions/urlOnHeadnavActions';

//MaT UI
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Image from 'next/image';
import MainBlackButton from '../../../utils/re-useable-components/buttons/MainBlackButton';
import AllButtonFunctions from '../../../utils/re-useable-functions/AllButtonFunctions';
// import { minWidth } from '@mui/system';

const useStyles = makeStyles((theme) => ({
    contentProductAndPromo: {
        width: '89%',
        // maxHeight: '60vh',
        marginLeft: 'auto',
        marginRight: 'auto'
        // backgroundColor: 'red'
    },
    contInner: {
        width: '100%',
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
    embla__slide: {
        width: '45%',
        marginBottom: 20,
        backgroundColor: '#f7f7f7'
    },
    embla__slide__inner: {
        overflow: 'hidden',
        color: '#474747',
        padding: '10%',
        // marginRight: '9%',
        fontWeight: 800
    },
    crossedPrice: {
        marginRight: theme.spacing(2),
        color: '#939393',
        textDecoration: 'line-through',
        [theme.breakpoints.down('mobile')]: {
            marginRight: theme.spacing(2),
            color: '#939393',
            textDecoration: 'line-through'
        }
    }
}));

const HomeProductCardSixNewItemMobile = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const router = useRouter();
    const { handleClickProductPage } = AllButtonFunctions();

    const [showSingleProduct, setShowSingleProduct] = React.useState(true);
    const [showBundlingProduct, setShowBundlingProduct] = React.useState(false);
    const [pages, setPages] = React.useState('productsp');

    const { dataProductSingle, dataProductBundling } = useSelector((state) => state.dataProduct);

    const handleClickProductNav = () => {
        setShowBundlingProduct(false);
        setShowSingleProduct(true);
        setPages('productsp');
    };
    const handleClickBundlingNav = () => {
        setShowSingleProduct(false);
        setShowBundlingProduct(true);
        setPages('bundling');
    };

    useEffect(() => {
        dispatch(getAllSixDataProductSingle());
        dispatch(getAllSixDataProductBundling());
    }, [dispatch]);

    const sp = showSingleProduct ? (
        <Box sx={{ width: '100%' }}>
            <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
                style={{ width: '90%', marginLeft: 'auto', marginRight: 'auto', justifyContent: 'space-between' }}
            >
                {/* {dataProduct.map((dataSP) => ( */}
                {dataProductSingle.map((single) => (
                    <div className={classes.embla__slide} key={single._id}>
                        <div
                            className={classes.embla__slide__inner}
                            onClick={() => {
                                dispatch(setMainURL('Product'));
                                dispatch(
                                    goToDetailProductPageLocal({
                                        id: single._id,
                                        product_id: single.product_id,
                                        meta_key: single.meta_key,
                                        meta_Desc: single.meta_desc,
                                        title: single.title,
                                        image: single.photo,
                                        price: single.price,
                                        promo_price: single.promo_price,
                                        material: single.material,
                                        size: {
                                            length: single.size.length,
                                            width_or_diameter: single.size.width_or_diameter
                                        },
                                        rating: single.rating,
                                        weight: single.weight,
                                        desc: single.desc
                                    })
                                );
                                dispatch(setDetailProductURL(single.title));

                                router.push(`/product-page/${single.title}`);
                            }}
                        >
                            <Image
                                src={single.photo}
                                alt="Single Product"
                                width={300}
                                height={300}
                                layout="responsive"
                                objectFit="fill"
                            />

                            <hr style={{ border: 'none', marginTop: 15 }} />
                            <p style={{ fontSize: 12 }}>{single.title}</p>
                            {single.promo_price === 0 ? (
                                <p style={{ color: '#FF7373' }}>{`IDR ${single.price}`}</p>
                            ) : (
                                <>
                                    <p className={classes.crossedPrice}>{`IDR ${single.price}`}</p>
                                    <p style={{ color: '#FF7373' }}>{`IDR ${single.promo_price}`}</p>
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </Grid>
        </Box>
    ) : null;

    const bundlingPrdocutList = showBundlingProduct ? (
        <Box sx={{ width: '100%' }}>
            <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
                style={{ width: '90%', marginLeft: 'auto', marginRight: 'auto', justifyContent: 'space-between' }}
            >
                {/* {dataProduct.map((dataSP) => ( */}
                {dataProductBundling.map((bundling) => (
                    <div className={classes.embla__slide} key={bundling._id}>
                        <div
                            className={classes.embla__slide__inner}
                            onClick={() => {
                                dispatch(setMainURL('Product'));
                                dispatch(
                                    goToDetailProductPageLocal({
                                        id: bundling._id,
                                        product_id: bundling.product_id,
                                        meta_key: bundling.meta_key,
                                        meta_Desc: bundling.meta_desc,
                                        title: bundling.title,
                                        image: bundling.photo,
                                        price: bundling.price,

                                        promo_price: bundling.promo_price,
                                        material: bundling.material,
                                        size: {
                                            length: bundling.size.length,
                                            width_or_diameter: bundling.size.width_or_diameter
                                        },
                                        rating: bundling.rating,
                                        weight: bundling.weight,
                                        desc: bundling.desc
                                    })
                                );
                                dispatch(setDetailProductURL(bundling.title));

                                router.push(`/product-page/${bundling.title}`);
                            }}
                        >
                            <Image
                                src={bundling.photo}
                                alt="Single Product"
                                width={300}
                                height={300}
                                layout="responsive"
                                objectFit="fill"
                            />

                            <hr style={{ border: 'none', marginTop: 15 }} />
                            <p style={{ fontSize: 12 }}>{bundling.title}</p>
                            {bundling.promo_price === 0 ? (
                                <p style={{ color: '#FF7373' }}>{`IDR ${bundling.price}`}</p>
                            ) : (
                                <>
                                    <p className={classes.crossedPrice}>{`IDR ${bundling.price}`}</p>
                                    <p style={{ color: '#FF7373' }}>{`IDR ${bundling.promo_price}`}</p>
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </Grid>
        </Box>
    ) : null;

    return (
        <div className={classes.contentProductAndPromo}>
            <div className={classes.contInner}>
                <div className={classes.parentOpsional}>
                    {pages === 'productsp' ? (
                        <div className={classes.tabOnClick} tabIndex="0" onClick={handleClickProductNav}>
                            <a className={classes.aButton}>Product</a>
                        </div>
                    ) : (
                        <div className="opsional" tabIndex="0" onClick={handleClickProductNav}>
                            <a className={classes.aButton}>Product</a>
                        </div>
                    )}

                    <div className="opsional" tabIndex="0" onClick={handleClickBundlingNav}>
                        <a className={classes.aButton}>Bundling</a>
                    </div>
                </div>
            </div>

            {sp}
            {bundlingPrdocutList}

            <div style={{ width: 186, marginTop: 30, marginLeft: 'auto', marginRight: 'auto' }}>
                <MainBlackButton className={'BlackButton'} onClick={handleClickProductPage}>
                    All Product
                </MainBlackButton>
            </div>
            {/* <SliderSingleProduct slidesBundling={slidesBundling} /> */}
        </div>
    );
};

export default HomeProductCardSixNewItemMobile;
