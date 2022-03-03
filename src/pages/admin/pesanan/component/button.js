import { Button, Stack } from '@mui/material';

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({}));

const ButtonComponent = ({ variant, textColor, color, onPreessed, label, width }) => {
    const classes = useStyles();
    return (
        <Button
            variant={variant}
            onClick={onPreessed}
            style={{ fontWeight: 600, padding: '8px 70px 8px 70px', color: textColor, backgroundColor: color, width }}
        >
            {label}
        </Button>
    );
};

export default ButtonComponent;
