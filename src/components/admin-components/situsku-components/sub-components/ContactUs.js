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
    WrapperItemMain: {
        marginBlock: 20,
        paddingLeft: 20,
        paddingRight: 29
    },
    ContainerItemTop: {
        display: 'flex',
        columnGap: 20,
        justifyContent: 'space-between',
        [theme.breakpoints.down('tablet')]: {
            flexDirection: 'column',
            rowGap: 10
        }
    },
    ItemLeft: {
        flex: 1
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
        height: 251,
        background: 'rgba(211, 226, 255, 0.1)',
        border: '1px dashed #9e9e9e',
        borderRadius: 8,
        cursor: 'pointer',
        position: 'relative'
    },
    ItemRight: {
        flex: 1
    },
    FormControl: {
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.down('tablet')]: {
            paddingTop: 10
        }
    },
    InputForm: {
        border: 'none'
        // paddingTop: 10
    },
    TextTitle: {
        fontSize: 14,
        fontWeight: 600,
        color: '#252733',
        fontStyle: 'normal'
    },
    TextSubTitle: {
        fontSize: 14,
        fontWeight: 400,
        color: '#ADADAD'
    },
    ContainerItemBottom: {
        paddingTop: 25
    }
}));
export default function ContactUs() {
    const classes = useStyles();
    const fileSelect = useRef(null);
    const [title, setTitle] = useState('');
    const [noHp, setNoHp] = useState('');
    const [email, setEmail] = useState('');
    const [text, setText] = useState('');
    const [instagram, setInstagram] = useState('');
    const [facebook, setFacebook] = useState('');
    const [youtube, setYoutube] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
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
                    <span className={classes.TextHeader}>Contact Us</span>
                </div>
                <div style={{ width: '100%', border: '1.5px solid #DFE0EB' }}></div>
                <div className={classes.WrapperItemMain}>
                    <div className={classes.ContainerItemTop}>
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
                                        // position: 'block'
                                    }}
                                >
                                    <Image
                                        src={image}
                                        alt="Product Image"
                                        width={193}
                                        height={251}
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
                        <div className={classes.ItemRight}>
                            <div className={classes.FormControl}>
                                <div className={classes.ItemTopTitle}>
                                    <span className={classes.TextSubTitle}>Title</span>
                                    <Button style={{ color: 'white' }} onClick={() => {}}>
                                        <EditIcon sx={{ width: 16, height: 16, color: '#ADADAD' }} />
                                    </Button>
                                </div>
                                <input
                                    className={classes.InputForm}
                                    style={{ fontSize: 14, fontWeight: 600, color: '#252733' }}
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Hi!!!"
                                    required
                                />
                            </div>
                            <div className={classes.FormControl} style={{ paddingTop: 15 }}>
                                <div className={classes.ItemTopTitle}>
                                    <span className={classes.TextSubTitle}>No Hp</span>
                                    <Button style={{ color: 'white' }} onClick={() => {}}>
                                        <EditIcon sx={{ width: 16, height: 16, color: '#ADADAD' }} />
                                    </Button>
                                </div>
                                <input
                                    className={classes.InputForm}
                                    style={{ fontSize: 14, fontWeight: 600, color: '#252733' }}
                                    type="text"
                                    value={noHp}
                                    onChange={(e) => setNoHp(e.target.value)}
                                    placeholder="Lorem ipsum dolar sit amet"
                                    required
                                />
                            </div>
                            <div className={classes.FormControl} style={{ paddingTop: 15 }}>
                                <div className={classes.ItemTopTitle}>
                                    <span className={classes.TextSubTitle}>Email</span>
                                    <Button style={{ color: 'white' }} onClick={() => {}}>
                                        <EditIcon sx={{ width: 16, height: 16, color: '#ADADAD' }} />
                                    </Button>
                                </div>
                                <input
                                    className={classes.InputForm}
                                    style={{ fontSize: 14, fontWeight: 600, color: '#252733' }}
                                    type="text"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Lorem ipsum dolar sit amet"
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    <div className={classes.ContainerItemBottom}>
                        <div className={classes.FormControl}>
                            <div className={classes.ItemTopTitle}>
                                <span className={classes.TextSubTitle}>Text</span>
                                <Button style={{ color: 'white' }} onClick={() => {}}>
                                    <EditIcon sx={{ width: 16, height: 16, color: '#ADADAD' }} />
                                </Button>
                            </div>
                            <textarea
                                className={classes.InputForm}
                                style={{ fontSize: 14, fontWeight: 600, color: '#252733', width: '100%' }}
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et"
                                required
                            />
                        </div>
                        <div className={classes.FormControl} style={{ paddingTop: 15 }}>
                            <form onSubmit={() => {}}>
                                <div className={classes.ItemTopTitle}>
                                    <span className={classes.TextSubTitle}>Instagram</span>
                                    <Button style={{ color: 'white' }} onClick={() => {}} type="submit">
                                        <EditIcon sx={{ width: 16, height: 16, color: '#ADADAD' }} />
                                    </Button>
                                </div>
                                <input
                                    className={classes.InputForm}
                                    style={{ fontSize: 14, fontWeight: 600, color: '#252733' }}
                                    type="text"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="{link Instagram}"
                                    required
                                />
                            </form>
                            <form onSubmit={() => {}}>
                                <div className={classes.ItemTopTitle} style={{ paddingTop: 15 }}>
                                    <span className={classes.TextSubTitle}>Facebook</span>
                                    <Button style={{ color: 'white' }} onClick={() => {}} type="submit">
                                        <EditIcon sx={{ width: 16, height: 16, color: '#ADADAD' }} />
                                    </Button>
                                </div>
                                <input
                                    className={classes.InputForm}
                                    style={{ fontSize: 14, fontWeight: 600, color: '#252733' }}
                                    type="text"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="{link Facebook}"
                                    required
                                />
                            </form>
                            <form onSubmit={() => {}}>
                                <div className={classes.ItemTopTitle} style={{ paddingTop: 15 }}>
                                    <span className={classes.TextSubTitle}>Whatsapp</span>
                                    <Button style={{ color: 'white' }} onClick={() => {}} type="submit">
                                        <EditIcon sx={{ width: 16, height: 16, color: '#ADADAD' }} />
                                    </Button>
                                </div>
                                <input
                                    className={classes.InputForm}
                                    style={{ fontSize: 14, fontWeight: 600, color: '#252733' }}
                                    type="text"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="{link Whatsapp}"
                                    required
                                />
                            </form>
                            <form onSubmit={() => {}}>
                                <div className={classes.ItemTopTitle} style={{ paddingTop: 15 }}>
                                    <span className={classes.TextSubTitle}>Line</span>
                                    <Button style={{ color: 'white' }} onClick={() => {}} type="submit">
                                        <EditIcon sx={{ width: 16, height: 16, color: '#ADADAD' }} />
                                    </Button>
                                </div>
                                <input
                                    className={classes.InputForm}
                                    style={{ fontSize: 14, fontWeight: 600, color: '#252733' }}
                                    type="text"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="{link Line}"
                                    required
                                />
                            </form>
                            <form onSubmit={() => {}}>
                                <div className={classes.ItemTopTitle} style={{ paddingTop: 15 }}>
                                    <span className={classes.TextSubTitle}>Youtube</span>
                                    <Button style={{ color: 'white' }} onClick={() => {}} type="submit">
                                        <EditIcon sx={{ width: 16, height: 16, color: '#ADADAD' }} />
                                    </Button>
                                </div>
                                <input
                                    className={classes.InputForm}
                                    style={{ fontSize: 14, fontWeight: 600, color: '#252733' }}
                                    type="text"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="{link Youtube}"
                                    required
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
}
