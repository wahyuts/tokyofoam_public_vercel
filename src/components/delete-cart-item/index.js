import { useDispatch, useSelector } from 'react-redux';
import { deleteBagEach, deleteCartBE } from '../../redux/actions/dataProductActions';
import DeleteButton from '../../utils/re-useable-components/buttons/DeleteButton';

const DeleteCartItem = ({ bagId, arrPrice, arrAllWeight, idUniqCartUser, authenticated, handleClickBack }) => {
    const dispatch = useDispatch();

    const ByIndex = (index) => arrPrice[index % arrPrice.length];
    const { dataProductOnBag } = useSelector((state) => state.bag);

    const delItemOnBag = () => {
        dispatch(deleteBagEach(bagId));
        let index3 = arrPrice.findIndex((param) => param.id_Product === bagId);
        arrPrice.splice(index3, 1);

        /**Buat Cek ootomatis array weight jika product di hapus dari cart */
        let index4 = arrAllWeight.findIndex((param) => param.id_Product === bagId);
        arrAllWeight.splice(index4, 1);
        /************************************************** */

        handleClickBack();

        if (authenticated === true) {
            dispatch(deleteCartBE(dataProductOnBag, idUniqCartUser));
        }
    };

    // console.log('ARR PRICEESS', dataProductOnBag);
    return (
        <>
            <DeleteButton onClick={delItemOnBag} />;
        </>
    );
};

export default DeleteCartItem;
