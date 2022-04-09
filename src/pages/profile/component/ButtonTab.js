import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Alert, Button, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';

import { setProfile } from '../../../redux/actions/urlOnProfileButtonTabAction';
import { addComentar, logoutUser } from '../../../redux/actions/userActions';

import MainBlackButton from '../../../utils/re-useable-components/buttons/MainBlackButton';
import Dialog from './dialog';

import { SET_PROFILE_LOGOUT, SET_PROFILE_PROMO_AND_SALE, SET_PROFILE_WISHLIST } from '../../../types';

const useStyles = makeStyles((theme) => ({
    btnMenuContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '55px',
        paddingLeft: 100
        // backgroundColor: 'red'
    },
    button: {
        '&.MuiButton-root': {
            backgroundColor: '#fff',
            marginRight: '67px'
        },
        '&.MuiButton-root.active': {
            backgroundColor: '#fff',
            padding: '5px 36px',
            borderRadius: '20px',
            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.13)'
        },
        '&.MuiButton-text': {
            color: '#939393',
            fontWeight: 'bold',
            textTransform: 'capitalize'
        },
        '&.MuiButton-text.active': {
            color: '#474747'
        },
        '&.MuiButton-text.btn-promo': {
            color: '#AAC6DB'
        },
        '&.MuiButton-text.btn-logout': {
            color: '#FF7373'
        }
    },
    dialogContainer: { width: '100%', alignSelf: 'center' },
    dialogFormWrapper: {
        marginTop: '20px',
        marginBottom: '15px'
    },
    dialogInput: {
        width: '93%',
        padding: '10px 10px',
        marginTop: '15px'
    },
    dialogBtnWrapper: {
        display: 'flex',
        justifyContent: 'space-around'
    }
}));

const ButtonTab = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const { show_label_profile, tab_menu_list } = useSelector((state) => state.url_profile);

    const [review, setReview] = useState({
        judul: '',
        comment: ''
    });
    const [reviewErrorMsg, setReviewErrorMsg] = useState('');

    useEffect(() => {}, [review, reviewErrorMsg]);

    return (
        <Box className={classes.btnMenuContainer}>
            {tab_menu_list?.map((item, i) => (
                <Button
                    variant="text"
                    key={i}
                    // className={`${classes.button}  ${show_label_profile === item.label ? 'active' : ''}
                    // ${item.label === SET_PROFILE_PROMO_AND_SALE && 'btn-promo'}
                    // `}
                    className={`${classes.button}  ${show_label_profile === item.label ? 'active' : ''}`}
                    onClick={() => dispatch(setProfile(item.label))}
                >
                    {item.label}
                </Button>
            ))}
            <Button
                variant="text"
                className={`${classes.button} btn-logout ${show_label_profile === SET_PROFILE_LOGOUT ? 'active' : ''}`}
                onClick={() => setShowModal(true)}
            >
                {SET_PROFILE_LOGOUT}
            </Button>
            <Dialog open={showModal} className={classes.dialogContainer}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Give Us Reviews
                </Typography>
                <Box className={classes.dialogFormWrapper}>
                    <Typography style={{ color: '#474747' }}>*Judul Review</Typography>
                    <input
                        placeholder="Write Something"
                        type="text"
                        className={classes.dialogInput}
                        onChange={(e) => {
                            setReview({ ...review, judul: e.target.value });
                        }}
                    />
                </Box>
                <Box className={classes.dialogFormWrapper}>
                    <Typography style={{ color: '#474747' }}>*Isi Review</Typography>
                    <textarea
                        placeholder="Write Something"
                        type="text"
                        className={classes.dialogInput}
                        style={{ height: '190px' }}
                        onChange={(e) => {
                            setReview({ ...review, comment: e.target.value });
                        }}
                    />
                </Box>
                <Box className={classes.dialogBtnWrapper}>
                    <MainBlackButton
                        className={'BorderWhiteButton2'}
                        onClick={() => {
                            setShowModal(false);
                            setReviewErrorMsg('');
                            setReview({ judul: '', comment: '' });
                        }}
                        innerContaunerStyle={{ width: '256px', fontSize: '20px' }}
                    >
                        Back
                    </MainBlackButton>
                    <MainBlackButton
                        innerContaunerStyle={{ width: '256px', fontSize: '20px' }}
                        className="BlackButton"
                        variant="contained"
                        onClick={async () => {
                            try {
                                if (review.judul.length !== 0 && review.comment.length !== 0) {
                                    await dispatch(addComentar(review, setReview, setShowModal, setReviewErrorMsg));
                                } else setReviewErrorMsg('judul tidak boleh kosong, comment tidak boleh kosong');
                            } catch (error) {
                                console.log(error);
                            }
                        }}
                    >
                        Submit
                    </MainBlackButton>
                </Box>
                {reviewErrorMsg && (
                    <text style={{ color: 'red', marginTop: '10px', fontSize: '10px' }}>{reviewErrorMsg}</text>
                )}
            </Dialog>
        </Box>
    );
};
export default ButtonTab;
