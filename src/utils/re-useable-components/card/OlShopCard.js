import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    olShop: {
        width: 327,
        height: 126,
        backgroundColor: '#ffffff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: '0 3px 10px rgb(0 0 0 / 0.2);',
        [theme.breakpoints.down('mobile')]: {
            width: 160,
            height: 40,
            padding: '6%'
        },
        [theme.breakpoints.down('tablet')]: {
            width: 160,
            height: 40,
            padding: '6%'
        }
    }
}));
const OlShopCard = ({ children }) => {
    const classes = useStyles();
    return <div className={classes.olShop}>{children}</div>;
};

export default OlShopCard;
