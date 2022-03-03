import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PrevButton, NextButton } from '../embla-arrow-button/CarouselArrowButton';
import useEmblaCarousel from 'embla-carousel-react';
import styles from '../../../../public/assets/css/SliderBundlingProduct.module.css';
import { setDetailProductURL, setMainURL } from '../../../redux/actions/urlOnHeadnavActions';
import { getAllSixDataProductBundling, goToDetailProductPageLocal } from '../../../redux/actions/dataProductActions';
import { makeStyles } from '@mui/styles';

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

const SliderBundlingProduct = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const router = useRouter();
    const [viewportRef, embla] = useEmblaCarousel({
        loop: true,
        slidesToScroll: 1,
        skipSnaps: false,
        align: 'start',
        containScroll: 'true'

        // slidesToScroll: 4,
        // skipSnaps: false
    });
    const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
    const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
    const { dataProductBundling } = useSelector((state) => state.dataProduct);

    const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla]);
    const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla]);
    const onSelect = useCallback(() => {
        if (!embla) return;
        setPrevBtnEnabled(embla.canScrollPrev());
        setNextBtnEnabled(embla.canScrollNext());
    }, [embla]);

    useEffect(() => {
        // dispatch(getAllDataProductBundling());
        dispatch(getAllSixDataProductBundling());
    }, [dispatch]);

    useEffect(() => {
        if (!embla) return;
        embla.on('select', onSelect);
        onSelect();
    }, [embla, onSelect]);
    return (
        <div className={styles.embla}>
            <div className={styles.embla__viewport} ref={viewportRef}>
                <div className={styles.embla__container}>
                    {dataProductBundling.map((bundling) => (
                        <div
                            className={styles.embla__slide}
                            key={bundling._id}
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
                            <div className={styles.embla__slide__inner}>
                                <Image
                                    className={styles.embla__slide__img}
                                    src={bundling.photo}
                                    alt="Bundling product."
                                    width={300}
                                    height={300}
                                    layout="responsive"
                                    objectFit="fill"
                                />
                                <hr style={{ border: 'none', marginTop: 15 }} />
                                <p>{bundling.title}</p>
                                {bundling.promo_price === 0 ? (
                                    <div style={{ display: 'flex' }}>
                                        <div>
                                            <p style={{ color: '#FF7373' }}>{`IDR ${bundling.price}`}</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div style={{ display: 'flex' }}>
                                        <div>
                                            <p className={classes.crossedPrice}>{`IDR ${bundling.price}`}</p>
                                        </div>
                                        <p style={{ color: '#FF7373' }}>{`IDR ${bundling.promo_price}`}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
            <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
        </div>
    );
};

export default SliderBundlingProduct;
