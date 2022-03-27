import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { Button, Paper, Switch, MenuItem, FormHelperText, FormControl, Select, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box, positions, width } from '@mui/system';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import icon_analyze from '../../../../public/assets/icons/report-analytics.png';
import icon_calendar from '../../../../public/assets/icons/calendar-time.png';
import ButtonComponent from './component/button';
import { useRouter } from 'next/router';
import setPesanan from './redux/action/simple-action';

const useStyles = makeStyles((theme) => ({
    container: {
        alignSelf: 'center',
        width: '89%',
        marginTop: '100px',
        backgroundColor: 'white'
    },
    icon: {
        width: '38px',
        height: '20px%'
    },
    dialogImageItem: {
        width: '18%'
    }
}));

const styles = {
    textColorDisable: { color: '#ADADAD', fontSize: '14px' },
    textColorBold: {
        color: '#252733',
        fontSize: 14,
        fontWeight: 'bold',
        border: 0,
        outline: 'none',
        marginBottom: 20,
        marginTop: 10
    },
    textColorBoldInput: {
        color: '#252733',
        fontSize: 14,
        fontWeight: 'bold',
        border: 0,
        outline: 'none',
        marginBottom: 20,
        marginTop: 10,
        width: 30
    },
    imageLabel: { fontSize: '18px', fontWeight: '400' }
};

const label = { inputProps: { 'aria-label': 'Switch demo' } };

export default function RincianPesanan(params) {
    const classes = useStyles();
    const router = useRouter();
    const dispatch = useDispatch();

    const [status, setStatus] = React.useState('');
    const [isEditPelanggan, setIsEditPelanggan] = useState({ status: false, label: 'Edit' });
    const [isEditTujuanPengiriman, setIsEditTujuanPengiriman] = useState({ status: false, label: 'Edit' });
    const [isEditStatusPengiriman, setIsEditStatusPengiriman] = useState({ status: false, label: 'Edit' });
    const [isEditJatuhTenpo, setIsEditJatuhTenpo] = useState({ status: false, label: 'Edit' });
    const [isEditPesanan, setIsEditPesanan] = useState({ status: false, label: 'Edit' });
    const [isEditNote, setIsEditNote] = useState({ status: false, label: 'Edit' });
    const [dataPelanggan, setDataPelanggan] = useState({
        name: 'mari L',
        email: 'gsg@nska.com',
        noHp: '2435849379',
        noHpPenerima: '+6281236006789',
        alamatPenerima: 'Maria L, pinang residence, Unit 36 Kota Jakarta Selatan DKI Jakarta Indonesia maria@gmail.com',
        kurir: 'JNE OKE (2-3 Hari)',
        tipeLayanan: 'DELIVEREE',
        tanggalKirim: '-',
        noTraking: '-',
        jatuhTenpo: '03-11-2021 12.00 AM',
        pesanan: 1,
        note: '-'
    });

    const handleChange = (event) => {
        setStatus(event.target.value);
    };
    const updateInput = (event, target) => {
        if (target === 'name') setDataPelanggan({ ...dataPelanggan, name: event.target.value });
        if (target === 'email') setDataPelanggan({ ...dataPelanggan, email: event.target.value });
        if (target === 'noHp') setDataPelanggan({ ...dataPelanggan, noHp: event.target.value });
        if (target === 'noHpPenerima') setDataPelanggan({ ...dataPelanggan, noHpPenerima: event.target.value });
        if (target === 'alamatPenerima') setDataPelanggan({ ...dataPelanggan, alamatPenerima: event.target.value });
        if (target === 'kurir') setDataPelanggan({ ...dataPelanggan, kurir: event.target.value });
        if (target === 'tipeLayanan') setDataPelanggan({ ...dataPelanggan, tipeLayanan: event.target.value });
        if (target === 'tanggalKirim') setDataPelanggan({ ...dataPelanggan, tanggalKirim: event.target.value });
        if (target === 'noTraking') setDataPelanggan({ ...dataPelanggan, noTraking: event.target.value });
        if (target === 'note') setDataPelanggan({ ...dataPelanggan, note: event.target.value });
        if (target === 'jatuhTenpo') setDataPelanggan({ ...dataPelanggan, jatuhTenpo: event.target.value });
        if (target === 'pesanan') setDataPelanggan({ ...dataPelanggan, pesanan: event.target.value });
    };

    useEffect(() => {}, [
        isEditPelanggan,
        isEditTujuanPengiriman,
        isEditStatusPengiriman,
        isEditJatuhTenpo,
        isEditPesanan,
        isEditNote
    ]);

    console.log(dataPelanggan);
    console.log(isEditJatuhTenpo);
    return (
        <>
            <Paper style={{ display: 'flex', flexDiraction: 'row', height: '87px', marginBottom: '30px' }}>
                <div
                    style={{
                        display: 'flex',
                        flexDiraction: 'row',
                        width: '40%',
                        alignItems: 'center',
                        padding: '34px 0px 34px 30px'
                    }}
                >
                    {/* <ArrowBackIosIcon onClick={() => router.push('/admin/pesanan')} /> */}
                    <ArrowBackIosIcon onClick={() => dispatch(setPesanan('listPesanan'))} />
                    <text style={{ color: '#000000', fontSize: 18, fontWeight: 600 }}>#Nomor Pesanan</text>
                </div>
                <div
                    style={{
                        display: 'flex',
                        flexDiraction: 'row',
                        width: '60%',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        position: 'relative'
                        // padding: '34px 0px 34px 30px'
                    }}
                >
                    <Button
                        variant="outlined"
                        style={{ padding: '10px 0px 10px 0px', position: 'absolute', right: 20 }}
                    >
                        <Image src={icon_analyze} alt="analyze" width={25} height={25} />
                    </Button>
                    {/* <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            value={status}
                            onChange={handleChange}
                        >
                            <MenuItem value={10}>Dikonfirmasi</MenuItem>
                            <MenuItem value={20}>Pending</MenuItem>
                            <MenuItem value={30}>Diproses</MenuItem>
                        </Select>
                    </FormControl> */}
                    {/* <Switch {...label} defaultChecked /> */}
                    {/* <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            borderWidth: '1px',
                            borderColor: '#000000',
                            width: '30%'
                        }}
                    >
                        <Image src={icon_calendar} alt="calendar" width={25} height={25} />
                        <p>02-11-2021</p>
                        <p>12.00 AM</p>
                    </div> */}
                </div>
            </Paper>
            <div
                style={{ display: 'flex', flexDiraction: 'row', justifyContent: 'space-between', marginBottom: '30px' }}
            >
                <div style={{ width: '49%' }}>
                    <Paper style={{ marginBottom: '30px' }}>
                        <table style={{ width: '100%', minHeight: 277 }}>
                            <tr
                                style={{
                                    display: 'flex',
                                    borderWidth: '1px',
                                    borderColor: '#EBEBEB',
                                    borderStyle: 'solid',
                                    padding: '10px 15px 10px 15px',
                                    paddingTop: '5px',
                                    paddingBottom: '8px',
                                    justifyContent: 'space-between'
                                }}
                            >
                                <text style={{ color: '#000000', fontSize: 18, fontWeight: 600 }}>Pelanggan</text>
                                <ButtonComponent
                                    label={isEditPelanggan.label}
                                    variant="contained"
                                    color="#673AB7"
                                    width="133px"
                                    textColor="#ffffff"
                                    onPreessed={() =>
                                        setIsEditPelanggan({
                                            ...isEditPelanggan,
                                            status: !isEditPelanggan.status,
                                            label: isEditPelanggan.label === 'Edit' ? 'Save' : 'Edit'
                                        })
                                    }
                                />
                            </tr>
                            <tr
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    borderWidth: '1px',
                                    borderColor: '#EBEBEB',
                                    borderStyle: 'solid',
                                    paddingLeft: '15px',
                                    paddingRight: '15px',
                                    paddingTop: '26px',
                                    paddingBottom: '26px'
                                }}
                            >
                                {!isEditPelanggan.status ? (
                                    <>
                                        <p style={styles.textColorDisable}>Nama</p>
                                        <p style={styles.textColorBold}>{dataPelanggan.name} </p>
                                        {/* <p style={styles.textColorDisable}>email</p>
                                        <p style={styles.textColorBold}>{dataPelanggan.email} </p> */}
                                        <p style={styles.textColorDisable}>No Hp</p>
                                        <p style={styles.textColorBold}>{dataPelanggan.noHp} </p>
                                    </>
                                ) : (
                                    <>
                                        <p style={styles.textColorDisable}>Nama</p>
                                        <input
                                            type="text"
                                            placeholder={dataPelanggan.name}
                                            style={styles.textColorBold}
                                            onChange={(e) => updateInput(e, 'name')}
                                        />
                                        {/* <p style={styles.textColorDisable}>email</p>
                                        <input
                                            type="text"
                                            placeholder={dataPelanggan.email}
                                            style={styles.textColorBold}
                                            onChange={(e) => updateInput(e, 'email')}
                                        /> */}
                                        <p style={styles.textColorDisable}>No Hp</p>
                                        <input
                                            type="text"
                                            placeholder={dataPelanggan.noHp}
                                            style={styles.textColorBold}
                                            onChange={(e) => updateInput(e, 'noHp')}
                                        />
                                    </>
                                )}
                            </tr>
                        </table>
                    </Paper>
                    <Paper style={{ marginBottom: '30px' }}>
                        <table style={{ width: '100%' }}>
                            <tr
                                style={{
                                    display: 'flex',
                                    borderWidth: '1px',
                                    borderColor: '#EBEBEB',
                                    borderStyle: 'solid',
                                    padding: '10px 15px 10px 15px',
                                    paddingTop: '5px',
                                    paddingBottom: '5px',
                                    justifyContent: 'space-between'
                                }}
                            >
                                <text style={{ color: '#000000', fontSize: 18, fontWeight: 600 }}>
                                    Status Pengiriman
                                </text>
                                <ButtonComponent
                                    label={isEditStatusPengiriman.label}
                                    variant="contained"
                                    color="#673AB7"
                                    width="133px"
                                    textColor="#ffffff"
                                    onPreessed={() =>
                                        setIsEditStatusPengiriman({
                                            ...isEditStatusPengiriman,
                                            status: !isEditStatusPengiriman.status,
                                            label: isEditStatusPengiriman.label === 'Edit' ? 'Save' : 'Edit'
                                        })
                                    }
                                />
                            </tr>
                            <tr
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    borderWidth: '1px',
                                    borderColor: '#EBEBEB',
                                    borderStyle: 'solid',
                                    paddingLeft: '15px',
                                    paddingRight: '15px',
                                    paddingTop: '26px',
                                    paddingBottom: '26px'
                                }}
                            >
                                {!isEditStatusPengiriman.status ? (
                                    <>
                                        <p style={styles.textColorDisable}>Kurir Pengiriman</p>
                                        <p style={styles.textColorBold}>{dataPelanggan.kurir} </p>
                                        <p style={styles.textColorDisable}>Tanggal Kirim</p>
                                        <p style={styles.textColorBold}>{dataPelanggan.tanggalKirim} </p>
                                        <p style={styles.textColorDisable}>No. Tracking</p>
                                        <p style={styles.textColorBold}>{dataPelanggan.noTraking} </p>
                                    </>
                                ) : (
                                    <>
                                        <p style={styles.textColorDisable}>Kurir Pengiriman</p>
                                        <input
                                            type="text"
                                            placeholder={dataPelanggan.kurir}
                                            style={styles.textColorBold}
                                            onChange={(e) => updateInput(e, 'kurir')}
                                        />
                                        <p style={styles.textColorDisable}>Tanggal Kirim</p>
                                        <input
                                            type="text"
                                            placeholder={dataPelanggan.tanggalKirim}
                                            style={styles.textColorBold}
                                            onChange={(e) => updateInput(e, 'tanggalKirim')}
                                        />
                                        <p style={styles.textColorDisable}>No. Tracking</p>
                                        <input
                                            type="text"
                                            placeholder={dataPelanggan.noTraking}
                                            style={styles.textColorBold}
                                            onChange={(e) => updateInput(e, 'noTraking')}
                                        />
                                    </>
                                )}
                            </tr>
                        </table>
                    </Paper>
                    <Paper style={{ marginBottom: '30px' }}>
                        <table style={{ width: '100%' }}>
                            <tr
                                style={{
                                    display: 'flex',
                                    borderWidth: '1px',
                                    borderColor: '#EBEBEB',
                                    borderStyle: 'solid',
                                    padding: '10px 15px 10px 15px',
                                    paddingTop: '5px',
                                    paddingBottom: '5px',
                                    justifyContent: 'space-between'
                                }}
                            >
                                <text style={{ color: '#000000', fontSize: 18, fontWeight: 600 }}>Catatan</text>
                                <ButtonComponent
                                    label={isEditNote.label}
                                    variant="contained"
                                    color="#673AB7"
                                    width="133px"
                                    textColor="#ffffff"
                                    onPreessed={() =>
                                        setIsEditNote({
                                            ...isEditNote,
                                            status: !isEditNote.status,
                                            label: isEditNote.label === 'Edit' ? 'Save' : 'Edit'
                                        })
                                    }
                                />
                            </tr>
                            <tr
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    borderWidth: '1px',
                                    borderColor: '#EBEBEB',
                                    borderStyle: 'solid',
                                    paddingLeft: '15px',
                                    paddingRight: '15px',
                                    paddingTop: '26px',
                                    paddingBottom: '26px'
                                }}
                            >
                                {!isEditNote.status ? (
                                    <p style={styles.textColorBold}>{dataPelanggan.note}</p>
                                ) : (
                                    <input
                                        type="text"
                                        placeholder={dataPelanggan.note}
                                        style={styles.textColorBold}
                                        onChange={(e) => updateInput(e, 'note')}
                                    />
                                )}
                            </tr>
                        </table>
                    </Paper>
                </div>
                <div style={{ width: '49%' }}>
                    <Paper style={{ marginBottom: '30px' }}>
                        <table style={{ width: '100%', minHeight: 250 }}>
                            <tr
                                style={{
                                    display: 'flex',
                                    borderWidth: '1px',
                                    borderColor: '#EBEBEB',
                                    borderStyle: 'solid',
                                    padding: '10px 15px 10px 15px',
                                    paddingTop: '5px',
                                    paddingBottom: '5px',
                                    justifyContent: 'space-between'
                                }}
                            >
                                <text style={{ color: '#000000', fontSize: 18, fontWeight: 600 }}>
                                    Tujuan Pengiriman
                                </text>
                                <ButtonComponent
                                    label={isEditTujuanPengiriman.label}
                                    variant="contained"
                                    color="#673AB7"
                                    width="133px"
                                    textColor="#ffffff"
                                    onPreessed={() =>
                                        setIsEditTujuanPengiriman({
                                            ...isEditTujuanPengiriman,
                                            status: !isEditTujuanPengiriman.status,
                                            label: isEditTujuanPengiriman.label === 'Edit' ? 'Save' : 'Edit'
                                        })
                                    }
                                />
                            </tr>
                            <tr
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    borderWidth: '1px',
                                    borderColor: '#EBEBEB',
                                    borderStyle: 'solid',
                                    paddingLeft: '15px',
                                    paddingRight: '15px',
                                    paddingTop: '26px',
                                    paddingBottom: '26px'
                                }}
                            >
                                {!isEditTujuanPengiriman.status ? (
                                    <>
                                        <p style={styles.textColorDisable}>Nama & Alamat</p>
                                        <p style={styles.textColorBold}>{dataPelanggan.alamatPenerima}</p>
                                        <p style={styles.textColorDisable}>No Hp</p>
                                        <p style={styles.textColorBold}>{dataPelanggan.noHpPenerima}</p>
                                    </>
                                ) : (
                                    <>
                                        <p style={styles.textColorDisable}>Nama & Alamat</p>
                                        <textarea
                                            name="Text1"
                                            cols="40"
                                            rows="5"
                                            style={styles.textColorBold}
                                            onChange={(e) => updateInput(e, 'alamatPenerima')}
                                            // placeholder={dataPelanggan.alamatPenerima}
                                        />
                                        <p style={styles.textColorDisable}>No Hp</p>
                                        <input
                                            type="text"
                                            placeholder={dataPelanggan.note}
                                            style={styles.textColorBold}
                                            onChange={(e) => updateInput(e, 'noHpPenerima')}
                                        />
                                    </>
                                )}
                            </tr>
                        </table>
                    </Paper>

                    <Paper style={{ marginBottom: '30px' }}>
                        <table style={{ width: '100%' }}>
                            <tr
                                style={{
                                    display: 'flex',
                                    borderWidth: '1px',
                                    borderColor: '#EBEBEB',
                                    borderStyle: 'solid',
                                    padding: '10px 15px 10px 15px',
                                    paddingTop: '5px',
                                    paddingBottom: '5px',
                                    justifyContent: 'space-between'
                                }}
                            >
                                <text style={{ color: '#000000', fontSize: 18, fontWeight: 600 }}>Pesanan</text>
                                <ButtonComponent
                                    label={isEditPesanan.label}
                                    variant="contained"
                                    color="#673AB7"
                                    width="133px"
                                    textColor="#ffffff"
                                    onPreessed={() =>
                                        setIsEditPesanan({
                                            ...isEditPesanan,
                                            status: !isEditPesanan.status,
                                            label: isEditPesanan.label === 'Edit' ? 'Save' : 'Edit'
                                        })
                                    }
                                />
                            </tr>
                            <tr
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: '26px 60px 26px 40px',
                                    borderWidth: '1px',
                                    borderColor: '#EBEBEB'
                                }}
                            >
                                {!isEditPesanan.status ? ( // true
                                    <>
                                        <img
                                            src={'/assets/images/Single-Pillow-1.png'}
                                            className={classes.dialogImageItem}
                                            alt="backgroudn-image"
                                        />
                                        <p style={styles.imageLabel}>Mulberry Silk Pillowcase</p>
                                        <p style={styles.textColorBold}>{dataPelanggan.pesanan}</p>
                                    </>
                                ) : (
                                    <>
                                        <img
                                            src={'/assets/images/Single-Pillow-1.png'}
                                            className={classes.dialogImageItem}
                                            alt="backgroudn-image"
                                        />
                                        <p style={styles.imageLabel}>Mulberry Silk Pillowcase</p>
                                        <input
                                            type="text"
                                            placeholder={dataPelanggan.pesanan}
                                            style={styles.textColorBoldInput}
                                            onChange={(e) => updateInput(e, 'pesanan')}
                                        />
                                    </>
                                )}
                            </tr>
                        </table>
                    </Paper>
                </div>
            </div>
            <Paper style={{ marginBottom: '30px' }}>
                <table style={{ width: '100%' }}>
                    <tr
                        style={{
                            display: 'flex',
                            borderWidth: '1px',
                            borderColor: '#EBEBEB',
                            borderStyle: 'solid',
                            paddingLeft: '15px'
                        }}
                    >
                        <p>Rincian Pesanan</p>
                    </tr>
                    <tr style={{ display: 'flex' }}>
                        <td
                            style={{
                                borderWidth: '1px',
                                borderColor: '#EBEBEB',
                                borderStyle: 'solid',
                                flex: 1,
                                paddingLeft: '15px',
                                paddingTop: '29px',
                                paddingBottom: '29px'
                            }}
                        >
                            <p>ID Pesanan: #33</p>
                            <p>Tanggal Beli: 24/10/2021 12.00 AM</p>
                        </td>
                        <td
                            style={{
                                borderWidth: '1px',
                                borderColor: '#EBEBEB',
                                borderStyle: 'solid',
                                flex: 1,
                                paddingLeft: '15px',
                                paddingTop: '29px',
                                paddingBottom: '29px'
                            }}
                        >
                            <p>Metode Pembayaran: Midtrans BCA</p>
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <p>Metode Pengiriman: JNE OKE (2-3 hari)</p>
                                <img
                                    src={'/assets/icons/jne-oke.png'}
                                    className={classes.icon}
                                    alt="backgroudn-image"
                                />
                            </div>
                        </td>
                    </tr>
                </table>
            </Paper>
            <Paper style={{ marginBottom: '30px' }}>
                <table style={{ width: '100%' }}>
                    <tr
                        style={{
                            display: 'flex',
                            borderWidth: '1px',
                            borderColor: '#EBEBEB',
                            borderStyle: 'solid',
                            paddingLeft: '15px',
                            paddingTop: '5px',
                            paddingBottom: '5px'
                        }}
                    >
                        <p>Alamat Pengiriman</p>
                    </tr>
                    <tr
                        style={{
                            display: 'flex',
                            borderWidth: '1px',
                            borderColor: '#EBEBEB',
                            borderStyle: 'solid',
                            paddingLeft: '15px',
                            paddingRight: '15px',
                            paddingTop: '26px',
                            paddingBottom: '26px'
                        }}
                    >
                        <p>
                            Mia Artina, Jln. Gunung Saputan, Kecamatan Denpasar Barat, Kota Denpasar, Bali 80117,
                            Indonesia No Hp 0821212121212
                        </p>
                    </tr>
                </table>
            </Paper>
            <Paper style={{ marginBottom: '30px' }}>
                <table style={{ width: '100%' }}>
                    <tr style={{ display: 'flex' }}>
                        <td
                            style={{
                                borderWidth: '1px',
                                borderColor: '#EBEBEB',
                                borderStyle: 'solid',
                                flex: 1,
                                paddingLeft: '15px',
                                paddingRight: '15px',
                                paddingTop: '5px',
                                paddingBottom: '5px'
                            }}
                        >
                            <p>Nama Produk</p>
                        </td>
                        <td
                            style={{
                                borderWidth: '1px',
                                borderColor: '#EBEBEB',
                                borderStyle: 'solid',
                                flex: 1,
                                paddingLeft: '15px',
                                paddingRight: '15px',
                                paddingTop: '5px',
                                paddingBottom: '5px',
                                textAlign: 'right'
                            }}
                        >
                            <p>Qty</p>
                        </td>
                        <td
                            style={{
                                borderWidth: '1px',
                                borderColor: '#EBEBEB',
                                borderStyle: 'solid',
                                flex: 1,
                                paddingLeft: '15px',
                                paddingRight: '15px',
                                paddingTop: '5px',
                                paddingBottom: '5px',
                                textAlign: 'left'
                            }}
                        >
                            <p>Harga</p>
                        </td>
                    </tr>
                    <tr style={{ display: 'flex' }}>
                        <td
                            style={{
                                borderWidth: '1px',
                                borderColor: '#EBEBEB',
                                borderStyle: 'solid',
                                flex: 1,
                                paddingLeft: '15px',
                                paddingRight: '15px',
                                paddingTop: '5px',
                                paddingBottom: '5px'
                            }}
                        >
                            <p>Mulberry Silk Pillowcase, Yellow, 1Kg</p>
                        </td>
                        <td
                            style={{
                                borderWidth: '1px',
                                borderColor: '#EBEBEB',
                                borderStyle: 'solid',
                                flex: 1,
                                paddingLeft: '15px',
                                paddingRight: '15px',
                                paddingTop: '5px',
                                paddingBottom: '5px',
                                textAlign: 'right'
                            }}
                        >
                            <p>1</p>
                        </td>
                        <td
                            style={{
                                borderWidth: '1px',
                                borderColor: '#EBEBEB',
                                borderStyle: 'solid',
                                flex: 1,
                                paddingLeft: '15px',
                                paddingRight: '15px',
                                paddingTop: '5px',
                                paddingBottom: '5px',
                                textAlign: 'left'
                            }}
                        >
                            <p>IDR 650.000 (Disc 10%)</p>
                        </td>
                    </tr>
                    <tr style={{ display: 'flex' }}>
                        <td
                            style={{
                                borderWidth: '1px',
                                borderColor: '#EBEBEB',
                                borderStyle: 'solid',
                                flex: 1,
                                paddingLeft: '15px',
                                paddingRight: '15px',
                                paddingTop: '5px',
                                paddingBottom: '5px'
                            }}
                        ></td>
                        <td
                            style={{
                                borderWidth: '1px',
                                borderColor: '#EBEBEB',
                                borderStyle: 'solid',
                                flex: 1,
                                paddingLeft: '15px',
                                paddingRight: '15px',
                                paddingTop: '5px',
                                paddingBottom: '5px',
                                textAlign: 'right'
                            }}
                        >
                            <p>Sub-total</p>
                        </td>
                        <td
                            style={{
                                borderWidth: '1px',
                                borderColor: '#EBEBEB',
                                borderStyle: 'solid',
                                flex: 1,
                                paddingLeft: '15px',
                                paddingRight: '15px',
                                paddingTop: '5px',
                                paddingBottom: '5px',
                                textAlign: 'left'
                            }}
                        >
                            <p>IDR 650.000</p>
                        </td>
                    </tr>
                    <tr style={{ display: 'flex' }}>
                        <td
                            style={{
                                borderWidth: '1px',
                                borderColor: '#EBEBEB',
                                borderStyle: 'solid',
                                flex: 1,
                                paddingLeft: '15px',
                                paddingRight: '15px',
                                paddingTop: '5px',
                                paddingBottom: '5px'
                            }}
                        ></td>
                        <td
                            style={{
                                borderWidth: '1px',
                                borderColor: '#EBEBEB',
                                borderStyle: 'solid',
                                flex: 1,
                                paddingLeft: '15px',
                                paddingRight: '15px',
                                paddingTop: '5px',
                                paddingBottom: '5px',
                                flexDirection: 'row'
                            }}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'flex-end'
                                }}
                            >
                                <p>JNE OKE (2-3 Hari)</p>
                                <img
                                    src={'/assets/icons/jne-oke.png'}
                                    className={classes.icon}
                                    alt="backgroudn-image"
                                />
                            </div>
                        </td>
                        <td
                            style={{
                                borderWidth: '1px',
                                borderColor: '#EBEBEB',
                                borderStyle: 'solid',
                                flex: 1,
                                paddingLeft: '15px',
                                paddingRight: '15px',
                                paddingTop: '5px',
                                paddingBottom: '5px',
                                textAlign: 'left'
                            }}
                        >
                            <p>IDR 50.000</p>
                        </td>
                    </tr>
                    <tr style={{ display: 'flex' }}>
                        <td
                            style={{
                                borderWidth: '1px',
                                borderColor: '#EBEBEB',
                                borderStyle: 'solid',
                                flex: 1,
                                paddingLeft: '15px',
                                paddingRight: '15px',
                                paddingTop: '5px',
                                paddingBottom: '5px'
                            }}
                        ></td>
                        <td
                            style={{
                                borderWidth: '1px',
                                borderColor: '#EBEBEB',
                                borderStyle: 'solid',
                                flex: 1,
                                paddingLeft: '15px',
                                paddingRight: '15px',
                                paddingTop: '5px',
                                paddingBottom: '5px',
                                textAlign: 'right'
                            }}
                        >
                            <p>Assurance</p>
                        </td>
                        <td
                            style={{
                                borderWidth: '1px',
                                borderColor: '#EBEBEB',
                                borderStyle: 'solid',
                                flex: 1,
                                paddingLeft: '15px',
                                paddingRight: '15px',
                                paddingTop: '5px',
                                paddingBottom: '5px',
                                textAlign: 'left'
                            }}
                        >
                            <p>IDR 1.300</p>
                        </td>
                    </tr>
                    <tr style={{ display: 'flex' }}>
                        <td
                            style={{
                                borderWidth: '1px',
                                borderColor: '#EBEBEB',
                                borderStyle: 'solid',
                                flex: 1,
                                paddingLeft: '15px',
                                paddingRight: '15px',
                                paddingTop: '5px',
                                paddingBottom: '5px'
                            }}
                        ></td>
                        <td
                            style={{
                                borderWidth: '1px',
                                borderColor: '#EBEBEB',
                                borderStyle: 'solid',
                                flex: 1,
                                paddingLeft: '15px',
                                paddingRight: '15px',
                                paddingTop: '5px',
                                paddingBottom: '5px',
                                textAlign: 'right'
                            }}
                        >
                            <p>Total</p>
                        </td>
                        <td
                            style={{
                                borderWidth: '1px',
                                borderColor: '#EBEBEB',
                                borderStyle: 'solid',
                                flex: 1,
                                paddingLeft: '15px',
                                paddingRight: '15px',
                                paddingTop: '5px',
                                paddingBottom: '5px',
                                textAlign: 'left'
                            }}
                        >
                            <p>IDR 701.300</p>
                        </td>
                    </tr>
                </table>
            </Paper>
            <Paper style={{ marginBottom: '25px' }}>
                <table style={{ width: '100%' }}>
                    <tr style={{ display: 'flex' }}>
                        <td
                            style={{
                                borderWidth: '1px',
                                borderColor: '#EBEBEB',
                                borderStyle: 'solid',
                                flex: 1,
                                paddingLeft: '15px',
                                paddingRight: '15px',
                                paddingTop: '5px',
                                paddingBottom: '5px'
                            }}
                        >
                            <p>Order Status</p>
                        </td>
                        <td
                            style={{
                                borderWidth: '1px',
                                borderColor: '#EBEBEB',
                                borderStyle: 'solid',
                                flex: 1,
                                paddingLeft: '15px',
                                paddingRight: '15px',
                                paddingTop: '5px',
                                paddingBottom: '5px'
                            }}
                        >
                            <p>Completed</p>
                        </td>
                    </tr>
                </table>
            </Paper>
        </>
    );
}
