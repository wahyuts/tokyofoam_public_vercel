import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Button, Card } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

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
    const [valueTitle, setValueTitle] = useState();
    const [valueSubTitle, setValueSubTitle] = useState();
    const classes = useStyles();
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
                    </form>
                </div>
            </div>
        </Card>
    );
};

export default HomeTitleHome;
