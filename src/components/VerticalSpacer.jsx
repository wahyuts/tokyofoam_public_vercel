import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    container: {
        marginRight: '100px',
        background: 'red',
        [theme.breakpoints.down('mobile')]: {
            marginRight: 0
        }
    }
}));

const VerticalSpacer = ({ height }) => {
    const classes = useStyles();
    return <div style={{ height }}></div>;
};

export default VerticalSpacer;
