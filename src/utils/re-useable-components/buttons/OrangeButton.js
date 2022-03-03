import { Button } from '@mui/material';

//MaT UI Stuff
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
    ContOrangeButton: {
        '& .OrangeButton': {
            backgroundColor: '#FF7373',
            color: '#FFFFFF',
            width: '100%',
            // fontSize: 20,
            fontWeight: 600,
            textTransform: 'none',
            marginTop: 15,
            borderRadius: 5
        },
        '& .OrangeButton:hover': {
            backgroundColor: '#FF7373'
        }
    }
}));

const OrangeButton = ({ children, onClick }) => {
    const classes = useStyles();
    return (
        <div className={classes.ContOrangeButton}>
            <Button onClick={onClick} className="OrangeButton">
                {children}
            </Button>
        </div>
    );
};

export default OrangeButton;
