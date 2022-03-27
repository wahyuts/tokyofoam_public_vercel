import React from 'react';
import { makeStyles } from '@mui/styles';
import { Container, Box } from '@mui/material';
import HomeBanner from './sub-components/HomeBanner';
import HomeTitleHome from './sub-components/HomeTitleHome';
import HomeSubBanner from './sub-components/HomeSubBanner';
import AboutUsBanner from './sub-components/AboutUsBanner';
import HowToBuy from './sub-components/HowToBuy';
import ProductBenefits from './sub-components/ProductBenefits';
import HomeGaleri from './sub-components/HomeGaleri';
import ContactUs from './sub-components/ContactUs';

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
        [theme.breakpoints.up('tablet')]: {
            width: '30%'
        },
        [theme.breakpoints.down('tablet')]: {
            width: '50%'
        }
        // [theme.breakpoints.up('desktopHD')]: {
        //     width: '50%'
        // }
    },
    ItemColumnRight: {
        width: '100%',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        rowGap: 20,
        [theme.breakpoints.up('tablet')]: {
            width: '30%'
        },
        [theme.breakpoints.down('tablet')]: {
            width: '50%'
        }
        // [theme.breakpoints.up('desktopHD')]: {
        //     width: '50%'
        // }
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
                    <div style={{ paddingTop: 20 }}></div>
                    <AboutUsBanner />
                    <div style={{ paddingTop: 20 }}></div>
                    <HowToBuy />
                </div>
                <div className={classes.ItemColumnRight}>
                    <HomeGaleri />
                    <div style={{ paddingTop: 20 }}></div>
                    <ContactUs />
                    <div style={{ paddingTop: 20 }}></div>
                    <ProductBenefits />
                </div>
            </div>
        </Container>
    );
};

export default DashboardSitusku;
