import React from 'react';

// mat ui stuff
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import { styled } from '@mui/material/styles';
import { Box, Toolbar, Tooltip, IconButton, Typography, OutlinedInput, InputAdornment } from '@mui/material';
import { makeStyles } from '@mui/styles';

// ----------------------------------------------------------------------
const useStyles = makeStyles((theme) => ({
    // Container: {
    //     display: 'flex',
    //     alignItems: 'center'
    // },
    ItemTop: {
        display: 'flex',
        justifyContent: 'space-between',
        paddingInline: 32,
        paddingTop: 33,
        paddingBottom: 84
    },
    BoxTimePicker: {
        display: 'flex',
        alignItems: 'center',
        columnGap: 10
    },
    TextTo: {
        paddingLeft: 5
    },
    SpanTo: {
        fontSize: 14,
        fontWeight: 400,
        color: '#898989'
    },
    TextField: {
        [`& fieldset`]: {
            borderRadius: 14,
            width: 180
        }
    }
}));

export default function DatePickerCustomer({ valueDateFrom, onChangeValueDateFrom, valueDateTo, onChangeValueDateTo }) {
    const classes = useStyles();
    const [value, setValue] = React.useState(new Date());
    return (
        <div className={classes.Container}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <div className={classes.BoxTimePicker}>
                    <MobileDatePicker
                        value={valueDateFrom}
                        onChange={onChangeValueDateFrom}
                        // onChange={(newValue) => {
                        //     setValue(newValue);
                        // }}
                        sx={{ width: 150, backgroundColor: 'blue' }}
                        renderInput={(params) => <TextField {...params} className={classes.TextField} size="small" />}
                    />
                    <div className={classes.TextTo}>
                        <span className={classes.SpanTo}>To</span>
                    </div>
                    <MobileDatePicker
                        value={valueDateTo}
                        onChange={onChangeValueDateTo}
                        // onChange={(newValue) => {
                        //     setValue(newValue);
                        // }}
                        renderInput={(params) => <TextField {...params} className={classes.TextField} size="small" />}
                    />
                </div>
            </LocalizationProvider>
        </div>
    );
}
