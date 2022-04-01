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
import {
    deleteNotificationList,
    getProductById,
    goToDetailProductPageLocal
} from '../../../redux/actions/dataProductActions';
import { TablePagination } from '@mui/material';
import DeleteButton from '../../../utils/re-useable-components/buttons/DeleteButton';

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

const NotificationListTable = () => {
    const classes = useStyles();
    const router = useRouter();
    const dispatch = useDispatch();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const { dataProduct } = useSelector((state) => state.dataProduct);
    const { all_notifications } = useSelector((state) => state.theNotifications);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <>
            <TableContainer className={classes.tableContainer} component={Paper}>
                <div>
                    <Table className={classes.table} aria-label="simple table">
                        {/**Table Head menggambarkan header dari tabelnya (hanya 1 baris dan 1 kolom) */}
                        <TableHead>
                            {/**TableRow sama dengan barisnya */}
                            {/**TableCell sama dengan kolomnya */}
                            {/**Arti TableCell didlam satu table row ini adalah... dalam 1 baris mempunyaii 7 kolom(karena cell ada 7) */}
                            <TableRow>
                                <TableCell className={classes.tableHeaderCell}>
                                    <p style={{ color: 'white', fontWeight: 'bold', fontSize: 15 }}>Id Notif</p>
                                </TableCell>
                                <TableCell className={classes.tableHeaderCell}>
                                    <p style={{ color: 'white', fontWeight: 'bold', fontSize: 15 }}>Nama Produk</p>
                                </TableCell>
                                <TableCell className={classes.tableHeaderCell}>
                                    <p style={{ color: 'white', fontWeight: 'bold', fontSize: 15 }}>Start Promo</p>
                                </TableCell>
                                <TableCell className={classes.tableHeaderCell}>
                                    <p style={{ color: 'white', fontWeight: 'bold', fontSize: 15 }}>End Promo</p>
                                </TableCell>
                                <TableCell className={classes.tableHeaderCell}>
                                    <p style={{ color: 'white', fontWeight: 'bold', fontSize: 15 }}>Harga Promo</p>
                                </TableCell>
                                <TableCell className={classes.tableHeaderCell}>
                                    <p style={{ color: 'white', fontWeight: 'bold', fontSize: 15 }}>Note Promo</p>
                                </TableCell>
                                <TableCell className={classes.tableHeaderCell}>
                                    <p style={{ color: 'white', fontWeight: 'bold', fontSize: 15 }}>Action</p>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        {/**TableBody menggambarkan content tabelnya (bawahnya header tabel) */}
                        {/*dataProduct*/}
                        {/**  router.push(`/product-page/${single.title}`); */}
                        <TableBody>
                            {all_notifications
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => (
                                    // {dataProduct.map((row) => (
                                    <TableRow key={row._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        {/**Avatar ini nanti ganti sama image */}
                                        <TableCell>{row._id}</TableCell>
                                        <TableCell>{row.nama_product}</TableCell>
                                        <TableCell>{row.tanggal_start_promo}</TableCell>
                                        <TableCell>{row.tanggal_end_promo}</TableCell>
                                        <TableCell>{row.promo_price}</TableCell>
                                        <TableCell>{row.note}</TableCell>
                                        <TableCell>
                                            <DeleteButton
                                                onClick={() => {
                                                    dispatch(deleteNotificationList(row._id));
                                                }}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </div>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={all_notifications.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </>
    );
};

export default NotificationListTable;
