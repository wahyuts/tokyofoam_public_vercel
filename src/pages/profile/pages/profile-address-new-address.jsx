import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import DropdownKabupaten from '../../../utils/re-useable-components/dropdown/dropdown-kabupaten';
import DropdownKecamatan from '../../../utils/re-useable-components/dropdown/dropdown-kecamatan';
import MainBlackButton from '../../../utils/re-useable-components/buttons/MainBlackButton';
import HorizontalSpacer from '../../../components/HorizontalSpacer';
import { useRouter } from 'next/router';
import { editUserAddressMobile } from '../../../redux/actions/userActions';

const style = {
    btnBoxPrimariContainer: {
        width: '140px',
        fontSize: '20px',
        fontWeight: '500'
    },
    btnBoxPrimaryOutline: {
        width: '140px',
        fontSize: '20px',
        fontWeight: '500'
    }
};
const useStyles = makeStyles((theme) => ({
    container: {
        [theme.breakpoints.down('mobile')]: {
            display: 'flex',
            flexDirection: 'column',
            padding: '24px 20px 14px ',
            marginBottom: '50px',
            '& .title': {
                paddingLeft: '24px',
                marginBottom: '20px',
                display: 'flex',
                fontSize: '18px',
                fontWeight: '600',
                alignSelf: 'flex-start'
            }
        }
    },
    formWrapped: {
        [theme.breakpoints.down('mobile')]: {
            width: '100%'
        }
    },
    label: {
        [theme.breakpoints.down('mobile')]: {
            color: '#474747',
            marginTop: '30px',
            marginBottom: '15px',
            fontSize: '14px',
            fontWeight: '400'
        }
    },
    dialogInput: {
        [theme.breakpoints.down('mobile')]: {
            width: '100%',
            padding: '10px 10px 10px 10px'
        }
    },

    dialogBtnWrapper: {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-around',
        marginBottom: '44px',
        marginTop: '25px'
    }
}));

const NewAddress = (props) => {
    const classes = useStyles();
    const router = useRouter();
    const dispatch = useDispatch();
    const { headerPage } = useSelector((state) => state.url_profile);
    const { credentials } = useSelector((state) => state.user);

    const [showModal, setShowModal] = useState(false);
    const [dataAddress, setDataAddress] = useState({
        alamat: credentials?.alamat,
        no_telp: credentials?.no_telp

        // provinsi: credentials?.provinsi,
        // kota: credentials?.kota,
        // kecamatan: credentials?.kecamatan
    });

    const onChangeHandler = (e) => {
        setDataAddress({ ...dataAddress, alamat: e.target.value });
    };

    const onChangeHandlerNoHp = (e) => {
        setDataAddress({ ...dataAddress, no_telp: e.target.value });
    };

    useEffect(() => {}, [dataAddress, credentials]);

    return (
        <div className={classes.container}>
            <p className={'title'}>{headerPage}</p>
            <Box className={classes.formWrapped}>
                <p className={classes.label}>*Name</p>
                <TextField
                    id="outlined-basic"
                    // placeholder={headerPage === 'Add New Address' ? '' : credentials?.nama}
                    label={headerPage === 'Add New Address' ? '' : credentials?.nama}
                    sx={{ color: 'red' }}
                    variant="outlined"
                    className={classes.dialogInput}
                    size="small"
                    disabled
                />
            </Box>
            <Box className={classes.formWrapped}>
                <p className={classes.label}>*Address</p>
                <TextField
                    onChange={onChangeHandler}
                    value={headerPage === 'Add New Address' ? '' : dataAddress.alamat}
                    // value={headerPage === 'Add New Address' ? '' : credentials?.alamat}
                    id="outlined-basic"
                    className={classes.dialogInput}
                    size="small"
                    multiline
                />
            </Box>
            <Box className={classes.formWrapped}>
                <p className={classes.label}>*No Handphone</p>
                <TextField
                    onChange={onChangeHandlerNoHp}
                    value={headerPage === 'Add New Address' ? '' : dataAddress.no_telp}
                    variant="outlined"
                    className={classes.dialogInput}
                    size="small"
                    type="number"
                />
            </Box>
            <Box className={classes.dialogBtnWrapper}>
                <MainBlackButton
                    onClick={async () => {
                        setDataAddress({
                            ...dataAddress,
                            alamat: credentials?.alamat,
                            no_telp: credentials?.no_telp
                        });
                        // setShowModal(false);
                        router.back();
                    }}
                    // onClick={() => router.back()}
                    innerContaunerStyle={style.btnBoxPrimaryOutline}
                    className="WhiteButton"
                    variant="outlined"
                >
                    Back
                </MainBlackButton>
                <HorizontalSpacer widht={{ marginRight: '8px' }} />
                <MainBlackButton
                    onClick={async () => {
                        try {
                            await dispatch(editUserAddressMobile(dataAddress, setShowModal, router));
                            // setShowModal(false);
                        } catch (error) {
                            console.log(error);
                        }
                    }}
                    innerContaunerStyle={style.btnBoxPrimariContainer}
                    className="BlackButton"
                    variant="contained"
                >
                    Submit
                </MainBlackButton>
            </Box>
        </div>
    );
};
export default NewAddress;
