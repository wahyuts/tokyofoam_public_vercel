import Head from 'next/head';
import React, { useEffect } from 'react';
import { getAllDataProduct } from '../../redux/actions/dataProductActions';
import { useDispatch, useSelector } from 'react-redux';

import AddToFavButton from '../../utils/re-useable-components/buttons/AddToFavButton';

import DeleteButton from '../../utils/re-useable-components/buttons/DeleteButton';
import AutoCompleteProvince from '../../utils/re-useable-components/dropdown/AutoComplete-Province';
import DropdownProvinsi from '../../utils/re-useable-components/dropdown/dropdown-provinsi';
// import DeleteIcon from '../../../public/assets/images/DeleteIcon.png';
import DropdownKabupaten from '../../utils/re-useable-components/dropdown/dropdown-kabupaten';
import OlShopCard from '../../utils/re-useable-components/card/OlShopCard';

const TestSignIn = () => {
    const dispatch = useDispatch();
    const { dataProduct } = useSelector((state) => state.dataProduct);

    useEffect(() => {
        dispatch(getAllDataProduct());
    }, [dispatch]);

    console.log('data PRODUCT', dataProduct);

    return (
        <div>
            <Head>
                <title>Tokyo Foam || Sign In</title>
            </Head>
            <p>Sign In nn</p>
            {/* <DropdownKabupaten /> */}
            <DeleteButton> </DeleteButton>
            <AddToFavButton></AddToFavButton>
            <AutoCompleteProvince />
            {/* <DropdownProvinsi /> */}
            {/* <DeleteIcon /> */}
            <DropdownKabupaten />
            <OlShopCard>ini buat apaan njir</OlShopCard>
        </div>
    );
};

export default TestSignIn;
