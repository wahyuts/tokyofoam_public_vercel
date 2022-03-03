//MaT UI
// import AppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
    navbar: {
        backgroundColor: 'red',
        '& a': {
            color: '#ffffff',
            marginLeft: 10
        }
    }
}));

const HeadnavDetailProduct = () => {
    const classes = useStyles();
    return (
        <div>
            <p style={{ marginRight: 20 }}>Untuk Navigasinya</p>
            {/* <AppBar position="static" className={classes.navbar}>
                <Toolbar>
                    <Typography>Navigasi untuk detail product</Typography>
                </Toolbar>
            </AppBar> */}
        </div>
    );
};

export default HeadnavDetailProduct;
