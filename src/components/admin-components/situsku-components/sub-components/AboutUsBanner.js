import { Button, Card } from '@mui/material';
import React from 'react';
import { makeStyles } from '@mui/styles';
import CameraImage from '../../../../../public/assets/images/CameraImage.png';
import Image from 'next/image';
import EditIcon from '@mui/icons-material/Edit';
import AboutUsFirstImage from './AboutUsSubComp/AboutUsFirstImage';
import AboutUsSecondImage from './AboutUsSubComp/AboutUsSecondImage';

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

const AboutUsBanner = () => {
    const classes = useStyles();
    return (
        <Card>
            <div className={classes.Container}>
                <div className={classes.ItemHeader}>
                    <span className={classes.TextHeader}>About - Us</span>
                </div>
                <div style={{ width: '100%', border: '1.5px solid #DFE0EB' }}></div>
                <div className={classes.WrapperItemMain}>
                    <div className={classes.ContainerImageTop}>
                        <div>
                            <AboutUsFirstImage />
                        </div>
                        <div>
                            <AboutUsSecondImage />
                        </div>
                    </div>
                    <div className={classes.ContainerForm}>
                        <div className={classes.FormGroupTitle}>
                            <div className={classes.ItemTopTitle}>
                                <span className={classes.TextTitle}>Title</span>
                                <Button style={{ color: 'white' }} onClick={() => {}}>
                                    <EditIcon sx={{ width: 16, height: 16, color: '#ADADAD' }} />
                                </Button>
                            </div>
                            <input
                                className={classes.InputForm}
                                style={{
                                    fontSize: 14,
                                    fontWeight: 600,
                                    color: '#252733',
                                    marginTop: 14,
                                    border: 'none'
                                }}
                                type="text"
                                // value={valueTitle}
                                // onChange={(e) => setValueTitle(e.target.value)}
                                placeholder="Welcome to TokyoFoam"
                                required
                            />
                        </div>
                        <div className={classes.FormGroupDesc1}>
                            <div className={classes.ItemTopTitle}>
                                <span className={classes.TextDesc}>Deskripsi 1</span>
                                <Button style={{ color: 'white' }} onClick={() => {}}>
                                    <EditIcon sx={{ width: 16, height: 16, color: '#ADADAD' }} />
                                </Button>
                            </div>
                            <input
                                className={classes.InputForm}
                                style={{
                                    fontSize: 14,
                                    fontWeight: 400,
                                    color: '#252733',
                                    marginTop: 14,
                                    border: 'none'
                                }}
                                type="text"
                                // value={valueTitle}
                                // onChange={(e) => setValueTitle(e.target.value)}
                                placeholder="Welcome to TokyoFoam"
                                required
                            />
                        </div>
                        <div className={classes.FormGroupDesc2}>
                            <div className={classes.ItemTopTitle}>
                                <span className={classes.TextDesc}>Deskripsi 2</span>
                                <Button style={{ color: 'white' }} onClick={() => {}}>
                                    <EditIcon sx={{ width: 16, height: 16, color: '#ADADAD' }} />
                                </Button>
                            </div>
                            <input
                                className={classes.InputForm}
                                style={{
                                    fontSize: 14,
                                    fontWeight: 400,
                                    color: '#252733',
                                    marginTop: 14,
                                    border: 'none'
                                }}
                                type="text"
                                // value={valueTitle}
                                // onChange={(e) => setValueTitle(e.target.value)}
                                placeholder="Welcome to TokyoFoam"
                                required
                            />
                        </div>
                        <div className={classes.FormGroupDesc3}>
                            <div className={classes.ItemTopTitle}>
                                <span className={classes.TextDesc}>Deskripsi 3</span>
                                <Button style={{ color: 'white' }} onClick={() => {}}>
                                    <EditIcon sx={{ width: 16, height: 16, color: '#ADADAD' }} />
                                </Button>
                            </div>
                            <input
                                className={classes.InputForm}
                                style={{
                                    fontSize: 14,
                                    fontWeight: 400,
                                    color: '#252733',
                                    marginTop: 14,
                                    border: 'none'
                                }}
                                type="text"
                                // value={valueTitle}
                                // onChange={(e) => setValueTitle(e.target.value)}
                                placeholder="Welcome to TokyoFoam"
                                required
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default AboutUsBanner;
