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
import setPesanan from './redux/action/simple-action';
import MainBlackButton from '../../../utils/re-useable-components/buttons/MainBlackButton';
import { getAllOrderForAdminDashboard } from '../../../redux/actions/dataHistoryOrderAction';

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
    }
}));

const columns = [
    { id: 'no_pesanan', label: 'No Pesanan', minWidth: 170 },
    { id: 'tanggal_jual', label: 'Tanggal Jual', minWidth: 100 },
    {
        id: 'jatuh_tempo',
        label: 'Jatuh Tempo',
        minWidth: 170,
        align: 'left'
        // format: (value) => value.toLocaleString('en-US')
    },
    {
        id: 'pelanggan',
        label: 'Pelanggan',
        minWidth: 170,
        align: 'left'
        // format: (value) => value.toLocaleString('en-US')
    },
    {
        id: 'tujuan_pengiriman',
        label: 'Tujuan Pengiriman',
        minWidth: 170,
        align: 'left'
        // format: (value) => value.toFixed(2)
    },
    {
        id: 'total',
        label: 'Total',
        minWidth: 170,
        align: 'left'
        // format: (value) => value.toFixed(2)
    },
    {
        id: 'status',
        label: 'Status',
        minWidth: 170,
        align: 'left'
        // format: (value) => value.toFixed(2)
    }
];

function createData(no_pesanan, tanggal_jual, jatuh_tempo, pelanggan, tujuan_pengiriman, total, status) {
    return { no_pesanan, tanggal_jual, jatuh_tempo, pelanggan, tujuan_pengiriman, total, status };
}

const rows = [
    createData(
        '1',
        '02-Nov-2021 12.00',
        '02-Nov-2021 12.00',
        'Maria L',
        'JNE OKE (2-3 Hari)',
        'IDR 651.300',
        'pending'
    ),
    createData(
        '1',
        '02-Nov-2021 12.00',
        '02-Nov-2021 12.00',
        'Maria L',
        'JNE OKE (2-3 Hari)',
        'IDR 651.300',
        'pending'
    ),
    createData(
        '1',
        '02-Nov-2021 12.00',
        '02-Nov-2021 12.00',
        'Maria L',
        'JNE OKE (2-3 Hari)',
        'IDR 651.300',
        'pending'
    ),
    createData(
        '1',
        '02-Nov-2021 12.00',
        '02-Nov-2021 12.00',
        'Maria L',
        'JNE OKE (2-3 Hari)',
        'IDR 651.300',
        'pending'
    ),
    createData(
        '1',
        '02-Nov-2021 12.00',
        '02-Nov-2021 12.00',
        'Maria L',
        'JNE OKE (2-3 Hari)',
        'IDR 651.300',
        'pending'
    ),
    createData(
        '1',
        '02-Nov-2021 12.00',
        '02-Nov-2021 12.00',
        'Maria L',
        'JNE OKE (2-3 Hari)',
        'IDR 651.300',
        'pending'
    ),
    createData(
        '1',
        '02-Nov-2021 12.00',
        '02-Nov-2021 12.00',
        'Maria L',
        'JNE OKE (2-3 Hari)',
        'IDR 651.300',
        'pending'
    ),
    createData(
        '1',
        '02-Nov-2021 12.00',
        '02-Nov-2021 12.00',
        'Maria L',
        'JNE OKE (2-3 Hari)',
        'IDR 651.300',
        'pending'
    ),
    createData(
        '1',
        '02-Nov-2021 12.00',
        '02-Nov-2021 12.00',
        'Maria L',
        'JNE OKE (2-3 Hari)',
        'IDR 651.300',
        'pending'
    ),
    createData(
        '1',
        '02-Nov-2021 12.00',
        '02-Nov-2021 12.00',
        'Maria L',
        'JNE OKE (2-3 Hari)',
        'IDR 651.300',
        'pending'
    ),
    createData(
        '1',
        '02-Nov-2021 12.00',
        '02-Nov-2021 12.00',
        'Maria L',
        'JNE OKE (2-3 Hari)',
        'IDR 651.300',
        'pending'
    ),
    createData(
        '1',
        '02-Nov-2021 12.00',
        '02-Nov-2021 12.00',
        'Maria L',
        'JNE OKE (2-3 Hari)',
        'IDR 651.300',
        'pending'
    ),
    createData(
        '1',
        '02-Nov-2021 12.00',
        '02-Nov-2021 12.00',
        'Maria L',
        'JNE OKE (2-3 Hari)',
        'IDR 651.300',
        'pending'
    ),
    createData(
        '1',
        '02-Nov-2021 12.00',
        '02-Nov-2021 12.00',
        'Maria L',
        'JNE OKE (2-3 Hari)',
        'IDR 651.300',
        'pending'
    ),
    createData('1', '02-Nov-2021 12.00', '02-Nov-2021 12.00', 'Maria L', 'JNE OKE (2-3 Hari)', 'IDR 651.300', 'pending')
];

export default function Pesanan() {
    const classes = useStyles();
    const router = useRouter();
    const dispatch = useDispatch();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const { all_order_for_admin } = useSelector((state) => state.data_history_order);

    console.log('all ORDER FOR ADMIN', all_order_for_admin);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
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
                <div>{/* <input>Filter Date - start</input> */}</div>
                <Stack spacing={2} direction="row">
                    <ButtonComponent variant="outlined" label="Export" textColor="#000000" />
                    <ButtonComponent variant="contained" label="Tambah" color="#673AB7" textColor="#ffffff" />
                </Stack>
            </div>

            <TableContainer className={classes.tableContainer} component={Paper}>
                {/* <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                    <div style={{ width: 186, marginTop: 10, marginRight: 10 }}>
                        <MainBlackButton className={'PurpleButton'}>Tambah</MainBlackButton>
                        <hr style={{ border: 'none', height: 20 }} />
                    </div>
                </div> */}

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
                            {all_order_for_admin
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => (
                                    // {dataProduct.map((row) => (
                                    <TableRow
                                        key={row._id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => {
                                            console.log('IDDDDD', row._id);
                                            // dispatch(getProductById(row._id));
                                            // router.push(`/admin/pesanan/rincian-pesanan`);
                                            dispatch(setPesanan('rincianPesanan'));
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
                                        <TableCell>
                                            <p>Ini ro resi harusnya</p>
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
                count={all_order_for_admin.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
