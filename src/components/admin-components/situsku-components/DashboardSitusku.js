import React from 'react';
import { makeStyles } from '@mui/styles';
import { Card, Container, Grid, Typography, Box } from '@mui/material';
import HomeBanner from './sub-components/HomeBanner';
import HomeFlashsale from './sub-components/HomeFlashsale';
import HomeTitleHome from './sub-components/HomeTitleHome';
import HomeSubBanner from './sub-components/HomeSubBanner';

const useStyles = makeStyles((theme) => ({
    ContainerRow: {
        display: 'flex',
        columnGap: 30,
        [theme.breakpoints.down('tablet')]: {
            columnGap: 10
        }
    },
    ItemColumnLeft: {
        width: '100%',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        rowGap: 20,
        [theme.breakpoints.down('tablet')]: {
            width: '50%'
        }
    },
    ItemColumnRight: {
        width: '100%',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        rowGap: 20,
        [theme.breakpoints.down('tablet')]: {
            width: '50%'
        }
    },
    TextSitusku: {
        fontSize: 25,
        fontWeight: 700,
        color: '#212121'
    }
}));

const DashboardSitusku = () => {
    const classes = useStyles();
    return (
        <Container maxWidth="xl">
            <Box sx={{ pb: 5 }}>
                <span className={classes.TextSitusku}>Situsku</span>
            </Box>
            <div className={classes.ContainerRow}>
                <div className={classes.ItemColumnLeft}>
                    <HomeBanner />
                    <div style={{ paddingTop: 20 }}></div>
                    <HomeTitleHome />
                    <div style={{ paddingTop: 20 }}></div>
                    <HomeSubBanner />
                </div>
                <div className={classes.ItemColumnRight}>
                    <HomeFlashsale />
                </div>
            </div>
        </Container>
    );
};

export default DashboardSitusku;
