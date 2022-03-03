import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';

import { makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
import MainBlackButton from '../../../utils/re-useable-components/buttons/MainBlackButton';
import { getProductById, goToDetailProductPageLocal } from '../../../redux/actions/dataProductActions';

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650
    },
    tableContainer: {
        borderRadius: 15,
        marginTop: 10,
        marginBottom: 10
    },
    tableHeaderCell: {
        fontWeight: 'bold',
        backgroundColor: '#5E35B1',
        color: 'white'
    }
}));

const ProductListTable = () => {
    const classes = useStyles();
    const router = useRouter();
    const dispatch = useDispatch();
    const { dataProduct } = useSelector((state) => state.dataProduct);

    const handleClickTambah = () => {
        router.push('/admin/produk/tambah-produk');
    };

    const handleClickGoEdit = () => {
        router.push(`/admin/produk/EditProduct`);
    };

    let product_list = [
        {
            photo: 'Untuk Photo',
            title: 'Countour Foam Pillow',
            _id: 'SKU885',
            type: 'single product',
            weight: 1700,
            price: 300000,
            promo_price: 165000,
            createdAt: '17 Januari 2022',
            status_stok: 'Ready'
        },
        {
            photo: 'Untuk Photo',
            title: 'Microfoam Foam Pillow',
            _id: 'SKU886',
            type: 'single product',
            weight: 1700,
            price: 350000,
            promo_price: 175000,
            createdAt: '18 Januari 2022',
            status_stok: 'Ready'
        },
        {
            photo: 'Untuk Photo',
            title: 'Couple Pillow',
            _id: 'SKU887',
            type: 'single product',
            weight: 1700,
            price: 200000,
            promo_price: 115000,
            createdAt: '19 Januari 2022',
            status_stok: 'Ready'
        },
        {
            photo: 'Untuk Photo',
            title: 'Hypno Pillow',
            _id: 'SKU889',
            type: 'single product',
            weight: 1700,
            price: 220000,
            promo_price: 145000,
            createdAt: '19 Januari 2022',
            status_stok: 'Ready'
        },
        {
            photo: 'Untuk Photo',
            title: 'Foam Pillow',
            _id: 'SKU900',
            type: 'single product',
            weight: 1700,
            price: 120000,
            promo_price: 105000,
            createdAt: '20 Januari 2022',
            status_stok: 'Ready'
        }
    ];

    return (
        <TableContainer className={classes.tableContainer} component={Paper}>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                <div style={{ width: 186, marginTop: 10, marginRight: 10 }}>
                    <MainBlackButton className={'PurpleButton'} onClick={handleClickTambah}>
                        Tambah
                    </MainBlackButton>
                    <hr style={{ border: 'none', height: 20 }} />
                </div>
            </div>

            <div>
                <Table className={classes.table} aria-label="simple table">
                    {/**Table Head menggambarkan header dari tabelnya (hanya 1 baris dan 1 kolom) */}
                    <TableHead>
                        {/**TableRow sama dengan barisnya */}
                        {/**TableCell sama dengan kolomnya */}
                        {/**Arti TableCell didlam satu table row ini adalah... dalam 1 baris mempunyaii 7 kolom(karena cell ada 7) */}
                        <TableRow>
                            <TableCell className={classes.tableHeaderCell}>
                                <p style={{ color: 'white', fontWeight: 'bold', fontSize: 15 }}>Foto</p>
                            </TableCell>
                            <TableCell className={classes.tableHeaderCell}>
                                <p style={{ color: 'white', fontWeight: 'bold', fontSize: 15 }}>Nama Produk</p>
                            </TableCell>
                            <TableCell className={classes.tableHeaderCell}>
                                <p style={{ color: 'white', fontWeight: 'bold', fontSize: 15 }}>ID Produk</p>
                            </TableCell>
                            <TableCell className={classes.tableHeaderCell}>
                                <p style={{ color: 'white', fontWeight: 'bold', fontSize: 15 }}>Type Produk</p>
                            </TableCell>
                            <TableCell className={classes.tableHeaderCell}>
                                <p style={{ color: 'white', fontWeight: 'bold', fontSize: 15 }}>Harga</p>
                            </TableCell>
                            <TableCell className={classes.tableHeaderCell}>
                                <p style={{ color: 'white', fontWeight: 'bold', fontSize: 15 }}>Harga Promo</p>
                            </TableCell>
                            <TableCell className={classes.tableHeaderCell}>
                                <p style={{ color: 'white', fontWeight: 'bold', fontSize: 15 }}>Tanggal Input</p>
                            </TableCell>
                            <TableCell className={classes.tableHeaderCell}>
                                <p style={{ color: 'white', fontWeight: 'bold', fontSize: 15 }}>Status Produk</p>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    {/**TableBody menggambarkan content tabelnya (bawahnya header tabel) */}
                    {/*dataProduct*/}
                    {/**  router.push(`/product-page/${single.title}`); */}
                    <TableBody>
                        {dataProduct.map((row) => (
                            <TableRow key={row._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    {/* <Avatar alt={row.photo} src="." /> */}
                                    {/* {row.photo} */}
                                    <div style={{ minHeight: 50, width: '100%' }}>
                                        <Image
                                            src={row.photo}
                                            alt="Product"
                                            width={100}
                                            height={100}
                                            priority="true"
                                            layout="responsive"
                                            objectFit="fill"
                                        />
                                    </div>
                                </TableCell>{' '}
                                {/**Avatar ini nanti ganti sama image */}
                                <TableCell
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => {
                                        // dispatch(
                                        //     goToDetailProductPageLocal({
                                        //         id: row._id,
                                        //         product_id: row.product_id,
                                        //         meta_key: row.meta_key,
                                        //         meta_Desc: row.meta_desc,
                                        //         title: row.title,
                                        //         image: row.photo,
                                        //         price: row.price,
                                        //         promo_price: row.promo_price,
                                        //         type: row.type,
                                        //         material: row.material,
                                        //         size: {
                                        //             length: row.size.length,
                                        //             width_or_diameter: row.size.width_or_diameter
                                        //         },
                                        //         rating: row.rating,
                                        //         weight: row.weight,
                                        //         desc: row.desc,
                                        //         status_stok: row.status_stok
                                        //     })
                                        // );
                                        console.log('IDDDDD', row._id);
                                        dispatch(getProductById(row._id));
                                        router.push(`/admin/produk/EditProduct`);
                                    }}
                                >
                                    {row.title}
                                </TableCell>
                                <TableCell>{row.product_id}</TableCell>
                                <TableCell>{row.type}</TableCell>
                                <TableCell>{row.price}</TableCell>
                                <TableCell>{row.promo_price}</TableCell>
                                <TableCell>{row.createdAt}</TableCell>
                                <TableCell>{row.status_stok}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </TableContainer>
        // <div>
        //     <p>jajal</p>
        // </div>
    );
};

export default ProductListTable;
