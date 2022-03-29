import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import {
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow
} from '@mui/material';
import { makeStyles } from '@mui/styles';
// import { setPesanan } from './redux/action/simple-action';

import ButtonComponent from './component/button';
// import setPesanan from './redux/action/simple-action';
import MainBlackButton from '../../../utils/re-useable-components/buttons/MainBlackButton';
import {
    getAllOrderForAdminDashboard,
    getSingleOrderByIdOrder,
    setPesanan
} from '../../../redux/actions/dataHistoryOrderAction';

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650
    },
    tableContainer: {
        // borderRadius: 15,
        marginTop: 10,
        marginBottom: 10
    },
    tableHeaderCell: {
        fontWeight: 'bold',
        backgroundColor: '#5E35B1',
        color: 'white'
    },
    topNavSearch: {
        position: 'relative',
        height: 50,
        width: 300,
        backgroundColor: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
        borderRadius: 12,
        '& .forInput': {
            width: '100%',
            height: '100%',
            outline: 'none',
            border: 'none',
            borderRadius: 12,
            paddingLeft: 10
        }
        /* overflow: hidden; */
    }
}));

export default function Pesanan() {
    const classes = useStyles();
    const router = useRouter();
    const dispatch = useDispatch();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [searchByIdPesanan, setSearchByIdPesanan] = React.useState('');
    const { all_order_for_admin } = useSelector((state) => state.data_history_order);

    console.log('all ORDER FOR ADMIN', all_order_for_admin);
    console.log('text seacrh', searchByIdPesanan);

    const filteredOrder = all_order_for_admin.filter((orderById) => {
        return (
            orderById._id.toLocaleLowerCase().includes(searchByIdPesanan.toLocaleLowerCase()) ||
            orderById.nama_pembeli.toLocaleLowerCase().includes(searchByIdPesanan.toLocaleLowerCase())
        );
    });

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleChangeSearch = (e) => {
        setSearchByIdPesanan(e.target.value);
    };

    React.useEffect(() => {
        dispatch(getAllOrderForAdminDashboard());
    }, [dispatch]);

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <div
                style={{
                    display: 'flex',
                    flexDiraction: 'row',
                    justifyContent: 'space-between',
                    margin: '20px'
                }}
            >
                <div className={classes.topNavSearch}>
                    <input
                        className="forInput"
                        type="text"
                        placeholder="Masukan Id Pesanan Atau Nama Pembeli"
                        onChange={handleChangeSearch}
                    />
                    <i className="bx bx-search"></i>
                </div>
                <Stack spacing={2} direction="row">
                    <ButtonComponent variant="outlined" label="Export" textColor="#000000" />
                </Stack>
            </div>

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
                                    <p style={{ color: 'white', fontWeight: 'bold', fontSize: 15 }}>No Pesanan</p>
                                </TableCell>
                                <TableCell className={classes.tableHeaderCell}>
                                    <p style={{ color: 'white', fontWeight: 'bold', fontSize: 15 }}>Nama Pembeli</p>
                                </TableCell>
                                <TableCell className={classes.tableHeaderCell}>
                                    <p style={{ color: 'white', fontWeight: 'bold', fontSize: 15 }}>
                                        Tanggal Pembelian
                                    </p>
                                </TableCell>
                                <TableCell className={classes.tableHeaderCell}>
                                    <p style={{ color: 'white', fontWeight: 'bold', fontSize: 15 }}>Expedisi</p>
                                </TableCell>
                                <TableCell className={classes.tableHeaderCell}>
                                    <p style={{ color: 'white', fontWeight: 'bold', fontSize: 15 }}>Ho Handphone</p>
                                </TableCell>
                                <TableCell className={classes.tableHeaderCell}>
                                    <p style={{ color: 'white', fontWeight: 'bold', fontSize: 15 }}>Total Bayar</p>
                                </TableCell>
                                <TableCell className={classes.tableHeaderCell}>
                                    <p style={{ color: 'white', fontWeight: 'bold', fontSize: 15 }}>Status Payment</p>
                                </TableCell>
                                <TableCell className={classes.tableHeaderCell}>
                                    <p style={{ color: 'white', fontWeight: 'bold', fontSize: 15 }}>No Resi</p>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        {/**TableBody menggambarkan content tabelnya (bawahnya header tabel) */}
                        {/*dataProduct*/}
                        {/**  router.push(`/product-page/${single.title}`); */}
                        <TableBody>
                            {filteredOrder.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                                // {dataProduct.map((row) => (
                                <TableRow
                                    key={row._id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => {
                                        console.log('IDDDDD', row._id);
                                        // dispatch(getProductById(row._id));
                                        // router.push(`/admin/pesanan/rincian-pesanan`);
                                        dispatch(getSingleOrderByIdOrder(row._id));
                                        // dispatch(setPesanan('rincianPesanan'));
                                    }}
                                >
                                    {/**Avatar ini nanti ganti sama image */}
                                    <TableCell>{row._id}</TableCell>
                                    <TableCell>{row.nama_pembeli}</TableCell>
                                    <TableCell>{row.tanggal_pembelian}</TableCell>
                                    <TableCell>{row.expedisi}</TableCell>
                                    <TableCell>{row.no_handphone}</TableCell>
                                    <TableCell>{row.totalPrice_plus_shipping_minus_benefit_member}</TableCell>
                                    <TableCell>{row.status_payment}</TableCell>
                                    <TableCell>{row.no_resi}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={filteredOrder.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
