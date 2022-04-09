import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Card, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from 'react-redux';
import { getDataSettingsHowTobuy, patchDataSettingsHowTobuy } from '../../../../redux/actions/dataSituskuAction';

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
        // flexWrap: 'wrap',
        rowGap: 20,
        // paddingTop: 20,
        // alignItems: 'center',
        flexDirection: 'column',
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
    InputFormTextArea: {
        border: 'none',
        paddingTop: 10,
        width: '100%'
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
export default function HowToBuy() {
    const { dataSettingsHowToBuy } = useSelector((state) => state.dataSitusku);
    const token = localStorage.getItem('FBIdToken');
    const dispatch = useDispatch();
    const classes = useStyles();
    const [valueTitle, setValueTitle] = useState('');
    const [valueText, setValueText] = useState('');

    const handleUpdate = () => {
        const data = {
            title_how_to_buy: valueTitle,
            description_how_to_buy: valueText
        };
        console.log(data);
        dispatch(patchDataSettingsHowTobuy(data));
    };

    useEffect(() => {
        dispatch(getDataSettingsHowTobuy(token));
        setValueTitle(dataSettingsHowToBuy.title_how_to_buy);
        setValueText(dataSettingsHowToBuy.description_how_to_buy);
    }, [dataSettingsHowToBuy.title_how_to_buy, dataSettingsHowToBuy.description_how_to_buy]);
    // console.log(dataSettingsHowToBuy, 'how to buy');
    return (
        <Card>
            <div className={classes.Container}>
                <div className={classes.ItemHeader}>
                    <span className={classes.TextHeader}>How To Buy</span>
                </div>
                <div style={{ width: '100%', border: '1.5px solid #DFE0EB' }}></div>
                <div className={classes.WrapperItemMain}>
                    <form className={classes.FormControlGroup} onSubmit={() => {}}>
                        <div className={classes.FormControl}>
                            <div className={classes.ItemTopTitle}>
                                <span className={classes.TextTitle}>Title</span>
                                <Button style={{ color: 'white' }} onClick={() => {}}>
                                    <EditIcon sx={{ width: 16, height: 16, color: '#ADADAD' }} />
                                </Button>
                            </div>
                            <input
                                className={classes.InputForm}
                                style={{ fontSize: 14, fontWeight: 600, color: '#252733', marginTop: 3 }}
                                type="text"
                                value={valueTitle || ''}
                                onChange={(e) => setValueTitle(e.target.value)}
                                placeholder="Introduction"
                                required
                            />
                        </div>
                        <div className={classes.FormControl} style={{ width: '100%' }}>
                            <div className={classes.ItemTopTitle}>
                                <span className={classes.TextSubTitle}>Text</span>
                                <Button style={{ color: 'white' }} onClick={() => {}}>
                                    <EditIcon sx={{ width: 16, height: 16, color: '#ADADAD' }} />
                                </Button>
                            </div>
                            <textarea
                                className={classes.InputFormTextArea}
                                style={{ fontSize: 14, fontWeight: 400, color: '#252733' }}
                                type="text"
                                value={valueText || ''}
                                onChange={(e) => setValueText(e.target.value)}
                                placeholder="Produk Mulsk 100% Mulberry Silk Pillowcase dengan kandungan natural yang memiliki.."
                                required
                            />
                        </div>
                        <div style={{ paddingTop: 20 }}>
                            <Button
                                style={{
                                    width: 179,
                                    height: 37,
                                    background: '#673AB7',
                                    borderRadius: 12,
                                    textTransform: 'none'
                                }}
                                onClick={handleUpdate}
                            >
                                <span style={{ fontSize: 14, fontWeight: 600, color: '#FFFFFF' }}>Save</span>
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </Card>
    );
}
