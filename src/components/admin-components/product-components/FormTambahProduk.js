import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import MainBlackButton from '../../../utils/re-useable-components/buttons/MainBlackButton';
import PostSingleProduct from './PostSingleProduct';
import PostBundlingProduct from './PostBundlingProduct';

const useStyles = makeStyles((theme) => ({
    fontSizepHere: {
        fontSize: 14
    },
    fullMainCont2Button: {
        width: '100%',
        // backgroundColor: 'green',
        borderRadius: 8,
        marginBottom: 30,
        minHeight: 56
    },
    mainCont2Button: {
        width: '95%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 10,
        marginBottom: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
        // backgroundColor: 'pink'
    }
}));

const FormTambahProduk = () => {
    const classes = useStyles();
    const [pages, setPages] = useState('single');

    const gantiPageSingle = () => {
        setPages('single');
    };

    const gantiPageBundling = () => {
        setPages('bundling');
    };

    return (
        <>
            <div className={classes.fullMainCont2Button}>
                <div className={classes.mainCont2Button}>
                    {pages === 'single' ? (
                        <div style={{ width: 186, marginRight: 10, marginBottom: 10 }}>
                            <MainBlackButton className={'BorderBlueButton'} onClick={gantiPageSingle}>
                                Product
                            </MainBlackButton>
                        </div>
                    ) : (
                        <div style={{ width: 186, marginRight: 10, marginBottom: 10 }}>
                            <MainBlackButton className={'BorderWhiteButton'} onClick={gantiPageSingle}>
                                Product
                            </MainBlackButton>
                        </div>
                    )}

                    {pages === 'bundling' ? (
                        <div style={{ width: 186, marginRight: 10, marginBottom: 10 }}>
                            <MainBlackButton className={'BorderBlueButton'} onClick={gantiPageBundling}>
                                Bundling
                            </MainBlackButton>
                        </div>
                    ) : (
                        <div style={{ width: 186, marginRight: 10, marginBottom: 10 }}>
                            <MainBlackButton className={'BorderWhiteButton'} onClick={gantiPageBundling}>
                                Bundling
                            </MainBlackButton>
                        </div>
                    )}
                </div>
            </div>

            {pages === 'single' ? <PostSingleProduct /> : <PostBundlingProduct />}
        </>
    );
};

export default FormTambahProduk;
