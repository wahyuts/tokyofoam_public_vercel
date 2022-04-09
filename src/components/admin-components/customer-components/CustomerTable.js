import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
// mat ui stuff
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
import USERLIST from './_mocks/customer';
import CustomerListHead from './CustomerListHead';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers, getDataOrdersById, getHistoryOrdersById } from '../../../redux/actions/userActions';
import { filter } from 'lodash';
import ExportCSV from '../../../utils/re-useable-components/admin-components/ExportCsv';

// table stuff
const TABLE_HEAD = [
    { id: 'pelanggan', label: 'Pelanggan', alignRight: false },
    { id: 'alamat', label: 'Alamat', alignRight: false },
    { id: 'notelp', label: 'NoTelp', alignRight: false },
    { id: 'tanggal', label: 'Tanggal Datfar', alignRight: false }
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
    const stabilizedThis = array?.map((el, index) => [el, index]);
    stabilizedThis?.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    // if (query) {
    //     return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    // }
    return stabilizedThis?.map((el) => el[0]);
}

const useStyles = makeStyles((theme) => ({
    MainContainer: {
        paddingInline: 32,
        paddingTop: 33
    },
    ItemTop: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        [theme.breakpoints.down('tablet')]: {
            flexWrap: 'wrap',
            rowGap: 20,
            columnGap: 20
        }
    },
    ItemTopLeft: {
        // flex: 1,
        // display: 'flex',
        // alignItems: 'center',
        // columnGap: 10
        // backgroundColor: 'red'
    },
    TopNavSearch: {
        position: 'relative',
        height: 50,
        background: '#FFFFFF',
        display: 'flex',
        alignItems: 'center',
        // boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
        borderRadius: 12,
        '& .Input': {
            height: 35,
            width: 300,
            paddingLeft: 20,
            paddingRight: 50,
            background: '#ffffff',
            fontSize: '1rem',
            borderRadius: 12,
            border: '1px solid #898989'
        },
        '& #icon': {
            fontSize: 18,
            position: 'absolute',
            right: 20
        }
    },
    ItemMiddle: {
        display: 'flex',
        alignItems: 'center',
        columnGap: 10
        // flex: 1,
    },
    ItemDatePicker: {
        width: 167,
        height: 35,
        background: '#FFFFFF',
        border: '1px solid #898989',
        borderRadius: 12
    },
    ItemTopRight: {
        // flex: 1,
        // display: 'flex',
        // justifyContent: 'flex-end',
        // columnGap: 10,
        [theme.breakpoints.down('tablet')]: {
            justifyContent: 'unset'
        }
    },
    TextExport: {
        fontSize: 14,
        fontWeight: 600,
        color: '#000000'
    },
    TextTambah: {
        fontSize: 14,
        fontWeight: 600,
        color: '#FFFFFF'
    },
    // table
    ContainerTable: {
        paddingTop: 44
    }
}));

// const isSameOrAfter = require('dayjs/plugin/isSameOrAfter');
// dayjs.extend(isSameOrAfter);

// const isSameOrBefore = require('dayjs/plugin/isSameOrBefore');
// dayjs.extend(isSameOrBefore);

export default function CustomerTable() {
    const classes = useStyles();
    const [dateFrom, setDateFrom] = useState();
    const [dateTo, setDateTo] = useState();
    const [data, setData] = useState(usersDataAll);
    const [page, setPage] = useState(0);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('name');
    const [selected, setSelected] = useState([]);
    const [filterName, setFilterName] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const router = useRouter();
    // handleClick to
    // const handleClickCustomer = () => {
    //     router.push('/admin/customer/customer-detail');
    // };

    // const handleDateFrom = (newValue) => {
    //     setDateFrom(newValue);
    // };
    // const handleDateTo = (newValue) => {
    //     setDateTo(newValue);
    // };
    const { usersDataAll } = useSelector((state) => state.user);
    // console.log('LOG', usersDataAll);
    // console.log(usersDataAll._id, 'usersDataAll Id');
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch]);

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
    const handleFilterByName = (event) => {
        setFilterName(event.target.value);
    };

    const filteredUsers = applySortFilter(usersDataAll, getComparator(order, orderBy), filterName);
    // console.log(filteredUsers, 'filtered users ');

    // const handleFilterDate = (createdAt, field) => {
    //     const filteredUsersData = usersDataAll.filter((item) => {
    //         if ('from' && dayjs(item.createdAt).isSameOrAfter(dayjs(createdAt))) {
    //             return item;
    //         }
    //         setData(filteredUsersData);
    //     });
    // };
    return (
        <Container>
            <Card className={classes.MainContainer}>
                <div className={classes.ItemTop}>
                    <div className={classes.ItemTopLeft}>
                        <div className={classes.TopNavSearch}>
                            <input
                                type="text"
                                placeholder="Search"
                                className="Input"
                                value={filterName}
                                onChange={handleFilterByName}
                            />
                            <i className="bx bx-search" id="icon"></i>
                        </div>
                    </div>
                    <div className={classes.ItemMiddle}>
                        <div>
                            <input
                                type="date"
                                className={classes.ItemDatePicker}
                                value={dateFrom}
                                onChange={(e) => setDateFrom(e.target.value)}
                            />
                        </div>
                        <span style={{ fontSize: 14, fontWeight: 400, color: '#898989' }}>To</span>
                        <div>
                            <input
                                type="date"
                                className={classes.ItemDatePicker}
                                value={dateTo}
                                onChange={(e) => setDateTo(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className={classes.ItemTopRight}>
                        <div className={classes.BtnExport}>
                            {usersDataAll === undefined ? null : (
                                <ExportCSV
                                    data={usersDataAll.map((el, ind) => ({
                                        'No. ': ind + 1,
                                        Pelanggan: el.nama,
                                        Alamat: el.alamat,
                                        'No Telp': el.no_telp,
                                        'Tanggal Daftar': el.createdAt.substring(0, 10)
                                    }))}
                                    filename="Customer Report"
                                />
                            )}
                        </div>
                        {/* <div className={classes.BtnTambah}>
                            <Button
                                style={{
                                    textTransform: 'none',
                                    background: '#673AB7',
                                    width: 179,
                                    height: 37,
                                    borderRadius: 12
                                }}
                            >
                                <span className={classes.TextTambah}>Tambah</span>
                            </Button>
                        </div> */}
                    </div>
                </div>
                <div className={classes.ContainerTable}>
                    {/* <Scrollbar> */}
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
                                    ?.filter((el) => el.nama.toLowerCase().includes(filterName.toLowerCase()))
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((users, el) => {
                                        // const { id, nama, email, alamat, tgl_daftar, phone, level_user } = row;
                                        // const isItemSelected = selected.indexOf(name) !== -1;
                                        return (
                                            <TableRow
                                                hover
                                                key={el}
                                                tabIndex={-1}
                                                onClick={() => {
                                                    dispatch(getHistoryOrdersById(users._id, router));
                                                    console.log(users._id, 'cek id terlempar');
                                                    // router.push('/admin/customer/customer-detail');
                                                }}
                                                style={{ cursor: 'pointer' }}
                                            >
                                                {/* <TableCell></TableCell> */}
                                                <TableCell component="th" scope="row">
                                                    <Stack direction="column" alignItems="left" spacing={0}>
                                                        <Typography noWrap>{users.nama}</Typography>
                                                        <Typography noWrap>{users.email}</Typography>
                                                    </Stack>
                                                </TableCell>
                                                <TableCell align="left">
                                                    <Typography noWrap>{users.alamat}</Typography>
                                                </TableCell>
                                                <TableCell align="left">
                                                    <Typography noWrap>{users.no_telp}</Typography>
                                                </TableCell>
                                                <TableCell align="left">
                                                    <Typography noWrap>{users.createdAt.substring(0, 10)}</Typography>
                                                </TableCell>
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
                    {/* </Scrollbar> */}
                </div>
            </Card>
        </Container>
    );
}
