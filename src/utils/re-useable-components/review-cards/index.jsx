import { makeStyles } from '@mui/styles';
import Image from 'next/image';

import {
    Box,
    Card,
    CardContent,
    Typography,
    CardActions,
    Button,
    Avatar,
    CardHeader,
    IconButton,
    CardMedia,
    CardActionArea
} from '@mui/material';

import Pict from '../../../../public/assets/images/contact-us.png';

const useStyles = makeStyles((theme) => ({
    root: {
        // display: 'flex',
        // flexWrap: 'wrap',
        // '& > *': {
        //     margin: theme.spacing(3)
        // }
    }
}));

function ReviewCards() {
    const classes = useStyles();
    return (
        <Box className={classes.root}>
            <Card style={{ width: '100%' }}>
                <CardActionArea>
                    <CardHeader
                        avatar={<Avatar>N</Avatar>}
                        title="Card Header"
                        subheader="Card sub heading"
                        // action={<IconButton>{/* <MoreVertIcon /> */}</IconButton>}
                    />
                    <Image src={Pict} alt="Image" width="225px" height="125px" objectFit="cover" />
                    <CardContent>
                        <Typography variant="h3">Card Title</Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button>share</Button>
                </CardActions>
            </Card>
        </Box>
    );
}

export default ReviewCards;
