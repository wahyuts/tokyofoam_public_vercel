import { Button } from '@mui/material';

//MaT UI Stuff
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
    ContOvalOrangeButton: {
        '& .OvalOrangeButton': {
            backgroundColor: '#FF7373',
            color: '#FFFFFF',
            // fontSize: 20,
            fontWeight: 600,
            textTransform: 'none',
            width: '100%',
            marginTop: 15,
            borderRadius: 30
        }
    }
}));

const OvalOrangeButton = ({ children, onClick }) => {
    const classes = useStyles();
    return (
        <div className={classes.ContOvalOrangeButton}>
            <Button onClick={onClick} className="OvalOrangeButton">
                {children}
            </Button>
        </div>
    );
};

export default OvalOrangeButton;
