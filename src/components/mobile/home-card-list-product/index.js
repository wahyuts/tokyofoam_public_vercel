import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDataProduct, goToDetailProductPage } from '../../../redux/actions/dataProductActions';
import { setDetailProductURL, setMainURL } from '../../../redux/actions/urlOnHeadnavActions';
import { DataSingleProductByIndex } from '../../../data-local/DataSingleProduct';

//MaT UI
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
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
                border: '2px solid black',
                borderRadius: 20,
                color: '#AAC6DB'
            },
            '&:active': {
                border: '2px solid black',
                borderRadius: 20,
                color: '#AAC6DB'
            },
            '&:focus': {
                border: '2px solid black',
                borderRadius: 20,
                color: '#AAC6DB'
            }
        },
        '& :last-child': {
            marginRight: 0
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
        marginRight: '9%',
        fontWeight: 800
    }
}));

const HomeCardListProduct = ({ slides }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const router = useRouter();
    const [showSingleProduct, setShowSingleProduct] = React.useState(true);
    const [showBundlingProduct, setShowBundlingProduct] = React.useState(false);
    const { dataProduct } = useSelector((state) => state.dataProduct);

    const handleClickProductNav = () => {
        setShowBundlingProduct(false);
        setShowSingleProduct(true);
    };
    const handleClickBundlingNav = () => {
        setShowSingleProduct(false);
        setShowBundlingProduct(true);
    };

    useEffect(() => {
        dispatch(getAllDataProduct());
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
                {dataProduct.map((dataSP) => (
                    <div className={classes.embla__slide} key={dataSP.id}>
                        <div
                            className={classes.embla__slide__inner}
                            onClick={() => {
                                dispatch(setMainURL('Product'));
                                dispatch(goToDetailProductPage(dataSP.title));
                                dispatch(setDetailProductURL(dataSP.title));

                                router.push(`/product-page/${dataSP.title}`);
                            }}
                        >
                            <div
                                style={{
                                    width: '89%',
                                    height: 130,
                                    backgroundColor: 'orangered',
                                    padding: '12%'
                                }}
                            >
                                <img
                                    src={dataSP.image}
                                    alt="Single Product"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            </div>

                            <hr style={{ border: 'none', marginTop: 15 }} />
                            <p style={{ fontSize: 12 }}>{dataSP.title}</p>
                            <p style={{ fontSize: 12 }}>{dataSP.price}</p>
                        </div>
                    </div>
                ))}
            </Grid>
        </Box>
    ) : null;

    const bundlingPrdocutList = showBundlingProduct ? <div>Bundling Product</div> : null;

    return (
        <div className={classes.contentProductAndPromo}>
            <div className={classes.contInner}>
                <div className={classes.parentOpsional}>
                    <div className="opsional" onClick={handleClickProductNav}>
                        <a className={classes.aButton}>Product</a>
                    </div>

                    <div className="opsional" onClick={handleClickBundlingNav}>
                        <a className={classes.aButton}>Bundling</a>
                    </div>
                </div>
            </div>

            {sp}
            {bundlingPrdocutList}
            {/* <SliderSingleProduct slidesBundling={slidesBundling} /> */}
        </div>
    );
};

export default HomeCardListProduct;
