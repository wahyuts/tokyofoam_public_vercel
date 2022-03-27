import React, { useRef, useState } from 'react';
import CameraImage from '../../../../../../public/assets/images/CameraImage.png';
import Image from 'next/image';
import { makeStyles } from '@mui/styles';
import { Button } from '@mui/material';

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
        // alignItems: 'center',
        flexDirection: 'column'
        // [theme.breakpoints.down('tablet')]: {
        //     flexDirection: 'column',
        //     rowGap: 20
        // }
    },
    ContainerImageTop: {
        display: 'flex',
        columnGap: 20
    },
    Image1: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        width: 124,
        height: 124,
        background: 'rgba(211, 226, 255, 0.1)',
        border: '1px dashed #9e9e9e',
        borderRadius: 8,
        cursor: 'pointer',
        position: 'relative'
    },
    Image2: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        width: 124,
        height: 124,
        background: 'rgba(211, 226, 255, 0.1)',
        border: '1px dashed #9e9e9e',
        borderRadius: 8,
        cursor: 'pointer',
        position: 'relative'
    },
    ContainerForm: {
        display: 'flex',
        paddingTop: 60,
        columnGap: 80,
        rowGap: 20,
        flexWrap: 'wrap'
    },
    TextTitle: {
        fontSize: 14,
        fontWeight: 400,
        color: '#ADADAD'
    },
    TextDesc: {
        fontSize: 14,
        fontWeight: 400,
        color: '#ADADAD'
    },
    InputForm: {
        border: 'none',
        paddingTop: 10,
        width: 200
    }
}));
export default function AboutUsSecondImage() {
    const classes = useStyles();
    const fileSelect = useRef(null);
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
                const response2 = JSON.parse(xhr.responseText);
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
        <div>
            <div>
                {showNoImage === true ? (
                    <div style={{ width: '100%' }}>
                        <div className={classes.Image1} onClick={handleEditPicture}>
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
                        <Image
                            src={image}
                            alt="Product Image"
                            width={124}
                            height={124}
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
                            width: 124,
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
        </div>
    );
}
