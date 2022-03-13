import { makeStyles } from '@mui/styles';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    desktopContainer: {
        marginBottom: '97px',
        display: 'none',

        [theme.breakpoints.down('mobile')]: {
            display: 'flex'
        }
    },
    wishlistContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '100px',
        padding: '27px',
        '& .title': {
            display: 'none'
        },
        [theme.breakpoints.down('mobile')]: {
            display: 'flex',
            flexDirection: 'column',
            marginBottom: '50px',
            marginTop: '0px',
            '& .title': {
                marginBottom: '20px',
                display: 'flex',
                fontSize: '18px',
                fontWeight: '600',
                alignSelf: 'flex-start'
            }
        }
    }
}));

const data = [
    {
        id: 'yuewhjncdkdcpowkldmdj',
        name: 'njsdkj',
        img: '/assets/images/Single-Pillow-2.png',
        price: '1609099'
    },
    {
        id: 'yuewhjncdkdcpowkldmdj',
        name: 'njsdkj',
        img: '/assets/images/Single-Pillow-2.png',
        price: '1609099'
    },
    {
        id: 'yuewhjncdkdcpowkldmdj',
        name: 'njsdkj',
        img: '/assets/images/Single-Pillow-2.png',
        price: '1609099'
    }
];

const Wishlist = (params) => {
    const classes = useStyles();
    const { show_label_profile } = useSelector((state) => state.url_profile);
    useEffect(() => {}, []);
    return (
        <div>
            <div className={classes.wishlistContainer}>
                <p className={'title'}>{show_label_profile}</p>
                {data.map((e, i) => {
                    return (
                        <div key={i} style={{ margin: '8px 8px 8px 8px' }}>
                            <img
                                src={'/assets/images/Single-Pillow-2.png'}
                                alt="Single Product"
                                style={{ width: '100%', height: '70%', objectFit: 'cover' }}
                            />
                            <p>Mulberry Silk Pillowcase</p>
                            <p>IDR 750.000</p>
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between'
                                }}
                            >
                                <div
                                    style={{
                                        backgroundColor: '#474747',
                                        borderRadius: '10px',
                                        width: '20px',
                                        height: '20px'
                                    }}
                                ></div>
                                <div
                                    style={{
                                        border: '1px solid #474747',
                                        borderRadius: '20px',
                                        padding: '8px',
                                        flexDirection: 'row',
                                        display: 'flex',
                                        justifyContent: 'space-around',
                                        width: '116px',
                                        backgroundColor: 'white'
                                    }}
                                >
                                    <p style={{ fontSize: '18px', fontWeight: '400' }}>-</p>
                                    <p style={{ fontSize: '18px', fontWeight: '400' }}>3</p>
                                    <p style={{ fontSize: '18px', fontWeight: '400' }}>+</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
export default Wishlist;
