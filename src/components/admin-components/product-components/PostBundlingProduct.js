import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { makeStyles } from '@mui/styles';
import MainBlackButton from '../../../utils/re-useable-components/buttons/MainBlackButton';
import NoImage from '../../../../public/assets/images/no-image.png';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress } from '@mui/material';
import { postCreateNewProduct } from '../../../redux/actions/dataProductActions';

const useStyles = makeStyles((theme) => ({
    fontSizepHere: {
        fontSize: 14
    },
    fullMainCont2Button: {
        width: '100%',
        // backgroundColor: 'green',
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        marginBottom: 30,
        minHeight: 56
    },
    fullMainCont: {
        width: '100%',
        // backgroundColor: 'green',
        backgroundColor: '#FFFFFF',

        borderRadius: 8,
        marginBottom: 30,
        minHeight: 186
    },
    mainCont2Button: {
        width: '95%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 10,
        marginBottom: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
        // backgroundColor: 'pink'
    },
    mainCont1: {
        width: '95%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 10,
        marginBottom: 10,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
        // backgroundColor: 'pink'
    },
    mainCont2: {
        width: '95%',
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'flex'
        // backgroundColor: 'pink'
    },
    mainContDesc: {
        width: '95%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 10,
        marginBottom: 10,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
        // backgroundColor: 'pink'
    },
    textAreaForm: {
        paddingLeft: 10,
        paddingTop: 5,
        paddingBottom: 10,
        outline: 'none',
        fontSize: 15,
        fontWeight: 400,
        width: '95%',
        // width: '60%',
        border: 'none',
        backgroundColor: 'transparent',
        borderBottom: '1px solid #DFE0EB',
        [theme.breakpoints.down('mobile')]: {
            width: '100%'
        }
    },
    textAreaFormMultiline: {
        paddingLeft: 10,
        paddingTop: 5,
        paddingBottom: 10,
        outline: 'none',
        fontSize: 15,
        fontWeight: 400,
        width: '100%',
        // width: '60%',
        border: 'none',
        backgroundColor: 'transparent',
        // borderBottom: '1px solid #DFE0EB',
        [theme.breakpoints.down('mobile')]: {
            width: '100%'
        }
    },
    textAreaFormSeo: {
        paddingLeft: 10,
        paddingTop: 5,
        paddingBottom: 10,
        outline: 'none',
        fontSize: 15,
        fontWeight: 400,
        width: '100%',
        // width: '60%',
        border: 'none',
        backgroundColor: 'transparent',
        borderBottom: '1px solid #DFE0EB',
        [theme.breakpoints.down('mobile')]: {
            width: '100%'
        }
    },
    errorFormik: {
        color: '#d41a1a',
        fontSize: 12
    },
    ContBlackButton: {
        '& .BlackButton': {
            backgroundColor: '#2C2C2C',
            color: '#FFFFFF',
            width: '100%',
            fontWeight: 600,
            textTransform: 'none',
            marginTop: 15,
            borderRadius: 5
        },

        '& .BorderBlueButton': {
            backgroundColor: '#FFFFFF',
            border: '2px solid #7ABAE8',
            cursor: 'pointer',
            borderWidht: '1px',
            color: '#7ABAE8',
            width: '100%',
            height: 30,
            fontWeight: 600,
            textTransform: 'none',
            marginTop: 15,
            borderRadius: 5
        },

        '& .BlackButton:hover': {
            backgroundColor: '#2C2C2C'
        },

        '& .BorderBlueButton:hover': {
            backgroundColor: '#FFFFFF'
        }
    }
}));

const PostBundlingProduct = ({ defaultImage }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.UI);

    // Data buat upload image (Langsung ke cloudinary)
    const fileSelect = useRef(null);
    const [showNoImage, setShowNoImage] = useState(true);
    const [image, setImage] = useState(defaultImage);
    const [progress, setProgress] = useState(0);
    const [photoName, setPhotoName] = useState('');

    const [photo, setPhoto] = useState('');
    const [productId, setProductId] = useState('');
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState();
    const [promoPrice, setPromoPrice] = useState();
    const [material, setMaterial] = useState('');
    const [sizeLength, setSizeLength] = useState();
    const [sizeWidthDiameter, setSizeWidthDiameter] = useState();
    const [rating, setRating] = useState();
    const [weight, setWeight] = useState();
    const [type, setType] = useState('bundling product');
    const [desc, setDesc] = useState('');
    const [statusStok, setStatusStok] = useState('ready');

    const [metaKey, setMetaKey] = useState('');
    const [metaDesc, setMetaDesc] = useState('');

    const handleClickNewProductBundling = () => {
        const data = {
            photo: image,
            title: title,
            product_id: productId,
            type: type,
            weight: weight,
            price: price,
            promo_price: promoPrice,
            desc: desc,
            material: material,
            'size.length': sizeLength,
            'size.width_or_diameter': sizeWidthDiameter,
            rating: rating,
            status_stok: statusStok,
            meta_key: metaKey,
            meta_desc: metaDesc
        };
        console.log('DATA NEW PRODUCT', data);
        dispatch(postCreateNewProduct(data));
    };

    //fungsi buat setor upload image ke server via HTML Request ke cloudinary langsung
    const uploadFile = (files) => {
        // const url = `https://tokyofoam.herokuapp.com/api/product/updatePhotoProduct/${idMongoDb}`;
        const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME}/upload`;
        const xhr = new XMLHttpRequest();
        const fd = new FormData();
        xhr.open('POST', url, true);
        // xhr.open('POST', url, true);
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

        // Update progress (can be used to show progress indicator)
        xhr.upload.addEventListener('progress', (e) => {
            setProgress(Math.round((e.loaded * 100.0) / e.total));
            console.log(Math.round((e.loaded * 100.0) / e.total));
        });

        xhr.onreadystatechange = (e) => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);

                setImage(response.secure_url);
                setShowNoImage(false);
                console.log('seputar image', response.secure_url);
                // const formData = {
                //     photo: response.secure_url
                // };
                // dispatch(uploadImage(formData, idMongoDb));
                // console.log('seputar image', image);
            }
        };

        fd.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UNSIGNED_UPLOAD_PRESET);
        fd.append('tags', 'browser_upload');
        fd.append('file', files);
        xhr.send(fd);
    };

    function handleFiles(files) {
        for (let i = 0; i < files.length; i++) {
            console.log(files[i]);
            uploadFile(files[i]);
            // handleImage(files[i]);
            setPhotoName(files[i].name);
        }
    }

    const handleEditPicture = () => {
        // const fileinput = document.getElementById('imageInput');
        // fileinput.click();
        if (fileSelect) {
            fileSelect.current.click();
        }
    };

    //******************************************************************** */

    const handleChangeProductId = (e) => {
        setProductId(e.target.value);
    };

    const handleChangeTitle = (e) => {
        setTitle(e.target.value);
    };

    const handleChangePrice = (e) => {
        setPrice(e.target.value);
    };

    const handleChangePromoPrice = (e) => {
        setPromoPrice(e.target.value);
    };

    const handleChangeMaterial = (e) => {
        setMaterial(e.target.value);
    };

    const handleChangeLength = (e) => {
        setSizeLength(e.target.value);
    };

    const handleChangeWidthDiameter = (e) => {
        setSizeWidthDiameter(e.target.value);
    };

    const handleChangeRating = (e) => {
        setRating(e.target.value);
    };

    const handleChangeWeight = (e) => {
        setWeight(e.target.value);
    };

    const handleChangeType = (e) => {
        setType(e.target.value);
    };

    const handleChangeDesc = (e) => {
        setDesc(e.target.value);
    };

    const handleChangeStatusStok = (e) => {
        setStatusStok(e.target.value);
    };

    const handleChangeMetaKey = (e) => {
        setMetaKey(e.target.value);
    };

    const handleChangeMetaDesc = (e) => {
        setMetaDesc(e.target.value);
    };

    // console.log('PRICE', price);
    // console.log('META', metaDesc);
    return (
        <>
            <div className={classes.fullMainCont}>
                <div className={classes.mainCont1}>
                    <div>
                        <p style={{ fontSize: 16, fontWeight: 'bold' }}>Info Umum</p>
                    </div>
                    <hr style={{ border: 'none', marginBottom: 55 }} />
                </div>
                <div className={classes.mainCont1}>
                    <div
                        style={{
                            width: '30%',
                            minHeight: 360,
                            marginRight: 20,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#F4F1F0'
                        }}
                    >
                        {showNoImage === true ? (
                            <div style={{ width: '100%' }}>
                                <Image
                                    src={NoImage}
                                    alt="Product Image"
                                    width={300}
                                    height={300}
                                    priority="true"
                                    layout="responsive"
                                    objectFit="fill"
                                />
                            </div>
                        ) : (
                            <div style={{ width: '100%' }}>
                                <Image
                                    src={image}
                                    alt="Product Image"
                                    width={300}
                                    height={300}
                                    priority="true"
                                    layout="responsive"
                                    objectFit="fill"
                                />
                            </div>
                        )}

                        {/* <input type="file" id="imageInput" ref={fileSelect} hidden="hidden" onChange={handleImage} /> */}
                        <input
                            type="file"
                            id="imageInput"
                            ref={fileSelect}
                            hidden="hidden"
                            onChange={(e) => handleFiles(e.target.files)}
                        />

                        <div>
                            <div style={{ width: 186, marginRight: 10, marginBottom: 10 }}>
                                <MainBlackButton className={'BlackButton'} onClick={handleEditPicture}>
                                    Upload Image
                                </MainBlackButton>
                            </div>
                        </div>
                        <input
                            className={classes.textAreaForm}
                            name="photo"
                            type="text"
                            rows="1"
                            disabled
                            placeholder="Name Image"
                            // onChange={handleChangeTitle}
                            value={photoName}
                        >
                            {/* {date} */}
                        </input>
                        {/* {formik.errors.photo && formik.touched.photo && (
                                <p className={classes.errorFormik}>{formik.errors.photo}</p>
                            )} */}
                    </div>

                    <div style={{ width: '70%', minHeight: 360, marginBottom: 20 }}>
                        <div>
                            <p className={classes.fontSizepHere}>Nama Product</p>
                            <input
                                className={classes.textAreaForm}
                                name="title"
                                type="text"
                                rows="1"
                                // onChange={formik.handleChange}
                                // value={formik.values.title}
                                onChange={handleChangeTitle}
                                value={title}
                            >
                                {/* {date} */}
                            </input>
                            {/* {formik.errors.title && formik.touched.title && (
                                    <p className={classes.errorFormik}>{formik.errors.title}</p>
                                )} */}
                        </div>
                        <hr style={{ border: 'none', marginBottom: 25 }} />
                        <div>
                            <p className={classes.fontSizepHere}>SKU</p>
                            <input
                                className={classes.textAreaForm}
                                name="product_id"
                                type="text"
                                rows="1"
                                // onChange={formik.handleChange}
                                // value={formik.values.product_id}
                                onChange={handleChangeProductId}
                                value={productId}
                            >
                                {/* {date} */}
                            </input>
                            {/* {formik.errors.product_id && formik.touched.product_id && (
                                    <p className={classes.errorFormik}>{formik.errors.product_id}</p>
                                )} */}
                        </div>
                        <hr style={{ border: 'none', marginBottom: 25 }} />
                        <div>
                            <p className={classes.fontSizepHere}>Type</p>
                            <input
                                className={classes.textAreaForm}
                                name="type"
                                type="text"
                                rows="1"
                                // onChange={formik.handleChange}
                                // value={formik.values.type}
                                onChange={handleChangeType}
                                value={type}
                                disabled
                            >
                                {/* {date} */}
                            </input>
                            {/* {formik.errors.type && formik.touched.type && (
                                    <p className={classes.errorFormik}>{formik.errors.type}</p>
                                )} */}
                        </div>
                        <hr style={{ border: 'none', marginBottom: 25 }} />
                        <div>
                            <p className={classes.fontSizepHere}>Berat</p>
                            <input
                                className={classes.textAreaForm}
                                name="weight"
                                type="number"
                                rows="1"
                                // onChange={formik.handleChange}
                                // value={formik.values.weight}
                                onChange={handleChangeWeight}
                                value={weight}
                            >
                                {/* {date} */}
                            </input>
                            {/* {formik.errors.weight && formik.touched.weight && (
                                    <p className={classes.errorFormik}>{formik.errors.weight}</p>
                                )} */}
                        </div>
                        <hr style={{ border: 'none', marginBottom: 25 }} />
                        <div>
                            <p className={classes.fontSizepHere}>Harga</p>
                            <input
                                className={classes.textAreaForm}
                                name="price"
                                type="number"
                                rows="1"
                                onChange={handleChangePrice}
                                value={price}
                                // onChange={formik.handleChange}
                                // value={formik.values.price}
                            >
                                {/* {date} */}
                            </input>
                            {/* {formik.errors.price && formik.touched.price && (
                                    <p className={classes.errorFormik}>{formik.errors.price}</p>
                                )} */}
                        </div>
                        <hr style={{ border: 'none', marginBottom: 25 }} />
                        <div>
                            <p className={classes.fontSizepHere}>Harga Diskon</p>
                            <input
                                className={classes.textAreaForm}
                                name="promo_price"
                                type="number"
                                rows="1"
                                onChange={handleChangePromoPrice}
                                value={promoPrice}
                                // onChange={formik.handleChange}
                                // value={formik.values.promo_price}
                            >
                                {/* {date} */}
                            </input>
                            {/* {formik.errors.promo_price && formik.touched.promo_price && (
                                    <p className={classes.errorFormik}>{formik.errors.promo_price}</p>
                                )} */}
                        </div>
                    </div>
                </div>
            </div>

            <div className={classes.fullMainCont}>
                <div className={classes.mainCont1}>
                    <div>
                        <p style={{ fontSize: 16, fontWeight: 'bold' }}>Deskripsi</p>
                    </div>
                    <hr style={{ border: 'none', marginBottom: 55 }} />
                </div>
                {/* {formik.errors.desc && formik.touched.desc && (
                        <p style={{ marginLeft: '2.7%' }} className={classes.errorFormik}>
                            {formik.errors.desc}
                        </p>
                    )} */}
                <div className={classes.mainContDesc}>
                    <div style={{ width: '97%' }}>
                        <textarea
                            className={classes.textAreaFormMultiline}
                            name="desc"
                            type="text"
                            rows="8"
                            placeholder="Ketik descripsion disini"
                            // onChange={formik.handleChange}
                            // value={formik.values.desc}
                            onChange={handleChangeDesc}
                            value={desc}
                        >
                            {/* {date} */}
                        </textarea>
                    </div>
                </div>
            </div>

            <div className={classes.fullMainCont}>
                <div className={classes.mainCont1}>
                    <div>
                        <p style={{ fontSize: 16, fontWeight: 'bold' }}>Detail Spesifikasi</p>
                    </div>
                    <hr style={{ border: 'none', marginBottom: 55 }} />
                </div>
                <div className={classes.mainContDesc}>
                    <div style={{ width: '97%', marginBottom: 20 }}>
                        <div>
                            <p className={classes.fontSizepHere}>Bahan</p>
                            <input
                                className={classes.textAreaFormSeo}
                                name="material"
                                type="text"
                                rows="1"
                                // onChange={formik.handleChange}
                                // value={formik.values.material}
                                onChange={handleChangeMaterial}
                                value={material}
                            >
                                {/* {date} */}
                            </input>
                            {/* {formik.errors.material && formik.touched.material && (
                                    <p className={classes.errorFormik}>{formik.errors.material}</p>
                                )} */}
                        </div>
                        <hr style={{ border: 'none', marginBottom: 25 }} />
                        <div>
                            <p className={classes.fontSizepHere}>Ukuran Panjang</p>
                            <input
                                className={classes.textAreaFormSeo}
                                name="size.length"
                                type="number"
                                rows="1"
                                onChange={handleChangeLength}
                                value={sizeLength}
                                // onChange={formik.handleChange}
                                // value={formik.values.size.length}
                            >
                                {/* {date} */}
                            </input>
                            {/* {formik.errors.size.length && formik.touched.size.length && (
                                    <p className={classes.errorFormik}>{formik.errors.size.length}</p>
                                )} */}
                        </div>
                        <hr style={{ border: 'none', marginBottom: 25 }} />
                        <div>
                            <p className={classes.fontSizepHere}>Ukuran Lebar / Diameter</p>
                            <input
                                className={classes.textAreaFormSeo}
                                name="size.width_or_diameter"
                                type="number"
                                rows="1"
                                onChange={handleChangeWidthDiameter}
                                value={sizeWidthDiameter}
                                // onChange={formik.handleChange}
                                // value={formik.values.size.width_or_diameter}
                            >
                                {/* {date} */}
                            </input>
                            {/* {formik.errors.size.width_or_diameter && formik.touched.size.width_or_diameter && (
                                    <p className={classes.errorFormik}>{formik.errors.size.width_or_diameter}</p>
                                )} */}
                        </div>
                        <hr style={{ border: 'none', marginBottom: 25 }} />
                        <div>
                            <p className={classes.fontSizepHere}>Rating</p>
                            <input
                                className={classes.textAreaFormSeo}
                                name="rating"
                                type="number"
                                rows="1"
                                onChange={handleChangeRating}
                                value={rating}
                                // onChange={formik.handleChange}
                                // value={formik.values.rating}
                            >
                                {/* {date} */}
                            </input>
                            {/* {formik.errors.rating && formik.touched.rating && (
                                    <p className={classes.errorFormik}>{formik.errors.rating}</p>
                                )} */}
                        </div>
                        <hr style={{ border: 'none', marginBottom: 25 }} />
                        <div>
                            <p className={classes.fontSizepHere}>Stok Ready</p>
                            <input
                                className={classes.textAreaFormSeo}
                                name="rating"
                                type="text"
                                rows="1"
                                onChange={handleChangeStatusStok}
                                value={statusStok}
                                // onChange={formik.handleChange}
                                // value={formik.values.status_stok}
                                disabled
                            >
                                {/* {date} */}
                            </input>
                            {/* {formik.errors.status_stok && formik.touched.status_stok && (
                                    <p className={classes.errorFormik}>{formik.errors.status_stok}</p>
                                )} */}
                        </div>
                    </div>
                </div>
            </div>

            <div className={classes.fullMainCont}>
                <div className={classes.mainCont1}>
                    <div>
                        <p style={{ fontSize: 16, fontWeight: 'bold' }}>SEO (Search Engine Optimation)</p>
                    </div>
                    <hr style={{ border: 'none', marginBottom: 55 }} />
                </div>
                <div className={classes.mainContDesc}>
                    <div style={{ width: '97%' }}>
                        <div>
                            <p className={classes.fontSizepHere}>Meta Key</p>
                            <input
                                className={classes.textAreaFormSeo}
                                name="meta_key"
                                type="text"
                                rows="1"
                                // onChange={formik.handleChange}
                                // value={formik.values.meta_key}
                                onChange={handleChangeMetaKey}
                                value={metaKey}
                            >
                                {/* {date} */}
                            </input>
                            {/* {formik.errors.meta_key && formik.touched.meta_key && (
                                    <p className={classes.errorFormik}>{formik.errors.meta_key}</p>
                                )} */}
                        </div>
                        <hr style={{ border: 'none', marginBottom: 25 }} />
                        <p className={classes.fontSizepHere}>Meta Description</p>
                        <textarea
                            className={classes.textAreaFormSeo}
                            name="meta_desc"
                            type="text"
                            rows="2"
                            placeholder="Ketik meta-desc disini"
                            // onChange={formik.handleChange}
                            // value={formik.values.meta_desc}
                            onChange={handleChangeMetaDesc}
                            value={metaDesc}
                        >
                            {/* {date} */}
                        </textarea>
                        {/* {formik.errors.meta_desc && formik.touched.meta_desc && (
                                <p className={classes.errorFormik}>{formik.errors.meta_desc}</p>
                            )} */}
                    </div>
                </div>
            </div>

            <div className={classes.fullMainCont2Button}>
                <div className={classes.mainCont2Button}>
                    <div style={{ width: 186, marginRight: 10, marginBottom: 10 }}>
                        <div className={classes.ContBlackButton}>
                            <button onClick={handleClickNewProductBundling} className="BorderBlueButton">
                                {loading === false ? `Save` : null}
                                {loading && (
                                    <CircularProgress
                                        className="progress"
                                        size={
                                            18 // jika loading true maka tampilkan spinner
                                        }
                                    />
                                )}
                            </button>
                        </div>
                        {/* {errors && <p className="customError">{errors.general}</p>} */}
                        {/* <MainBlackButton className={'BlackButton'}>Save</MainBlackButton> */}
                    </div>
                </div>
            </div>
        </>
    );
};

export default PostBundlingProduct;
