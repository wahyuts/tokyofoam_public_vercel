import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
// import Autocomplete from '@mui/material/Autocomplete';
import MenuItem from '@mui/material/MenuItem';
import { setLocProvince } from '../../../redux/actions/dataShippingAddresActions';
import { makeStyles } from '@mui/styles';

//Redux
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles(() => ({
    MainProvinsi: {
        position: 'relative',
        '& .menuDropdownStyle': {
            position: 'absolute',
            top: 10
        }
    }
}));

// const indonesia = require('territory-indonesia');

const DropdownProvinsi = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [provinces, setProvinces] = useState([]);
    const { locationProvince } = useSelector((state) => state.shippingAddres);

    // const [regencies, setRegencies] = useState([]);

    useEffect(() => {
        indonesia
            .getRegenciesOfProvinceName(`${locationProvince}`)
            .then((res) => setProvinces(res))
            .catch((err) => console.log(err));
    }, [locationProvince]);

    // console.log('list lokasi provinsi', locationProvince);
    // console.log('list kecamatannn', provinces);

    const arrProvinces = provinces.map((prv) => {
        return prv.name;
    });

    // arrProvinces.push('*Pilih Provinsi');
    arrProvinces.sort();

    console.log('hasil sorting array', arrProvinces);

    const menuDropdown = arrProvinces.map((prv, i) => (
        <MenuItem
            key={i}
            value={prv}
            onClick={(e) => {
                dispatch(setLocProvince(prv));
            }}
        >
            {prv}
        </MenuItem>
    ));

    // console.log('EACH PROV Textfield', locationProvince);

    return (
        <div className={classes.MainProvinsi}>
            <TextField
                name="province"
                value={locationProvince}
                fullWidth={true}
                size="small"
                required
                id="outlined-required"
                variant="outlined"
                label="Provinsi"
                select={true}
                placeholder="Jangan lupa diisi ya"
            >
                {menuDropdown}
            </TextField>
        </div>
    );
};

export default DropdownProvinsi;
