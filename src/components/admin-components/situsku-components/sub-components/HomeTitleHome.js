import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Button, Card } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from 'react-redux';
import { getDataSettingsTitleHome, patchDataSettingsTitleHome } from '../../../../redux/actions/dataSituskuAction';

const useStyles = makeStyles((theme) => ({
    Container: {
        paddingTop: 19,
        paddingBottom: 19
    },
    WrapperItemMain: {
        marginBlock: 20,
        paddingLeft: 20,
        paddingRight: 29
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
    FormControlGroup: {
        display: 'flex',
        columnGap: 80,
        // paddingTop: 20,
        [theme.breakpoints.down('tablet')]: {
            flexWrap: 'wrap',
            rowGap: 10,
            paddingTop: 0,
            columnGap: 20
        },
        [theme.breakpoints.down('desktopHD')]: {
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
        display: 'flex',
        alignItems: 'center',
        columnGap: 10
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
    }
}));

const HomeTitleHome = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const token = localStorage.getItem('FBIdToken');
    const { dataSettingsHomeTitle } = useSelector((state) => state.dataSitusku);
    const [valueTitle, setValueTitle] = useState('');
    const [valueSubTitle, setValueSubTitle] = useState('');

    const saveData = () => {
        const data = {
            title_in_home: valueTitle,
            description_in_home: valueSubTitle
        };
        // console.log(data)
        dispatch(patchDataSettingsTitleHome(data));
    };
    useEffect(() => {
        dispatch(getDataSettingsTitleHome(token));
        setValueTitle(dataSettingsHomeTitle.title_in_home);
        setValueSubTitle(dataSettingsHomeTitle.description_in_home);
    }, [dataSettingsHomeTitle.title_in_home, dataSettingsHomeTitle.description_in_home]);

    console.log(dataSettingsHomeTitle, 'cek data');
    return (
        <Card>
            <div className={classes.Container}>
                <div className={classes.ItemHeader}>
                    <span className={classes.TextHeader}>Home - Title in Home</span>
                </div>
                <div style={{ width: '100%', border: '1.5px solid #DFE0EB' }}></div>
                <div className={classes.WrapperItemMain}>
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
                                style={{ fontSize: 14, fontWeight: 600, color: '#252733', marginTop: 3 }}
                                type="text"
                                value={valueTitle || ''}
                                onChange={(e) => setValueTitle(e.target.value)}
                                placeholder="Insert text here"
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
                                placeholder="Insert text here"
                                required
                            />
                        </div>
                    </form>
                    <div style={{ paddingTop: 20 }}>
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
            </div>
        </Card>
    );
};

export default HomeTitleHome;
