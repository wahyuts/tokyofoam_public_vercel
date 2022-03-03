import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@mui/styles';
import {
    getAllDataProductBundling,
    getAllProductBundlingByPage,
    getAllSixDataProductSingle,
    goToDetailProductPageLocal
} from '../../redux/actions/dataProductActions';
import { setDetailProductURL, setMainURL } from '../../redux/actions/urlOnHeadnavActions';
import MainBlackButton from '../../utils/re-useable-components/buttons/MainBlackButton';

const useStyles = makeStyles((theme) => ({
    crossedPrice: {
        marginRight: theme.spacing(2),
        color: '#939393',
        textDecoration: 'line-through',
        [theme.breakpoints.down('mobile')]: {
            marginRight: theme.spacing(2),
            color: '#939393',
            textDecoration: 'line-through'
        }
    },
    contFullCard: {
        position: 'relative',
        minWidth: '22%',
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 20,
        /* background-color: rgba(138, 189, 44, 0.3); */
        backgroundColor: '#f7f7f7'
    },
    contInnerCard: {
        position: 'relative',
        overflow: 'hidden',
        color: '#474747',
        /* width: 100%; */
        padding: '10%',
        /* margin-right: 9%; */
        /* background-color: blue; */
        fontWeight: 800
    },
    fontSizeP: {
        fontSize: 15
    }
}));

const CardlistProductBundling = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const router = useRouter();
    const [numberPages, setNumberPages] = React.useState(0);
    const { dataProductBundlingByPage, dataSemuaProductBundling } = useSelector((state) => state.dataProduct);
    // console.log('NUMBER PAGE', numberPages);

    useEffect(() => {
        // dispatch(getAllSixDataProductSingle());
        dispatch(getAllDataProductBundling());
        dispatch(getAllProductBundlingByPage(numberPages));
    }, [dispatch, numberPages]);

    const totalSemuaProductBundling = dataSemuaProductBundling.length;
    const totalPages = Math.round(totalSemuaProductBundling / 4);

    // console.log('TOTAL PAGES Bundling', totalPages);

    // const handleIncrementPage = () => {
    //     if (dataProductBundlingByPage.length <= 3) {
    //         setNumberPages(0);
    //     } else {
    //         setNumberPages((prevCount) => prevCount + 1);
    //     }
    // };

    const handleIncrementPage = () => {
        if (numberPages >= totalPages - 1) {
            setNumberPages(0);
        } else {
            setNumberPages((prevCount) => prevCount + 1);
        }
    };

    const buttonSeeMoreDesktop = (
        <div style={{ width: 186, marginTop: 30, marginLeft: 'auto', marginRight: 'auto' }}>
            <MainBlackButton className={'BlackButton'} onClick={handleIncrementPage}>
                See More
            </MainBlackButton>
        </div>
    );

    let theCard = dataProductBundlingByPage.map((single, i) => (
        <div className={classes.contFullCard} key={i}>
            <div
                className={classes.contInnerCard}
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
                {/* <div style={{ minHeight: 200, width: '100%' }}> */}
                <Image
                    src={single.photo}
                    alt="Single Product"
                    width={300}
                    height={300}
                    priority="true"
                    layout="responsive"
                    objectFit="fill"
                />
                {/* </div> */}

                <hr style={{ border: 'none', marginTop: 15 }} />
                <p className={`${classes.fontSizeP}`}>{single.title}</p>
                {single.promo_price === 0 ? (
                    <div style={{ display: 'flex' }}>
                        <div>
                            <p
                                style={{ color: '#FF7373' }}
                                className={`${classes.fontSizeP}`}
                            >{`IDR ${single.price}`}</p>
                        </div>
                    </div>
                ) : (
                    <div style={{ display: 'flex' }}>
                        <div>
                            <p className={`${classes.crossedPrice} ${classes.fontSizeP}`}>{`IDR ${single.price}`}</p>
                        </div>
                        <p
                            style={{ color: '#FF7373' }}
                            className={`${classes.fontSizeP}`}
                        >{`IDR ${single.promo_price}`}</p>
                    </div>
                )}
                {/* <div style={{ display: 'flex' }}>
                    <div>
                        <p className={`${classes.crossedPrice} ${classes.fontSizeP}`}>{`IDR ${single.price}`}</p>
                    </div>
                    <p style={{ color: '#FF7373' }} className={`${classes.fontSizeP}`}>{`IDR ${single.promo_price}`}</p>
                </div> */}
            </div>
        </div>
    ));

    return (
        <div>
            <div
                style={{
                    width: '100%',
                    // minHeight: 500,
                    // backgroundColor: 'red',
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    marginLeft: 'auto',
                    marginRight: 'auto'
                }}
            >
                {theCard}
            </div>
            {buttonSeeMoreDesktop}
        </div>
    );
};

export default CardlistProductBundling;
