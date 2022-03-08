import React from 'react';
import { makeStyles } from '@mui/styles';
import { Button, Card } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const useStyles = makeStyles((theme) => ({
    Container: {
        paddingTop: 19,
        paddingBottom: 19
    },
    ItemHeader: {
        paddingLeft: 27,
        paddingRight: 27,
        paddingBottom: 17
    },
    TextHeader: {
        fontSize: 14,
        fontWeight: 700,
        color: '#474747'
    },
    WrapperItemMain: {
        marginBlock: 20,
        paddingLeft: 20,
        paddingRight: 29,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    ItemLeft: {
        flex: 1,
        backgroundColor: 'red'
    },
    ItemRight: {
        flex: 1,
        backgroundColor: 'blue'
    }
}));
const HomeSubBanner = () => {
    const classes = useStyles();
    return (
        <Card>
            <div className={classes.Container}>
                <div className={classes.ItemHeader}>
                    <span className={classes.TextHeader}>Home - Sub Banner</span>
                </div>
                <div style={{ width: '100%', border: '1.5px solid #DFE0EB' }}></div>

                <div className={classes.WrapperItemMain}>
                    <div className={classes.ItemLeft}></div>
                    <div className={classes.ItemRight}>Right</div>
                </div>
            </div>
        </Card>
    );
};

export default HomeSubBanner;
