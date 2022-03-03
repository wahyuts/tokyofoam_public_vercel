import Image from 'next/image';
import { useRouter } from 'next/router';

import React, { useState, useEffect, useCallback } from 'react';
import { getAllDataProduct, goToDetailProductPage } from '../../../redux/actions/dataProductActions';
import { setDetailProductURL, setMainURL } from '../../../redux/actions/urlOnHeadnavActions';
import { useDispatch, useSelector } from 'react-redux';

import { PrevButton, NextButton } from '../embla-arrow-button/CarouselArrowButton';
import useEmblaCarousel from 'embla-carousel-react';
import { DataBundlingProductByIndex } from '../../../data-local/DataBundlingProduct';
import styles from '../../../../public/assets/css/SliderSingleProduct.module.css';
import NoSSR from '../../NoSSR';

// const SliderSingleProduct = ({ slidesBundling }) => {
const SliderSingleProduct = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { dataProduct } = useSelector((state) => state.dataProduct);
    // console.log('data all product', dataProduct);
    const [viewportRef, embla] = useEmblaCarousel({
        loop: true,
        slidesToScroll: 1,
        skipSnaps: false
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
        dispatch(getAllDataProduct());
    }, [dispatch]);

    useEffect(() => {
        if (!embla) return;
        embla.on('select', onSelect);
        onSelect();
    }, [embla, onSelect]);

    const singleProduct = dataProduct.map((dataSP) => (
        <div className={styles.embla__slide} key={dataSP.id}>
            <div
                className={styles.embla__slide__inner}
                onClick={() => {
                    dispatch(goToDetailProductPage(dataSP.title));
                    router.push(`/product-page/${dataSP.title}`);
                }}
            >
                <div style={{ width: '100%', height: 240 }}>
                    <img
                        src={dataSP.image}
                        alt="Single Product"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                </div>

                <hr style={{ border: 'none', marginTop: 15 }} />
                <p>{dataSP.title}</p>
                <p>{dataSP.price}</p>
            </div>
        </div>
    ));

    const singleProduct2 = (
        <div className={styles.embla__container}>
            {dataProduct.map((dataSP) => (
                <div className={styles.embla__slide} key={dataSP.id}>
                    <div
                        className={styles.embla__slide__inner}
                        onClick={() => {
                            dispatch(setMainURL('Product'));
                            dispatch(goToDetailProductPage({ id: dataSP.id, productName: dataSP.title }));
                            dispatch(setDetailProductURL(dataSP.title));
                            router.push(`/product-page/${dataSP.title}`);
                        }}
                    >
                        <Image
                            src={`${dataSP.image}`}
                            alt="Single Product"
                            width={300}
                            height={300}
                            layout="responsive"
                            objectFit="fill"
                        />

                        <hr style={{ border: 'none', marginTop: 15 }} />
                        <p>{dataSP.title}</p>
                        <p>{dataSP.price}</p>
                    </div>
                </div>
            ))}
        </div>
    );

    const Loading = (
        <div className={styles.loadingStyle}>
            <p>Loading ...</p>
        </div>
    );

    return (
        <NoSSR>
            <div className={styles.embla}>
                <div className={styles.embla__viewport} ref={viewportRef}>
                    {dataProduct.length === 0 ? Loading : singleProduct2}
                    {/* <div className={styles.embla__container}>{dataProduct.length === 0 ? Loading : singleProduct}</div> */}
                </div>

                {/* <div className={styles.embla}>
            <div className={styles.embla__viewport} ref={viewportRef}>
                <div className={styles.embla__container}>
                    {slidesBundling.map((index) => (
                        <div className={styles.embla__slide} key={index}>
                            <div className={styles.embla__slide__inner}>
                                <Image
                                    className={styles.embla__slide__img}
                                    src={DataBundlingProductByIndex(index)}
                                    alt="A cool cat."
                                    width={300}
                                    height={300}
                                    layout="responsive"
                                    objectFit="fill"
                                />
                                <hr style={{ border: 'none', marginTop: 15 }} />
                                <p>Pillows Name</p>
                                <p>Price</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div> */}
                <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
                <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
            </div>
        </NoSSR>
    );
};

export default SliderSingleProduct;
