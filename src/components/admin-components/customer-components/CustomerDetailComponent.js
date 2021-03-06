import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import crown_logo from '../../../../public/assets/images/Crown.png';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
// mat ui stuff
import { Card, Button, Container } from '@mui/material';
import {
    getAllUsers,
    getDataOrdersById,
    // getDataOrdersByIdCustomerDetail,
    getHistoryOrdersById
} from '../../../redux/actions/userActions';
import { get } from 'lodash';

const useStyles = makeStyles((theme) => ({
    CardTop: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingInline: 30,
        height: 102
    },
    ItemLeft: {
        flex: 1
    },
    TextPelanggan: {
        fontSize: 18,
        fontWeight: 600,
        color: '#000000'
    },
    TextKembali: {
        fontSize: 14,
        fontWeight: 600,
        color: '#000000'
    },
    ItemRight: {
        flex: 1,
        display: 'flex',
        justifyContent: 'flex-end'
    },
    TextEdit: {
        fontSize: 10,
        fontWeight: 500,
        color: '#FFFFFF'
    },
    // middle
    ContainerCardMiddle: {
        display: 'flex',
        justifyContent: 'space-between',
        paddingTop: 28,
        columnGap: 30
    },
    CardMiddleLeft: {
        flex: 1,
        paddingInline: 15,
        paddingBottom: 16
    },
    MainBoxMiddle: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 15,
        paddingBottom: 15
    },
    CardMiddleRight: {
        flex: 1,
        paddingInline: 15
    },
    ItemMiddleBottom: {
        display: 'flex',
        columnGap: 100,
        paddingTop: 15,
        [theme.breakpoints.down('tablet')]: {
            columnGap: 0
        }
    },
    ItemMiddleBottomRight: {
        display: 'flex',
        columnGap: 100,
        paddingTop: 15,
        [theme.breakpoints.down('tablet')]: {
            columnGap: 0
        }
    },
    ItemNama: {
        width: 200,
        display: 'flex',
        flexDirection: 'column',
        rowGap: 8
    },
    ItemType: {
        width: 200,
        display: 'flex',
        flexDirection: 'column',
        rowGap: 8
    },
    ImgType: {
        display: 'flex',
        alignItems: 'center',
        columnGap: 20
    },
    ItemEmail: {
        width: 200,
        display: 'flex',
        flexDirection: 'column',
        rowGap: 8,
        paddingTop: 20
    },
    ItemNoHp: {
        width: 200,
        display: 'flex',
        flexDirection: 'column',
        rowGap: 8,
        paddingTop: 20
    },
    // card right middle
    MainBoxMiddleRight: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 15,
        paddingBottom: 15
    },
    // bottom
    ContainerCardBottom: {
        display: 'flex',
        justifyContent: 'space-between',
        paddingTop: 28,
        columnGap: 30
    },
    ItemBottom: {
        display: 'flex',
        flexDirection: 'column',
        rowGap: 25
    },
    TextHapus: {
        fontSize: 12,
        fontWeight: 700,
        color: '#252733'
    },
    TextHapusPelanggan: {
        fontSize: 12,
        fontWeight: 600,
        color: '#ffffff'
    }
}));

export default function CustomerDetailComponent() {
    const { detailUserOrder } = useSelector((state) => state.user);
    const { detailHistoryOrder } = useSelector((state) => state.user);
    const { usersDataAll } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const classes = useStyles();
    const [valueNama, setValueNama] = useState(detailHistoryOrder?.nama);
    const [valueEmail, setValueEmail] = useState(detailHistoryOrder?.email);
    const [valueType, setValueType] = useState('');
    const [valueNohp, setValueNohp] = useState('');
    const [valueAlamat, setValueAlamat] = useState('');
    const [valueTelahBelanja, setValueTelahBelanja] = useState('');
    const [valueBanyakProduk, setValueBanyakProduk] = useState('');
    const [valueTotalBelanja, setValueTotalBelanja] = useState('');
    const [valueUlasan, setValueUlasan] = useState('');
    const [paymentStatus, setPaymentStatus] = useState([]);
    const [paymentDate, setPaymentDate] = useState([]);
    const router = useRouter();

    const handleClickKembali = () => {
        router.push('/admin/customer');
    };
    const handleClickUlasan = () => {
        router.push('/admin/customer/detail-ulasan');
    };
    const handleClickRiwayat = () => {
        dispatch(getDataOrdersById(detailHistoryOrder.user_id, router));
        // router.push('/admin/customer/detail-riwayat')
    };

    // Updte function
    const handleUpdateNama = () => {};

    useEffect(() => {
        setValueNama(detailHistoryOrder.nama);
        setValueEmail(detailHistoryOrder.email);
        setValueType(detailHistoryOrder.level_user);
        setValueNohp(detailHistoryOrder.no_telp);
        setValueAlamat(detailHistoryOrder.alamat);
        setValueTelahBelanja(detailHistoryOrder.total_pembelanjaan);
        setValueBanyakProduk(detailHistoryOrder.total_product);
        setValueTotalBelanja(detailHistoryOrder.jumlah_belanja);
        // status payment
        setPaymentStatus(detailUserOrder?.status_payment);
        // transaction date
        setPaymentDate(detailUserOrder?.tanggal_pembelian);
    }, [
        detailHistoryOrder.nama,
        detailHistoryOrder.email,
        detailHistoryOrder.level_user,
        detailHistoryOrder.no_telp,
        detailHistoryOrder.alamat,
        detailHistoryOrder.jumlah_belanja,
        detailHistoryOrder.total_product,
        detailHistoryOrder.total_pembelanjaan,
        detailHistoryOrder.status_payment,
        detailHistoryOrder.tanggal_pembelian
    ]);

    // console.log(detailHistoryOrder, 'cek user dat');
    // console.log(paymentDate, 'payment Date');
    return (
        <Container>
            <Card className={classes.CardTop}>
                <div className={classes.ItemLeft}>
                    <span className={classes.TextPelanggan}>Pelanggan</span>
                </div>
                <div className={classes.ItemRight}>
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
            </Card>
            <div className={classes.ContainerCardMiddle}>
                <Card className={classes.CardMiddleLeft}>
                    <div className={classes.MainBoxMiddle}>
                        <div className={classes.ItemMiddleLeft}>
                            <span className={classes.TextPelanggan} style={{ fontSize: 16 }}>
                                Pelanggan
                            </span>
                        </div>
                        {/* <div className={classes.ItemMiddleRight}>
                            <Button
                                style={{ width: 114, height: 24.52, background: '#2C2C2C', borderRadius: 5 }}
                                onClick={handleUpdateNama}
                            >
                                <span className={classes.TextEdit}>Edit & Save</span>
                            </Button>
                        </div> */}
                    </div>
                    <hr style={{ width: '100%' }} />
                    <div className={classes.ItemMiddleBottom}>
                        <div className={classes.ItemNama}>
                            <span style={{ fontSize: 14, fontWeight: 400, color: '#ADADAD' }}>Nama</span>
                            <input
                                type="text"
                                name="Nama"
                                placeholder="Maria L"
                                style={{
                                    fontSize: 14,
                                    fontWeight: 600,
                                    color: '#252733',
                                    border: 'none',
                                    backgroundColor: 'white'
                                }}
                                value={valueNama}
                                onChange={(e) => setValueNama(e.target.value)}
                                disabled
                            />
                        </div>
                        <div className={classes.ItemType}>
                            <span style={{ fontSize: 14, fontWeight: 400, color: '#ADADAD' }}>Type</span>
                            <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
                                <input
                                    input="text"
                                    name="Type"
                                    placeholder="Gold"
                                    style={{
                                        fontSize: 14,
                                        fontWeight: 600,
                                        color: '#252733',
                                        border: 'none',
                                        width: 150,
                                        backgroundColor: 'white'
                                    }}
                                    disabled
                                    value={valueType}
                                    onChange={(e) => setValueType(e.target.value)}
                                />
                                {/* <Image src={crown_logo} width={16} height={16} alt="crown-logo" /> */}
                            </div>
                        </div>
                    </div>
                    <div className={classes.ItemEmail}>
                        <span style={{ fontSize: 14, fontWeight: 400, color: '#ADADAD' }}>Email</span>
                        <input
                            type="text"
                            name="Email"
                            placeholder="Maria@gmail.com"
                            style={{
                                fontSize: 14,
                                fontWeight: 600,
                                color: '#252733',
                                border: 'none',
                                backgroundColor: 'white'
                            }}
                            value={valueEmail}
                            onChange={(e) => setValueEmail(e.target.value)}
                            disabled
                        />
                    </div>
                    <div className={classes.ItemNoHp}>
                        <span style={{ fontSize: 14, fontWeight: 400, color: '#ADADAD' }}>No Hp</span>
                        <input
                            type="text"
                            placeholder="+6281236006789"
                            name="No Hp"
                            style={{
                                fontSize: 14,
                                fontWeight: 600,
                                color: '#252733',
                                border: 'none',
                                backgroundColor: 'white'
                            }}
                            value={valueNohp}
                            onChange={(e) => setValueNohp(e.target.value)}
                            disabled
                        />
                    </div>
                </Card>
                {/* ---------- */}
                <Card className={classes.CardMiddleRight}>
                    <div className={classes.MainBoxMiddleRight}>
                        <div className={classes.ItemMiddleLeft}>
                            <span className={classes.TextPelanggan} style={{ fontSize: 16 }}>
                                Alamat default
                            </span>
                        </div>
                        {/* <div className={classes.ItemMiddleRight}>
                            <Button style={{ width: 114, height: 24.52, background: '#2C2C2C', borderRadius: 5 ,}}>
                                <span className={classes.TextEdit}>Edit & Save</span>
                            </Button>
                        </div> */}
                    </div>
                    <hr style={{ width: '100%' }} />
                    <div className={classes.ItemMiddleBottomRight}>
                        <div className={classes.ItemNama}>
                            <span style={{ fontSize: 14, fontWeight: 400, color: '#ADADAD' }}>Nama</span>
                            <input
                                input="text"
                                name="nama"
                                placeholder="Maria L"
                                style={{
                                    fontSize: 14,
                                    fontWeight: 600,
                                    color: '#252733',
                                    border: 'none',
                                    width: 50,
                                    backgroundColor: 'white',
                                    width: 200
                                }}
                                value={valueNama}
                                onChange={(e) => setValueNama(e.target.value)}
                                disabled
                            />
                        </div>
                        <div className={classes.ItemType} style={{ wordWrap: 'break-word' }}>
                            <span style={{ fontSize: 14, fontWeight: 400, color: '#ADADAD' }}>Alamat</span>
                            <div className={classes.ImgType}>
                                <textarea
                                    input="text"
                                    name="Alamat"
                                    placeholder="Pinang residence, Unit 36 Kota Jakarta Selatan DKI Jakarta Indonesia"
                                    style={{
                                        fontSize: 14,
                                        fontWeight: 600,
                                        color: '#252733',
                                        border: 'none',
                                        wordWrap: 'break-word'
                                        // borderBottom: '1px solid black'
                                    }}
                                    value={valueAlamat}
                                    onChange={(e) => setValueAlamat(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    {/* <div className={classes.ItemEmail}>
                        <span style={{ fontSize: 14, fontWeight: 400, color: '#ADADAD' }}>No Hp</span>
                        <input
                            input="text"
                            name="No Hp"
                            style={{ fontSize: 14, fontWeight: 600, color: '#252733', border: 'none' }}
                            value={valueNohp}
                            onChange={(e) => setValueNohp(e.target.value)}
                        />
                    </div> */}
                </Card>
            </div>
            {/* card bottom */}
            <form className={classes.ContainerCardMiddle}>
                <Card className={classes.CardMiddleLeft}>
                    <div className={classes.MainBoxMiddle}>
                        <div className={classes.ItemMiddleLeft}>
                            <span className={classes.TextPelanggan} style={{ fontSize: 16 }}>
                                Riwayat
                            </span>
                        </div>
                        <div className={classes.ItemMiddleRight}>
                            <Button
                                style={{ width: 114, height: 24.52, background: '#2C2C2C', borderRadius: 5 }}
                                onClick={handleClickRiwayat}
                            >
                                <span className={classes.TextEdit}>Detail Riwayat</span>
                            </Button>
                        </div>
                    </div>
                    <hr style={{ width: '100%' }} />
                    <div className={classes.ItemMiddleBottom}>
                        <div className={classes.ItemNama}>
                            <span style={{ fontSize: 14, fontWeight: 400, color: '#ADADAD' }}>
                                Total Transaksi Sukses
                            </span>
                            <div className="" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <input
                                    type="text"
                                    name="Total Belanja"
                                    placeholder="10"
                                    style={{
                                        fontSize: 14,
                                        fontWeight: 600,
                                        color: '#252733',
                                        border: 'none',
                                        width: 30,
                                        backgroundColor: 'white'
                                    }}
                                    disabled
                                    value={valueTotalBelanja}
                                    onChange={(e) => setValueTotalBelanja(e.target.value)}
                                />
                                <span style={{ fontSize: 14, fontWeight: 600, color: '#252733' }}>Kali</span>
                            </div>
                        </div>
                        <div className={classes.ItemType}>
                            <span style={{ fontSize: 14, fontWeight: 400, color: '#ADADAD' }}>Total Pembelanjaan</span>
                            <div className="" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <span style={{ fontSize: 14, fontWeight: 600, color: '#252733', paddingRight: 10 }}>
                                    IDR
                                </span>
                                <input
                                    style={{
                                        fontSize: 14,
                                        fontWeight: 600,
                                        color: '#252733',
                                        border: 'none',
                                        backgroundColor: 'white'
                                    }}
                                    value={valueTelahBelanja}
                                    onChange={(e) => setValueTelahBelanja(e.target.value)}
                                    placeholder="31.000.000"
                                    disabled
                                />
                            </div>
                        </div>
                        {/* <div className={classes.ItemType}>
                            <span style={{ fontSize: 14, fontWeight: 400, color: '#ADADAD', border: 'none' }}>
                                Banyak Produk
                            </span>
                            <div className={classes.ImgType}>
                                <input
                                    name="Banyak Produk"
                                    placeholder="100"
                                    style={{
                                        fontSize: 14,
                                        fontWeight: 600,
                                        color: '#252733',
                                        border: 'none',
                                        width: 30
                                    }}
                                    value={valueBanyakProduk ? valueBanyakProduk : "-"}
                                    onChange={(e) => setValueBanyakProduk(e.target.value)}
                                />
                                <span style={{ fontSize: 14, fontWeight: 600, color: '#252733' }}>Barang</span>
                            </div>
                        </div> */}
                    </div>
                    {/* <div className={classes.ItemEmail}>
                        <span style={{ fontSize: 14, fontWeight: 400, color: '#ADADAD' }}>Total Pembelanjaan</span>
                        <div className="" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <span style={{ fontSize: 14, fontWeight: 600, color: '#252733', paddingRight: 10 }}>
                                IDR
                            </span>
                            <input
                                style={{ fontSize: 14, fontWeight: 600, color: '#252733', border: 'none' }}
                                value={valueTelahBelanja}
                                onChange={(e) => setValueTelahBelanja(e.target.value)}
                                placeholder="31.000.000"
                            />
                        </div>
                    </div> */}
                </Card>
                {/* ---------- */}
                <Card className={classes.CardMiddleRight}>
                    {/* <div className={classes.MainBoxMiddleRight}>
                        <div className={classes.ItemMiddleLeft}>
                            <span className={classes.TextPelanggan} style={{ fontSize: 16 }}>
                                Ulasan
                            </span>
                        </div>
                        <div className={classes.ItemMiddleRight}>
                            <Button
                                style={{ width: 114, height: 24.52, background: '#2C2C2C', borderRadius: 5 }}
                                onClick={handleClickUlasan}
                            >
                                <span className={classes.TextEdit}>Detail Ulasan</span>
                            </Button>
                        </div>
                    </div>
                    <hr style={{ width: '100%' }} />
                    <div className={classes.ItemMiddleBottom}>
                        <div className={classes.ItemNama}>
                            <span style={{ fontSize: 14, fontWeight: 400, color: '#ADADAD' }}>Melakukan Ulasan</span>
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <input
                                    name="Ulasan"
                                    placeholder="10"
                                    style={{
                                        fontSize: 14,
                                        fontWeight: 600,
                                        color: '#252733',
                                        border: 'none',
                                        width: 30
                                    }}
                                    value={valueUlasan}
                                    onChange={(e) => setValueUlasan(e.target.value)}
                                />
                                <span style={{ fontSize: 14, fontWeight: 600, color: '#252733' }}>Kali</span>
                            </div>
                        </div>
                    </div> */}
                </Card>
            </form>
            {/* <div className={classes.ContainerCardMiddle}>
                <Card className={classes.CardMiddleLeft}>
                    <div className={classes.MainBoxMiddle}>
                        <div className={classes.ItemBottom}>
                            <span className={classes.TextHapus}>Hapus Pelanggan</span>
                            <Button style={{ width: 133, height: 37, background: '#FF7373', borderRadius: 12 }}>
                                <span className={classes.TextHapusPelanggan}>Hapus</span>
                            </Button>
                        </div>
                    </div>
                </Card>
            </div> */}
        </Container>
    );
}
