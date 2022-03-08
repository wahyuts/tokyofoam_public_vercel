import React, { useState } from 'react';
import { Card } from '@mui/material';
import Image from 'next/image';
import FlashSaleBanner from '../../../../../public/assets/images/FlashSaleBanner.png';
import { makeStyles } from '@mui/styles';
import { useDropzone } from 'react-dropzone';
import CameraImage from '../../../../../public/assets/images/CameraImage.png';
import EditIcon from '@mui/icons-material/Edit';

const useStyles = makeStyles((theme) => ({
    // CardMain: {
    //   width: '100%',
    //   [theme.breakpoints.down('tablet')]: {
    //     width: '70%',
    // }
    // },
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
        paddingRight: 29
    },
    ContainerUpload: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        rowGap: 24
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
        [theme.breakpoints.down('tablet')]: {
            width: 350
        }
    },
    WrapperUploadDone: {
        textAlign: 'center',
        width: 459,
        height: 191,
        borderRadius: 8,
        cursor: 'pointer'
    },
    // for image Preview
    ImagePreviewCont: {
        width: '100%',
        height: 'auto',
        borderRadius: 8
    }
}));

const HomeFlashsale = () => {
    const classes = useStyles();
    const [files, setFiles] = useState([]);

    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        onDrop: (acceptedFiles) => {
            setFiles(
                acceptedFiles.map((file) =>
                    Object.assign(file, {
                        preview: URL.createObjectURL(file)
                    })
                )
            );
        }
    });

    const images = files.map((file) => (
        <div key={files.name}>
            <div>
                <img src={file.preview} className={classes.ImagePreviewCont} alt="preview" />
            </div>
        </div>
    ));
    return (
        <Card>
            <div className={classes.Container}>
                <div className={classes.ItemHeader}>
                    <span className={classes.TextHeader}>Home - Flashsale</span>
                </div>
                <div style={{ width: '100%', border: '1.5px solid #DFE0EB' }}></div>
                <div className={classes.WrapperItemMain}>
                    {/* <Image src={FlashSaleBanner} alt="Flash Banner" /> */}
                    {images.length ? (
                        <div {...getRootProps()} className={classes.ContainerUpload} key={images.id}>
                            <div className={classes.WrapperUploadDone}>{images}</div>
                            <input type="text" {...getInputProps()} />
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
                </div>
            </div>
        </Card>
    );
};

export default HomeFlashsale;
