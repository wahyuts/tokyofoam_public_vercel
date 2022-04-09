import React, { useState, useRef, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { Button, Card } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import Image from 'next/image';
import CameraImage from '../../../../../public/assets/images/CameraImage.png';
import FirstImage from './HomeSubBannerComp/FirstImage';
import SecondImage from './HomeSubBannerComp/SecondImage';
import ThirdImage from './HomeSubBannerComp/ThirdImage';
import { useDispatch, useSelector } from 'react-redux';
import { getDataSettingsSubBanner, patchDataSettingsSubBanner } from '../../../../redux/actions/dataSituskuAction';

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
        columnGap: 20,
        display: 'flex',
        justifyContent: 'space-between',
        [theme.breakpoints.down('tablet')]: {
            flexDirection: 'column',
            rowGap: 20
        },
        [theme.breakpoints.down('desktopHD')]: {
            flexDirection: 'column',
            rowGap: 20
        }
    },
    ItemLeft: {
        flex: 1
    },
    ItemRight: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        rowGap: 20
    },
    ImageLeft: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        width: 240.48,
        height: 240.48,
        background: 'rgba(211, 226, 255, 0.1)',
        border: '1px dashed #9e9e9e',
        borderRadius: 8,
        cursor: 'pointer',
        position: 'relative'
        // [theme.breakpoints.down('tablet')]: {
        //     width: 150
        // },
    },
    ImageRight1: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        width: 240.48,
        height: 112.73,
        background: 'rgba(211, 226, 255, 0.1)',
        border: '1px dashed #9e9e9e',
        borderRadius: 8,
        cursor: 'pointer',
        position: 'relative'
    },
    ImageRight2: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        width: 240.48,
        height: 112.73,
        background: 'rgba(211, 226, 255, 0.1)',
        border: '1px dashed #9e9e9e',
        borderRadius: 8,
        cursor: 'pointer',
        position: 'relative'
    },
    ParentImageAfterUpload: {
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        borderRadius: 8,
        position: 'relative',
        display: 'block'
    },
    ImageAfterUpload: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        cursor: 'pointer'
    }
}));

const HomeSubBanner = () => {
    const token = localStorage.getItem('FBIdToken');
    const { dataSettingsSubBanner } = useSelector((state) => state.dataSitusku);
    const dispatch = useDispatch();
    const classes = useStyles();
    const fileSelect = useRef(null);
    const fileSelect2 = useRef(null);
    const fileSelect3 = useRef(null);
    const [image, setImage] = useState('');
    const [image2, setImage2] = useState('');
    const [image3, setImage3] = useState('');
    const [showNoImage, setShowNoImage] = useState(true);
    const [photoName, setPhotoName] = useState('');
    const [progress, setProgress] = useState(0);
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
    const uploadFile2 = (files) => {
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
                const response2 = JSON.parse(xhr.responseText);

                setImage2(response2.secure_url);
                setShowNoImage(false);
                console.log('seputar image', response2.secure_url);
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
    const uploadFile3 = (files) => {
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
                const response3 = JSON.parse(xhr.responseText);
                setImage3(response3.secure_url);
                setShowNoImage(false);
                console.log('seputar image', response3.secure_url);
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
    function handleFiles2(files) {
        for (let i = 0; i < files.length; i++) {
            console.log(files[i]);
            uploadFile2(files[i]);
            // handleImage(files[i]);
            setPhotoName(files[i].name);
        }
    }
    function handleFiles3(files) {
        for (let i = 0; i < files.length; i++) {
            console.log(files[i]);
            uploadFile3(files[i]);
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

    const handleEditPicture2 = () => {
        // const fileinput = document.getElementById('imageInput');
        // fileinput.click();
        if (fileSelect2) {
            fileSelect2.current.click();
        }
    };

    const handleEditPicture3 = () => {
        // const fileinput = document.getElementById('imageInput');
        // fileinput.click();
        if (fileSelect3) {
            fileSelect3.current.click();
        }
    };

    const saveData = () => {
        const resultImage = {
            image_sub_banner1: image,
            image_sub_banner2: image2,
            image_sub_banner3: image3
        };
        console.log(resultImage, 'cek');
        dispatch(patchDataSettingsSubBanner(resultImage));
    };

    useEffect(() => {
        dispatch(getDataSettingsSubBanner(token, setImage, setImage2, setImage3));
    }, []);
    // console.log(dataSettingsSubBanner, 'cek data')
    return (
        <Card>
            <div className={classes.Container}>
                <div className={classes.ItemHeader}>
                    <span className={classes.TextHeader}>Home - Sub Banner</span>
                </div>
                <div style={{ width: '100%', border: '1.5px solid #DFE0EB' }}></div>
                <div className={classes.WrapperItemMain}>
                    <div className={classes.ItemLeft}>
                        <div>
                            {image === '' ? (
                                <div style={{ width: '100%' }}>
                                    <div className={classes.ImageLeft} onClick={handleEditPicture}>
                                        <Image src={CameraImage} alt="Camera Pict" />
                                    </div>
                                </div>
                            ) : (
                                <div className={classes.ParentImageAfterUpload}>
                                    <Image
                                        src={image}
                                        alt="Product Image"
                                        width={240}
                                        height={240}
                                        priority="true"
                                        layout="responsive"
                                    />
                                    <div className={classes.ImageAfterUpload} onClick={handleEditPicture}>
                                        <Image src={CameraImage} alt="Camera Pict" className="CameraCenterImage" />
                                    </div>
                                </div>
                            )}
                            <input
                                type="file"
                                id="imageInput"
                                ref={fileSelect}
                                hidden="hidden"
                                onChange={(e) => handleFiles(e.target.files)}
                            />
                            {/* <div style={{ paddingTop: 10 }}>
                                <Button
                                    style={{
                                        width: 179,
                                        height: 37,
                                        background: '#673AB7',
                                        borderRadius: 12,
                                        textTransform: 'none'
                                    }}
                                    onClick={saveData}
                                >
                                    <span style={{ fontSize: 14, fontWeight: 600, color: '#FFFFFF' }}>Save</span>
                                </Button>
                            </div> */}
                        </div>
                        {/* <FirstImage data1={dataSettingsSubBanner}/> */}
                    </div>
                    <div className={classes.ItemRight}>
                        <div>
                            {image2 === '' ? (
                                <div style={{ width: '100%' }}>
                                    <div className={classes.ImageRight1} onClick={handleEditPicture2}>
                                        <Image src={CameraImage} alt="Camera Pict" />
                                    </div>
                                </div>
                            ) : (
                                <div
                                    style={{
                                        width: '100%',
                                        overflow: 'hidden',
                                        borderRadius: 8
                                    }}
                                >
                                    <div className={classes.ParentImageAfterUpload}>
                                        <Image
                                            src={image2}
                                            alt="Product Image"
                                            width={240}
                                            height={112}
                                            priority="true"
                                            layout="responsive"
                                        />
                                        <div className={classes.ImageAfterUpload} onClick={handleEditPicture2}>
                                            <Image src={CameraImage} alt="Camera Pict" className="CameraCenterImage" />
                                        </div>
                                    </div>
                                </div>
                            )}

                            <input
                                type="file"
                                id="imageInput"
                                ref={fileSelect2}
                                hidden="hidden"
                                onChange={(e) => handleFiles2(e.target.files)}
                            />
                            {/* <div style={{ paddingTop: 10 }}>
                                <Button
                                    style={{
                                        width: 179,
                                        height: 37,
                                        background: '#673AB7',
                                        borderRadius: 12,
                                        textTransform: 'none'
                                    }}
                                    onClick={saveData}
                                >
                                    <span style={{ fontSize: 14, fontWeight: 600, color: '#FFFFFF' }}>Save</span>
                                </Button>
                            </div> */}
                        </div>
                        {/* <SecondImage data2={dataSettingsSubBanner} /> */}
                        <div>
                            {image3 === '' ? (
                                <div style={{ width: '100%' }}>
                                    <div className={classes.ImageRight1} onClick={handleEditPicture3}>
                                        <Image src={CameraImage} alt="Camera Pict" />
                                    </div>
                                </div>
                            ) : (
                                <div
                                    style={{
                                        width: '100%',
                                        overflow: 'hidden',
                                        borderRadius: 8
                                    }}
                                >
                                    <div className={classes.ParentImageAfterUpload}>
                                        <Image
                                            src={image3}
                                            alt="Product Image"
                                            width={240}
                                            height={112}
                                            priority="true"
                                            layout="responsive"
                                        />
                                        <div className={classes.ImageAfterUpload} onClick={handleEditPicture3}>
                                            <Image src={CameraImage} alt="Camera Pict" className="CameraCenterImage" />
                                        </div>
                                    </div>
                                </div>
                            )}

                            <input
                                type="file"
                                id="imageInput"
                                ref={fileSelect3}
                                hidden="hidden"
                                onChange={(e) => handleFiles3(e.target.files)}
                            />
                            <div style={{ paddingTop: 10 }}>
                                <Button
                                    style={{
                                        width: 179,
                                        height: 37,
                                        background: '#673AB7',
                                        borderRadius: 12,
                                        textTransform: 'none'
                                    }}
                                    onClick={saveData}
                                >
                                    <span style={{ fontSize: 14, fontWeight: 600, color: '#FFFFFF' }}>Save</span>
                                </Button>
                            </div>
                        </div>
                        {/* <ThirdImage data3={dataSettingsSubBanner} /> */}
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default HomeSubBanner;
