import React, { useState } from 'react';
import Image from 'next/image';
import { useTabs, TabPanel } from 'react-headless-tabs';
import PropTypes from 'prop-types';
import ReactResponsiveHook from '../../utils/ReactResponsiveHook';
//Redux
import { useDispatch, useSelector } from 'react-redux';
import OrangeButton from '../../utils/re-useable-components/buttons/OrangeButton';
import { makeStyles } from '@mui/styles';
import { addToBag, deleteBag } from '../../redux/actions/dataProductActions';
import MainBlackButton from '../../utils/re-useable-components/buttons/MainBlackButton';
// MUI STUFF
import Rating from '@mui/material/Rating';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabCard from '../../utils/re-useable-components/tab-card';

// image
import productImage from '../../../public/assets/images/Rectangle-product.png';
import AddToFavButton from '../../utils/re-useable-components/buttons/AddToFavButton';
import { Button } from '@mui/material';
import { height } from '@mui/system';
import ReviewCards from '../../utils/re-useable-components/review-cards';
import Picture from '../../../public/assets/images/contact-us.png';
import CounterButton from '../../utils/re-useable-components/counter-button';

import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import ReadMoreLess from '../../utils/re-useable-components/load-more-function';

const useStyles = makeStyles((theme) => ({
    productBox: {
        // backgroundColor: 'red',
        // marginLeft: 'auto',
        // marginRight: 'auto',
        marginTop: 50,
        [theme.breakpoints.down('mobile')]: {
            marginTop: 20
        }
    },
    productRating: {
        // display: 'flex',
        // alignItems: 'center',
        marginBottom: theme.spacing(1),

        [theme.breakpoints.down('mobile')]: {
            display: 'flex',
            alignItems: 'center',
            marginBottom: theme.spacing(1)
        }
    },
    ratingProduct: {
        marginTop: 5,
        marginLeft: 5,

        [theme.breakpoints.down('mobile')]: {
            marginTop: 5,
            marginLeft: 5
        }
    },
    ratingProductText: {
        display: 'flex',
        alignItems: 'center',
        [theme.breakpoints.down('mobile')]: {
            display: 'flex',
            alignItems: 'center',
            fontSize: 18
            // marginRight: theme.spacing(4)
        }
    },
    productTitle: {
        // marginTop: 20,
        // backgroundColor: 'yellow',
        width: '90%',

        [theme.breakpoints.down('mobile')]: {
            display: 'flex',
            alignItems: 'center',
            fontSize: 18,
            marginBottom: theme.spacing(1),
            marginTop: theme.spacing(2)
        }
    },
    productDetail: {
        width: '95%',
        // height: 425,
        // backgroundColor: 'red',
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'flex',
        alignItems: 'center',
        marginBottom: 40,
        [theme.breakpoints.down('mobile')]: {
            width: '95%',
            margin: '0px auto',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column'
        }
    },
    productDesc: {
        [theme.breakpoints.down('mobile')]: {
            width: '89%'

            // margin: '0px auto'
        }
    },
    productPrice: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: 10,
        [theme.breakpoints.down('mobile')]: {
            display: 'flex',
            alignItems: 'center',
            marginBottom: theme.spacing(1)
        }
    },
    productDesc1: {
        [theme.breakpoints.down('mobile')]: {
            marginBottom: theme.spacing(1)
        }
    },
    fontBahan: {
        fontSize: 18,
        [theme.breakpoints.down('mobile')]: {
            fontSize: 14
        }
    },
    crossedPrice: {
        marginRight: theme.spacing(2),
        color: '#939393',
        textDecoration: 'line-through',
        [theme.breakpoints.down('mobile')]: {
            marginRight: theme.spacing(2),
            color: '#939393',
            textDecoration: 'line-through'
        }
    },
    normalPrice: {
        color: '#FF7373',
        [theme.breakpoints.down('mobile')]: {
            color: '#FF7373'
        }
    },
    divOrangeButton: {
        width: '89%',
        [theme.breakpoints.down('mobile')]: {
            width: '89%',
            paddingBottom: 50,
            marginLeft: 'auto',
            marginRight: 'auto'

            // marginLeft: theme.spacing(2)
        }
    },
    DetailButton: {
        marginTop: 50,
        // display: 'flex',
        // alignItems: 'center',
        marginLeft: 'auto',
        marginRight: ' auto',
        width: '20%',
        [theme.breakpoints.down('mobile')]: {
            width: '89%',
            // paddingBottom: 50,
            marginLeft: theme.spacing(2)
        }
    },
    productSelection: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        [theme.breakpoints.down('mobile')]: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: theme.spacing(1)
        }
    },
    productImage: {
        width: '50%',
        padding: 30,
        marginRight: 40,
        [theme.breakpoints.down('mobile')]: {
            // backgroundColor: 'green',
            padding: '10%',
            margin: 'auto auto',
            width: '80%',
            height: 'auto'
        }
    },
    BoxProductTitle: {
        [theme.breakpoints.down('mobile')]: {
            width: '100%'
        }
    },
    productImageBox: {
        width: '100%',
        [theme.breakpoints.down('mobile')]: {
            // backgroundColor: 'red',
            width: '100%'
        }
    },
    DescRev: {
        width: '89%',
        // height: '200px',
        // border: '2px solid black',
        marginTop: 80,
        marginLeft: 'auto',
        marginRight: 'auto',
        // backgroundColor: 'blue',
        [theme.breakpoints.down('mobile')]: {
            marginTop: 10
        }
    },
    // DescRev: {
    //     [theme.breakpoints.down('mobile')]: {
    //         width: '100%',
    //         display: 'flex',
    //         alignItems: 'center'
    //     }
    // },
    counterButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        border: '2px solid #474747',
        width: 100,
        height: 30,
        borderRadius: 50,
        marginLeft: 40,
        [theme.breakpoints.down('mobile')]: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            border: '2px solid #474747',
            width: 100,
            height: 30,
            borderRadius: 50
        }
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
        marginRight: theme.spacing(1),
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
    },
    DescRevItem: {
        [theme.breakpoints.down('mobile')]: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            listStyle: 'none'
        }
    },
    DescRevItems: {
        [theme.breakpoints.down('mobile')]: {
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'column',
            flexWrap: 'wrap'
        }
    },
    ItemsDesRev: {
        [theme.breakpoints.down('mobile')]: {
            paddingRight: theme.spacing(2)
        }
    },
    BoxDesc: {
        [theme.breakpoints.down('mobile')]: {}
    },
    Tab: {
        [theme.breakpoints.down('mobile')]: {
            width: '100%',
            marginRight: theme.spacing(3)
        }
    },
    tabLabel: {
        color: '#474747',
        textTransform: 'none',
        fontSize: 20,

        [theme.breakpoints.down('mobile')]: {
            color: '#474747',
            textTransform: 'none',
            fontSize: 18
        }
    },
    pickColor: {
        marginBottom: 10,
        [theme.breakpoints.down('mobile')]: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginRight: theme.spacing(0)
        }
    },
    pictIcon: {},
    firstColor: {
        border: '1.5px solid black',
        height: '30px',
        width: '30px',
        backgroundColor: 'white',
        borderRadius: '50%',
        display: 'inline-block',
        marginRight: theme.spacing(2),
        [theme.breakpoints.down('mobile')]: {
            height: '30px',
            width: '30px',
            backgroundColor: 'white',
            borderRadius: '50%',
            display: 'inline-block',
            marginRight: theme.spacing(2)
        }
    },
    secondColor: {
        height: '30px',
        width: '30px',
        backgroundColor: '#D2B77C',
        borderRadius: '50%',
        display: 'inline-block',
        marginRight: theme.spacing(2),
        [theme.breakpoints.down('mobile')]: {
            height: '30px',
            width: '30px',
            backgroundColor: '#D2B77C',
            borderRadius: '50%',
            display: 'inline-block',
            marginRight: theme.spacing(2)
        }
    },
    addFavButton: {
        [theme.breakpoints.down('mobile')]: {}
    },
    Hr: {
        [theme.breakpoints.down('mobile')]: {
            width: '90%',
            alignItems: 'center',
            textAlign: 'left',
            marginLeft: 12,
            marginTop: theme.spacing(2),
            backgroundColor: '#E7E7E7'
        }
    },
    PanelReview: {
        [theme.breakpoints.down('mobile')]: {
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'column'
        }
    },

    ContainerTabs: {
        minHeight: 150
        // backgroundColor: 'yellow'
    },

    TextTabs: {
        textTransform: 'none',
        display: 'flex',
        alignItems: 'center',
        fontWeight: 700,
        color: '#474747',
        fontSize: 20,
        fontFamily: 'Poppins'
    },

    TypeDropdown: {
        display: 'flex',
        flexDirection: 'row',
        width: '70%',
        alignItems: 'center',
        marginBottom: 10
    },
    TextType: {
        width: 100
    }
}));

const Panel = (props) => (
    <div hidden={props.value !== props.index}>
        <Typography>{props.children}</Typography>
    </div>
);

const type = [
    {
        value: 'Pillow',
        label: 'Pillow'
    },
    {
        value: 'Bolster',
        label: 'Bolster'
    }
];

const CardPrice = ({ image }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { isMobile, isTablet, isDesktop } = ReactResponsiveHook();
    // const [arrSelection, setArrSelection] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [priceXqty, setPriceXQTY] = useState(0);
    const { productByName } = useSelector((state) => state.dataProduct);
    const { dataProductOnBag } = useSelector((state) => state.bag);
    const [count, setCount] = useState(0);
    const [index, setIndex] = useState(0);
    const [types, setTypes] = useState('Pillow');
    const [tabs, setTabs] = React.useState('1');

    // console.log('PRO', productByName.desc.length);

    const onTabClicked = (event, newIndex) => {
        setIndex(newIndex);
    };

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleChange2 = (event) => {
        setTypes(event.target.value);
    };

    const handleChangeTabs = (event, newValue) => {
        setTabs(newValue);
    };
    // console.log(productByName, 'cek descippppp');
    // console.log('arrayKOSONG', dataProductOnBag);
    // console.log('Tabsssss', tabs);

    let arr = dataProductOnBag;

    let arrSelection = {
        id: productByName.id, //ini id product yang dari mongodb otomatis
        id_manual_product: productByName.product_id, // ini id mauual product yang SKHU999 itu
        nameProduct: productByName.title,
        imageProduct: productByName.image,
        price: productByName.price,
        promo_price: productByName.promo_price,
        weight: productByName.weight,
        qty: quantity,
        price_x_qty: quantity * productByName.price,
        promo_price_x_qty: quantity * productByName.promo_price
    };

    // console.log('aRRRRR', arrSelection);

    const handleClickAddToCart = () => {
        //fungsi unshift disini nantinya akan ditaruh di redux agar data tidak hilang ketika refresh
        //fungsi unshift dianti dispatch(nama fungsinya)

        arr.unshift(arrSelection);
        dispatch(addToBag(arr));
        alert('Product Anda Berhasil Ditambahkan Ke Keranjang Belanja Anda!');

        // console.log('isi daleman BAG', arr);
    };

    const handleClickTemporary = () => {
        //fungsi unshift disini nantinya akan ditaruh di redux agar data tidak hilang ketika refresh
        //fungsi unshift dianti dispatch(nama fungsinya)
        dispatch(deleteBag([]));
        // console.log('isi daleman BAG', arr);
    };

    const handleIncrement = () => {
        setQuantity((prevCount) => prevCount + 1);
    };

    const handleDecrement = () => {
        if (quantity === 1) {
            setQuantity(1);
        } else {
            setQuantity((prevCount) => prevCount - 1);
        }
    };

    let lookDesktop = (
        <div>
            <div className={classes.productPrice}>
                {productByName.promo_price === 0 ? (
                    <div>
                        <h1 className={classes.normalPrice}>{`IDR ${productByName.price}`}</h1>
                    </div>
                ) : (
                    <>
                        <div>
                            <h1 className={classes.crossedPrice}>{`IDR ${productByName.price}`}</h1>
                        </div>
                        <div>
                            <h1 className={classes.normalPrice}>{`IDR ${productByName.promo_price}`}</h1>
                        </div>
                    </>
                )}
                {/* <div>
                    <h1 className={classes.crossedPrice}>{`IDR ${productByName.price}`}</h1>
                </div>
                <div>
                    <h1 className={classes.normalPrice}>{`IDR ${productByName.promo_price}`}</h1>
                </div> */}
                <CounterButton
                    handleIncrement={handleIncrement}
                    handleDecrement={handleDecrement}
                    quantity={quantity}
                />

                {/* hidupkan jika nanti mo buat whistlist */}
                {/* <div className={classes.pickIcon}>
                    <span className={classes.IconFav}>
                        <AddToFavButton />
                    </span>
                </div> */}
            </div>
            <div className={classes.pickColor}>
                <span className={classes.firstColor}></span>
            </div>
            {/* <div className={classes.TypeDropdown}>
                <div className={classes.TextType}>
                    <p>Type :</p>
                </div>
                <TextField select value={types} onChange={handleChange2} fullWidth size="small">
                    {type.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            </div> */}
        </div>
    );

    let lookMobile = (
        <div>
            {' '}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', marginBottom: 10 }}>
                    {productByName.promo_price === 0 ? (
                        <div>
                            <h1 className={classes.normalPrice}>{`IDR ${productByName.price}`}</h1>
                        </div>
                    ) : (
                        <>
                            <div>
                                <h1 className={classes.crossedPrice}>{`IDR ${productByName.price}`}</h1>
                            </div>
                            <div>
                                <h1 className={classes.normalPrice}>{`IDR ${productByName.promo_price}`}</h1>
                            </div>
                        </>
                    )}
                    {/* <div>
                        <h1 className={classes.crossedPrice}>{`IDR ${productByName.price}`}</h1>
                    </div>
                    <div>
                        <h1 className={classes.normalPrice}>{`IDR ${productByName.promo_price}`}</h1>
                    </div> */}
                </div>

                <div style={{ display: 'flex', marginBottom: 10 }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
                        <span className={classes.firstColor}></span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
                        <CounterButton
                            handleIncrement={handleIncrement}
                            handleDecrement={handleDecrement}
                            quantity={quantity}
                        />
                        {/* hidupkan jika nanti mo buat whistlist */}
                        {/* <div style={{}}>
                            <span>
                                <AddToFavButton />
                            </span>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );

    let lookTablet = (
        <div>
            {' '}
            <div style={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                <div style={{ display: 'flex', marginBottom: 10 }}>
                    {productByName.promo_price === 0 ? (
                        <div>
                            <h1 className={classes.normalPrice}>{`IDR ${productByName.price}`}</h1>
                        </div>
                    ) : (
                        <>
                            <div>
                                <h1 className={classes.crossedPrice}>{`IDR ${productByName.price}`}</h1>
                            </div>
                            <div>
                                <h1 className={classes.normalPrice}>{`IDR ${productByName.promo_price}`}</h1>
                            </div>
                        </>
                    )}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
                        <span className={classes.firstColor}></span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
                        <CounterButton
                            handleIncrement={handleIncrement}
                            handleDecrement={handleDecrement}
                            quantity={quantity}
                        />
                        <div style={{}}>
                            <span>
                                <AddToFavButton />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className={classes.productBox}>
            <div className={classes.productDetail}>
                <div className={classes.productImage}>
                    <img src={productByName.image} alt="rectangle-product" className={classes.productImageBox} />
                </div>
                <div className={classes.productTitle}>
                    <div className={classes.BoxProductTitle}>
                        <h1>{productByName.title}</h1>
                        <div className={classes.productRating}>
                            <div className={classes.ratingProductText}>
                                {`${productByName.rating}.0`}
                                <div className={classes.ratingProduct}>
                                    <Rating size="medium" value={productByName.rating} readOnly />
                                </div>
                            </div>
                        </div>
                        {isMobile ? (isTablet ? (isDesktop ? lookDesktop : lookDesktop) : lookTablet) : lookMobile}

                        {/* <div className={classes.TypeDropdown}>
                            <div className={classes.TextType}>
                                <p style={{ fontSize: 14 }}>Type :</p>
                            </div>
                            <TextField select value={types} onChange={handleChange2} fullWidth size="small">
                                {type.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </div> */}

                        <div className={classes.productDesc}>
                            <div className={classes.productDesc1}>
                                <h4 className={classes.productText}> Bahan : </h4>
                                <span>
                                    {' '}
                                    <p className={classes.fontBahan}>{productByName.material}</p>
                                </span>
                            </div>
                            <hr style={{ border: 'none', marginBottom: 10 }} />
                            <div className={classes.productDesc1}>
                                <h4 className={classes.productText}> Ukuran : </h4>
                                <span>
                                    <p className={classes.fontBahan}>
                                        {' '}
                                        {`${productByName.size.length} cm x ${productByName.size.width_or_diameter} cm (Diameter if its bolster)`}
                                    </p>
                                </span>
                            </div>
                        </div>
                        <div className={classes.divOrangeButton}>
                            <OrangeButton onClick={handleClickAddToCart}>Add to Cart</OrangeButton>
                        </div>
                    </div>
                </div>
            </div>

            <div className={classes.DescRev}>
                <div className={classes.ContainerTabs}>
                    <TabContext value={tabs} variant="fullwidth">
                        <Box sx={{ borderColor: '#1571DE', marginBottom: 3 }}>
                            <TabList onChange={handleChangeTabs} centered>
                                <Tab label={<span className={classes.TextTabs}>Description</span>} value="1" />
                                <Tab
                                    label={<span className={classes.TextTabs}>Reviews</span>}
                                    value="2"
                                    align="right"
                                />
                            </TabList>
                        </Box>
                        {tabs === '1' ? (
                            productByName.desc.length <= 300 ? (
                                <TabPanel value="1">
                                    <p className={classes.fontBahan}>{productByName.desc}</p>
                                </TabPanel>
                            ) : (
                                <TabPanel value="1">
                                    <ReadMoreLess limit={300}>
                                        <p className={classes.fontBahan}>{productByName.desc}</p>
                                    </ReadMoreLess>
                                </TabPanel>
                            )
                        ) : (
                            <TabPanel value="2">
                                <TabCard />
                            </TabPanel>
                        )}
                    </TabContext>
                </div>
            </div>

            {/* <div className={classes.DetailButton}>
                <MainBlackButton className={'BlackButton'} onClick={handleClickTemporary}>
                    More Detail
                </MainBlackButton>
            </div> */}
        </div>
    );
};

export default CardPrice;
