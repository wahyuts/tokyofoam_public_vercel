import axios from 'axios';

export default async function getKotaKabupaten(req, res) {
    // console.log('CEK BODY', req.body); // The request body
    // console.log('CEK QUERRY', req.query); // The url querystring
    // console.log(req.cookies); // The passed cookies

    const dataObject = req.body;

    const API = `https://pro.rajaongkir.com/api/cost`;
    const options = {
        headers: {
            'Content-Type': 'application/json',
            key: `${process.env.NEXT_PUBLIC_ONGKIR_API_KEY}`
        }
        // data: {
        //     data tidak ada karena data di kirim dari cart handle calculate
        //     lewat dataObject = req.body
        // }
    };
    try {
        const response = await axios.post(API, dataObject, options);
        res.status(200).json({
            data: response.data.rajaongkir.results,
            finishedLoadResponse: false,
            munculin_LoadingButton: true
        });
    } catch (error) {
        console.log(error);
    }
}
