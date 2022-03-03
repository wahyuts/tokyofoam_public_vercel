import React, { useEffect, useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import { Select } from '@mui/material';
import TextField from '@mui/material/TextField';
import { setLocProvince, addKecamatan, addIdKota, addKota } from '../../../redux/actions/dataShippingAddresActions';
// import Autocomplete from '@mui/material/Autocomplete';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
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

// const indonesia = require('territory-indonesia');

export default function DropdownKabupaten() {
    // const { locationProvince } = useSelector((state) => state.shippingAddres);
    const { stateIdProv } = useSelector((state) => state.shippingAddres);

    // const { stateIdKota } = useSelector((state) => state.shippingAddres);
    const { stateKota } = useSelector((state) => state.shippingAddres);
    // const [namaKota, setNamaKota] = useState('');

    const [cekRegency, setCekRegency] = useState([]);

    const classes = useStyles();
    const dispatch = useDispatch();

    // console.log('STATE ID PROV', stateIdProv);

    useEffect(() => {
        const getKabupaten = async () => {
            try {
                const data = await axios.get(`/api/getKotaKabupaten?province=${stateIdProv}`);
                setCekRegency(data.data.data);
            } catch (error) {
                console.log(error);
            }
        };

        if (stateIdProv === '') {
            setCekRegency(['Silahkan Pilih Provinsi Dahulu']);
        } else {
            getKabupaten();
        }

        // getKabupaten();
    }, [stateIdProv]);
    //stateIdProv
    // console.log('regency coyy', cekRegency);

    const arrKabupaten = cekRegency.map((el) => {
        return el;
    });

    // console.log('kecamtan cuy', arrKabupaten);

    return (
        <div className={classes.MainKecamatan}>
            <InputLabel id="Kota/Kabupaten">Kota/Kabupaten</InputLabel>
            <Select
                name=""
                value={stateKota}
                defaultValue={null}
                // value={locationProvince}
                fullWidth={true}
                size="small"
                required
                // id="outlined-required"
                variant="outlined"
                // labelid="Kota/Kabupaten"
                id="Kota/Kabupaten"
                label="Kota/Kabupaten"
                // select={true}
                placeholder="Kota/Kabupaten"
            >
                {stateIdProv === '' ? (
                    <MenuItem value={`Pilih Provinsi Dahulu`}>{`Pilih Provinsi Dahulu`}</MenuItem>
                ) : (
                    arrKabupaten.map((el, i) => (
                        <MenuItem
                            key={i}
                            value={el.city_name}
                            onClick={(e) => {
                                dispatch(addKota(el.city_name));
                                dispatch(addIdKota(el.city_id));
                            }}
                        >
                            {el.city_name}
                        </MenuItem>
                    ))
                )}
            </Select>
        </div>
    );
}
