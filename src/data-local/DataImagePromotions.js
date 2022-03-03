import Promo1 from '../../public/assets/images/gal1.png';
import Promo2 from '../../public/assets/images/gal2.png';
import Promo3 from '../../public/assets/images/gal3.png';

// export const ImagePromotion = [Promo1, Promo2, Promo3];
export const ImagePromotion = [
    {
        // photo: 'https://res.cloudinary.com/tokyofoam-com/image/upload/v1642516342/gal1_xctbtn.png'
        photo: Promo1
    },
    {
        // photo: 'https://res.cloudinary.com/tokyofoam-com/image/upload/v1642515246/gal2_uq3rwc.png'
        photo: Promo2
    },
    {
        // photo: 'https://res.cloudinary.com/tokyofoam-com/image/upload/v1642515337/gal3_kn8iqw.png'
        photo: Promo3
    }
];

export const ImagePromotionByIndex = (index) => ImagePromotion[index % ImagePromotion.length];
