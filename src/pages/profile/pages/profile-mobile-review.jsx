import { Container, Rating, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import { PhotoCamera } from '@mui/icons-material';

import MainBlackButton from '../../../utils/re-useable-components/buttons/MainBlackButton';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { addComentar } from '../../../redux/actions/userActions';
import { setProfile } from '../../../redux/actions/urlOnProfileButtonTabAction';
import { SET_PROFILE_DASHBOARD } from '../../../types';

const useStyles = makeStyles((theme) => ({
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
        justifyContent: 'space-between'
    }
}));

const Riview = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const router = useRouter();
    const [review, setReview] = useState({
        judul: '',
        comment: ''
    });
    const [reviewErrorMsg, setReviewErrorMsg] = useState('');
    useEffect(() => {}, [review, reviewErrorMsg]);
    return (
        <Container>
            <Typography id="modal-modal-title" variant="h6" component="h2" mt={'20px'}>
                Give Us Reviews
            </Typography>

            <Box className={classes.dialogFormWrapper}>
                <Typography style={{ color: '#474747' }}>*Judul Riview</Typography>
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
                <Typography style={{ color: '#474747' }}>*Isi Riview</Typography>
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
                    innerContaunerStyle={{ width: '186px', fontSize: '20px' }}
                    className="BlackButton"
                    variant="contained"
                    onClick={async () => {
                        try {
                            if (review.judul.length !== 0) {
                                dispatch(addComentar(review));
                                setReview({ judul: '', comment: '' });
                                setReviewErrorMsg('');
                                dispatch(setProfile(SET_PROFILE_DASHBOARD));
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
        </Container>
    );
};
export default Riview;
