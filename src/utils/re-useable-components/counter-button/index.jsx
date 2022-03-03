import React from 'react';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    counterButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        border: '2px solid #474747',
        width: 100,
        height: 30,
        borderRadius: 50,
        marginLeft: 40,
        // marginTop: 40,
        [theme.breakpoints.down('mobile')]: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            border: '2px solid #474747',
            width: 100,
            height: 30,
            borderRadius: 50,
            marginLeft: 20
            // marginRight: theme.spacing(2)
        },
        counterDec: {
            marginTop: theme.spacing(1),
            marginLeft: theme.spacing(1),
            [theme.breakpoints.down('mobile')]: {
                marginTop: theme.spacing(1),
                marginLeft: theme.spacing(1)
            }
        },
        counterInc: {
            marginTop: 5,
            marginRight: 40,
            [theme.breakpoints.down('mobile')]: {
                marginTop: theme.spacing(1),
                marginRight: theme.spacing(1)
            }
        },
        count: {
            [theme.breakpoints.down('mobile')]: {
                marginTop: 3,
                fontSize: 14
            }
        }
    }
}));

export default function CounterButton({ handleIncrement, handleDecrement, quantity }) {
    const classes = useStyles();

    const [count, setCount] = React.useState(0);
    // const { handleIncrement, handleDecrement } = props;

    // const handleIncrement = () => {
    //     setCount((prevCount) => prevCount + 1);
    // };

    // const handleDecrement = () => {
    //     if (count === 0) {
    //         setCount(0);
    //     } else {
    //         setCount((prevCount) => prevCount - 1);
    //     }
    // };

    return (
        <div className={classes.counterButton}>
            <div className={classes.counterDec}>
                <RemoveIcon style={{ marginLeft: 10, marginTop: 5 }} onClick={handleDecrement} />
            </div>
            {/* <h5 className={classes.count}>{count}</h5> */}
            <h5 className={classes.count}>{quantity}</h5>
            <div className={classes.counterInc}>
                <AddIcon style={{ marginRight: 10, marginTop: 5 }} onClick={handleIncrement} />
            </div>
        </div>
    );
}
