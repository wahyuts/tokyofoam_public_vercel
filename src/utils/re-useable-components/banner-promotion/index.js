import Image from 'next/image';
import React, { useState, useEffect, useCallback } from 'react';
import { PrevButton, NextButton } from '../embla-arrow-button/CarouselArrowButton';
import useEmblaCarousel from 'embla-carousel-react';
import { ImagePromotionByIndex } from '../../../data-local/DataImagePromotions';
import LoadingImage from '../../../../public/assets/images/blur-placeholder.png';
import styles from '../../../../public/assets/css/CarouselBanner.module.css';

const BannerPromotion = ({ slidesGal }) => {
    const [viewportRef, embla] = useEmblaCarousel({ skipSnaps: false, loop: true, slidesToScroll: 1 });
    const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
    const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

    const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla]);
    const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla]);
    const onSelect = useCallback(() => {
        if (!embla) return;
        setPrevBtnEnabled(embla.canScrollPrev());
        setNextBtnEnabled(embla.canScrollNext());
    }, [embla]);

    useEffect(() => {
        if (!embla) return;
        embla.on('select', onSelect);
        onSelect();
    }, [embla, onSelect]);
    return (
        <div className={styles.embla}>
            <div className={styles.embla__viewport} ref={viewportRef}>
                <div className={styles.embla__container}>
                    {slidesGal.map((index) => (
                        <div className={styles.embla__slide} key={index}>
                            <div className={styles.embla__slide__inner}>
                                <Image
                                    className={styles.embla__slide__img}
                                    src={ImagePromotionByIndex(index).photo}
                                    alt="Gallery product tokyofoam"
                                    width={1170}
                                    height={600}
                                    layout="responsive"
                                    objectFit="fill"
                                    placeholder="blur"
                                    // blurDataURL={LoadingImage}
                                />
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

export default BannerPromotion;
