import { Button } from '@mui/material';

//MaT UI Stuff
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
    ContBlackButton: {
        '& .BlackButton': {
            backgroundColor: '#2C2C2C',
            color: '#FFFFFF',
            width: '100%',
            fontWeight: 600,
            textTransform: 'none',
            marginTop: 15,
            borderRadius: 5
        },
        '& .RedButton': {
            backgroundColor: '#ff0000',
            color: '#FFFFFF',
            width: '100%',
            fontWeight: 600,
            textTransform: 'none',
            marginTop: 15,
            borderRadius: 5
        },
        '& .PurpleButton': {
            backgroundColor: '#5E35B1',
            color: '#FFFFFF',
            width: '100%',
            fontWeight: 600,
            textTransform: 'none',
            marginTop: 15,
            borderRadius: 5
        },
        '& .WhiteButton': {
            borderColor: '#2C2C2C',
            borderWidht: '1px',
            color: '#2C2C2C',
            width: '100%',
            fontWeight: 600,
            textTransform: 'none',
            marginTop: 15,
            borderRadius: 5
        },

        '& .BorderButton': {
            backgroundColor: '#E5E5E5',
            borderColor: '#474747',
            borderWidht: '1px',
            color: '#2C2C2C',
            width: '100%',
            fontWeight: 600,
            textTransform: 'none',
            marginTop: 15,
            borderRadius: 5
        },

        '& .BorderWhiteButton': {
            backgroundColor: '#FFFFFF',
            borderColor: '#474747',
            borderWidht: '1px',
            color: '#2C2C2C',
            width: '100%',
            fontWeight: 600,
            textTransform: 'none',
            marginTop: 15,
            borderRadius: 5
        },
        '& .BorderWhiteButton2': {
            backgroundColor: '#FFFFFF',
            border: '1px solid #474747',
            borderWidht: '1px',
            color: '#2C2C2C',
            width: '100%',
            fontWeight: 600,
            textTransform: 'none',
            marginTop: 15,
            borderRadius: 5
        },

        '& .BorderBlueButton': {
            backgroundColor: '#FFFFFF',
            border: '1px solid #7ABAE8',
            borderWidht: '1px',
            color: '#7ABAE8',
            width: '100%',
            fontWeight: 600,
            textTransform: 'none',
            marginTop: 15,
            borderRadius: 5
        },

        '& .BlackButton:hover': {
            backgroundColor: '#2C2C2C'
        },
        '& .RedButton:hover': {
            backgroundColor: '#ff0000'
        },
        '& .BorderButton:hover': {
            backgroundColor: '#E5E5E5'
        },
        '& .PurpleButton:hover': {
            backgroundColor: '#5E35B1'
        },
        '& .BorderBlueButton:hover': {
            backgroundColor: '#FFFFFF'
        },
        '& .BorderWhiteButton:hover': {
            backgroundColor: '#FFFFFF'
        },
        '& .OrangeButton': {
            backgroundColor: '#FF7373',
            color: '#FFFFFF',
            width: '100%',
            fontWeight: 600,
            textTransform: 'none',
            marginTop: 15,
            borderRadius: 5
        },
        '& .OrangeButton:hover': {
            backgroundColor: '#FF7373'
        },
        '& .DisableButton': {
            width: '100%',
            fontWeight: 600,
            textTransform: 'none',
            marginTop: 15,
            borderRadius: 5
        }
    }
}));

const MainBlackButton = ({ children, onClick, innerContaunerStyle, className, variant, disable }) => {
    const classes = useStyles();
    return (
        <div className={classes.ContBlackButton}>
            <Button
                style={innerContaunerStyle}
                onClick={onClick}
                className={className}
                variant={variant}
                disabled={disable}
            >
                {children}
            </Button>
        </div>
    );
};

export default MainBlackButton;
