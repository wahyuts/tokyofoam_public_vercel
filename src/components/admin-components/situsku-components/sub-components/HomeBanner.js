import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Button, Card } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import CameraImage from '../../../../../public/assets/images/CameraImage.png';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getDataSettingsMainBanner, patchDataSettingsMainBanner } from '../../../../redux/actions/dataSituskuAction';

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
    ItemMain: {
        // position: 'relative',
        paddingInline: 44,
        paddingBlock: 12,
        cursor: 'pointer',
        '& .Image': {
            borderRadius: 10,
            opacity: 1,
            display: 'block',
            transition: '.5s ease',
            backfaceVisibility: 'hidden',
            '&:hover': {
                opacity: 0.8
            }
        },
        ' & .ItemMiddle': {
            transition: '.5s ease',
            opacity: 0,
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            '&:hover': {
                opacity: 1
            }
        }
        // '& .Image:': {
        //     opacity: '0.8'
        // },
        // '&:hover .ItemMiddle' :{
        //     opacity: 1
        // },
    },
    // Image: {
    //     borderRadius: 10,
    //     opacity: 1,
    //     display: 'block',
    //     transition: '.5s ease',
    //     backfaceVisibility: 'hidden'
    // },
    // ItemMiddle: {
    //     transition: '.5s ease',
    //     opacity: 0,
    //     position: 'absolute',
    //     top: '50%',
    //     left: '50%',
    //     transform: 'translate(-50%, -50%)',
    //     textAlign: 'center',
    //     '&:hover': {
    //         opacity: 0
    //     }
    // },
    ContainerBase: {
        paddingInline: 20,
        marginTop: 20,
        width: 459,
        height: 191,
        border: '1px dashed #9e9e9e',
        borderRadius: 8,
        cursor: 'pointer'
    },
    WrapperItemMain: {
        marginBlock: 20,
        paddingLeft: 20,
        paddingRight: 29
        // backgroundColor: 'green'
    },
    ContainerUpload: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        rowGap: 24,
        position: 'relative'
    },
    WrapperUpload: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        width: '100%',
        // width: 459,
        height: 191,
        background: 'rgba(211, 226, 255, 0.1)',
        border: '1px dashed #9e9e9e',
        borderRadius: 8,
        cursor: 'pointer'
    },
    WrapperUploadDone: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        width: '100%',
        // width: 459,
        height: 191,
        borderRadius: 8,
        cursor: 'pointer',
        position: 'relative'
        // [theme.breakpoints.down('tablet')]: {
        //     width: 350
        // }
    },
    BoxInputImageUpload: {
        position: 'relative'
    },
    FormControlGroup: {
        display: 'flex',
        columnGap: 80,
        flexWrap: 'wrap',
        rowGap: 20,
        paddingTop: 20,
        alignItems: 'center',
        [theme.breakpoints.down('tablet')]: {
            flexWrap: 'wrap',
            rowGap: 10,
            paddingTop: 0,
            columnGap: 20
        }
    },
    FormControl: {
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.down('tablet')]: {
            paddingTop: 10
        }
    },
    ItemTopTitle: {
        // display: 'flex',
        // alignItems: 'center',
        // columnGap: 10
    },
    InputForm: {
        border: 'none',
        paddingTop: 10,
        width: 200
    },
    TextTitle: {
        fontSize: 14,
        fontWeight: 400,
        color: '#ADADAD'
    },
    TextSubTitle: {
        fontSize: 14,
        fontWeight: 400,
        color: '#ADADAD'
    },
    TextLink: {
        fontSize: 14,
        fontWeight: 400,
        color: '#ADADAD'
    },
    // for image Preview
    ImagePreviewCont: {
        width: '100%',
        height: 191,
        borderRadius: 8,
        objectFit: 'fill'
    },
    ParentImageAfterUpload: {
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        borderRadius: 8,
        position: 'relative'
    },
    ImageAfterUpload: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        cursor: 'pointer'
    }
}));
const HomeBanner = () => {
    const { dataSettingsMainBanner } = useSelector((state) => state.dataSitusku);
    const token = localStorage.getItem('FBIdToken');
    const dispatch = useDispatch();
    const fileSelect = useRef(null);
    const classes = useStyles();
    const [files, setFiles] = useState([]);
    const [valueTitle, setValueTitle] = useState(dataSettingsMainBanner.title_on_banner);
    const [valueSubTitle, setValueSubTitle] = useState(dataSettingsMainBanner.subTitle_on_banner);
    const [valueLink, setValueLink] = useState(dataSettingsMainBanner.link_on_banner);
    const [image, setImage] = useState('');
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
                // console.log('cek response', response.secure_url);
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

    const onDrop = (acceptedFiles) => {
        setFiles(
            acceptedFiles.map((file) =>
                Object.assign(file, {
                    preview: URL.createObjectURL(file)
                })
            )
        );
    };
    const uploadImage = () => {
        const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME}/upload`;
        const uploadPreset = 'process.env.NEXT_PUBLIC_CLOUDINARY_UNSIGNED_UPLOAD_PRESET';

        files.forEach((file) => {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', uploadPreset);
            axios({
                url: url,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: formData
            })
                .then((res) => console.log(res))
                .catch((err) => console.log(err));
        });
    };

    const saveData = () => {
        const data = {
            image_main_banner: image,
            title_on_banner: valueTitle,
            link_on_banner: valueLink,
            subTitle_on_banner: valueSubTitle
        };
        dispatch(patchDataSettingsMainBanner(data));
    };

    useEffect(() => {
        dispatch(getDataSettingsMainBanner(token, setImage));
        setValueTitle(dataSettingsMainBanner.title_on_banner);
        setValueSubTitle(dataSettingsMainBanner.subTitle_on_banner);
        setValueLink(dataSettingsMainBanner.link_on_banner);
        // setImage(dataSettingsMainBanner.image_main_banner);
    }, [
        dataSettingsMainBanner.title_on_banner,
        dataSettingsMainBanner.subTitle_on_banner,
        dataSettingsMainBanner.link_on_banner

        // dataSettingsMainBanner.image_main_banner
    ]);

    const images = files.map((file) => (
        <div key={files.name}>
            <div>
                <img src={file.preview} className={classes.ImagePreviewCont} alt="preview" />
            </div>
        </div>
    ));
    // console.log(image, 'cek image');
    // console.log(dataSettingsMainBanner, 'cek data settings Main Banner');
    // console.log(dataImage, 'cek iamgeeeeee');

    return (
        <Card>
            <div className={classes.Container}>
                <div className={classes.ItemHeader}>
                    <span className={classes.TextHeader}>Home - Banner</span>
                </div>
                <div style={{ width: '100%', border: '1.5px solid #DFE0EB' }}></div>
                <div className={classes.WrapperItemMain}>
                    <div>
                        {image === '' ? (
                            <div style={{ width: '100%' }}>
                                <div className={classes.ContainerUpload}>
                                    <div className={classes.WrapperUpload} onClick={handleEditPicture}>
                                        <Image src={CameraImage} alt="Camera Pict" />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div
                                // style={{
                                //     width: '100%',
                                //     height: '100%',
                                //     overflow: 'hidden',
                                //     borderRadius: 8,
                                //     position: 'relative'
                                // }}
                                className={classes.ParentImageAfterUpload}
                            >
                                <Image
                                    src={image}
                                    alt="Product Image"
                                    width={459}
                                    height={191}
                                    priority="true"
                                    layout="responsive"
                                />
                                <div
                                    // style={{ position: 'absolute', top: 80, left: 230, cursor: 'pointer' }}
                                    className={classes.ImageAfterUpload}
                                    onClick={handleEditPicture}
                                >
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

                    <form className={classes.FormControlGroup}>
                        <div className={classes.FormControl}>
                            <div className={classes.ItemTopTitle}>
                                <span className={classes.TextTitle}>Title</span>
                                <Button style={{ color: 'white' }} onClick={() => {}}>
                                    <EditIcon sx={{ width: 16, height: 16, color: '#ADADAD' }} />
                                </Button>
                            </div>
                            <input
                                className={classes.InputForm}
                                style={{ fontSize: 14, fontWeight: 600, color: '#252733', paddingTop: 14 }}
                                type="text"
                                value={valueTitle || ''}
                                onChange={(e) => setValueTitle(e.target.value)}
                                placeholder="Welcome to TokyoFoam"
                                required
                            />
                        </div>
                        <div className={classes.FormControl}>
                            <div className={classes.ItemTopTitle}>
                                <span className={classes.TextSubTitle}>Sub Title</span>
                                <Button style={{ color: 'white' }} onClick={() => {}}>
                                    <EditIcon sx={{ width: 16, height: 16, color: '#ADADAD' }} />
                                </Button>
                            </div>
                            <textarea
                                className={classes.InputForm}
                                style={{ fontSize: 14, fontWeight: 400, color: '#252733' }}
                                type="text"
                                value={valueSubTitle || ''}
                                onChange={(e) => setValueSubTitle(e.target.value)}
                                placeholder="Lorem ipsum dolar sit amet"
                                required
                            />
                        </div>
                        <div className={classes.FormControl}>
                            <div className={classes.ItemTopTitle}>
                                <span className={classes.TextLink}>Link</span>
                                <Button style={{ color: 'white' }}>
                                    <EditIcon sx={{ width: 16, height: 16, color: '#ADADAD' }} />
                                </Button>
                            </div>
                            <textarea
                                className={classes.InputForm}
                                style={{ fontSize: 14, fontWeight: 400, color: '#252733' }}
                                type="text"
                                value={valueLink || ''}
                                onChange={(e) => setValueLink(e.target.value)}
                                placeholder="insert link here"
                                required
                            />
                        </div>
                        <div className={classes.FormControl}>
                            {/* <div className={classes.ItemTopTitle}>
                                <span className={classes.TextLink}>Link</span>
                                <Button style={{ color: 'white' }}>
                                    <EditIcon sx={{ width: 16, height: 16, color: '#ADADAD' }} />
                                </Button>
                            </div>
                            <textarea
                                className={classes.InputForm}
                                style={{ fontSize: 14, fontWeight: 400, color: '#252733' }}
                                type="text"
                                value={valueLink}
                                onChange={(e) => setValueLink(e.target.value)}
                                placeholder="www.tokyofoam.com/produk?id=12"
                                required
                            /> */}
                        </div>
                        {/* <div style={{ paddingTop: 20}}>
                            <Button
                                style={{
                                    width: 179,
                                    height: 37,
                                    background: '#2C2C2C',
                                    borderRadius: 12,
                                    textTransform: 'none'
                                }}
                                type="submit"
                            >
                                <span style={{ fontSize: 14, fontWeight: 600, color: '#FFFFFF' }}>Save</span>
                            </Button>
                        </div> */}
                    </form>
                </div>
            </div>
        </Card>
    );
};

export default HomeBanner;
