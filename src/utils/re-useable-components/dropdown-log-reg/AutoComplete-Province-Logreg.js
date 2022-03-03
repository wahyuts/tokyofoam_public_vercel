import React, { useEffect, useState } from 'react';
import { setLocProvinceLogreg, addKecamatanLogreg, addKotaLogreg } from '../../../redux/actions/userActions';

//MaT UI
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import MenuItem from '@mui/material/MenuItem';

//Redux
import { useDispatch, useSelector } from 'react-redux';

const indonesia = require('territory-indonesia');

const AutoCompleteProvinceLogreg = () => {
    const dispatch = useDispatch();
    const { locationProvinceLogreg } = useSelector((state) => state.user);

    const [provinces, setProvinces] = useState([]);

    // const { locationProvince } = useSelector((state) => state.shippingAddres);

    useEffect(() => {
        indonesia
            .getAllProvinces()
            .then((res) => setProvinces(res))
            .catch((err) => console.log(err));
    }, []);

    // console.log('list provinsi beneran', provinces);

    const arrProvinces = provinces.map((prv) => {
        return prv.name;
    });

    arrProvinces.push();
    arrProvinces.sort();

    //console.log('hasil sorting array', arrProvinces);

    const [value, setValue] = React.useState(arrProvinces[0]);
    const [inputValue, setInputValue] = React.useState('');

    return (
        <Autocomplete
            disablePortal
            id="combo-box-demo"
            value={locationProvinceLogreg}
            onChange={(event, newValue) => {
                dispatch(setLocProvinceLogreg(newValue));
                dispatch(addKecamatanLogreg(''));
                dispatch(addKotaLogreg(''));
                setValue(newValue);
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
                // dispatch(setLocProvince(newInputValue));
                setInputValue(newInputValue);
            }}
            options={arrProvinces}
            // sx={{ width: 300 }} // dimatiin biar widthnya 100%
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Provinsi"
                    fullWidth={true}
                    size="small"
                    required
                    id="outlined-required"
                    variant="outlined"
                    // value={locationProvince}
                />
            )}
        />
    );
};

export default AutoCompleteProvinceLogreg;
