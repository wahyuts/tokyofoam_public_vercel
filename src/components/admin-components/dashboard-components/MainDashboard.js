import React from 'react';
import { makeStyles } from '@mui/styles';
import logo from '../../../../public/assets/images/tokyo-mini.png';
import Image from 'next/image';

const useStyles = makeStyles((theme) => ({
    Container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
        /* Setup */
        // position: 'relative'
    },
    Item: {
        /* Center vertically and horizontally */
        position: 'absolute',
        top: '45%',
        left: '50%',
        margin: '-25px 0 0 -25px' /* Apply negative top and left margins to truly center the element */
    }
}));
export default function MainDashboard() {
    const classes = useStyles();
    return (
        <div className={classes.Container}>
            <div className={classes.Item}>
                <h1> Welcome to TokyoFoam</h1>
                <Image src={logo} layout="responsive" className="Image" alt="Logo Welcome" />
            </div>
        </div>
    );
}
