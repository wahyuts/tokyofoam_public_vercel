import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Paper, Switch, MenuItem, FormHelperText, FormControl, Select, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box, positions, width } from '@mui/system';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import icon_analyze from '../../../../public/assets/icons/report-analytics.png';
import icon_calendar from '../../../../public/assets/icons/calendar-time.png';
import ButtonComponent from './component/button';
import { useRouter } from 'next/router';
// import setPesanan from './redux/action/simple-action';
import {
    deleteOrderByIdOnAdmin,
    saveStatusPengiriman,
    saveTujuanPengiriman,
    savePelangganButton,
    saveNotedCatatan,
    setPesanan
} from '../../../redux/actions/dataHistoryOrderAction';

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
        marginBottom: 7,
        marginTop: 10
    },
    textColorBold2: {
        color: '#252733',
        fontSize: 14,
        fontWeight: 'bold',
        height: 30,
        border: '1px solid black',
        marginBottom: 7,
        marginTop: 10,
        paddingLeft: 10
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
    const { single_order_by_id_order } = useSelector((state) => state.data_history_order);
    const [dataSingleOrder, setDataSingleOrder] = useState({});

    const [status, setStatus] = React.useState('');
    const [isEditPelanggan, setIsEditPelanggan] = useState({ status: false, label: 'Edit' });
    const [isEditTujuanPengiriman, setIsEditTujuanPengiriman] = useState({ status: false, label: 'Edit' });
    const [isEditStatusPengiriman, setIsEditStatusPengiriman] = useState({ status: false, label: 'Edit' });
    const [isEditJatuhTenpo, setIsEditJatuhTenpo] = useState({ status: false, label: 'Edit' });
    const [isEditPesanan, setIsEditPesanan] = useState({ status: false, label: 'Edit' });
    const [isEditNote, setIsEditNote] = useState({ status: false, label: 'Edit' });
    const [dataPelanggan, setDataPelanggan] = useState({
        name: single_order_by_id_order.nama_pembeli,
        email: 'gsg@nska.com',
        noHp: single_order_by_id_order.no_handphone,
        noHpPenerima: single_order_by_id_order.no_handphone,
        alamatPenerima: single_order_by_id_order.alamat_pengiriman,
        kurir: 'JNE OKE (2-3 Hari)',
        tipeLayanan: 'DELIVEREE',
        tanggalKirim: single_order_by_id_order.tanggal_start_pengiriman,
        noTraking: single_order_by_id_order.no_resi,
        jatuhTenpo: '03-11-2021 12.00 AM',
        pesanan: 1,
        note: single_order_by_id_order.catatan
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
        isEditNote,
        dataPelanggan
    ]);

    useEffect(() => {
        setDataSingleOrder(single_order_by_id_order);
    }, [single_order_by_id_order]);

    // console.log('object data SINGLE', dataSingleOrder);

    // console.log(dataPelanggan);
    // console.log(isEditJatuhTenpo);
    // console.log('SINGLE ORDER', single_order_by_id_order);

    const dataStatusKirim = {
        tanggal_start_pengiriman: dataPelanggan.tanggalKirim,
        no_resi: dataPelanggan.noTraking
    };

    const dataTujuanKirim = {
        alamat_pengiriman: dataPelanggan.alamatPenerima,
        no_handphone: dataPelanggan.noHpPenerima
    };

    const dataPelanggans = {
        nama_pembeli: dataPelanggan.name,
        no_handphone: dataPelanggan.noHp
    };

    const dataCatatan = {
        catatan: dataPelanggan.note
    };

    // console.log('object data', dataStatusKirim);

    let ButtonEditPelanggan = (
        <>
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
        </>
    );

    let ButtonSavePelanggan = (
        <>
            <ButtonComponent
                label={isEditPelanggan.label}
                variant="contained"
                color="#673AB7"
                width="133px"
                textColor="#ffffff"
                onPreessed={() =>
                    dispatch(
                        savePelangganButton(
                            single_order_by_id_order._id,
                            setIsEditPelanggan,
                            isEditPelanggan,
                            dataPelanggans
                        )
                    )
                }
            />
        </>
    );

    let ButtonEditStatusPengiriman = (
        <>
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
        </>
    );

    let ButtonSaveStatusPengiriman = (
        <>
            <ButtonComponent
                label={isEditStatusPengiriman.label}
                variant="contained"
                color="#673AB7"
                width="133px"
                textColor="#ffffff"
                onPreessed={() =>
                    dispatch(
                        saveStatusPengiriman(
                            single_order_by_id_order._id,
                            setIsEditStatusPengiriman,
                            isEditStatusPengiriman,
                            dataStatusKirim
                        )
                    )
                }
            />
        </>
    );

    let ButtonEditTujuanPengiriman = (
        <>
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
        </>
    );

    let ButtonSaveTujuanPengiriman = (
        <>
            <ButtonComponent
                label={isEditTujuanPengiriman.label}
                variant="contained"
                color="#673AB7"
                width="133px"
                textColor="#ffffff"
                onPreessed={() =>
                    dispatch(
                        saveTujuanPengiriman(
                            single_order_by_id_order._id,
                            setIsEditTujuanPengiriman,
                            isEditTujuanPengiriman,
                            dataTujuanKirim
                        )
                    )
                }
            />
        </>
    );

    let ButtonEditCatatan = (
        <>
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
        </>
    );

    let ButtonSaveCatatan = (
        <>
            <ButtonComponent
                label={isEditNote.label}
                variant="contained"
                color="#673AB7"
                width="133px"
                textColor="#ffffff"
                onPreessed={() =>
                    // setIsEditNote({
                    //     ...isEditNote,
                    //     status: !isEditNote.status,
                    //     label: isEditNote.label === 'Edit' ? 'Save' : 'Edit'
                    // })
                    dispatch(saveNotedCatatan(single_order_by_id_order._id, setIsEditNote, isEditNote, dataCatatan))
                }
            />
        </>
    );

    const handleClickDeleteOrder = () => {
        // dispatch(deleteOrderByIdOnAdmin(single_order_by_id_order._id))
        alert('Ini Buat Delete');
    };

    return (
        <>
            <Paper style={{ display: 'flex', flexDiraction: 'row', height: '87px', marginBottom: '30px' }}>
                <div
                    style={{
                        display: 'flex',
                        flexDiraction: 'row',
                        width: '60%',
                        alignItems: 'center',
                        padding: '34px 0px 34px 30px'
                    }}
                >
                    {/* <ArrowBackIosIcon onClick={() => router.push('/admin/pesanan')} /> */}
                    <ArrowBackIosIcon
                        style={{ cursor: 'pointer' }}
                        onClick={() => dispatch(setPesanan('listPesanan'))}
                    />
                    <text
                        style={{ color: '#000000', fontSize: 18, fontWeight: 600 }}
                    >{`#${single_order_by_id_order._id} ( ${single_order_by_id_order.status_payment})`}</text>
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
                        onClick={handleClickDeleteOrder}
                    >
                        <Image src={icon_analyze} alt="analyze" width={25} height={25} />
                    </Button>
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
                                {isEditPelanggan.label === 'Edit' ? ButtonEditPelanggan : ButtonSavePelanggan}
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
                                        <p style={styles.textColorBold}>{dataPelanggans.nama_pembeli} </p>
                                        {/* <p style={styles.textColorDisable}>email</p>
                                        <p style={styles.textColorBold}>{dataPelanggan.email} </p> */}
                                        <p style={styles.textColorDisable}>No Hp</p>
                                        <p style={styles.textColorBold}>{dataPelanggans.no_handphone} </p>
                                    </>
                                ) : (
                                    <>
                                        <p style={styles.textColorDisable}>Nama</p>
                                        <input
                                            type="text"
                                            value={dataPelanggans.nama_pembeli}
                                            style={styles.textColorBold2}
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
                                            value={dataPelanggans.no_handphone}
                                            style={styles.textColorBold2}
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
                                {isEditStatusPengiriman.label === 'Edit'
                                    ? ButtonEditStatusPengiriman
                                    : ButtonSaveStatusPengiriman}
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
                                        <p style={styles.textColorBold}>{single_order_by_id_order.expedisi} </p>
                                        <p style={styles.textColorDisable}>Tanggal Kirim</p>
                                        {single_order_by_id_order.tanggal_start_pengiriman === '' ? (
                                            <p style={styles.textColorBold}>-</p>
                                        ) : (
                                            <p style={styles.textColorBold}>
                                                {dataStatusKirim.tanggal_start_pengiriman}{' '}
                                            </p>
                                        )}

                                        <p style={styles.textColorDisable}>No. Tracking</p>
                                        <p style={styles.textColorBold}>{dataStatusKirim.no_resi} </p>
                                    </>
                                ) : (
                                    <>
                                        <p style={styles.textColorDisable}>Kurir Pengiriman</p>
                                        <input
                                            type="text"
                                            placeholder={single_order_by_id_order.expedisi}
                                            style={styles.textColorBold}
                                            onChange={(e) => updateInput(e, 'kurir')}
                                        />
                                        <p style={styles.textColorDisable}>Tanggal Kirim</p>
                                        <input
                                            type="text"
                                            value={dataStatusKirim.tanggal_start_pengiriman}
                                            style={styles.textColorBold2}
                                            onChange={(e) => updateInput(e, 'tanggalKirim')}
                                        />
                                        <p style={styles.textColorDisable}>No. Tracking</p>
                                        <input
                                            type="text"
                                            value={dataStatusKirim.no_resi}
                                            style={styles.textColorBold2}
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
                                {isEditNote.label === 'Edit' ? ButtonEditCatatan : ButtonSaveCatatan}
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
                                    // <p style={styles.textColorBold}>{single_order_by_id_order.catatan}</p>
                                    single_order_by_id_order.catatan === '' ? (
                                        <p style={styles.textColorBold}>-</p>
                                    ) : (
                                        <p style={styles.textColorBold}>{dataCatatan.catatan} </p>
                                    )
                                ) : (
                                    <input
                                        type="text"
                                        value={dataCatatan.catatan}
                                        style={styles.textColorBold2}
                                        onChange={(e) => updateInput(e, 'note')}
                                    />
                                )}
                            </tr>
                        </table>
                    </Paper>
                </div>
                <div style={{ width: '49%' }}>
                    <Paper style={{ marginBottom: '30px' }}>
                        <table style={{ width: '100%', minHeight: 279 }}>
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
                                {isEditTujuanPengiriman.label === 'Edit'
                                    ? ButtonEditTujuanPengiriman
                                    : ButtonSaveTujuanPengiriman}
                                {/* <ButtonComponent
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
                                /> */}
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
                                        <p style={styles.textColorBold}>{dataTujuanKirim.alamat_pengiriman}</p>
                                        <p style={styles.textColorDisable}>No Hp</p>
                                        <p style={styles.textColorBold}>{dataTujuanKirim.no_handphone}</p>
                                    </>
                                ) : (
                                    <>
                                        <p style={styles.textColorDisable}>Nama & Alamat</p>
                                        <textarea
                                            name="Text1"
                                            cols="40"
                                            rows="5"
                                            style={styles.textColorBold2}
                                            onChange={(e) => updateInput(e, 'alamatPenerima')}
                                            value={dataTujuanKirim.alamat_pengiriman}
                                        />
                                        <p style={styles.textColorDisable}>No Hp</p>
                                        <input
                                            type="text"
                                            value={dataTujuanKirim.no_handphone}
                                            style={styles.textColorBold2}
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
                                <text
                                    style={{
                                        color: '#000000',
                                        fontSize: 18,
                                        fontWeight: 600,
                                        paddingTop: 7,
                                        paddingBottom: 7
                                    }}
                                >
                                    Pesanan
                                </text>
                            </tr>
                            <tr
                                style={{
                                    // display: 'flex',
                                    // flexDirection: 'column',
                                    // justifyContent: 'space-between',
                                    // alignItems: 'center',
                                    padding: '26px 60px 26px 40px',
                                    borderWidth: '1px',
                                    borderColor: '#EBEBEB'
                                }}
                            >
                                {single_order_by_id_order.cart.map((data) => {
                                    return (
                                        <>
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    // justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                    gap: 20,
                                                    marginBottom: 15,
                                                    marginLeft: 10
                                                }}
                                            >
                                                <img
                                                    src={`${data.imageProduct}`}
                                                    className={classes.dialogImageItem}
                                                    alt="backgroudn-image"
                                                />
                                                <p style={styles.imageLabel}>{`${data.nameProduct}`}</p>
                                                <p style={styles.textColorBold}>{`${data.qty} Pcs`}</p>
                                            </div>
                                        </>
                                    );
                                })}
                            </tr>
                        </table>
                    </Paper>
                </div>
            </div>
        </>
    );
}
