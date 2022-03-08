import React, { useState, useCallback, useEffect } from 'react';
import { Button, Card } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import CameraImage from '../../../../../public/assets/images/CameraImage.png';
import EditIcon from '@mui/icons-material/Edit';
import { getFontDefinitionFromManifest } from 'next/dist/server/font-utils';

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
        position: 'relative',
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
        width: 459,
        height: 191,
        background: 'rgba(211, 226, 255, 0.1)',
        border: '1px dashed #9e9e9e',
        borderRadius: 8,
        cursor: 'pointer',
        position: 'relative',
        [theme.breakpoints.down('tablet')]: {
            width: 350
        }
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
        // '& .ImagePreview': {
        //     position: 'relative',
        //     top: 0,
        //     left: 0,
        //     zIndex: 100

        // }
    },
    // ImagePreview: {
    //     position: 'absolute',
    //     top: 0,
    //     left: 0,
    //     zIndex: 100
    // },
    // WrapperUploadDone: {
    //     textAlign: 'center',
    //     width: 459,
    //     height: 191,
    //     borderRadius: 8,
    //     cursor: 'pointer',
    //     display: 'flex',
    //     alignItems: 'center',
    //     justifyContent: 'center'
    // },
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
        width: 459,
        height: 191,
        borderRadius: 8,
        objectFit: 'cover'
    }
}));
const HomeBanner = () => {
    const classes = useStyles();
    const [files, setFiles] = useState([]);
    const [valueTitle, setValueTitle] = useState();
    const [valueSubTitle, setValueSubTitle] = useState();
    const [valueLink, setValueLink] = useState();

    const onDrop = useCallback((acceptedFiles, rejectFiles) => {
        const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME}/upload`;
        acceptedFiles.forEach(async (acceptedFile) => {
            const formData = new FormData();
            formData.append('file', acceptedFile);
            formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);
            const response = await fetch(url, {
                method: 'post',
                body: formData
            });
            const data = await response.json();
            console.log(data, 'cek data');

            setFiles(
                acceptedFiles.map((file) =>
                    Object.assign(file, {
                        preview: URL.createObjectURL(file)
                    })
                )
            );
        });
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        // accept: 'image/webp,image/png',
        accept: 'image/*',
        multiple: false
    });

    // const { getRootProps, getInputProps } = useDropzone({
    //     accept: 'image/*',
    //     onDrop: (acceptedFiles) => {
    //         setFiles(
    //             acceptedFiles.map((file) =>
    //                 Object.assign(file, {
    //                     preview: URL.createObjectURL(file)
    //                 })
    //             )
    //         );
    //     }
    // });

    const images = files.map((file) => (
        <div key={files.name}>
            <div>
                <img src={file.preview} className={classes.ImagePreviewCont} alt="preview" />
            </div>
        </div>
    ));
    // console.log(images);
    console.log(getInputProps(), getRootProps(), 'cek input props');
    const handleEditTitle = () => {};
    const handleEditSubTitle = () => {};
    const handleEditLink = () => {};

    return (
        <Card>
            <div className={classes.Container}>
                <div className={classes.ItemHeader}>
                    <span className={classes.TextHeader}>Home - Banner</span>
                </div>
                <div style={{ width: '100%', border: '1.5px solid #DFE0EB' }}></div>
                <div className={classes.WrapperItemMain}>
                    {images.length ? (
                        <div {...getRootProps()} className={classes.ContainerUpload} key={images.id}>
                            <div className={classes.WrapperUploadDone} {...getRootProps()}>
                                <input type="text" {...getInputProps()} />
                                <div className={classes.BoxInputImage}>
                                    <Image src={CameraImage} alt="Camera Pict" />
                                    <div>{images}</div>
                                </div>
                                {/* <div className={classes.BoxInputImageUpload}>
                                    <Image src={CameraImage} alt="Camera Pict" className={classes.ImagePreview} />
                                    <div>{images}</div>
                                </div> */}
                            </div>
                        </div>
                    ) : (
                        <div className={classes.ContainerUpload}>
                            <div className={classes.WrapperUpload} {...getRootProps()}>
                                <input type="text" {...getInputProps()} />
                                <div className={classes.BoxInputImage}>
                                    <Image src={CameraImage} alt="Camera Pict" />
                                    <div>{images}</div>
                                </div>
                            </div>
                        </div>
                    )}
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
                                value={valueTitle}
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
                            <input
                                className={classes.InputForm}
                                style={{ fontSize: 14, fontWeight: 400, color: '#252733' }}
                                type="text"
                                value={valueSubTitle}
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
                                value={valueLink}
                                onChange={(e) => setValueLink(e.target.value)}
                                placeholder="www.tokyofoam.com/produk?id=12"
                                required
                            />
                        </div>
                    </form>
                </div>
            </div>
        </Card>
    );
};

export default HomeBanner;
