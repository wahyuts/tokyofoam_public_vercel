import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import MainBlackButton from '../buttons/MainBlackButton';

const ReadMoreLess = ({ children, limit }) => {
    const [isLoadMoreShown, setLoadMoreShown] = useState(false);
    const { productByName } = useSelector((state) => state.dataProduct);
    const cekDesc = productByName.desc.substr(0, limit);
    const text = children;
    // let results = JSON.stringify(text)
    // const finalResults = children.toString().substr(0, limit);
    const buttonLoadMore = () => {
        setLoadMoreShown((prevState) => !prevState);
    };
    // console.log(finalResults, 'cekkkk final results');
    // console.log(cekDesc, 'cekkk Descccc');

    return (
        <div>
            <p>{isLoadMoreShown ? text : cekDesc}</p>
            <MainBlackButton className={`BlackButton`} onClick={buttonLoadMore}>
                {isLoadMoreShown ? 'Show Less' : 'Load More'}
            </MainBlackButton>
        </div>
    );
};

export default ReadMoreLess;
