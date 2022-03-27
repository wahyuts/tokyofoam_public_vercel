import React, { useState, useRef } from 'react';
import { makeStyles } from '@mui/styles';
import { Card, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import Image from 'next/image';
import CameraImage from '../../../../../public/assets/images/CameraImage.png';

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
    },
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
        // width: 245,
        height: 143,
        background: 'rgba(211, 226, 255, 0.1)',
        border: '1px dashed #9e9e9e',
        borderRadius: 8,
        cursor: 'pointer',
        position: 'relative'
        // [theme.breakpoints.down('tablet')]: {
        //     width: 350
        // }
    },
    WrapperUploadDone: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        width: 459,
        height: 191,
        borderRadius: 8,
        cursor: 'pointer',
        position: 'relative',
        [theme.breakpoints.down('tablet')]: {
            width: 350
        }
    },
    BoxInputImageUpload: {
        position: 'relative'
    },
    FormControlGroup: {
        display: 'flex',
        columnGap: 80,
        rowGap: 20,
        flexDirection: 'column',
        [theme.breakpoints.down('tablet')]: {
            flexWrap: 'wrap',
            rowGap: 10,
            paddingTop: 0,
            columnGap: 20
        }
    },
    ContainerImageTop: {
        display: 'flex',
        columnGap: 34,
        [theme.breakpoints.down('tablet')]: {
            flexDirection: 'column',
            rowGap: 10
        }
    },
    ItemLeft: {
        flex: 1
    },
    FormControl: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column'
    },
    ContainerItemBottom: {
        paddingTop: 20
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
    }
}));
export default function ProductBenefits() {
    const fileSelect = useRef(null);
    const classes = useStyles();
    const [link, setLink] = useState('');
    const [valueText, setValueText] = useState('');
    const [image, setImage] = useState();
    const [showNoImage, setShowNoImage] = useState(true);
    const [photoName, setPhotoName] = useState('');
    const [progress, setProgress] = useState(0);

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
    console.log(image, 'cek image');
    return (
        <Card>
            <div className={classes.Container}>
                <div className={classes.ItemHeader}>
                    <span className={classes.TextHeader}>Product Benefits</span>
                </div>
                <div style={{ width: '100%', border: '1.5px solid #DFE0EB' }}></div>
                <div className={classes.WrapperItemMain}>
                    <div className={classes.ContainerImageTop}>
                        <div className={classes.ItemLeft}>
                            {showNoImage === true ? (
                                <div style={{ width: '100%' }}>
                                    <div className={classes.ContainerUpload}>
                                        <div className={classes.WrapperUpload} onClick={handleEditPicture}>
                                            <Image src={CameraImage} alt="Camera Pict" />
                                        </div>
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
                                    <Image
                                        src={image}
                                        alt="Product Image"
                                        width={245}
                                        height={143}
                                        priority="true"
                                        layout="responsive"
                                    />
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
                                    // onClick={() => uploadImage()}
                                    onClick={handleEditPicture}
                                >
                                    <span style={{ fontSize: 14, fontWeight: 600, color: '#FFFFFF' }}>Save</span>
                                </Button>
                            </div>
                        </div>
                        <div className={classes.FormControl}>
                            <div className={classes.ItemTopTitle}>
                                <span className={classes.TextTitle}>Link</span>
                                <Button style={{ color: 'white' }} onClick={() => {}}>
                                    <EditIcon sx={{ width: 16, height: 16, color: '#ADADAD' }} />
                                </Button>
                            </div>
                            <input
                                className={classes.InputForm}
                                style={{ fontSize: 14, fontWeight: 600, color: '#252733', paddingTop: 14 }}
                                type="text"
                                value={link}
                                onChange={(e) => setLink(e.target.value)}
                                placeholder="Welcome to TokyoFoam"
                                required
                            />
                        </div>
                    </div>
                    <div className={classes.ContainerItemBottom}>
                        <div className={classes.ItemTopTitle}>
                            <span className={classes.TextTitle}>Text</span>
                            <Button style={{ color: 'white' }} onClick={() => {}}>
                                <EditIcon sx={{ width: 16, height: 16, color: '#ADADAD' }} />
                            </Button>
                        </div>
                        <textarea
                            className={classes.InputForm}
                            style={{ fontSize: 14, fontWeight: 600, color: '#252733', paddingTop: 14, width: '100%' }}
                            type="text"
                            value={valueText}
                            onChange={(e) => setValueText(e.target.value)}
                            placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et"
                            required
                        />
                    </div>
                </div>
            </div>
        </Card>
    );
}
