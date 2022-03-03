import { Button } from '@mui/material';

//MaT UI Stuff
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
    ContOvalMainBlackButton: {
        '& .OvalMainBlackButton': {
            backgroundColor: '#2C2C2C',
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

const OvalMainBlackButton = ({ children, onClick }) => {
    const classes = useStyles();
    return (
        <div className={classes.ContOvalMainBlackButton}>
            <Button onClick={onClick} className="OvalMainBlackButton">
                {children}
            </Button>
        </div>
    );
};

export default OvalMainBlackButton;
