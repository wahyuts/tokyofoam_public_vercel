import React, { useEffect, useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import { Select } from '@mui/material';
import TextField from '@mui/material/TextField';
import { setLocProvince, addIdKecamatan, addKecamatan } from '../../../redux/actions/dataShippingAddresActions';
// import Autocomplete from '@mui/material/Autocomplete';
import MenuItem from '@mui/material/MenuItem';
import { makeStyles } from '@mui/styles';

//Redux
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

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

export default function DropdownKecamatan() {
    const { stateKecamatan } = useSelector((state) => state.shippingAddres);
    const { stateIdKota } = useSelector((state) => state.shippingAddres);

    const [cekDistric, setCekDistric] = useState([]);
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        const getKecamatan = async () => {
            try {
                const data = await axios.get(`/api/getKecamatan?city=${stateIdKota}`);
                setCekDistric(data.data.data);
            } catch (error) {
                console.log(error);
            }
        };

        if (stateIdKota === '') {
            setCekDistric(['Silahkan Pilih Kota/Kabupaten Dahulu']);
        } else {
            getKecamatan();
        }

        // getKecamatan();
    }, [stateIdKota]);

    // console.log('distrik coyy', cekDistric);

    const arrDistric = cekDistric.map((el) => {
        return el;
    });

    // console.log('kecamtan cuy', arrKabupaten);

    return (
        // <div className={classes.MainContainer}>
        <div className={classes.MainKecamatan}>
            <InputLabel id="Kecamatan">Kecamatan</InputLabel>
            <Select
                name=""
                value={stateKecamatan}
                defaultValue={null}
                fullWidth={true}
                size="small"
                required
                // id="outlined-required"
                variant="outlined"
                // labelid="Kecamatan"
                id="Kecamatan"
                label="Kecamatan"
                // select={true}
                placeholder="Jangan lupa diisi ya"
            >
                {stateIdKota === '' ? (
                    <MenuItem value={`Pilih Kota/Kabupaten Dahulu`}>{`Pilih Kota/Kabupaten Dahulu`}</MenuItem>
                ) : (
                    arrDistric.map((el, i) => (
                        <MenuItem
                            key={i}
                            value={el.subdistrict_name}
                            onClick={(e) => {
                                dispatch(addKecamatan(el.subdistrict_name));
                                dispatch(addIdKecamatan(el.subdistrict_id));
                            }}
                        >
                            {el.subdistrict_name}
                        </MenuItem>
                    ))
                )}
            </Select>
        </div>
        // </div>
    );
}
