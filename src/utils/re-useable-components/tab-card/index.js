import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Rating from '@mui/material/Rating';
import { useSelector } from 'react-redux';

import { makeStyles } from '@mui/styles';
import dayjs from 'dayjs';

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
        minHeight: 80,
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
    const { review_comment } = useSelector((state) => state.theComment);

    // NANTI MAPPING NYA PAKE YANG Variable threeTopComment
    const threeTopComment = review_comment.slice(0, 3);
    // console.log('review', review_comment);
    // console.log('review TERATAS', threeTopComment);

    return (
        <div className={classes.ContainerCard}>
            <div className={classes.WrapperCard}>
                {threeTopComment.map((theComment, i) => {
                    return (
                        <div className={classes.CardItem} key={i}>
                            <div className={classes.ReviewName}>
                                <Avatar alt={theComment.nama_user} src="." />

                                <span className={classes.TextRectangleInside}> {`${theComment.nama_user}`} </span>
                            </div>
                            <hr style={{ border: 'none', marginBottom: 15 }} />

                            <div className={classes.ReviewText}>
                                {/* <label className={classes.TextLabel}>Lorem Ipsum</label> */}
                                <span className={classes.TextSpan}>{`${theComment.comment}`}</span>
                            </div>
                            <div style={{ width: '100%', marginTop: 15 }}>
                                <hr />
                            </div>
                            <div className={classes.ReviewText}>
                                <span className={classes.TextMonth}>
                                    {dayjs(theComment.createdAt).format('DD MMMM YYYY')}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
