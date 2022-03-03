import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import {
    setLocProvinceLogreg,
    addKecamatanLogreg,
    addIdKotaLogreg,
    addKotaLogreg
} from '../../../redux/actions/userActions';
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

export default function DropdownKabupatenLogreg() {
    const { locationProvinceLogreg } = useSelector((state) => state.user);
    const { stateIdKotaLogreg } = useSelector((state) => state.user);
    const { stateKotaLogreg } = useSelector((state) => state.user);

    const [cekRegency, setCekRegency] = useState([]);
    const [cekCoba, setCekCoba] = useState('');

    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        indonesia
            .getRegenciesOfProvinceName(`${locationProvinceLogreg}`)
            .then((res) => setCekRegency(res))
            .catch((err) => console.log(err));
    }, [locationProvinceLogreg]);

    // console.log('regency coyy', cekRegency);

    const arrKabupaten = cekRegency.map((el) => {
        return el;
    });

    // console.log('kecamtan cuy', arrKabupaten);

    return (
        <div className={classes.MainKecamatan}>
            <TextField
                name="City"
                value={stateKotaLogreg}
                // value={locationProvince}
                fullWidth={true}
                size="small"
                required
                id="outlined-required"
                variant="outlined"
                label="Kota/Kabupaten"
                select={true}
                placeholder="Kota/Kabupaten"
            >
                {arrKabupaten.map((el, i) => (
                    <MenuItem
                        key={i}
                        // value={stateKecamatan}
                        value={el.name}
                        onClick={(e) => {
                            dispatch(addKotaLogreg(el.name));
                            dispatch(addIdKotaLogreg(el.id));
                            // dispatch(setLocProvince(locationProvince));
                        }}
                    >
                        {el.name}
                    </MenuItem>
                ))}
            </TextField>
        </div>
    );
}
