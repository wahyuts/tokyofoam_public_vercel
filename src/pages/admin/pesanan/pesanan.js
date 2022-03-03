import * as React from 'react';
import { useDispatch } from 'react-redux';
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

const useStyles = makeStyles((theme) => ({}));

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
    const dispatch = useDispatch();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

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
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                    {columns.map((column) => {
                                        const value = row[column.id];
                                        return (
                                            <TableCell key={column.id} align={column.align}>
                                                <div onClick={() => dispatch(setPesanan('rincianPesanan'))}>
                                                    {column.format && typeof value === 'number'
                                                        ? column.format(value)
                                                        : value}
                                                </div>
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
