import React, { useState, useRef, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { Button, Card } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import Image from 'next/image';
import CameraImage from '../../../../../../public/assets/images/CameraImage.png';
import { getDataSettingsSubBanner, patchDataSettingsSubBanner } from '../../../../../redux/actions/dataSituskuAction';
import { useDispatch } from 'react-redux';

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
        alignItems: 'center',
        justifyContent: 'space-between',
        [theme.breakpoints.down('tablet')]: {
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
        // width: 240.48,
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

export default function FirstImage({ data1 }) {
    const classes = useStyles();
    const token = localStorage.getItem('FBIdToken');
    const dispatch = useDispatch();
    const fileSelect = useRef(null);
    const [image, setImageSubBanner1] = useState('');
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
                setImageSubBanner1(response.secure_url);
                setShowNoImage(false);
                // console.log('seputar image', response.secure_url);
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
    const saveData = () => {
        const data = {
            image_sub_banner1: image
        };
        dispatch(patchDataSettingsSubBanner(data, token));
    };

    useEffect(() => {
        dispatch(getDataSettingsSubBanner(token, setImageSubBanner1));
    }, []);

    // console.log(data1, 'cek data1')
    return (
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
                        src={data1.image_sub_banner1}
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
    );
}
