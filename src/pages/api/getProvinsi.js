import axios from 'axios';

export default async function getProvinsi(req, res) {
    const API = 'https://pro.rajaongkir.com/api/province';
    const options = {
        headers: {
            key: `${process.env.NEXT_PUBLIC_ONGKIR_API_KEY}`
        }
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
