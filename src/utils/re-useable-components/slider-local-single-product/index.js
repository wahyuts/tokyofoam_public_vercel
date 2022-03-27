import Image from 'next/image';
import { useRouter } from 'next/router';

import React, { useState, useEffect, useCallback } from 'react';
import { getAllSixDataProductSingle, goToDetailProductPageLocal } from '../../../redux/actions/dataProductActions';
import { setDetailProductURL, setMainURL } from '../../../redux/actions/urlOnHeadnavActions';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@mui/styles';

import { PrevButton, NextButton } from '../embla-arrow-button/CarouselArrowButton';
import useEmblaCarousel from 'embla-carousel-react';
import styles from '../../../../public/assets/css/SliderSingleProduct.module.css';
import NoSSR from '../../NoSSR';

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
    }
}));
// const SliderSingleProduct = ({ slidesBundling }) => {
//SliderLocalSingleProduct
const SliderLocalSingleProduct = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const router = useRouter();
    const { dataProductSingle } = useSelector((state) => state.dataProduct);
    const { show_URL_Main } = useSelector((state) => state.url);

    // console.log('data all product', dataProduct);
    const [viewportRef, embla] = useEmblaCarousel({
        loop: true,
        slidesToScroll: 1,
        skipSnaps: false,
        align: 'start'
        // containScroll: 'true'
        // slidesToScroll: 4,
        // skipSnaps: false
    });
    const [prevBtnEnabled, setPrevBtnEnabled] = useState(true);
    const [nextBtnEnabled, setNextBtnEnabled] = useState(true);

    const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla]);
    const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla]);
    const onSelect = useCallback(() => {
        if (!embla) return;
        setPrevBtnEnabled(embla.canScrollPrev());
        setNextBtnEnabled(embla.canScrollNext());
    }, [embla]);

    useEffect(() => {
        dispatch(getAllSixDataProductSingle());

        if (!embla) return;
        embla.on('select', onSelect);
        onSelect();
    }, [embla, onSelect, dispatch]);

    const singleProduct2 =
        // <div className={styles.embla__container}>
        dataProductSingle?.map((single, i) => (
            <div className={styles.embla__slide} key={i}>
                <div
                    className={styles.embla__slide__inner}
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
                        priority="true"
                        layout="responsive"
                        objectFit="fill"
                    />

                    <hr style={{ border: 'none', marginTop: 15 }} />
                    <p>{single.title}</p>
                    {single.promo_price === 0 ? (
                        <div style={{ display: 'flex' }}>
                            <div>
                                <p style={{ color: '#FF7373' }}>{`IDR ${single.price}`}</p>
                            </div>
                        </div>
                    ) : (
                        <div style={{ display: 'flex' }}>
                            <div>
                                <p className={classes.crossedPrice}>{`IDR ${single.price}`}</p>
                            </div>
                            <p style={{ color: '#FF7373' }}>{`IDR ${single.promo_price}`}</p>
                        </div>
                    )}
                </div>
            </div>
        ));
    // </div>

    const Loading = (
        <div className={styles.loadingStyle}>
            <p>Loading ...</p>
        </div>
    );

    return (
        <NoSSR>
            <div className={styles.embla}>
                <div className={styles.embla__viewport} ref={viewportRef}>
                    <div className={styles.embla__container}>
                        {dataProductSingle.length === 0 ? Loading : singleProduct2}
                        {/* <div className={styles.embla__container}>{dataProduct.length === 0 ? Loading : singleProduct}</div> */}
                    </div>
                </div>

                <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
                <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
            </div>
        </NoSSR>
    );
};

export default SliderLocalSingleProduct;
