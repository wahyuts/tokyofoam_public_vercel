import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Rating from '@mui/material/Rating';

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    ContainerCard: {
        width: '100%'
        // height: '100vh'
    },
    WrapperCard: {
        display: 'flex',
        flexWrap: 'wrap',
        rowGap: 40,
        justifyContent: 'space-evenly',
        [theme.breakpoints.down('mobile')]: {
            rowGap: 20,
            justifyContent: 'center',
            alignItems: 'center'
        }
    },
    CardItem: {
        width: '25%',
        height: 220,
        backgroundColor: 'white',
        boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.25)',
        borderRadius: 10,
        paddingLeft: 10,
        [theme.breakpoints.down('mobile')]: {
            width: '100%'
        }
    },
    ReviewName: {
        padding: 10,
        display: 'flex',
        alignItems: 'center'
    },
    TextRectangleInside: {
        paddingLeft: 10,
        fontSize: 20,
        fontWeight: 500,
        color: '#474747F'
    },
    RatingReview: {
        paddingLeft: 10
    },
    ReviewText: {
        paddingLeft: 10,
        display: 'flex',
        flexDirection: 'column'
    },
    TextLabel: {
        fontSize: 15,
        fontWeight: 500,
        color: '#474747'
    },
    TextSpan: {
        fontSize: 15,
        fontWeight: 400,
        color: '#474747'
    },
    TextMonth: {
        fontSize: 15,
        fontWeight: 400,
        color: '#474747',
        paddingTop: 10
    }
}));
export default function TabCard() {
    const classes = useStyles();
    const [value, setValue] = useState(0);

    return (
        <div className={classes.ContainerCard}>
            <div className={classes.WrapperCard}>
                <div className={classes.CardItem}>
                    <div className={classes.ReviewName}>
                        <Avatar>MI</Avatar>
                        <span className={classes.TextRectangleInside}> Mika Liana </span>
                    </div>
                    <div className={classes.RatingReview}>
                        <Rating
                            size="small"
                            value={value}
                            onChange={(event, newValues) => {
                                setValue(newValues);
                            }}
                        />
                    </div>
                    <div className={classes.ReviewText}>
                        <label className={classes.TextLabel}>Lorem Ipsum</label>
                        <span className={classes.TextSpan}>Lorem ipsum dolor sit amet</span>
                    </div>
                    <div style={{ width: '100%', marginTop: 15 }}>
                        <hr />
                    </div>
                    <div className={classes.ReviewText}>
                        <span className={classes.TextMonth}>1 Month ago</span>
                    </div>
                </div>
                <div className={classes.CardItem}>
                    <div className={classes.ReviewName}>
                        <Avatar>JL</Avatar>
                        <span className={classes.TextRectangleInside}> Joshua Telderon </span>
                    </div>
                    <div className={classes.RatingReview}>
                        <Rating
                            size="small"
                            value={value}
                            onChange={(event, newValues) => {
                                setValue(newValues);
                            }}
                        />
                    </div>
                    <div className={classes.ReviewText}>
                        <label className={classes.TextLabel}>Lorem Ipsum</label>
                        <span className={classes.TextSpan}>Lorem ipsum dolor sit amet</span>
                    </div>
                    <div style={{ width: '100%', marginTop: 15 }}>
                        <hr />
                    </div>
                    <div className={classes.ReviewText}>
                        <span className={classes.TextMonth}>1 Month ago</span>
                    </div>
                </div>
                <div className={classes.CardItem}>
                    <div className={classes.ReviewName}>
                        <Avatar>KW</Avatar>
                        <span className={classes.TextRectangleInside}> Kwang Soo </span>
                    </div>
                    <div className={classes.RatingReview}>
                        <Rating
                            size="small"
                            value={value}
                            onChange={(event, newValues) => {
                                setValue(newValues);
                            }}
                        />
                    </div>
                    <div className={classes.ReviewText}>
                        <label className={classes.TextLabel}>Lorem Ipsum</label>
                        <span className={classes.TextSpan}>Lorem ipsum dolor sit amet</span>
                    </div>
                    <div style={{ width: '100%', marginTop: 15 }}>
                        <hr />
                    </div>
                    <div className={classes.ReviewText}>
                        <span className={classes.TextMonth}>1 Month ago</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
