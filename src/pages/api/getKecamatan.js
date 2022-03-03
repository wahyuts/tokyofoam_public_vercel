import axios from 'axios';

export default async function getKecamatan(req, res) {
    // console.log(req.body); // The request body
    // console.log('RRRRR', req.query); // The url querystring
    // console.log(req.cookies); // The passed cookies

    const idKecamatan = req.query.city;
    // console.log('RRRRR', idProvince); // The url querystring

    const API = `https://pro.rajaongkir.com/api/subdistrict?city=${idKecamatan}`;
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
