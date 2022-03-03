import Image from 'next/image';
import HighQLTY from '../../../public/assets/images/HighQualityImg.png';
import BestPrice from '../../../public/assets/images/BestPrice.png';
import BestDeal2 from '../../../public/assets/images/BestDeal2.png';

//MaT UI
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    mainCont: {
        width: '100%'

        // backgroundColor: 'green'
        // minHeight: 480
    },
    reasonCont: {
        width: '89%',
        marginLeft: 'auto',
        marginRight: 'auto',
        // backgroundColor: 'red',
        minHeight: 480,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        [theme.breakpoints.down('mobile')]: {
            flexDirection: 'column'
        }
    },
    box1: {
        width: '45%',
        marginRight: 10,
        height: 480,
        borderRadius: 5,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F7F7F7',
        [theme.breakpoints.down('mobile')]: {
            width: '100%',
            marginRight: 0,
            height: 230
        }
    },
    box2: {
        width: '45%',
        height: 480,
        marginTop: 10,
        [theme.breakpoints.down('mobile')]: {
            width: '100%'
        }
        // backgroundColor: '#AAC6DB'
    },
    HighQualityCss: {
        width: 400,
        height: 400,
        [theme.breakpoints.down('mobile')]: {
            width: 200,
            height: 200
        }
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
    }
}));

const WhyChooseUs = () => {
    const classes = useStyles();

    return (
        <div className={classes.mainCont}>
            <div style={{ width: '100%', textAlign: 'center', marginBottom: 40 }}>
                <h1 className={classes.fontSubTitleOnHome}>Why Choose Us</h1>
            </div>
            <div className={classes.reasonCont}>
                <div className={classes.box1}>
                    <div>
                        <div className={classes.HighQualityCss}>
                            <Image src={HighQLTY} alt="high quality" placeholder="blur" />
                        </div>
                    </div>
                </div>
                <div className={classes.box2}>
                    <div
                        style={{
                            width: '100%',
                            height: 230,
                            marginBottom: 10,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 5,
                            backgroundColor: '#F7F7F7'
                        }}
                    >
                        <div>
                            <div style={{ width: 200, height: 200 }}>
                                <Image src={BestPrice} alt="best price" placeholder="blur" />
                            </div>
                        </div>
                    </div>

                    <div
                        style={{
                            width: '100%',
                            height: 230,
                            // marginBottom: 10,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 5,
                            backgroundColor: '#F7F7F7'
                        }}
                    >
                        <div>
                            <div style={{ width: 250, height: 250 }}>
                                <Image src={BestDeal2} alt="best deal" placeholder="blur" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WhyChooseUs;
