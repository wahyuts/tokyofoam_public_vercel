import Image from 'next/image';
import { useRouter } from 'next/router';
import Logo from '../../../public/assets/images/logo-tokyofoam.png';
import { makeStyles } from '@mui/styles';

//Redux
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    mainCont: {
        width: '100%',
        height: '100vh',
        backgroundColor: '#F7F7F7',
        // backgroundColor: 'red',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    divImage: {
        width: '50%',
        height: '50%',
        marginRight: 'auto',
        marginLeft: 'auto',
        marginBottom: 15,
        [theme.breakpoints.down('mobile')]: {
            width: '100%',
            height: '100%'
        }
    },
    textFont: {
        textAlign: 'center',
        [theme.breakpoints.down('mobile')]: {
            fontSize: 15,
            textAlign: 'center'
        }
    },
    cursorPointer: {
        cursor: 'pointer',
        color: 'blueviolet'
    }
}));

const Testing = () => {
    const router = useRouter();
    const classes = useStyles();

    const { changeable_URL } = useSelector((state) => state.url);

    const klik = () => {
        router.push(`${changeable_URL}`);
    };

    return (
        <div className={classes.mainCont}>
            <div style={{ width: '70%' }}>
                <div className={classes.divImage}>
                    <Image src={Logo} alt="Logo" layout="responsive" objectFit="fill" />
                </div>
                <p className={classes.textFont}>
                    Email Anda Sudah Terverifikasi, Silahkan Login Kembali Dengan Email & Password Anda
                </p>
                <hr style={{ border: 'none', marginBottom: 10 }} />
                <p className={`${classes.textFont} ${classes.cursorPointer}`} onClick={klik}>
                    Klik disini untuk login
                </p>
            </div>
        </div>
    );
};

export default Testing;
