import React, { useEffect, useState } from 'react';
import {
    settingIdProvince,
    setLocProvince,
    addKecamatan,
    addKota
} from '../../../redux/actions/dataShippingAddresActions';

//MaT UI
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

//Redux
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

const indonesia = require('territory-indonesia');

const AutoCompleteKabupaten = () => {
    const dispatch = useDispatch();
    const { locationProvince } = useSelector((state) => state.shippingAddres);

    const [provinces, setProvinces] = useState([]);

    const getProv = async () => {
        const data = await axios.get('/api/getProvinsi');
        setProvinces(data.data.data);
    };

    useEffect(() => {
        // Step 1
        getProv();
        //Step 5  ---> Logic nya di redux
        dispatch(settingIdProvince(provinces, locationProvince));
    }, [dispatch, provinces, locationProvince]);

    console.log('list provinsi beneran', provinces);

    // Step 2
    const arrProvinces = provinces.map((prv, i) => {
        // return prv.name;
        return prv.province;
    });

    arrProvinces.push();
    arrProvinces.sort();

    console.log('hasil sorting array', arrProvinces);

    //************************************************************** */

    const [value, setValue] = React.useState(arrProvinces[0]);
    const [inputValue, setInputValue] = React.useState('');

    return (
        <Autocomplete
            disablePortal
            id="combo-box-demo"
            value={locationProvince} //Step 4
            onChange={(event, newValue) => {
                dispatch(setLocProvince(newValue)); //Step 3
                dispatch(addKecamatan(''));
                dispatch(addKota(''));
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

export default AutoCompleteKabupaten;
