import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { useRouter } from 'next/router';

import {
    Card,
    Table,
    Stack,
    Avatar,
    Button,
    Checkbox,
    TableRow,
    TableBody,
    TableCell,
    Container,
    Typography,
    TableContainer,
    TablePagination
} from '@mui/material';

// import file
import DatePickerCustomer from './date-picker-customer/DatePickerCustomer';
import USERLIST from './_mocks/customer';
import CustomerListHead from './CustomerListHead';

// table stuff
const TABLE_HEAD = [
    { id: 'number', label: 'No', alignRight: false },
    { id: 'name', label: 'Nama', alignRight: false },
    { id: 'date', label: 'Tanggal', alignRight: false },
    { id: 'total', label: 'Jumlah', alignRight: false },
    { id: 'status', label: 'Status', alignRight: false },
    { id: 'price', label: 'Harga', alignRight: false }
    // { id: 'action', label: 'Aksi', alignRight: false },
];

// ----------------------------------------------------------------------
// filter bawaan table dari mat ui
function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}
function applySortFilter(array, comparator, query) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    if (query) {
        return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    }
    return stabilizedThis.map((el) => el[0]);
}
const useStyles = makeStyles((theme) => ({
    ItemTop: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingInline: 30,
        paddingTop: 26
    },
    ItemTopLeft: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        columnGap: 10
        // backgroundColor: 'red'
    },
    ItemDatePicker: {
        width: 167,
        height: 35,
        background: '#FFFFFF',
        border: '1px solid #898989',
        borderRadius: 12
    },
    ItemTopRight: {
        flex: 1,
        display: 'flex',
        justifyContent: 'flex-end',
        columnGap: 10,
        [theme.breakpoints.down('tablet')]: {
            justifyContent: 'unset'
        }
        // backgroundColor: 'blue'
    },
    TextKembali: {
        fontSize: 14,
        fontWeight: 600,
        color: '#000000'
    }
}));

export default function DetailRiwayat() {
    const classes = useStyles();
    const [dateFromHistory, setDateFromHistory] = useState();
    const [dateToHistory, setDateToHistory] = useState();

    const [page, setPage] = useState(0);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('name');
    const [selected, setSelected] = useState([]);
    const [filterName, setFilterName] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const router = useRouter();
    const handleClickKembali = () => {
        router.push('/admin/customer');
    };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };
    // pagination table
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

    return (
        <Container>
            <Card>
                <div className={classes.ItemTop}>
                    <div className={classes.ItemTopLeft}>
                        <div>
                            <input
                                type="date"
                                className={classes.ItemDatePicker}
                                value={dateFromHistory}
                                onChange={(e) => setDateFromHistory(e.target.value)}
                            />
                        </div>
                        <span style={{ fontSize: 14, fontWeight: 400, color: '#898989' }}>To</span>
                        <div>
                            <input
                                type="date"
                                className={classes.ItemDatePicker}
                                value={dateToHistory}
                                onChange={(e) => setDateToHistory(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className={classes.ItemTopRight}>
                        <div className={classes.BtnTambah}>
                            <Button
                                style={{
                                    border: '1px solid #898989',
                                    borderRadius: 12,
                                    width: 179,
                                    height: 37,
                                    textTransform: 'none'
                                }}
                                onClick={handleClickKembali}
                            >
                                <span className={classes.TextKembali}>Kembali</span>
                            </Button>
                        </div>
                    </div>
                </div>
                <div className={classes.TextRiwayat} style={{ paddingTop: 20, paddingInline: 30, paddingBottom: 20 }}>
                    <span style={{ color: '#191919', fontSize: 16, fontWeight: 700 }}>Riwayat Belanja</span>
                </div>
                <div className={classes.ContainerTable}>
                    <TableContainer sx={{ minWidth: 600 }}>
                        <Table
                            sx={{
                                width: '100%',
                                maxHeight: '100%',
                                backgroundColor: '#ffffff',
                                borderRadius: 4
                            }}
                        >
                            <CustomerListHead
                                order={order}
                                orderBy={orderBy}
                                headLabel={TABLE_HEAD}
                                rowCount={USERLIST.length}
                                numSelected={selected.length}
                                onRequestSort={handleRequestSort}
                            />
                            <TableBody>
                                {filteredUsers
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row) => {
                                        const { id, name, role, date, noPelanggan, email, statusPayment } = row;
                                        const isItemSelected = selected.indexOf(name) !== -1;
                                        return (
                                            <TableRow
                                                hover
                                                key={id}
                                                tabIndex={-1}
                                                // onClick={handleClickCustomer}
                                                // style={{ cursor: 'pointer' }}
                                            >
                                                <TableCell>1</TableCell>
                                                <TableCell>{name}</TableCell>
                                                <TableCell>11/11/20</TableCell>
                                                <TableCell>1</TableCell>
                                                <TableCell>{statusPayment}</TableCell>

                                                <TableCell component="th" scope="row">
                                                    <Stack direction="row" alignItems="left" spacing={0}>
                                                        <Typography noWrap>IDR</Typography>
                                                        <Typography noWrap>750.000</Typography>
                                                    </Stack>
                                                </TableCell>
                                                {/* <TableCell component="th" scope="row" align="left">
                                                    <Stack direction="row" alignItems="right" spacing={0}>
                                                        <Button style={{ textTransform: 'none' }}>
                                                            <Typography
                                                                style={{
                                                                    color: '#7ABAE8',
                                                                    fontSize: 14,
                                                                    fontWeight: 400
                                                                }}
                                                            >
                                                                Edit
                                                            </Typography>
                                                        </Button>
                                                        <Button style={{ textTransform: 'none' }}>
                                                            <Typography
                                                                style={{
                                                                    color: '#7ABAE8',
                                                                    fontSize: 14,
                                                                    fontWeight: 400
                                                                }}
                                                            >
                                                                Hapus
                                                            </Typography>
                                                        </Button>
                                                    </Stack>
                                                </TableCell> */}
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={USERLIST.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        style={{ display: 'flex' }}
                    />
                </div>
            </Card>
        </Container>
    );
}
