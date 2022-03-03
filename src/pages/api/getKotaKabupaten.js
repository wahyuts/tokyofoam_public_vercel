import axios from 'axios';

export default async function getKotaKabupaten(req, res) {
    // console.log(req.body); // The request body
    // console.log('RRRRR', req.query.province); // The url querystring
    // console.log(req.cookies); // The passed cookies

    const idProvince = req.query.province;
    //console.log('RRRRR', idProvince); // The url querystring

    const API = `https://pro.rajaongkir.com/api/city?province=${idProvince}`;
    // const API = `https://pro.rajaongkir.com/api/city`;
    const options = {
        headers: {
            key: `${process.env.NEXT_PUBLIC_ONGKIR_API_KEY}`
        }
        // params: {
        //     province: 2
        // }
    };
    try {
        const response = await axios.get(API, options);
        res.status(200).json({
            data: response.data.rajaongkir.results
        });
    } catch (error) {
        console.log(error);
    }
}
