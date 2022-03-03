import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    container: {
        [theme.breakpoints.down('mobile')]: {
            marginRight: 0
        }
    }
}));

const HorizontalSpacer = ({ widht }) => {
    const classes = useStyles();
    return <div className={classes.container} style={widht}></div>;
};

export default HorizontalSpacer;
