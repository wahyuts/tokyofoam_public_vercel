// import Slider from "react-slick";
import Image from 'next/image';
import Promo1 from '../../../public/assets/images/promo1.png';
// import Promo2 from '../../../public/assets/images/promo2.png';
// import Promo3 from '../../../public/assets/images/promo3.png';

//Mat UI Stuff
import { makeStyles } from '@mui/styles';

//Icons
// import ArrowBackIcon from '@mui/icons-material/ArrowBackIosNew';
// import ArrowForwardIcon from '@mui/icons-material/ArrowForwardIos';

const useStyles = makeStyles(() => ({
    contFullSlider: {
        width: '89%',
        marginLeft: 'auto',
        marginRight: 'auto',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
        '& .slide': {
            opacity: 0,
            position: 'absolute',
            top: '-15vh',
            left: '-15vw',
            transition: '0.4s ease',
            zIndex: -1
        },
        '& .active': {
            opacity: 1
        }
    }
}));

const BannerPromo = () => {
    const classes = useStyles();
    return (
        <div className={classes.contFullSlider}>
            <Image
                src={Promo1}
                alt="Promo1"
                width={1170}
                height={300}
                layout="responsive"
                objectFit="cover"
                // className="slide active"
            />

            {/* <div className="slide">
                <Image src={Promo2} alt="Promo2" width={1170} height={300} layout="responsive" objectFit="contain" />
            </div>

            <div className="slide">
                <Image src={Promo3} alt="Promo3" width={1170} height={300} layout="responsive" objectFit="contain" />
            </div> */}

            {/* <button className="arrow left-arrow" id="left">
                <ArrowBackIcon />
            </button>

            <button className="arrow right-arrow" id="right">
                <ArrowForwardIcon />
            </button> */}
        </div>
    );
};

export default BannerPromo;
