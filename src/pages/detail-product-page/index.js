import Head from 'next/head';

//MaT UI
import { makeStyles } from '@mui/styles';

import ContentProductLayout from '../../components/content-product-layout';
import CardPrice from '../../components/card-price';
import ShortDescriptionReview from '../../components/short-description-review';

const useStyles = makeStyles(() => ({
    main: {
        minHeight: '100vh'
    }
}));

const DetailProductPage = () => {
    const classes = useStyles();
    return (
        <div className={classes.main}>
            <Head>
                <title>Tokyo Foam || Detail Product</title>
            </Head>

            <ContentProductLayout>
                <CardPrice />
            </ContentProductLayout>
            {/* <ShortDescriptionReview /> */}
        </div>
    );
};

export default DetailProductPage;
