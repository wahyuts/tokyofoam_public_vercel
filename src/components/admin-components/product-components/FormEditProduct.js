import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
import MainBlackButton from '../../../utils/re-useable-components/buttons/MainBlackButton';
import {
    deleteProduct,
    getProductById,
    updateDataInformasiUmum,
    updateDeskripsiDataProduct,
    updateDetailSEO,
    updateDetailSpesifikasi,
    uploadImage
} from '../../../redux/actions/dataProductActions';

const useStyles = makeStyles((theme) => ({
    fontSizepHere: {
        fontSize: 14
    },
    fullMainCont2Button: {
        width: '100%',
        // backgroundColor: '#FFFFFF',
        // backgroundColor: 'green',
        borderRadius: 8,
        marginBottom: 30,
        minHeight: 56
    },
    fullMainCont: {
        width: '100%',
        backgroundColor: '#FFFFFF',
        // backgroundColor: 'green',
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
    mainContBackButton: {
        width: '95%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 10,
        marginBottom: 10,
        display: 'flex',
        justifyContent: 'flex-start',
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
    }
}));

const FormEditProduk = ({ defaultImage }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const router = useRouter();
    const { productById } = useSelector((state) => state.dataProduct);
    // Data buat upload image (Langsung ke cloudinary)
    const fileSelect = useRef(null);
    const [image, setImage] = useState(defaultImage);
    const [progress, setProgress] = useState(0);
    const [photoName, setPhotoName] = useState('');
    // Data buat POST or PUT
    const [photo, setPhoto] = useState(productById.photo);
    const [idMongoDb, setIdMongoDb] = useState(productById._id);
    const [title, setTitle] = useState(productById.title);
    const [productId, setProductId] = useState(productById.product_id);
    const [price, setPrice] = useState(productById.price);
    const [promoPrice, setPromoPrice] = useState(productById.promo_price);
    const [material, setMaterial] = useState(productById.material);
    const [sizeLength, setSizeLength] = useState(productById.size.length);
    const [sizeWidthDiameter, setSizeWidthDiameter] = useState(productById.size.width_or_diameter);
    const [rating, setRating] = useState(productById.rating);
    const [weight, setWeight] = useState(productById.weight);
    const [type, setType] = useState(productById.type);
    const [desc, setDesc] = useState(productById.desc);
    const [statusStok, setStatusStok] = useState(productById.status_stok);

    const [metaKey, setMetaKey] = useState(productById.meta_key);
    const [metaDesc, setMetaDesc] = useState(productById.meta_desc);

    useEffect(() => {
        setIdMongoDb(productById._id);
        //Untuk Informasi Umum
        setPhoto(productById.photo);
        setTitle(productById.title);
        setProductId(productById.product_id);
        setType(productById.type);
        setWeight(productById.weight);
        setPrice(productById.price);
        setPromoPrice(productById.promo_price);
        //Untuk Deskripsi
        setDesc(productById.desc);
        //Untuk Detail spesifikasi
        setMaterial(productById.material);
        setSizeLength(productById.size.length);
        setSizeWidthDiameter(productById.size.width_or_diameter);
        setRating(productById.rating);
        setStatusStok(productById.status_stok);
        //Untuk SEO
        setMetaKey(productById.meta_key);
        setMetaDesc(productById.meta_desc);
    }, [
        // dispatch,
        productById._id,
        productById.photo,
        productById.title,
        productById.product_id,
        productById.type,
        productById.weight,
        productById.price,
        productById.promo_price,
        productById.desc,
        productById.material,
        productById.size.length,
        productById.size.width_or_diameter,
        productById.rating,
        productById.status_stok,
        productById.meta_key,
        productById.meta_desc,
        idMongoDb
    ]);
    // console.log('ID MONGO', idMongoDb);
    // console.log('TITLE', title);
    // console.log('SKU', productId);
    // console.log('META DESC', metaDesc);

    const buttonBack = () => {
        router.push(`/admin/produk`);
    };

    //fungsi buat setor upload image ke server via HTML Request ke cloudinary langsung
    const uploadFile = (files) => {
        // const url = `https://tokyofoam.herokuapp.com/api/product/updatePhotoProduct/${idMongoDb}`;
        const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME}/upload`;
        const xhr = new XMLHttpRequest();
        const fd = new FormData();
        xhr.open('PUT', url, true);
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
                console.log('seputar image', response.secure_url);
                const formData = {
                    photo: response.secure_url
                };
                dispatch(uploadImage(formData, idMongoDb));
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

    //***************************************************************************** */

    //****************Fungsi button setiap edit *********************************** */
    const handleEditInformasiUmum = () => {
        const DataEditProduct = {
            title: title,
            product_id: productId,
            type: type,
            weight: weight,
            price: price,
            promo_price: promoPrice
        };
        dispatch(updateDataInformasiUmum(DataEditProduct, idMongoDb));
    };

    const handleEditDeskripsi = () => {
        const DataEditProduct = {
            desc: desc
        };
        dispatch(updateDeskripsiDataProduct(DataEditProduct, idMongoDb));
    };

    const handleEditDetailSpesifikasi = () => {
        const DataEditProduct = {
            material: material,
            'size.length': sizeLength,
            'size.width_or_diameter': sizeWidthDiameter,
            rating: rating,
            status_stok: statusStok
        };
        dispatch(updateDetailSpesifikasi(DataEditProduct, idMongoDb));
    };

    const handleEditSeoKeyword = () => {
        const DataEditProduct = {
            meta_key: metaKey,
            meta_desc: metaDesc
        };
        dispatch(updateDetailSEO(DataEditProduct, idMongoDb));
    };

    //*************************************************************************************** */

    //*******************DELETE PRODUCT **********************************/

    const handleDeleteProduct = () => {
        dispatch(deleteProduct(idMongoDb, router));
    };

    //**********************OnChange setiap text************************************************* */
    const handleChangeProductId = (event) => {
        setProductId(event.target.value);
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

    const handleChangeMetaKey = (e) => {
        setMetaKey(e.target.value);
    };

    const handleChangeMetaDesc = (e) => {
        setMetaDesc(e.target.value);
    };

    //************************************************************************************** */

    // console.log('PRICE', price);
    // console.log('TIT', title);

    return (
        <>
            <div className={classes.fullMainCont2Button}>
                <div className={classes.mainContBackButton}>
                    <div style={{ width: 186, marginRight: 10, marginBottom: 10 }}>
                        <MainBlackButton className={'BlackButton'} onClick={buttonBack}>
                            Back
                        </MainBlackButton>
                    </div>
                </div>
            </div>

            <div className={classes.fullMainCont}>
                <div className={classes.mainCont1}>
                    <div>
                        <p style={{ fontSize: 16, fontWeight: 'bold' }}>Info Umum</p>
                    </div>
                    <div style={{ width: 186, marginRight: 10, marginBottom: 10 }}>
                        <MainBlackButton className={'PurpleButton'} onClick={handleEditInformasiUmum}>
                            Edit & Update
                        </MainBlackButton>
                    </div>
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
                        <div style={{ width: '100%' }}>
                            <Image
                                src={photo}
                                alt="Product Image"
                                width={300}
                                height={300}
                                priority="true"
                                layout="responsive"
                                objectFit="fill"
                            />
                        </div>
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
                    </div>

                    <div style={{ width: '70%', minHeight: 360, marginBottom: 20 }}>
                        <div>
                            <p className={classes.fontSizepHere}>Nama Product</p>
                            <input
                                className={classes.textAreaForm}
                                name="title"
                                type="text"
                                rows="1"
                                onChange={handleChangeTitle}
                                value={title}
                            >
                                {/* {date} */}
                            </input>
                        </div>
                        <hr style={{ border: 'none', marginBottom: 25 }} />
                        <div>
                            <p className={classes.fontSizepHere}>SKU</p>
                            <input
                                className={classes.textAreaForm}
                                name="product_id"
                                type="text"
                                rows="1"
                                value={productId}
                                onChange={handleChangeProductId}
                                // value={productById.product_id}
                            />
                            {/* {date} */}
                            {/* </TextField> */}
                        </div>
                        <hr style={{ border: 'none', marginBottom: 25 }} />
                        <div>
                            <p className={classes.fontSizepHere}>Type</p>
                            <input
                                className={classes.textAreaForm}
                                name="type"
                                type="text"
                                rows="1"
                                value={type}
                                disabled
                            >
                                {/* {date} */}
                            </input>
                        </div>
                        <hr style={{ border: 'none', marginBottom: 25 }} />
                        <div>
                            <p className={classes.fontSizepHere}>Berat (in gram)</p>
                            <input
                                className={classes.textAreaForm}
                                name="weight"
                                type="text"
                                rows="1"
                                onChange={handleChangeWeight}
                                value={weight}
                            >
                                {/* {date} */}
                            </input>
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
                            >
                                {/* {date} */}
                            </input>
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
                            >
                                {/* {date} */}
                            </input>
                        </div>
                    </div>
                </div>
            </div>

            <div className={classes.fullMainCont}>
                <div className={classes.mainCont1}>
                    <div>
                        <p style={{ fontSize: 16, fontWeight: 'bold' }}>Deskripsi</p>
                    </div>
                    <div style={{ width: 186, marginRight: 10, marginBottom: 10 }}>
                        <MainBlackButton className={'PurpleButton'} onClick={handleEditDeskripsi}>
                            Edit & Update
                        </MainBlackButton>
                    </div>
                </div>
                <div className={classes.mainContDesc}>
                    <div style={{ width: '97%' }}>
                        <textarea
                            className={classes.textAreaFormMultiline}
                            name="desc"
                            type="text"
                            rows="8"
                            placeholder="Ketik descripsion disini"
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
                    <div style={{ width: 186, marginRight: 10, marginBottom: 10 }}>
                        <MainBlackButton className={'PurpleButton'} onClick={handleEditDetailSpesifikasi}>
                            Edit & Update
                        </MainBlackButton>
                    </div>
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
                                onChange={handleChangeMaterial}
                                value={material}
                            >
                                {/* {date} */}
                            </input>
                        </div>
                        <hr style={{ border: 'none', marginBottom: 25 }} />
                        <div>
                            <p className={classes.fontSizepHere}>Ukuran Panjang (in cm)</p>
                            <input
                                className={classes.textAreaFormSeo}
                                name="size.length"
                                type="number"
                                rows="1"
                                onChange={handleChangeLength}
                                value={sizeLength}
                            >
                                {/* {date} */}
                            </input>
                        </div>
                        <hr style={{ border: 'none', marginBottom: 25 }} />
                        <div>
                            <p className={classes.fontSizepHere}>Ukuran Lebar / Diameter (in cm)</p>
                            <input
                                className={classes.textAreaFormSeo}
                                name="size.width_or_diameter"
                                type="number"
                                rows="1"
                                onChange={handleChangeWidthDiameter}
                                value={sizeWidthDiameter}
                            >
                                {/* {date} */}
                            </input>
                        </div>
                        <hr style={{ border: 'none', marginBottom: 25 }} />
                        <div>
                            <p className={classes.fontSizepHere}>Rating (1 sd 5)</p>
                            <input
                                className={classes.textAreaFormSeo}
                                name="rating"
                                type="number"
                                rows="1"
                                onChange={handleChangeRating}
                                value={rating}
                            >
                                {/* {date} */}
                            </input>
                        </div>
                        <hr style={{ border: 'none', marginBottom: 25 }} />
                        <div>
                            <p className={classes.fontSizepHere}>Stok Ready</p>
                            <input
                                className={classes.textAreaFormSeo}
                                name="rating"
                                type="text"
                                rows="1"
                                value={statusStok}
                                disabled
                            >
                                {/* {date} */}
                            </input>
                        </div>
                    </div>
                </div>
            </div>

            <div className={classes.fullMainCont}>
                <div className={classes.mainCont1}>
                    <div>
                        <p style={{ fontSize: 16, fontWeight: 'bold' }}>SEO (Search Engine Optimation)</p>
                    </div>
                    <div style={{ width: 186, marginRight: 10, marginBottom: 10 }}>
                        <MainBlackButton className={'PurpleButton'} onClick={handleEditSeoKeyword}>
                            Edit & Update
                        </MainBlackButton>
                    </div>
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
                                onChange={handleChangeMetaKey}
                                value={metaKey}
                            >
                                {/* {date} */}
                            </input>
                        </div>
                        <hr style={{ border: 'none', marginBottom: 25 }} />
                        <p className={classes.fontSizepHere}>Meta Description</p>
                        <textarea
                            className={classes.textAreaFormSeo}
                            name="meta_desc"
                            type="text"
                            rows="2"
                            placeholder="Ketik meta-desc disini"
                            onChange={handleChangeMetaDesc}
                            value={metaDesc}
                        >
                            {/* {date} */}
                        </textarea>
                    </div>
                </div>
            </div>

            <div className={classes.fullMainCont2Button}>
                <div className={classes.mainContBackButton}>
                    <div style={{ width: 186, marginRight: 10, marginBottom: 10 }}>
                        <MainBlackButton className={'RedButton'} onClick={handleDeleteProduct}>
                            DELETE PRODUCT
                        </MainBlackButton>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FormEditProduk;
