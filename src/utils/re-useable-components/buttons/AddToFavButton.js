// import { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
    ButtonFavMain: {
        // '& .ButtonFav': {}
    }
}));

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function AddToFavButton() {
    const classes = useStyles();
    // const [isClick, setClick] = useState(false);
    return (
        <div className={classes.ButtonFavMain}>
            <Checkbox
                {...label}
                icon={<FavoriteBorder />}
                checkedIcon={<Favorite style={{ color: '#FF7373' }} />}
                name="checkedH"
            />
            {/* <FormControlLabel
                control={<Checkbox icon={<FavoriteBorderIcon />} checkedIcon={<FavoriteIcon />} />}
            ></FormControlLabel> */}
        </div>
    );
}
