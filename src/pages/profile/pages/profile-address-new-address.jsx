import { useSelector } from 'react-redux';
import { TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import DropdownKabupaten from '../../../utils/re-useable-components/dropdown/dropdown-kabupaten';
import DropdownKecamatan from '../../../utils/re-useable-components/dropdown/dropdown-kecamatan';
import MainBlackButton from '../../../utils/re-useable-components/buttons/MainBlackButton';
import HorizontalSpacer from '../../../components/HorizontalSpacer';
import { useRouter } from 'next/router';

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
    const { headerPage } = useSelector((state) => state.url_profile);
    return (
        <div className={classes.container}>
            <p className={'title'}>{headerPage}</p>
            <Box className={classes.formWrapped}>
                <p className={classes.label}>*Name</p>
                <TextField
                    id="outlined-basic"
                    placeholder={headerPage === 'Add New Address' ? '' : 'Mia Artina'}
                    variant="outlined"
                    r
                    className={classes.dialogInput}
                    size="small"
                />
            </Box>
            <Box className={classes.formWrapped}>
                <p className={classes.label}>*Address</p>
                <TextField
                    placeholder={
                        headerPage === 'Add New Address' ? '' : 'Jln. Gunung Saputan no.22X, Kecamatan Denpasar Barat'
                    }
                    id="outlined-basic"
                    className={classes.dialogInput}
                    size="small"
                    multiline
                />
            </Box>
            <Box className={classes.formWrapped}>
                <p className={classes.label}>*Kode Pos</p>
                <TextField
                    placeholder={headerPage === 'Add New Address' ? '' : 'Kode Pos'}
                    variant="outlined"
                    className={classes.dialogInput}
                    size="small"
                />
            </Box>
            <Box className={classes.formWrapped}>
                <p className={classes.label}>*Kota / Kabupaten</p>
                <DropdownKabupaten />
            </Box>
            <Box className={classes.formWrapped}>
                <p className={classes.label}>*Kecamatan</p>
                <DropdownKabupaten />
            </Box>
            <Box className={classes.formWrapped}>
                <p className={classes.label}>*No Telp</p>
                <TextField
                    placeholder={headerPage === 'Add New Address' ? '' : 'Your number'}
                    variant="outlined"
                    className={classes.dialogInput}
                    size="small"
                />
            </Box>
            <Box className={classes.dialogBtnWrapper}>
                <MainBlackButton
                    onClick={() => router.back()}
                    innerContaunerStyle={style.btnBoxPrimaryOutline}
                    className="WhiteButton"
                    variant="outlined"
                >
                    Back
                </MainBlackButton>
                <HorizontalSpacer widht={{ marginRight: '8px' }} />
                <MainBlackButton
                    onClick={() => {}}
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
