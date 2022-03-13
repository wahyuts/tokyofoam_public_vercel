// import { SET_HISTORY_ORDER } from '../../types';

import Img from '../../../public/assets/images/Single-Pillow-1.png';

import { SET_HISTORY_ORDER } from '../../types';

const initialState = {
    data_history_order: [
        {
            no: '1',
            id: 'edrftghjkcbxv',
            variant: 'black',
            img: Img,
            name: 'Pillow A',
            date: '24/10/2021',
            qty: '1',
            status: 'failed',
            price: '651.300'
        },
        {
            no: '2',
            id: 'jhjhbjn',
            variant: 'black',
            img: Img,
            name: 'Mia Pillow',
            date: '24/10/2021',
            qty: '1',
            status: 'waiting for payment',
            price: '651.300'
        },
        {
            no: '3',
            id: 'edrftjhkjkjghjkcbxv',
            variant: 'black',
            img: Img,
            name: 'Pillow',
            date: '24/10/2021',
            qty: '1',
            status: 'complete',
            price: '651.300'
        },
        {
            no: '4',
            id: 'hjjkjkji',
            variant: 'black',
            img: Img,
            name: 'Pillow b',
            date: '24/10/2021',
            qty: '1',
            status: 'failed',
            price: '651.300'
        },
        {
            no: '1',
            id: 'dfghjk',
            variant: 'black',
            img: Img,
            name: 'Pillow',
            date: '24/10/2021',
            qty: '1',
            status: 'failed',
            price: '651.300'
        },
        {
            no: '2',
            id: 'hjjkkj',
            variant: 'black',
            img: Img,
            name: 'Nama Pillow',
            date: '24/10/2021',
            qty: '1',
            status: 'failed',
            price: '651.300'
        },
        {
            no: '3',
            id: 'kkbj',
            variant: 'black',
            img: Img,
            name: 'Nama Pillow',
            date: '24/10/2021',
            qty: '1',
            status: 'failed',
            price: '651.300'
        },
        {
            no: '4',
            id: 'edrftghjkcbxv',
            variant: 'black',
            img: Img,
            name: 'Nama Pillow',
            date: '24/10/2021',
            qty: '1',
            status: 'failed',
            price: '651.300'
        },
        {
            no: '1',
            id: 'edrftghjkcbxv',
            variant: 'black',
            img: Img,
            name: 'Nama Pillow',
            date: '24/10/2021',
            qty: '1',
            status: 'failed',
            price: '651.300'
        },
        {
            no: '2',
            id: 'edrftghjkcbxv',
            variant: 'black',
            img: Img,
            name: 'Nama Pillow',
            date: '24/10/2021',
            qty: '1',
            status: 'failed',
            price: '651.300'
        },
        {
            no: '3',
            id: 'edrftghjkcbxv',
            variant: 'black',
            img: Img,
            name: 'Mia Artina',
            date: '24/10/2021',
            qty: '1',
            status: 'failed',
            price: '651.300'
        },
        {
            no: '4',
            id: 'edrftghjkcbxv',
            variant: 'black',
            img: Img,
            name: 'Mia Artina',
            date: '24/10/2021',
            qty: '1',
            status: 'failed',
            price: '651.300'
        }
    ]
};

export default function dataHistoryOrder(state = initialState, action) {
    switch (action.type) {
        case SET_HISTORY_ORDER:
            return {
                ...state,
                data_history_order: action.payload
            };
        default:
            return state;
    }
}
