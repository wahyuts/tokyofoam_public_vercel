import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { setLocProvinceLogreg, addKecamatanLogreg } from '../../../redux/actions/userActions';
// import Autocomplete from '@mui/material/Autocomplete';
import MenuItem from '@mui/material/MenuItem';
import { makeStyles } from '@mui/styles';

//Redux
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles(() => ({
    MainContainer: {
        position: 'absolute',
        left: '50%',
        top: '50%',

        transform: 'translate(-50%, -50%)',
        display: 'flex',
        alignItems: 'space-between'

        // width: '100%'
    },
    // DropdownWidth: {
    //     width: '100%'
    // }
    MainKecamatan: {
        // width: '100%'
    }
}));

const indonesia = require('territory-indonesia');

export default function DropdownKecamatanLogreg() {
    const { stateKecamatanLogreg } = useSelector((state) => state.user);
    const { stateIdKotaLogreg } = useSelector((state) => state.user);

    const [cekDistric, setCekDistric] = useState([]);
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        indonesia
            .getDistrictsOfRegencyId(stateIdKotaLogreg)
            .then((res) => setCekDistric(res))
            .catch((err) => console.log(err));
    }, [stateIdKotaLogreg]);

    console.log('distrik coyy', cekDistric);

    const arrDistric = cekDistric.map((el) => {
        return el.name;
    });

    // console.log('kecamtan cuy', arrKabupaten);

    return (
        // <div className={classes.MainContainer}>
        <div className={classes.MainKecamatan}>
            <TextField
                name="City"
                value={stateKecamatanLogreg}
                fullWidth={true}
                size="small"
                required
                id="outlined-required"
                variant="outlined"
                label="Kecamatan"
                select={true}
                placeholder="Jangan lupa diisi ya"
            >
                {arrDistric.map((el, i) => (
                    <MenuItem
                        key={i}
                        value={el}
                        onClick={(e) => {
                            // dispatch(setLocProvince(el));
                            dispatch(addKecamatanLogreg(el));
                        }}
                    >
                        {el}
                    </MenuItem>
                ))}
            </TextField>
        </div>
        // </div>
    );
}
