import React from 'react';
import { AppBar, Container, Toolbar } from '@mui/material';
import { makeStyles, StylesContext } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    Appbar: {
        padding: 30,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    TopbarSearch: {
        position: 'relative',
        height: 50,
        backgroundColor: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
        borderRadius: 12
    },
    TopbarInput: {
        height: 55,
        width: 329,
        paddingInline: 20,
        /* padding: 10px 60px 10px 20px; */
        fontSize: '1rem',
        borderRadius: 12,
        color: '#455560',
        borderWidth: 0,
        backgroundColor: '#ffffff'
    }
}));

const Appbar = () => {
    const Style = useStyles();
    return (
        <AppBar className={Style.Appbar} position="static" sx={{ bgcolor: '#FFFFFF', boxShadow: 'none', height: 50 }}>
            <Container maxWidth="xl">
                <Toolbar>
                    <div className={Style.TopbarSearch}>
                        <input type="text" placeholder="Search" className={Style.TopbarInput} />
                        <i className="bx bx-search" style={{ fontSize: 18, position: 'absolute', right: 20 }}></i>
                    </div>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Appbar;
