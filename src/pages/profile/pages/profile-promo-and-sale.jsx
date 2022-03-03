import { makeStyles } from '@mui/styles';
import { useSelector } from 'react-redux';
import HomeCardListProduct from '../../../components/mobile/home-card-list-product';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '100px',
        marginBottom: '100px',
        padding: '27px',
        '& .title': {
            display: 'none'
        },
        [theme.breakpoints.down('mobile')]: {
            display: 'flex',
            flexDirection: 'column',
            marginBottom: '50px',
            marginTop: '0px',
            '& .title': {
                marginBottom: '20px',
                display: 'flex',
                fontSize: '18px',
                fontWeight: '600',
                alignSelf: 'flex-start'
            }
        }
    }
}));

const PromoAndSale = (params) => {
    const classes = useStyles();
    const { show_label_profile } = useSelector((state) => state.url_profile);
    return (
        <div className={classes.container}>
            <p className={'title'}>{show_label_profile}</p>
            <HomeCardListProduct />
        </div>
    );
};

export default PromoAndSale;
